// components/WidgetDetails/components/WidgetDetailsRoute.jsx

import { useState } from 'react';
import {
  datetimeToDate,
  msConversion,
  toHHMMSS,
} from "../../../utils/timeFormatter";

const WidgetDetailsRoute = ({
  route,
  dateFrom,
  num,
  cityFrom,
  cityTo,
  timeFrom,
  timeTo,
  dateTo,
  stationFrom,
  stationTo,
  duration,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Изначально развернуто (минус)

  const toggleCollapse = () => { // <--- ДОБАВЛЕНО ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="widget__route">
      <div className="widget__route-header">
        <div className={`widget__icon ${route === 'back' ? 'widget__icon--back' : ''}`}></div>
        <h4 className="widget__header-title">{route === 'back' ? 'Обратно' : 'Туда'}</h4>
        <div className="widget__date">{datetimeToDate(dateFrom)}</div>
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
      <div className="widget__route-content">
        <div className="widget__train-info">
          <h4 className="widget__train-label">№ Поезда</h4>
          <p className="widget__train-number">{num}</p>
        </div>
        <div className="widget__train-info">
          <h4 className="widget__train-label">Название</h4>
          <div className="widget__train-cities">
            <p className="widget__city-name">{cityFrom}</p>
            <p className="widget__city-name">{cityTo}</p>
          </div>
        </div>
      </div>
      <div className="widget__route-time">
        <div className="widget__route-from">
          <div className="widget__time">{toHHMMSS(timeFrom)}</div>
          <div className="widget__date-info">{datetimeToDate(dateFrom)}</div>
          <div className="widget__station">
            <h5 className="widget__station-city">{cityFrom}</h5>
            <p className="widget__station-name">{stationFrom} вокзал</p>
          </div>
        </div>
        <div className="widget__time-box">
          <p className="widget__duration">{msConversion(duration)}</p>
          <div className={`widget__direction-arrow ${route === 'back' ? 'widget__direction-arrow--back' : ''}`}></div>
        </div>
        <div className="widget__route-to">
          <div className="widget__time">{toHHMMSS(timeTo)}</div>
          <div className="widget__date-info">{datetimeToDate(dateTo)}</div>
          <div className="widget__station">
            <h5 className="widget__station-city">{cityTo}</h5>
            <p className="widget__station-name">{stationTo} вокзал</p>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default WidgetDetailsRoute;
