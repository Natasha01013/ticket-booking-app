import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import SelectionSeat from "../../components/SelectionSeat/SelectionSeat";
import Footer from "../../components/Footer/Footer";
import WidgetFilter from "../../components/WidgetFilter/WidgetFilter";
import "./SelectionSeatPage.css";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banner2.png";

const SelectionSeatPage = () => {
  const navigate = useNavigate();
  const train = JSON.parse(localStorage.getItem("train"));
  
  const handleNextClick = () => {
    navigate("/passangers");
  };

  return (
    <>
      <Header />
      <Banner name={"trains"} link={bannerImg}>
        <SearchForm name={"trains"} />
      </Banner>
      <ProgressBar name={"trains"} step1={"current-step"} />
      <main className="seat-selection">
        <WidgetFilter />
        <section className="seat-selection__content">
          <h3 className="seat-selection__title">Выбор мест</h3>
          <SelectionSeat route={"to"} direction={"departure"} train={train} />
          {train.arrival && (
            <SelectionSeat route={"back"} direction={"arrival"} train={train} />
          )}
          <button className="seat-selection__button" onClick={handleNextClick}>
            Далее
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SelectionSeatPage;
