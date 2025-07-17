import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchForm.css";
import { clearCity, getCity } from "../../store/getCitySlice";
import { choiceCityFrom, choiceCityTo, choiceDateFrom, choiceDateTo } from "../../store/choiceSlice";
import CalendarForm from "../CalendarForm/CalendarForm";
import { getTrains } from "../../store/getTrainsSlice";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ name }) => {
  const [show, setShow] = useState({ from: false, to: false });
  const [calendar, setCalendar] = useState({ direction: "", open: false });
  const [searchResultsFrom, setSearchResultsFrom] = useState([]);
  const [searchResultsTo, setSearchResultsTo] = useState([]);
  const calendarRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { items } = useSelector((state) => state.city);
  const { fromDate, toDate, fromCity, toCity } = useSelector((state) => state.choice);
  const filters = useSelector((state) => state.filters);

  const [city, setCity] = useState({ 
    from: fromCity?.name || "", 
    to: toCity?.name || "" 
  });

  const [dates, setDates] = useState({
    there: fromDate || "",
    back: toDate || ""
  });

  useEffect(() => {
    setDates({
      there: fromDate || "",
      back: toDate || ""
    });
  }, [fromDate, toDate]);

  const searchCity = useCallback(async (value, setResults) => {
    if (value.trim().length > 0) {
      const response = await dispatch(getCity(value));
      if (response.payload) {
        setResults(response.payload);
      }
    } else {
      setResults([]);
    }
  }, [dispatch]);

  useEffect(() => {
    let timeoutId;
    if (city.from !== "") {
      timeoutId = setTimeout(() => {
        searchCity(city.from, setSearchResultsFrom);
      }, 300);
    } else {
      setSearchResultsFrom([]);
    }
    return () => clearTimeout(timeoutId);
  }, [city.from, dispatch, searchCity]);

  useEffect(() => {
    let timeoutId;
    if (city.to !== "") {
      timeoutId = setTimeout(() => {
        searchCity(city.to, setSearchResultsTo);
      }, 300);
    } else {
      setSearchResultsTo([]);
    }
    return () => clearTimeout(timeoutId);
  }, [city.to, dispatch, searchCity]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendar.open && calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendar(prev => ({ ...prev, open: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendar.open]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCity((prev) => ({ ...prev, [id]: value }));
    if (value.trim().length > 0) {
      setShow(prev => ({ ...prev, [id]: true }));
    } else {
      setShow(prev => ({ ...prev, [id]: false }));
      if (id === 'from') {
        setSearchResultsFrom([]);
      } else {
        setSearchResultsTo([]);
      }
    }
  };

  const handleInputClick = (e) => {
    const { id } = e.target;
    dispatch(clearCity());
    
    if (city[id].trim().length > 0) {
      setShow(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleCitySelect = (selectedCity, inputId) => {
    if (inputId === "from") {
      dispatch(choiceCityFrom(selectedCity));
      setCity((prev) => ({ ...prev, from: selectedCity.name }));
      setSearchResultsFrom([]);
    }
    if (inputId === "to") {
      dispatch(choiceCityTo(selectedCity));
      setCity((prev) => ({ ...prev, to: selectedCity.name }));
      setSearchResultsTo([]);
    }
    setShow(prev => ({ ...prev, [inputId]: false }));
  };

  const handleCalendarOpen = (e) => {
    const { id } = e.target;
    setCalendar((prev) => ({
      direction: id,
      open: !prev.open || prev.direction !== id
    }));
  };

  const handleDateChange = (e) => {
    const { id, value } = e.target;
    setDates(prev => ({ ...prev, [id]: value }));
    
    if (id === 'there') {
      dispatch(choiceDateFrom(value));
    } else if (id === 'back') {
      dispatch(choiceDateTo(value));
    }
  };

  const handleSearchClick = () => {
    if (fromCity && toCity) {
      localStorage.removeItem("trains");
      localStorage.removeItem("itemsPerPage");
      dispatch(getTrains({ 
        choice: { fromCity, toCity, fromDate, toDate }, 
        filters 
      }));
      navigate("/trains");
    }
  };


  //ФУНКЦИЯ ДЛЯ ОБМЕНА ГОРОДАМИ
  const handleSwapCities = () => {
  //Меняем местами значения в локальном состоянии `city`
    setCity(prev => ({
      from: prev.to,
      to: prev.from
    }));

  // Меняем местами выбранные города в Redux store
    const tempFromCity = fromCity;
    dispatch(choiceCityFrom(toCity));
    dispatch(choiceCityTo(tempFromCity));

  //Очищаем результаты поиска, так как города изменились
    setSearchResultsFrom([]);
    setSearchResultsTo([]);
    setShow({ from: false, to: false }); // Закрываем списки результатов
  };

  return (
    <div className={`search-form search-form--${name}`}>
      <div className="search-form__container">
        <div className="search-form__block search-form__block--route">
          <h2 className="search-form__title search-form__title--route">Направление</h2>
          <div className="search-form__input-container search-form__input-container--route">
            <div className="search-form__route-wrapper">
            <input
              value={city.from}
              id="from"
              type="text"
              placeholder="Откуда"
                className="search-form__input search-form__input--route search-form__input--from"
                onChange={handleInputChange}
                onClick={handleInputClick}
              />
              {show.from && searchResultsFrom.length > 0 && (
                <div className="search-form__city-list search-form__city-list--from">
                  <div className="search-form__city-items">
                    {searchResultsFrom.map((el) => (
                      <p key={el._id} onClick={() => handleCitySelect(el, "from")}>
                        {el.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="search-form__route-icon" onClick={handleSwapCities}></div>
            <div className="search-form__route-wrapper">
            <input
              value={city.to}
              id="to"
              type="text"
              placeholder="Куда"
                className="search-form__input search-form__input--route search-form__input--to"
                onChange={handleInputChange}
                onClick={handleInputClick}
            />
              {show.to && searchResultsTo.length > 0 && (
                <div className="search-form__city-list search-form__city-list--to">
                  <div className="search-form__city-items">
                    {searchResultsTo.map((el) => (
                      <p key={el._id} onClick={() => handleCitySelect(el, "to")}>
                        {el.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="search-form__block search-form__block--date">
          <h2 className="search-form__title search-form__title--date">Дата</h2>
          <div className="search-form__input-container search-form__input-container--date">
            <div className="search-form__date-wrapper">
            <input
              type="date"
              id="there"
              placeholder="ДД/ММ/ГГ"
                className="search-form__input search-form__input--date search-form__input--there"
                onClick={handleCalendarOpen}
                value={dates.there}
                onChange={handleDateChange}
              />
              {calendar.open && calendar.direction === 'there' && (
                <div ref={calendarRef} className="search-form__calendar">
                  <CalendarForm
                    name={name}
                    direction="from"
                  />
                </div>
              )}
            </div>
            <div className="search-form__date-wrapper">
            <input
              type="date"
              id="back"
              placeholder="ДД/ММ/ГГ"
                className="search-form__input search-form__input--date search-form__input--back"
                onClick={handleCalendarOpen}
                value={dates.back}
                onChange={handleDateChange}
            />
              {calendar.open && calendar.direction === 'back' && (
                <div ref={calendarRef} className="search-form__calendar">
                  <CalendarForm
                    name={name}
                    direction="to"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="search-form__block search-form__block--controls">
          <div className="search-form__controls">
            <button 
              className="search-form__button"
              onClick={handleSearchClick}
            >
              Найти билеты
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;