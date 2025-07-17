// components/PassangerCard/PassangerCard.jsx

import { useEffect, useState } from "react";
import Select from "react-select";
import Header from "./components/Header";
import PassangerInput from "./components/PassangerInput";
import "./PassangerCard.css";
import PassangerDocs from "./components/PassangerDocs";
import {
  validateBirthNumber,
  validatePassportNumber,
  validatePassportSeries,
} from "../../utils/validators";
import { useDispatch } from "react-redux";
import { addPassanger } from "../../store/passangersSlice";
import Error from "./components/Error";

const PassangerCard = ({ show, count, onClose, passengerData }) => {
  const options = [
    { value: "Взрослый", label: "Взрослый" },
    { value: "Детский", label: "Детский" },
  ];
  
    // ИНИЦИАЛИЗИРУЕМ ЛОКАЛЬНОЕ СОСТОЯНИЕ ИЗ passengerData
  // Если passengerData есть, используем его, иначе - дефолты.
  const [passanger, setPassanger] = useState({
    id: passengerData?.id || Date.now() + Math.random(), // Генерируем ID здесь, если его нет (для первой пустой карточки)
    age: "Взрослый",
    name: "",
    surname: "",
    father: "",
    gender: "",
    check: false,
    series: "",
    number: "",
    birthNumber: "",
    birthday: "",
  });
  
  const [validate, setValidate] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

    // Добавляем useEffect для синхронизации локального состояния с Redux
  // Это будет диспатчить обновленные данные пассажира в store/passangersSlice.js -> addPassanger
  useEffect(() => {
    // Диспатчим данные, но только если ID существует, чтобы избежать ошибок
    if (passanger.id) {
      dispatch(addPassanger(passanger));
    }
  }, [passanger, dispatch]); // Срабатывает при каждом изменении локального состояния 'passanger'

  const onChangeAge = (e) => {
    setPassanger((prevState) => ({
      ...prevState,
      age: e.value,
    }));
  };

  const onClickGender = (e) => {
    setPassanger((prevState) => ({
      ...prevState,
      gender: e.target.id === "male" ? "male" : "female",
    }));
  };

  const onClickCheckbox = (e) => {
    setPassanger((prevState) => ({
      ...prevState,
      check: e.target.checked,
    }));
  };

  const onChangeInput = (e) => {
    const { value, id } = e.target;
    let newValue = value;

    // Фильтрация только для серии и номера паспорта
    if (id === 'series' || id === 'number') {
      newValue = value.replace(/\D/g, ''); // Удаляем все, кроме цифр
    }

    setPassanger((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const validateName = (name) => {
    return name.length >= 2 && /^[А-ЯЁа-яё]+$/.test(name);
  };

  const validateBirthday = (date) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(date)) return false;
    
    const [day, month, year] = date.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const now = new Date();
    
    return birthDate < now && birthDate.getFullYear() > 1900;
  };

  const checkEmptyFields = (passanger) => {
    const requiredFields = ['name', 'surname', 'father', 'gender', 'birthday'];
    return requiredFields.every(field => passanger[field] && passanger[field].trim() !== '');
  };

  const validateFields = () => {
    setError(""); // Сбрасываем ошибку перед новой валидацией
    if (!checkEmptyFields(passanger)) {
      setError("Заполните все обязательные поля");
      return false;
    }

    if (!validateName(passanger.name) || !validateName(passanger.surname) || !validateName(passanger.father)) {
      setError("ФИО должны содержать только русские буквы");
      return false;
    }

    if (!validateBirthday(passanger.birthday)) {
      setError("Неверный формат даты рождения (ДД/ММ/ГГГГ)");
      return false;
    }

    if (passanger.age === "Взрослый") {
      if (!validatePassportSeries(passanger.series)) {
        setError("Серия паспорта должна содержать 4 цифры");
        return false;
      }
      if (!validatePassportNumber(passanger.number)) {
        setError("Номер паспорта должен содержать 6 цифр");
        return false;
      }
    } else {
      if (!validateBirthNumber(passanger.birthNumber)) {
        setError("Неверный формат свидетельства о рождении (например, I-АБ 123456)");
        return false;
      }
    }

    return true;
  };

  const onClickButton = () => {
    if (validateFields()) {
      setValidate(false);
      setError("Готово");
      // dispatch(addPassanger(passanger));
    } else {
      setValidate(true);
    }
  };

  return (
    <div className="passenger">
      <Header count={count} onClickDelete={onClose} />
      {show && (
        <div className="passenger__content">
          <div className="passenger__main">
            <div className="passenger__age-select">
              <Select
                className="passenger__age-control"
                options={options}
                // defaultValue={options[0]}
                defaultValue={options.find(option => option.value === passanger.age)} 
                isSearchable={false}
                onChange={onChangeAge}
              />
            </div>
            <div className="passenger__names">
              <PassangerInput
                id="surname"
                name="Фамилия"
                onChange={onChangeInput}
                value={passanger.surname}
                type="text"
                labelClassName="passenger__input-wrapper"
                titleClassName="passenger__input-label"
                inputClassName="passenger__input"
              />
              <PassangerInput
                id="name"
                name="Имя"
                onChange={onChangeInput}
                value={passanger.name}
                type="text"
                labelClassName="passenger__input-wrapper"
                titleClassName="passenger__input-label"
                inputClassName="passenger__input"
              />
              <PassangerInput
                id="father"
                name="Отчество"
                onChange={onChangeInput}
                value={passanger.father}
                type="text"
                labelClassName="passenger__input-wrapper"
                titleClassName="passenger__input-label"
                inputClassName="passenger__input passenger__input--last"
              />
            </div>
            <div className="passenger__birth">
              <div className="passenger__gender">
                <p className="passenger__input-label">Пол</p>
                <div className="passenger__gender-select">
                  <button
                    className={`passenger__gender-button passenger__gender-button--left ${
                      passanger.gender === "male" ? "passenger__gender-button--active" : ""
                    }`}
                    id="male"
                    onClick={onClickGender}
                  >
                    м
                  </button>
                  <button
                    className={`passenger__gender-button ${
                      passanger.gender === "female" ? "passenger__gender-button--active" : ""
                    }`}
                    id="female"
                    onClick={onClickGender}
                  >
                    ж
                  </button>
                </div>
              </div>
              <div className="passenger__birth-date">
                <PassangerInput
                  id="birthday"
                  name="Дата рождения"
                  ph="ДД/ММ/ГГГГ"
                  onChange={onChangeInput}
                  value={passanger.birthday}
                  type="text"
                  labelClassName="passenger__input-wrapper"
                  titleClassName="passenger__input-label"
                  inputClassName="passenger__birth-input"
                />
              </div>
            </div>
          </div>
          <div className="passenger__mobility">
            <input
              type="checkbox"
              className="passenger__checkbox"
              id="mobility"
              onChange={onClickCheckbox}
              checked={passanger.check}
            />
            <label htmlFor="mobility" className="passenger__checkbox-text">
              ограниченная подвижность
            </label>
          </div>
          {passanger.age === "Взрослый" && (
            <PassangerDocs 
              type="adult" 
              onChangeInput={onChangeInput}
              series={passanger.series}
              number={passanger.number}
            />
          )}
          {passanger.age === "Детский" && (
            <PassangerDocs 
              type="child" 
              onChangeInput={onChangeInput}
              birthNumber={passanger.birthNumber}
            />
          )}
          {validate !== null && (
            <Error text={error} success={!validate} />
          )}
          <div className="passenger__footer">
            <button className="passenger__submit" onClick={onClickButton}>
              Следующий пассажир
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassangerCard;