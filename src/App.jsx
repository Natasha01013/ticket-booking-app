import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import MainPage from "./pages/MainPage/MainPage";


function App() {
  return (
    <BrowserRouter basename="/ticket-booking-app">
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;