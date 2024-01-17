import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Games } from "./components/Games/Games";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Games" element={<Games />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
