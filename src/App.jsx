import Login from "./Pages/Login";
import Clients from "./Pages/Clients";
import Factures from "./Pages/Factures";
import Chambres from "./Pages/Chambres";
import Calendrier from "./Pages/Calendrier";
import Reservation from "./Pages/Reservation";
import Dashbord from "./Pages/Tableau-De-Bord";
import "react-toastify/dist/ReactToastify.css";
import { LiensProvider } from "./utils/context";
import { ToastContainer } from "react-toastify";
import DetailsReservation from "./Pages/DetailsReservation";
import MainLayout from "./Components/Navigation/MainLayout";
import NouvelleFacture from "./Pages/Factures/nouvelleFacture";
import { DetailsClientsProfileProvider } from "./utils/context";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ReservationFacture from "./Pages/Reservation/reservationFacture";
import NouvelleReservation from "./Pages/Reservation/nouvelleReservation";

function App() {
  return (
    <>
      <Router>
        <LiensProvider>
          <DetailsClientsProfileProvider>
            <ToastContainer position="top-center" />
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
                <Route
                  path="/detail-reservation/:id"
                  element={<DetailsReservation />}
                />
                <Route
                  path="/facture-reservation"
                  element={<ReservationFacture />}
                />
                <Route path="/Factures" element={<Factures />} />
                <Route path="/nouvelle-facture" element={<NouvelleFacture />} />
              </Route>
            </Routes>
          </DetailsClientsProfileProvider>
        </LiensProvider>
      </Router>
    </>
  );
}

export default App;
