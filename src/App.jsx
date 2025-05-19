import Login from "./Pages/Login";
import Clients from "./Pages/Clients";
import Chambres from "./Pages/Chambres";
import Calendrier from "./Pages/Calendrier";
import Reservation from "./Pages/Reservation";
import Dashbord from "./Pages/Tableau-De-Bord";
import { LiensProvider } from "./utils/context";
import MainLayout from "./Components/Navigation/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NouvelleReservation from "./Pages/Reservation/nouvelleReservation";

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
              <Route
                path="/NouvelleReservation"
                element={<NouvelleReservation />}
              />
            </Route>
          </Routes>
        </LiensProvider>
      </Router>
    </>
  );
}

export default App;
