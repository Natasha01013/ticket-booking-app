import { nanoid } from "@reduxjs/toolkit";
import { getSeatsArr, getClassName } from "../../../../utils/selectionWagon";
import ButtonSeat from "./ButtonSeat";

const Seat = ({ seat, onClick, type, bottomPrice, topPrice, sidePrice }) => {
  const seats = getSeatsArr(type);
  return (
    <div className={`wagon_item wagon-${type}_class`}>
      <div className="seat-template-block">
        <p className="template-text">19 человек выбирают места в этом поезде</p>
      </div>
      <div className={`seat-wagon_wrap wagon-${type}_class_wrap`}>
        {type === "first" && (
          <div className={`seat-wagon-wagon-${type}_class_sector`}>
            <div className={`seat-wagon-wagon-${type}_class_sector-row`}>
              {seats.map((item) => {
                return (
                  <ButtonSeat
                    item={item}
                    getClassName={getClassName}
                    onClick={onClick}
                    seat={seat}
                    id={nanoid()}
                    divClassName={`seat-wagon_buttons-block_box ${type}_class-buttons-block_box`}
                    buttonClassName={`seat-wagon_button_box wagon-${type}_class_seat-btn `}
                    topPrice={topPrice}
                    bottomPrice={bottomPrice}
                  />
                );
              })}
            </div>
          </div>
        )}
        {type === "second" && (
          <div className={`seat-wagon-wagon-${type}_class_sector`}>
            <div className={`seat-wagon-wagon-${type}_class_sector-row`}>
              {seats.map((item) => {
                return (
                  <ButtonSeat
                    item={item}
                    getClassName={getClassName}
                    onClick={onClick}
                    seat={seat}
                    id={nanoid()}
                    divClassName={`seat-wagon_buttons-block_box ${type}_class-buttons-block_box`}
                    buttonClassName={`seat-wagon_button_box wagon-${type}_class_seat-btn `}
                    topPrice={topPrice}
                    bottomPrice={bottomPrice}
                  />
                );
              })}
            </div>
          </div>
        )}
        {type === "third" && (
          <>
            <div className={`seat-wagon-wagon-${type}_class_sector`}>
              {seats[0].map((item) => {
                return (
                  <ButtonSeat
                    item={item}
                    getClassName={getClassName}
                    onClick={onClick}
                    seat={seat}
                    type={type}
                    id={nanoid()}
                    divClassName={"seat-wagon_buttons-block_box"}
                    buttonClassName={"seat-wagon_button_box "}
                    bottomPrice={bottomPrice}
                    topPrice={topPrice}
                  />
                );
              })}
            </div>
            <div className={`seat-wagon-${type}_class_sector side-sector`}>
              {seats[1].map((item) => {
                return (
                  <ButtonSeat
                    item={item}
                    getClassName={getClassName}
                    onClick={onClick}
                    seat={seat}
                    id={nanoid()}
                    divClassName={"seat-wagon_buttons-block_side-box"}
                    buttonClassName={"seat-wagon_button_box side-button_box "}
                    sidePrice={sidePrice}
                  />
                );
              })}
            </div>
          </>
        )}
        {type === "fourth" && (
          <>
            <div className={`seat-wagon-wagon-${type}_class_sector`}>
              <div className={`seat-wagon-wagon-${type}_class_sector-row`}>
                {seats[0].evenArr.map((item) => {
                  return (
                    <ButtonSeat
                      item={item}
                      getClassName={getClassName}
                      onClick={onClick}
                      seat={seat}
                      type={type}
                      id={nanoid()}
                      buttonClassName={`seat-wagon_button_box wagon-${type}_class_seat-btn `}
                      topPrice={topPrice}
                    />
                  );
                })}
              </div>
              <div className={`seat-wagon-wagon-${type}_class_sector-row`}>
                {seats[0].oddArr.map((item) => {
                  return (
                    <ButtonSeat
                      item={item}
                      getClassName={getClassName}
                      onClick={onClick}
                      seat={seat}
                      type={type}
                      id={nanoid()}
                      buttonClassName={`seat-wagon_button_box wagon-${type}_class_seat-btn `}
                      bottomPrice={bottomPrice}
                    />
                  );
                })}
              </div>
            </div>
            <div className={`seat-wagon-wagon-${type}_class_sector`}>
              <div
                className={`seat-wagon-wagon-${type}_class_sector-row  short-row`}
              >
                {seats[1].evenArr.map((item) => {
                  return (
                    <ButtonSeat
                      item={item}
                      getClassName={getClassName}
                      onClick={onClick}
                      seat={seat}
                      type={type}
                      id={nanoid()}
                      buttonClassName={`seat-wagon_button_box wagon-${type}_class_seat-btn `}
                      bottomPrice={bottomPrice}
                    />
                  );
                })}
              </div>
              <div className={`seat-wagon-wagon-${type}_class_sector-row`}>
                {seats[1].oddArr.map((item) => {
                  return (
                    <ButtonSeat
                      item={item}
                      getClassName={getClassName}
                      onClick={onClick}
                      seat={seat}
                      type={type}
                      id={nanoid()}
                      buttonClassName={`seat-wagon_button_box wagon-${type}_class_seat-btn `}
                      topPrice={topPrice}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Seat;
