import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./PassangersPage.css";
import WidgetDetails from "../../components/WidgetDetails/WidgetDetails";
import PassangerCard from "../../components/PassangerCard/PassangerCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banner2.png";

const PassangersPage = () => {
  const { departure, arrival } = useSelector((state) => state.seats.passanger);
  const { passanger } = useSelector((state) => state.passanger);
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/payment");
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
          {departure.adult > 0 && (
            <PassangerCard name="adult" show count={departure.adult} />
          )}
          {departure.child > 0 && (
            <PassangerCard name="child" show count={departure.child} />
          )}
          {arrival.adult > 0 && <PassangerCard name="adult" show />}
          {arrival.child > 0 && <PassangerCard name="child" show />}
          
          <div className="passengers__add">
            <button className="passengers__add-button">
              Добавить пассажира
            </button>
          </div>
          
          <div className="passengers__next">
            <button 
              className={`passengers__next-button ${passanger.length ? 'passengers__next-button--active' : ''}`}
              onClick={handleNextClick}
              disabled={!passanger.length}
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
