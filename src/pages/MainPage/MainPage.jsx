import Header from "../../components/Header/Header.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import SearchForm from "../../components/SearchForm/SearchForm.jsx";
import About from "../../components/About/About.jsx";
import HowItWork from "../../components/HowItWork/HowItWork.jsx";
import Feedback from "../../components/Feedback/Feedback.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import bannerImg from "../../assets/banner.png";

import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <Header />
      <Banner name="home" link={bannerImg}>
        <SearchForm name="main-page" />
      </Banner>
      <main className="main-page__content">
        <About />
        <HowItWork />
        <Feedback />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;