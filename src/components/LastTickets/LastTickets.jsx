import { useEffect } from "react";
import "./LastTickets.css";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../../store/getLastRoutes";
import Ticket from "./Ticket";

const LastTickets = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.lastRoutes);
  
  useEffect(() => {
    dispatch(getRoutes());
  }, [dispatch]);

  return (
    <div className="last-tickets">
      {items.map((el) => (
        <Ticket ticket={el} key={el.departure._id} />
      ))}
    </div>
  );
};

export default LastTickets;