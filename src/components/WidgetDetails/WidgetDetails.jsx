// components/WidgetDetails/WidgetDetails.jsx

import "./WidgetDetails.css";
import WidgetDetailsPass from "./components/WidgetDetailsPass";
import WidgetDetailsRoute from "./components/WidgetDetailsRoute";
import WidgetDetailsTotal from "./components/WidgetDetailsTotal";
import { useSelector } from "react-redux";

const WidgetDetails = () => {
  const train = JSON.parse(localStorage.getItem("train"));
  const { departure, arrival } = train;
  const { fromCity, toCity } = useSelector((state) => state.choice);
  const { passanger } = useSelector((state) => state.seats);

  return (
    <aside className="widget">
      <h3 className="widget__title">Детали поездки</h3>
      {departure && (
        <WidgetDetailsRoute
          dateFrom={departure?.from.datetime}
          dateTo={departure?.to.datetime}
          num={departure?.train?.name.replace(/\D/g, "")}
          cityFrom={fromCity?.name}
          cityTo={toCity?.name}
          timeFrom={departure?.from?.datetime}
          timeTo={departure?.to?.datetime}
          duration={departure?.duration}
          stationFrom={departure?.from?.railway_station_name}
          stationTo={departure?.to?.railway_station_name}
        />
      )}
      {arrival && (
        <WidgetDetailsRoute
          route={"back"}
          dateFrom={arrival?.from.datetime}
          dateTo={arrival?.to.datetime}
          num={arrival?.train?.name.replace(/\D/g, "")}
          cityFrom={toCity?.name}
          cityTo={fromCity?.name}
          timeFrom={arrival?.from?.datetime}
          timeTo={arrival?.to?.datetime}
          duration={arrival?.duration}
          stationFrom={arrival?.from?.railway_station_name}
          stationTo={arrival?.to?.railway_station_name}
        />
      )}
      <WidgetDetailsPass
        depPass={passanger?.departure}
        arrPass={passanger?.arrival}
      />
      <WidgetDetailsTotal />
    </aside>
  );
};

export default WidgetDetails;
