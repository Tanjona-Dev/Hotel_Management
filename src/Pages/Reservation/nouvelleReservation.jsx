import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { Calendar, Check } from "lucide-react";
import { LiensContext } from "../../utils/context";
import { useContext, useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../utils/Hooks/outSideClick";
import { reservationsPourPageReservation } from "../../Data/reservations_noms";

function createAndPushNewReservation(newReservation) {
  console.log(newReservation);
  // CREATE ID
  const nouvelleID = Math.max(
    0,
    ...reservationsPourPageReservation.map((reserv) => reserv.id + 1)
  );
  // NOUVELLE RESERVATION
  const reservationtoAdd = {
    id: nouvelleID,
    nom: newReservation.nom,
    typeChambre: newReservation.typeChambre,
    nombre: newReservation.nombre,
    date: newReservation.date,
    depart: newReservation.depart,
    arrive: newReservation.arrive,
    status: newReservation.status,
  };
  console.log(reservationtoAdd);

  return reservationtoAdd;
}

// DATEPICKER
function MyDatePicker({ setDateDeReservation, setReservationCalendar }) {
  const [selectedDate, setSelectedDate] = useState();
  useEffect(() => {
    selectedDate &&
      (setDateDeReservation(selectedDate), setReservationCalendar(false));
  }, [selectedDate, setDateDeReservation, setReservationCalendar]);

  // RECUPERER LES CLIQUES EN DEHORS DU CALENDRIER
  const refReservation = useRef(null);
  useEffect(() => {
    const outsideClick = (e) => {
      if (
        refReservation.current &&
        !refReservation.current.contains(e.target)
      ) {
        setReservationCalendar(false);
      }
    };
    document.addEventListener("mousedown", outsideClick);
  }, [setReservationCalendar]);

  return (
    <div ref={refReservation}>
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
function MyDatePickerDepart({ setDateDeDepart, setDepartCalendar }) {
  const [selectedDate, setSelectedDate] = useState();
  useEffect(() => {
    selectedDate && (setDateDeDepart(selectedDate), setDepartCalendar(false));
  }, [selectedDate, setDateDeDepart, setDepartCalendar]);
  const refDepart = useRef(null);
  useClickOutside(refDepart, () => setDepartCalendar(false));
  return (
    <div ref={refDepart}>
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

function MyDatePickerArrive({ setDateArrivee, setArriveeCalendar }) {
  const [selectedDate, setSelectedDate] = useState();
  useEffect(() => {
    selectedDate && (setDateArrivee(selectedDate), setArriveeCalendar(false));
  }, [selectedDate, setDateArrivee, setArriveeCalendar]);

  const refArrive = useRef(null);
  useClickOutside(refArrive, () => setArriveeCalendar(false));
  return (
    <div ref={refArrive}>
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
  const [dateDeReservation, setDateDeReservation] = useState("");
  const [departCalendar, setDepartCalendar] = useState(false);
  const [dateDeDepart, setDateDeDepart] = useState("");
  const [arriveeCalendar, setArriveeCalendar] = useState(false);
  const [dateArrivee, setDateArrivee] = useState("");

  useEffect(() => {
    const reservationDay = dateDeReservation && new Date(dateDeReservation);
    const reservationDateString =
      reservationDay && reservationDay.toISOString().split("T")[0];
    reservationDateString &&
      setNewReservation((prev) => ({ ...prev, date: reservationDateString }));
  }, [dateDeReservation]);

  useEffect(() => {
    const departDay = dateDeDepart && new Date(dateDeDepart);
    const departDateString = departDay && departDay.toISOString().split("T")[0];
    setNewReservation((prev) => ({ ...prev, depart: departDateString }));
  }, [dateDeDepart]);

  useEffect(() => {
    const arriveDay = dateArrivee && new Date(dateArrivee);
    const arrivDateString = arriveDay && arriveDay.toISOString().split("T")[0];
    setNewReservation((prev) => ({ ...prev, arrive: arrivDateString }));
  }, [dateArrivee]);

  function handleSubmit(e) {
    e.preventDefault();
    const resultatFinal = createAndPushNewReservation(newReservation);

    const toastOnSubmit = () => {
      return toast.success(`
        id: ${resultatFinal.id}
        Nom: ${resultatFinal.nom}
        Type de chambre : ${resultatFinal.typeChambre}
        arrive : ${resultatFinal.arrive}
        status : ${resultatFinal.status}
        `);
    };
    toastOnSubmit();
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
  // REDUIRE LES DOUBLOUNS DES STATUS DE PAYEMENT
  const paymentStatus = reservationsPourPageReservation.reduce(
    (acc, reservation) => {
      acc.includes(reservation.status) ? acc : acc.push(reservation.status);
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
                    {
                      <MyDatePicker
                        setDateDeReservation={setDateDeReservation}
                        setReservationCalendar={setReservationCalendar}
                      />
                    }
                  </span>
                )}
              </div>
            </div>
            {/* ARRIVE */}
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
                    {
                      <MyDatePickerArrive
                        setDateArrivee={setDateArrivee}
                        setArriveeCalendar={setArriveeCalendar}
                      />
                    }
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
                    {
                      <MyDatePickerDepart
                        setDateDeDepart={setDateDeDepart}
                        setDepartCalendar={setDepartCalendar}
                      />
                    }
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
                value={newReservation.status || ""}
                onChange={(e) =>
                  setNewReservation((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <option value="">Status</option>
                {paymentStatus.map((status, index) => (
                  <option value={status} key={`${status}-${index}`}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
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
