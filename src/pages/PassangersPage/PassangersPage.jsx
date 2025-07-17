// pages/PassangersPage/PassangersPage.jsx
// Страница ввода данных пассажиров

import { useEffect } from 'react'; 
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./PassangersPage.css";
import WidgetDetails from "../../components/WidgetDetails/WidgetDetails";
import PassangerCard from "../../components/PassangerCard/PassangerCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banner2.png";
import { addPassanger, removePassanger, setPassangersInitialized } from "../../store/passangersSlice";

const PassangersPage = () => {
  const passengersInStore = useSelector((state) => state.passangers.passanger); // <--- Используем 'passangers' как имя слайса
  const isInitialized = useSelector((state) => state.passangers.isInitialized); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Инициализация карточки пассажира при загрузке страницы
  // Добавляем только одну карточку, если store пуст И страница еще не была инициализирована
    useEffect(() => {
        if (passengersInStore.length === 0 && !isInitialized) {
            dispatch(addPassanger({ type: "adult" })); // Добавляем одну карточку взрослого
            dispatch(setPassangersInitialized()); // Устанавливаем флаг, что инициализация произошла
        }
    }, [dispatch, isInitialized, passengersInStore.length]); // Зависимости для useEffect

  const handleNextClick = () => {
        if (passengersInStore.length > 0) {
            navigate("/payment");
        } else {
            alert("Пожалуйста, добавьте хотя бы одного пассажира.");
        }
  };

    //Обработчик удаления пассажира 
    const handleDeletePassenger = (id) => {
        if (passengersInStore.length > 1) { // Не позволяем удалить последнюю карточку
            dispatch(removePassanger(id));
        } else {
            alert("Нельзя удалить последнего пассажира.");
        }
    };

    //Обработчик добавления нового пассажира 
    const handleAddPassengerClick = () => {
        // Добавляем нового пассажира (по умолчанию взрослый)
        dispatch(addPassanger({ type: "adult" }));
    };

  return (
    <div className="passengers">
      <Header />
      <Banner name="pass" link={bannerImg}>
        <SearchForm name="trains" />
      </Banner>
      <ProgressBar
        name="trains"
        step1="current-step"
        step2="current-step"
      />
      <main className="passengers__main">
        <WidgetDetails />
        <section className="passengers__section">
          {/* Рендерим карточки на основе массива из Redux store */}
          {passengersInStore.map((passenger, index) => (
              <PassangerCard
                  key={passenger.id} // уникальный ключ для каждого элемента списка
                  count={index + 1} // Номер пассажира для отображения
                  show={true} // Каждая карточка из store должна быть показана
                  passengerData={passenger}
                  // Передаем функцию, которая диспатчит удаление по ID пассажира
                  onClose={() => handleDeletePassenger(passenger.id)} 
              />
          ))}         
          <div className="passengers__add">
            <button className="passengers__add-button" onClick={handleAddPassengerClick}>
              Добавить пассажира
            </button>
          </div>
          
          <div className="passengers__next">
            <button 
            className={`passengers__next-button ${passengersInStore.length ? 'passengers__next-button--active' : ''}`}
            onClick={handleNextClick}
            disabled={!passengersInStore.length}
            >
              Далее
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PassangersPage;