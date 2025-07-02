import "./CalendarForm.css";
import Calendar from "react-calendar";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { choiceDateFrom, choiceDateTo } from "../../store/choiceSlice";
import { format, addMonths, parse } from "date-fns";
import { ru } from "date-fns/locale";

const CalendarForm = ({ name, direction }) => {
  const dispatch = useDispatch();
  const { fromDate, toDate } = useSelector((state) => state.choice);
  
  const initialDate = useMemo(() => {
    if (direction === "from" && fromDate) {
      return parse(fromDate, "yyyy-MM-dd", new Date());
    }
    if (direction === "to" && toDate) {
      return parse(toDate, "yyyy-MM-dd", new Date());
    }
    return new Date();
  }, [direction, fromDate, toDate]);

  const [value, setValue] = useState(initialDate);
  const minDate = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => addMonths(new Date(), 12), []);

  useEffect(() => {
    if (direction === "from" && fromDate) {
      setValue(parse(fromDate, "yyyy-MM-dd", new Date()));
    }
    if (direction === "to" && toDate) {
      setValue(parse(toDate, "yyyy-MM-dd", new Date()));
    }
  }, [direction, fromDate, toDate]);

  const handleDateChange = useCallback((newDate) => {
    setValue(newDate);
    const formattedDate = format(newDate, "yyyy-MM-dd");
    
    if (direction === "from") {
      dispatch(choiceDateFrom(formattedDate));
    } else if (direction === "to") {
      dispatch(choiceDateTo(formattedDate));
    }
  }, [dispatch, direction]);

  return (
    <div className={`calendar-form calendar-form--${name} calendar-form--${direction}`}>
    <Calendar
        className="calendar-form__calendar"
        onChange={handleDateChange}
      value={value}
        minDate={minDate}
        maxDate={maxDate}
        locale={ru}
      nextLabel="&#9658;"
      next2Label=""
      prevLabel="&#9668;"
      prev2Label=""
        formatMonthYear={(locale, date) => format(date, 'LLLL', { locale: ru })}
        formatShortWeekday={(locale, date) => format(date, 'EEEEEE', { locale: ru })}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            return isWeekend ? 'calendar-form__calendar--weekend' : '';
          }
          return '';
        }}
    />
    </div>
  );
};

export default CalendarForm;