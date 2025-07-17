// components/WidgetDetails/components/WidgetDetailsPass.jsx

import { useState } from 'react';
import { useSelector } from "react-redux";
import { selectSelectedSeat } from "../../../store/getSeatsSlice";
import { totalSum } from "../../../utils/selectionWagon";

const WidgetDetailsPass = ({ depPass, arrPass }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Изначально развернуто (минус)

  const toggleCollapse = () => { // <--- ДОБАВЛЕНО ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ
    setIsCollapsed(!isCollapsed);
  };

  const adult = depPass.adult + arrPass.adult;
  const child = depPass.child + arrPass.child;

  const seatsDep = useSelector(selectSelectedSeat).departure;
  const seatsArr = useSelector(selectSelectedSeat).arrival;

  return (
    <div className="widget__passengers">
      <div className="widget__passenger-header">
        <div className="widget__icon widget__icon--passenger"></div>
        <h4 className="widget__header-title">Пассажиры</h4>
        {/* Добавляем обработчик onClick и класс для стилизации кнопки */}
        <div 
          // Если isCollapsed true (свернуто), применяем widget__toggle--show (плюс)
          // Если isCollapsed false (развернуто), оставляем базовый widget__toggle (минус)
          className={`widget__toggle ${isCollapsed ? 'widget__toggle--show' : ''}`}
          onClick={toggleCollapse}
        ></div>
      </div>
      {/* Условный рендеринг: показываем содержимое только если не свернуто */}
      {!isCollapsed && ( // <--- УСЛОВНЫЙ РЕНДЕРИНГ
      <>
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
      </>
      )}
    </div>
  );
};

export default WidgetDetailsPass;
