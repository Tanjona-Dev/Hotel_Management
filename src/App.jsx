import Login from "./Pages/Login";
import Clients from "./Pages/Clients";
import Chambres from "./Pages/Chambres";
import Dashbord from "./Pages/Tableau-De-Bord";
import { LiensProvider } from "./utils/context";
import MainLayout from "./Components/Navigation/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Calendrier from "./Pages/Calendrier";
import Reservation from "./Pages/Reservation";

function App() {
  return (
    <>
      <Router>
        <LiensProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<MainLayout />}>
              <Route path="/Dashbord" element={<Dashbord />} />
              <Route path="/Clients" element={<Clients />} />
              <Route path="/Chambres" element={<Chambres />} />
              <Route path="/Calendrier" element={<Calendrier />} />
              <Route path="/Reservation" element={<Reservation />} />
            </Route>
          </Routes>
        </LiensProvider>
      </Router>
    </>
  );
}

export default App;
