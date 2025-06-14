import "./HowItWork.css";
import HowItWorkItem from "./HowItWorkItem";
import hiw_1_img from "../../assets/hiw/hiw-1.png";
import hiw_2_img from "../../assets/hiw/hiw-2.png";
import hiw_3_img from "../../assets/hiw/hiw-3.png";

const HowItWork = () => {
  return (
    <section className="how-it-works" id="hiw">
      <div className="how-it-works__container">
        <div className="how-it-works__header">
          <h2 className="how-it-works__title">Как это работает</h2>
          <button className="how-it-works__button">Узнать больше</button>
        </div>
        <div className="how-it-works__content">
          <div className="how-it-works__list">
            <HowItWorkItem
              link={hiw_1_img}
              text={
                <>
                  Удобный заказ <br /> на сайте
                </>
              }
            />
            <HowItWorkItem
              link={hiw_2_img}
              text="Нет необходимости ехать в офис"
            />
            <HowItWorkItem link={hiw_3_img} text="Огромный выбор направлений" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWork;