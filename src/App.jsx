import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import PassangersPage from "./pages/PassangersPage/PassangersPage";
import MainPage from "./pages/MainPage/MainPage";
import SelectionTrainPage from "./pages/SelectionTrainPage/SelectionTrainPage";
import SelectionSeatPage from "./pages/SelectionSeatPage/SelectionSeatPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ValidatePage from "./pages/ValidatePage/ValidatePage";
import SuccessOrderPage from "./pages/SuccessOrderPage/SuccessOrderPage";


function App() {
  return (
    <BrowserRouter basename="/ticket-booking-app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/trains" element={<SelectionTrainPage />} />
        <Route path="/seat" element={<SelectionSeatPage />} />
        <Route path="/passangers" element={<PassangersPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/validate" element={<ValidatePage />} />
        <Route path="/success" element={<SuccessOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;