import { Calendar, Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { LiensContext } from "../../utils/context";
import { reservationsPourPageReservation } from "../../Data/reservations_noms";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // CSS obligatoire
import { format } from "date-fns";

function createAndPushNewReservation(newReservation) {
  console.log(newReservation);
  // CREATE ID
  const nouvelleID = Math.max(
    0,
    ...(reservationsPourPageReservation.map((reserv) => reserv.id) + 1)
  );
  // NOUVELLE RESERVATION
  const reservationtoAdd = {
    id: nouvelleID,
    typeChambre: newReservation.typeChambre,
    nombre: newReservation.nombre,
  };
  console.log(reservationtoAdd);
  return reservationtoAdd;
}

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState();

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      {selectedDate && (
        <p>Date sélectionnée : {format(selectedDate, "dd/MM/yyyy")}</p>
      )}
    </div>
  );
}

// **PRICINPAL FUNCTION**
export default function NouvelleReservation() {
  const [newReservation, setNewReservation] = useState({});
  const [reservationCalendar, setReservationCalendar] = useState(false);
  const [departCalendar, setDepartCalendar] = useState(false);
  const [arriveeCalendar, setArriveeCalendar] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    createAndPushNewReservation(newReservation);
  }

  const { setLiens } = useContext(LiensContext);
  useEffect(() => {
    setLiens("Reservation");
  }, [setLiens]);

  // REDUIRE LES DOUBLON DES TYPES DE CHAMBRE
  const typeDeChambre = reservationsPourPageReservation.reduce(
    (acc, reservation) => {
      acc.includes(reservation.typeChambre)
        ? acc
        : acc.push(reservation.typeChambre);
      return acc;
    },
    []
  );
  // REDUIRE LES DOUBLOUNS DES NOMS DES CLIENTS
  const nomsDesClients = reservationsPourPageReservation.reduce(
    (acc, reservation) => {
      acc.includes(reservation.nom) ? acc : acc.push(reservation.nom);
      return acc;
    },
    []
  );

  return (
    <div className="bg-white shadow rounded-lg  overflow-hidden m-5 p-2">
      <h1 className="text-3xl font-semibold p-5">Nouvelle reservation</h1>
      <div>
        {/* ********************************************************************FORMULAIRE********************************************** */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          action=""
          className="flex justify-center items-center my-10"
        >
          <div className="flex flex-col gap-12">
            <div className="flex gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="chambre" className="font-bold">
                  Chambre
                </label>
                <select
                  name=""
                  id="chambre"
                  className="w-150 border h-10 rounded shadow"
                  //----------------------------------------------------------------------RECUPRER LES TYPES DE CHAMBRES
                  value={newReservation.typeChambre || ""}
                  onChange={(e) =>
                    setNewReservation((prev) => ({
                      ...prev,
                      typeChambre: e.target.value,
                    }))
                  }
                >
                  {/* MAPER LES TYPES DE CHAMBRE */}
                  <option value="">Choisir une chambre</option>
                  {/* -------------------------------------------------------------------MAPER LES TYPES DE CHAMBRE DANS LE DATA DANS L'OPTION DU SELECT */}
                  {typeDeChambre.map((type, index) => (
                    <option key={index} value={`${type}`}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="nombre" className="font-bold">
                  Nombre de jours / nuits
                </label>
                <input
                  type="number"
                  placeholder="3"
                  // --------------------------------------------------------------RECUPRER LES VALEURS DE NOMBRE DE JOURS
                  value={newReservation.nombre || ""}
                  onChange={(e) =>
                    setNewReservation((prev) => ({
                      ...prev,
                      nombre: e.target.value,
                    }))
                  }
                  className="w-150 border  h-10 rounded shadow"
                  id="nombre"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="client" className="font-bold">
                  Client
                </label>
                {/* SELECT GET NAME CIENT */}
                <select
                  name=""
                  id="client"
                  className="w-150 border  h-10 rounded shadow"
                  value={newReservation.nom || ""}
                  onChange={(e) =>
                    setNewReservation((prev) => ({
                      ...prev,
                      nom: e.target.value,
                    }))
                  }
                >
                  {/* --------------------------------------------------------RECUPRER LES NOMS DES CLIENTS DANS DATA----------------------------------------------------- */}
                  <option value="">Choisir un client</option>
                  {nomsDesClients.map((nom, index) => (
                    <option value={`${nom}`} key={index}>
                      {nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 relative">
                <label htmlFor="reservation" className="font-bold">
                  Date de reservation
                </label>
                <input
                  type="text"
                  className="w-150 border  h-10 rounded shadow"
                  placeholder="jj/mm/aaaa"
                  id="reservation"
                />
                <span
                  onClick={() => setReservationCalendar(!reservationCalendar)}
                  className="relative left-[95%] bottom-[35%]  cursor-pointer opacity-70"
                >
                  <Calendar size={20} />
                </span>
                {reservationCalendar && (
                  <span className="absolute bg-green-100 left-73 top-17 rounded-lg z-10">
                    {<MyDatePicker />}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 relative">
                <label htmlFor="arrivee" className="font-bold">
                  Date d'arrivee
                </label>
                <input
                  type="text"
                  className="w-150 border  h-10 rounded shadow"
                  placeholder="jj/mm/aaaa"
                  id="arrivee"
                />
                <span
                  onClick={() => setArriveeCalendar(!arriveeCalendar)}
                  className="relative left-[95%] bottom-[35%]  cursor-pointer opacity-70"
                >
                  <Calendar size={20} />
                </span>
                {arriveeCalendar && (
                  <span className="absolute bg-green-100 left-73 top-17 rounded-lg z-10">
                    {<MyDatePicker />}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="depart" className="font-bold">
                  Date de depart
                </label>
                <input
                  type="text"
                  placeholder="jj/mm/aaaa"
                  className="relative w-150 border  h-10 rounded shadow"
                  id="depart"
                />
                <span
                  onClick={() => setDepartCalendar(!departCalendar)}
                  className="relative left-[95%] bottom-[35%] cursor-pointer opacity-70"
                >
                  <Calendar size={20} />
                </span>
                {departCalendar && (
                  <span className="absolute bg-green-100 top-141 left-351 rounded-lg">
                    {<MyDatePicker />}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="font-bold">
                Status
              </label>
              <select
                name=""
                id="status"
                className="w-305 border rounded shadow  h-10"
              >
                <option value="">En cours</option>
              </select>
            </div>
            <div>
              <button
                onClick={() => console.log("yes")}
                type="submit"
                className="flex justify-center gap-3 shadow-lg shadow-green-100 bg-green-700 w-305 p-1 rounded hover:bg-green-600 text-white "
              >
                {<Check />} <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
