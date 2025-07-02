import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "../../store/getFilterSlice";
import "./RangeInput.css";

const RangeInput = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter);
  const trains = useSelector((state) => state.trains.items);

  const getMinMaxPrices = () => {
    if (!trains || trains.length === 0) return { min: 0, max: 10000 };

    let minPrice = Infinity;
    let maxPrice = 0;

    trains.forEach(train => {
      if (train.departure.have_first_class && train.departure.price_info.first?.bottom_price) {
        minPrice = Math.min(minPrice, train.departure.price_info.first.bottom_price);
        maxPrice = Math.max(maxPrice, train.departure.price_info.first.bottom_price);
      }
      if (train.departure.have_second_class && train.departure.price_info.second?.bottom_price) {
        minPrice = Math.min(minPrice, train.departure.price_info.second.bottom_price);
        maxPrice = Math.max(maxPrice, train.departure.price_info.second.bottom_price);
      }
      if (train.departure.have_third_class && train.departure.price_info.third?.bottom_price) {
        minPrice = Math.min(minPrice, train.departure.price_info.third.bottom_price);
        maxPrice = Math.max(maxPrice, train.departure.price_info.third.bottom_price);
      }
      if (train.departure.have_fourth_class && train.departure.price_info.fourth?.bottom_price) {
        minPrice = Math.min(minPrice, train.departure.price_info.fourth.bottom_price);
        maxPrice = Math.max(maxPrice, train.departure.price_info.fourth.bottom_price);
    }
    });

    minPrice = Math.floor(minPrice / 100) * 100;
    maxPrice = Math.ceil(maxPrice / 100) * 100;

    return { min: minPrice, max: maxPrice };
  };

  const { min, max } = getMinMaxPrices();
  const [values, setValues] = useState({ 
    min: filters?.price_from ?? min, 
    max: filters?.price_to ?? max 
  });
  const rangeRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (filters) {
      setValues({
        min: filters.price_from ?? min,
        max: filters.price_to ?? max
      });
    }
  }, [filters, min, max]);

  useEffect(() => {
    const range = rangeRef.current;
    const minThumb = minThumbRef.current;
    const maxThumb = maxThumbRef.current;
    const track = trackRef.current;

    const updateTrack = () => {
      const minPercent = Math.max(0, Math.min(100, ((values.min - min) / (max - min)) * 100));
      const maxPercent = Math.max(0, Math.min(100, ((values.max - min) / (max - min)) * 100));
      
      track.style.left = `${minPercent}%`;
      track.style.width = `${maxPercent - minPercent}%`;
      
      minThumb.style.left = `${minPercent}%`;
      maxThumb.style.left = `${maxPercent}%`;
    };

    const handleMinDrag = (e) => {
      const rect = range.getBoundingClientRect();
      const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const newMin = Math.round(min + (percent / 100) * (max - min));
      
      if (newMin < values.max) {
        setValues(prev => ({ ...prev, min: newMin }));
        dispatch(setPriceRange({ from: newMin, to: values.max }));
      }
    };

    const handleMaxDrag = (e) => {
      const rect = range.getBoundingClientRect();
      const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const newMax = Math.round(min + (percent / 100) * (max - min));
      
      if (newMax > values.min) {
        setValues(prev => ({ ...prev, max: newMax }));
        dispatch(setPriceRange({ from: values.min, to: newMax }));
      }
    };

    const handleMinMouseDown = (e) => {
      e.preventDefault();
      document.addEventListener('mousemove', handleMinDrag);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleMinDrag);
      }, { once: true });
    };

    const handleMaxMouseDown = (e) => {
      e.preventDefault();
      document.addEventListener('mousemove', handleMaxDrag);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleMaxDrag);
      }, { once: true });
    };

    minThumb.addEventListener('mousedown', handleMinMouseDown);
    maxThumb.addEventListener('mousedown', handleMaxMouseDown);

    updateTrack();

    return () => {
      minThumb.removeEventListener('mousedown', handleMinMouseDown);
      maxThumb.removeEventListener('mousedown', handleMaxMouseDown);
    };
  }, [values, min, max, dispatch]);

  return (
    <div className="widget-filter__price-container">
      <div className="widget-filter__range-slider" ref={rangeRef}>
        <div className="widget-filter__range-track" ref={trackRef}></div>
        <div
          className="widget-filter__range-thumb"
          ref={minThumbRef}
        ></div>
        <div
          className="widget-filter__range-thumb"
          ref={maxThumbRef}
        ></div>
      </div>
      <div className="widget-filter__range-values">
        <div className="widget-filter__range-value-container">
          <span className="widget-filter__range-value-label">от</span>
          <span className="widget-filter__range-value widget-filter__range-value--start">
            {values.min}
          </span>
        </div>
        <div className="widget-filter__range-value-container">
          <span className="widget-filter__range-value-label">до</span>
          <span className="widget-filter__range-value widget-filter__range-value--end">
            {values.max}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RangeInput;