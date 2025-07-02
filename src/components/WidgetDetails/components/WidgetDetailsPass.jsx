import { useSelector } from "react-redux";
import { selectSelectedSeat } from "../../../store/getSeatsSlice";
import { totalSum } from "../../../utils/selectionWagon";

const WidgetDetailsPass = ({ depPass, arrPass }) => {
  const adult = depPass.adult + arrPass.adult;
  const child = depPass.child + arrPass.child;

  const seatsDep = useSelector(selectSelectedSeat).departure;
  const seatsArr = useSelector(selectSelectedSeat).arrival;

  return (
    <div className="widget__passengers">
      <div className="widget__passenger-header">
        <div className="widget__icon widget__icon--passenger"></div>
        <h4 className="widget__header-title">Пассажиры</h4>
        <div className="widget__toggle widget__toggle--show"></div>
      </div>
      {adult !== 0 && (
        <div className="widget__passenger-info">
          <h4 className="widget__passenger-count">{adult} Взрослых</h4>
          <div className="widget__price">
            <p className="widget__price-value">{totalSum(seatsDep) + totalSum(seatsArr)}</p>
            <div className="widget__currency"></div>
          </div>
        </div>
      )}
      {child !== 0 && (
        <div className="widget__passenger-info">
          <h4 className="widget__passenger-count">{child} Ребенок</h4>
          <div className="widget__price">
            <p className="widget__price-value">1920</p>
            <div className="widget__currency"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetDetailsPass;
