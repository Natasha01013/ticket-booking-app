import { useDispatch, useSelector } from "react-redux";
import SeatAmount from "./components/SeatAmount";
import SeatCarriage from "./components/SeatCarriage/SeatCarriage";
import SeatCarriageNumber from "./components/SeatCarriageNumber/SeatCarriageNumber";
import SeatCarriageType from "./components/SeatCarriageType/SeatCarriageType";
import SeatHeader from "./components/SeatHeader";
import SeatTrainName from "./components/SeatTrainName";

import "./SelectionSeat.css";
import { getCarriageType, getSeat } from "../../store/getTrainSeatSlice";
import { useEffect, useState } from "react";
import SeatAvailable from "./components/SeatAvailable/SeatAvailable";

const SelectionSeat = ({ train, route, direction }) => {
  const { departure, arrival } = useSelector((state) => state.trainSeat.seat);
  const { type } = useSelector((state) => state.trainSeat);
  const { selectedSeat } = useSelector((state) => state.trainSeat);
  const [carriageNumber, setCarriageNumber] = useState(false);

  const dispatch = useDispatch();
  let id = train[direction]._id;

  useEffect(() => {
    dispatch(getSeat({ id, direction }));
  }, [id, direction, dispatch]);

  const onClick = (e) => {
    const { id } = e.target;
    dispatch(getCarriageType(id));
    setCarriageNumber(!carriageNumber);
  };

  return (
    <div className={`select-seat ${route}`}>
      <SeatHeader route={route} />
      <SeatTrainName
        route={route}
        number={train[direction].train.name}
        cityFrom={train[direction].from?.city?.name}
        cityTo={train[direction].to?.city?.name}
        stationFrom={train[direction].from.railway_station_name}
        stationTo={train[direction].to.railway_station_name}
        depFrom={train[direction].from.datetime}
        depTo={train[direction].to.datetime}
        duration={train[direction].duration}
      />
      <SeatAmount direction={direction} />
      <SeatCarriageType
        seat={train[direction].available_seats_info}
        onClick={onClick}
      />
      {carriageNumber && (
        <SeatCarriageNumber
          seat={direction === "departure" ? departure : arrival}
          direction={direction}
        />
      )}
      {selectedSeat[direction].coach && (
        <SeatCarriage carriage={selectedSeat[direction]} type={type} />
      )}
      {selectedSeat[direction].coach && (
        <SeatAvailable
          carriage={selectedSeat[direction]}
          type={type}
          direction={direction}
        />
      )}
    </div>
  );
};

export default SelectionSeat;