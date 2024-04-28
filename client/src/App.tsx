import { Route, Routes } from "react-router-dom";
import Contests from "./pages/Contests";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contests" element={<Contests />} />
      </Routes>
    </>
  );
};

export default App;
