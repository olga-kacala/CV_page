import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Games } from "./components/Games/Games";
import { Footer } from "./components/Footer/Footer";
import { Memory } from "./components/Memory/Memory";
// import {Snake} from "./components/Snake/Snake";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Games" element={<Games />} />
        <Route path="/Memory" element={<Memory/>}/>
{/* <Route path="/Snake" element={<Snake/>}/>  */}
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
