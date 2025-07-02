import React, { useState } from "react";
import "./FilterDestination.css";
import forwardIcon from "../../public/svg/forward.svg";
import backwardIcon from "../../public/svg/backward.svg";
import hideIcon from "../../public/svg/hide.svg";
import expandIcon from "../../public/svg/expand.svg";
import RangeTimeInput from "../RangeTimeInput/RangeTimeInput";
import classNames from "classnames";

const FilterDestination = ({ forward, children }) => {
  const [isExpand, setIsExpand] = useState(true);

  const filterDestinationClass = classNames("filter-destination", {
    "filter-destination--backward": !forward,
    "filter-destination--collapsed": !isExpand,
  });

  const rangesContainerClass = classNames("filter-destination__ranges", {
    "filter-destination__ranges--hidden": !isExpand,
  });

  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  return (
    <div className={filterDestinationClass}>
      <div className="filter-destination__header">
        <img
          className="filter-destination__icon"
          src={forward ? forwardIcon : backwardIcon}
          alt="destination"
        />
        <h3 className="filter-destination__title">{children}</h3>
        <img
          className="filter-destination__expander"
          src={isExpand ? hideIcon : expandIcon}
          alt="expander"
          onClick={handleExpand}
        />
      </div>
      <div className={rangesContainerClass}>
        <div className="filter-destination__departure">
          <h4 className="filter-destination__departure-title">Время отбытия</h4>
          <RangeTimeInput />
        </div>
        <div className="filter-destination__arrival">
          <h4 className="filter-destination__arrival-title">Время прибытия</h4>
          <RangeTimeInput />
        </div>
      </div>
    </div>
  );
};

export default FilterDestination;