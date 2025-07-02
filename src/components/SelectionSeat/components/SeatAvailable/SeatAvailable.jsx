import Seat from "./Seat";
import { useDispatch } from "react-redux";
import { addSeat } from "../../../../store/getSeatsSlice";

const SeatAvailable = ({ carriage, type, direction }) => {
  const dispatch = useDispatch();

  const selectedSeats = {
    type: type,
    num: null,
    id: null,
    price: null,
    direction: direction,
  };

  const onClick = (e) => {
    if (!e.target.classList.contains("occupied_seat")) {
      selectedSeats.id = carriage.coach._id;
      selectedSeats.num = e.target.dataset.id;
      selectedSeats.price = e.target.dataset.price;
      if (e.target.dataset.side) {
        selectedSeats.price = e.target.dataset.side;
      }
      dispatch(addSeat(selectedSeats));
      e.target.classList.toggle("seat-wagon_button_selected");
    }
  };

  return (
    <>
      <Seat
        seat={carriage.seats}
        onClick={onClick}
        type={type}
        bottomPrice={carriage.coach.bottom_price}
        topPrice={carriage.coach.top_price}
        sidePrice={carriage.coach.side_price}
      />
    </>
  );
};

export default SeatAvailable;
