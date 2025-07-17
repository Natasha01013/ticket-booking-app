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
import { addPassanger, removePassanger } from "../../store/passangersSlice";

const PassangersPage = () => {
  const { departure, arrival } = useSelector((state) => state.seats.passanger);
  // const { passanger: passengersInStore, isInitialized } = useSelector((state) => state.passengers);
  // const { passanger } = useSelector((state) => state.passanger);
  // Получаем текущий список пассажиров из Redux store
  const passengersInStore = useSelector((state) => state.passangers.passanger); // <--- Используем 'passangers' как имя слайса
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Инициализация карточек пассажиров при загрузке страницы 
    useEffect(() => {
        // Проверяем, если массив пассажиров в Redux пуст,
        // то инициализируем его на основе количества из seatsSlice
        console.log("--- useEffect PassangersPage сработал ---");
        // console.log("Текущее состояние: isInitialized =", isInitialized, ", passengersInStore.length =", passengersInStore.length);
        console.log("Значения из seatsSlice: departure.adult =", departure.adult, ", departure.child =", departure.child, "; arrival.adult =", arrival.adult, ", arrival.child =", arrival.child);

        if (passengersInStore.length === 0) {
            for (let i = 0; i < departure.adult; i++) {
                dispatch(addPassanger({ type: "adult" })); 
            }
            for (let i = 0; i < departure.child; i++) {
                dispatch(addPassanger({ type: "child" })); 
            }
            for (let i = 0; i < arrival.adult; i++) {
                dispatch(addPassanger({ type: "adult", route: "arrival" }));
            }
            for (let i = 0; i < arrival.child; i++) {
                dispatch(addPassanger({ type: "child", route: "arrival" }));
            }
        }
        // Инициализация происходит ТОЛЬКО если еще не инициализировано И массив пуст
        // if (!isInitialized && passengersInStore.length === 0) {
        //     console.log(">>> Инициализация пассажиров на PassangersPage. Загружаю:", departure.adult, "взрослых, ", departure.child, "детей для ОТТУДА; ", arrival.adult, "взрослых, ", arrival.child, "детей для ОБРАТНО");

        //     for (let i = 0; i < departure.adult; i++) {
        //         dispatch(addPassanger({ age: "Взрослый", route: "departure" }));
        //     }
        //     for (let i = 0; i < departure.child; i++) {
        //         dispatch(addPassanger({ age: "Детский", route: "departure" }));
        //     }

        //     for (let i = 0; i < arrival.adult; i++) {
        //         dispatch(addPassanger({ age: "Взрослый", route: "arrival" }));
        //     }
        //     for (let i = 0; i < arrival.child; i++) {
        //         dispatch(addPassanger({ age: "Детский", route: "arrival" }));
        //     }

        //     dispatch(setPassangersInitialized()); // Устанавливаем флаг, что инициализация проведена
        //     console.log(">>> Флаг isInitialized установлен в true.");
        // } else {
        //     console.log("Инициализация не требуется. isInitialized:", isInitialized, "passengersInStore.length:", passengersInStore.length);
        // }
    }, [dispatch, departure.adult, departure.child, arrival.adult, arrival.child, passengersInStore.length]); // Зависимости для useEffect

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
                  // Здесь также нужно передавать данные пассажира в карточку
                  // и функцию для их обновления, если PassangerCard является управляемым компонентом
                  // passengerData={passenger}
                  // onUpdatePassenger={(updatedData) => dispatch(updatePassanger(updatedData))}
              />
          ))} 
          
            {/* {departure.adult > 0 && (
            <PassangerCard name="adult" show count={departure.adult} />
          )}
          {departure.child > 0 && (
            <PassangerCard name="child" show count={departure.child} />
          )}
          {arrival.adult > 0 && <PassangerCard name="adult" show />}
          {arrival.child > 0 && <PassangerCard name="child" show />}  */}
          
          <div className="passengers__add">
            <button className="passengers__add-button" onClick={handleAddPassengerClick}>
              Добавить пассажира
            </button>
          </div>
          
          <div className="passengers__next">
            <button 
              // className={`passengers__next-button ${passanger.length ? 'passengers__next-button--active' : ''}`}
              // onClick={handleNextClick}
              // disabled={!passanger.length}
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
