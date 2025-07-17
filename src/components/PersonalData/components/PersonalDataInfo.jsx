// components/PersonalData/components/PersonalDataInfo.jsx

import { useEffect, useState } from "react";
import PassangerInput from "../../PassangerCard/components/PassangerInput";
import { useDispatch } from "react-redux";
import { addOrderPassanger } from "../../../store/passangersSlice";

const PersonalDataInfo = ({ el }) => {
  const dispatch = useDispatch();

  // const [inputValue, setInputValue] = useState({
    const [formData, setFormData] = useState({
      id: el?.id, // Важно: ID пассажира для Redux
      firstName: el?.name || "",
      lastName: el?.surname || "",
      patronymic: el?.father || "",
      phone: "",
      email: "",
  });

  useEffect(() => {
      if (el && el.id) { // Убедимся, что el и el.id существуют
        setFormData(prev => ({
          ...prev,
          id: el.id, // Убедиться, что ID всегда обновляется
          firstName: el.name || "",
          lastName: el.surname || "",
          patronymic: el.father || "",
          phone: "",
          email: "",
        }));
            dispatch(addOrderPassanger({
                id: el.id,
                firstName: el.name || "",
                lastName: el.surname || "",
                patronymic: el.father || "",
                phone: "", // Добавляем пустые поля для телефона и email
                email: ""
            }));
      }
  }, [el, dispatch]);

  const handleChange = (e) => {
      const { name, value } = e.target; // Получаем name и value напрямую из события
      const updatedFormData = {
          ...formData,
          [name]: value
      };
      setFormData(updatedFormData);
      // Всегда диспатчим обновленные данные. Валидация будет на PaymentPage.
      dispatch(addOrderPassanger(updatedFormData));
  };

  if (!el) {
    return null;
  }

  return (
    <div className="personal__main">
      <div className="personal__info">
        <PassangerInput
          name={"Фамилия"}
          // id={"surname"}
          id={"lastName"} // Имя для поля в Redux
          ph={"Фамилия"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input personal__input--margin-right"}
          value={formData.lastName}
          onChange={handleChange} // Используем унифицированный handleChange
        />
        <PassangerInput
          name={"Имя"}
          // id={"name"}
          id={"firstName"} // Имя для поля в Redux
          ph={"Имя"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input personal__input--margin-right"}
          value={formData.firstName}
          onChange={handleChange}
        />
        <PassangerInput
          name={"Отчество"}
          id={"patronymic"} // Имя для поля в Redux
          // id={"father"}
          ph={"Отчество"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input"}
          value={formData.patronymic}
          onChange={handleChange}
        />
      </div>
      <div className="personal__phone">
        <PassangerInput
          name={"Контактный телефон"}
          // id={"phone"}
          id={"phone"} // Имя для поля в Redux
          ph={"+7 ___ ___ __ __"}
          type={"text"}
          pClassName={"personal__field"}
          inputClassName={"personal__input--contact"}
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="personal__email">
        <PassangerInput
          name={"Email"}
          id={"email"} // Имя для поля в Redux
          // id={"email"}
          ph={"inbox@gmail.ru"}
          type={"text"}
          labelClassName={"personal__field"}
          pClassName={"personal__field"}
          inputClassName={"personal__input--contact"}
          value={formData.email}
          onChange={handleChange}
        />
        </div>
      </div>
    );
};

export default PersonalDataInfo;