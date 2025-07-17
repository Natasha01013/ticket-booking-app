// components/SelectionTrain/SelectionTrain.jsx

import TrainCard from "../TrainCard/TrainCard";
import { useSelector, useDispatch } from "react-redux";
import "./SelectionTrain.css";
import ChangePages from "../../components/ChangePages/ChangePages";
import FilterRoute from "../FilterRoute/FilterRoute";
import { useEffect, useState, useMemo } from "react";
import { setFilteredCount } from "../../store/getTrainsSlice";

const SelectionTrain = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.trains);
  const filters = useSelector((state) => state.filter);
  const [trains, setTrains] = useState([]);
  
  useEffect(() => {
    const loadTrains = () => {
  const storedTrains = localStorage.getItem("trains");
      if (storedTrains) {
        setTrains(JSON.parse(storedTrains));
      }
    };

    loadTrains();
    window.addEventListener('storage', loadTrains);

    return () => {
      window.removeEventListener('storage', loadTrains);
    };
  }, []);

  useEffect(() => {
    if (items && items.length > 0) {
      setTrains(items);
      localStorage.setItem("trains", JSON.stringify(items));
    }
  }, [items]);

  const filteredTrains = useMemo(() => {
    if (!trains) return [];

    return trains.filter(train => {
      const minPrice = filters.price_from || 0;
      const maxPrice = filters.price_to || Infinity;
      
      const hasValidPrice = (train.departure.have_first_class && train.departure.price_info.first?.bottom_price >= minPrice && train.departure.price_info.first?.bottom_price <= maxPrice) ||
                          (train.departure.have_second_class && train.departure.price_info.second?.bottom_price >= minPrice && train.departure.price_info.second?.bottom_price <= maxPrice) ||
                          (train.departure.have_third_class && train.departure.price_info.third?.bottom_price >= minPrice && train.departure.price_info.third?.bottom_price <= maxPrice) ||
                          (train.departure.have_fourth_class && train.departure.price_info.fourth?.bottom_price >= minPrice && train.departure.price_info.fourth?.bottom_price <= maxPrice);

      const hasValidClass = (!filters.have_first_class || train.departure.have_first_class) &&
                          (!filters.have_second_class || train.departure.have_second_class) &&
                          (!filters.have_third_class || train.departure.have_third_class) &&
                          (!filters.have_fourth_class || train.departure.have_fourth_class);

      const hasValidOptions = (!filters.have_wifi || (train.departure.have_wifi || train.arrival?.have_wifi)) &&
                            (!filters.have_express || (train.departure.is_express || train.arrival?.is_express));

      const departureDateTime = new Date(train.departure.from.datetime * 1000);
      const departureHours = departureDateTime.getHours();
      const departureMinutes = departureDateTime.getMinutes();
      const departureTime = departureHours + departureMinutes / 60;
      const hasValidDepartureTime = Number(departureTime) >= Number(filters.start_departure_hour_from) && 
                                  Number(departureTime) <= Number(filters.start_departure_hour_to);

      const arrivalDateTime = new Date(train.departure.to.datetime * 1000);
      const arrivalHours = arrivalDateTime.getHours();
      const arrivalMinutes = arrivalDateTime.getMinutes();
      const arrivalTime = arrivalHours + arrivalMinutes / 60;
      const hasValidArrivalTime = Number(arrivalTime) >= Number(filters.start_arrival_hour_from) && 
                                Number(arrivalTime) <= Number(filters.start_arrival_hour_to);

      let hasValidReturnDepartureTime = true;
      if (train.arrival) {
        const returnDepartureDateTime = new Date(train.arrival.from.datetime * 1000);
        const returnDepartureHours = returnDepartureDateTime.getHours();
        const returnDepartureMinutes = returnDepartureDateTime.getMinutes();
        const returnDepartureTime = returnDepartureHours + returnDepartureMinutes / 60;
        hasValidReturnDepartureTime = Number(returnDepartureTime) >= Number(filters.end_departure_hour_from) && 
                                    Number(returnDepartureTime) <= Number(filters.end_departure_hour_to);
      }

      let hasValidReturnArrivalTime = true;
      if (train.arrival) {
        const returnArrivalDateTime = new Date(train.arrival.to.datetime * 1000);
        const returnArrivalHours = returnArrivalDateTime.getHours();
        const returnArrivalMinutes = returnArrivalDateTime.getMinutes();
        const returnArrivalTime = returnArrivalHours + returnArrivalMinutes / 60;
        hasValidReturnArrivalTime = Number(returnArrivalTime) >= Number(filters.end_arrival_hour_from) && 
                                  Number(returnArrivalTime) <= Number(filters.end_arrival_hour_to);
      }

      return hasValidPrice && 
             hasValidClass && 
             hasValidOptions && 
             hasValidDepartureTime && 
             hasValidArrivalTime && 
             hasValidReturnDepartureTime && 
             hasValidReturnArrivalTime;
    });
  }, [trains, filters]);

  useEffect(() => {
    dispatch(setFilteredCount(filteredTrains.length));
  }, [filteredTrains, dispatch]);

  return (
    <>
      {filteredTrains && filteredTrains.length > 0 ? (
        <>
          <FilterRoute />
          <div className="train-cards">
            {filteredTrains.map((el) => (
              <TrainCard card={el} key={el.departure._id} />
            ))}
          </div>
          <ChangePages />
        </>
      ) : (
        <p className="train-cards-error">
          Прямых рейсов по маршруту не найдено
        </p>
      )}
    </>
  );
};

export default SelectionTrain;
