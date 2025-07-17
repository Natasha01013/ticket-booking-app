// pages/PassangersPage/PassangersPage.jsx

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
import { addPassanger, removePassanger } from "../../store/passangersSlice";

const PassangersPage = () => {
  const passengersInStore = useSelector((state) => state.passangers.passanger); // <--- Используем 'passangers' как имя слайса

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNextClick = () => {
    navigate("/payment");
  };

    //Обработчик удаления пассажира 
    const handleDeletePassenger = (id) => {
        dispatch(removePassanger(id));
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