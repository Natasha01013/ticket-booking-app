import { useEffect, useState } from "react";
import PassangerInput from "../../PassangerCard/components/PassangerInput";
import { useDispatch } from "react-redux";
import { addOrderPassanger } from "../../../store/passangersSlice";
import { validatePhoneNumber, validateEmail } from "../../../utils/validators";

const PersonalDataInfo = ({ el }) => {
  const [inputValue, setInputValue] = useState({
    firstName: el?.name || "",
    lastName: el?.surname || "",
    patronymic: el?.father || "",
    phone: "",
    email: "",
    birthday: el?.birthday || "",
    documentType: el?.age === "Взрослый" ? "Паспорт" : "Свидетельство о рождении",
    documentNumber: el?.age === "Взрослый" ? 
      `${el?.series || ""} ${el?.number || ""}`.trim() : 
      el?.birthNumber || ""
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    const { id, value } = e.target;
    const newValue = {
      ...inputValue,
      [id === "surname" ? "lastName" : 
        id === "name" ? "firstName" : 
        id === "father" ? "patronymic" : 
        id === "phone" ? "phone" : 
        id === "email" ? "email" : id]: value
    };
    setInputValue(newValue);
    
    const isPhoneValid = validatePhoneNumber(id === "phone" ? value : inputValue.phone);
    const isEmailValid = validateEmail(id === "email" ? value : inputValue.email);
    
    if (isPhoneValid && isEmailValid) {
      dispatch(addOrderPassanger(newValue));
    }
  };

  useEffect(() => {
    if (el) {
      const initialValue = {
        firstName: el.name || "",
        lastName: el.surname || "",
        patronymic: el.father || "",
        phone: "",
        email: "",
        birthday: el.birthday || "",
        documentType: el.age === "Взрослый" ? "Паспорт" : "Свидетельство о рождении",
        documentNumber: el.age === "Взрослый" ? 
          `${el.series || ""} ${el.number || ""}`.trim() : 
          el.birthNumber || ""
      };
      setInputValue(initialValue);
      dispatch(addOrderPassanger(initialValue));
    }
  }, [el, dispatch]);

  if (!el) {
    return null;
  }

  return (
    <div className="personal__main">
      <div className="personal__info">
        <PassangerInput
          name={"Фамилия"}
          id={"surname"}
          ph={"Фамилия"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input personal__input--margin-right"}
          value={inputValue.lastName}
          onChange={onChange}
        />
        <PassangerInput
          name={"Имя"}
          id={"name"}
          ph={"Имя"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input personal__input--margin-right"}
          value={inputValue.firstName}
          onChange={onChange}
        />
        <PassangerInput
          name={"Отчество"}
          id={"father"}
          ph={"Отчество"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input"}
          value={inputValue.patronymic}
          onChange={onChange}
        />
      </div>
      <div className="personal__phone">
        <PassangerInput
          name={"Контактный телефон"}
          id={"phone"}
          ph={"+7 ___ ___ __ __"}
          type={"text"}
          pClassName={"personal__field"}
          inputClassName={"personal__input--contact"}
          value={inputValue.phone}
          onChange={onChange}
        />
      </div>
      <div className="personal__email">
        <PassangerInput
          name={"Email"}
          id={"email"}
          ph={"inbox@gmail.ru"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input--contact"}
          value={inputValue.email}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PersonalDataInfo;