import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import { reservation } from "../../Data/reservation";

const Calendar = ({ setSelectedDay, setSelectMonth, setSelecteYear }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = d.toString();
    days.push(
      <div
        key={d}
        onClick={() => {
          setSelectedDay(dayStr);
          setSelectMonth(currentDate.month() + 1);
          setSelecteYear(currentDate.year());
        }}
        className="p-2 rounded-lg text-center cursor-pointer hover:bg-blue-100"
      >
        {d}
      </div>
    );
  }

  return (
    <div className="w-100 mx-auto h-90 p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-orange-500 hover:underline">
          ← Mois précédent
        </button>
        <h2 className="text-xl font-bold">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={nextMonth} className="text-orange-500 hover:underline">
          Mois suivant →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center bg-white font-medium">
        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((d) => (
          <div key={d} className="text-orange-400">
            {d}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

const Jauge = ({
  filteredReservations,
  selectedDay,
  selectMonth,
  selectYear,
}) => {
  // FORMULE DES STATS HORIZONTALE
  const totaleChambreHotel = 95;
  const depenseMensuelle = 800000;
  const depenseJournalier = depenseMensuelle / 30;
  const chambreLibre = selectedDay
    ? totaleChambreHotel - filteredReservations.length
    : totaleChambreHotel - reservation.length;
  const tauxDeRemplissage = selectedDay
    ? (filteredReservations.length * totaleChambreHotel) / 100
    : (reservation.length * 100) / 100;

  const benefice = selectedDay
    ? filteredReservations.length * 15000
    : reservation.length * 15000;
  const beneficeNet = selectedDay
    ? Math.floor(benefice > 0 ? benefice - depenseJournalier : 0)
    : Math.floor(benefice - depenseMensuelle);

  return (
    <div className="flex gap-2 mt-5">
      <div className="flex flex-col gap-4">
        <div className="p-5 bg-green-900 rounded-lg w-90">
          <div className="flex justify-between">
            <h1>
              {selectedDay ? (
                <div>
                  {` Ch.dispo le ${selectedDay}/${selectMonth}/${selectYear}`}
                </div>
              ) : (
                <div>{"Ch.dispo"}</div>
              )}
            </h1>
            {selectedDay && <h1>{chambreLibre}</h1>}
          </div>
          <div className="w-50 bg-gray-400 rounded-lg">
            {/* JAUGE */}
            <div
              style={{
                borderRadius: "15px",
                width: `
                ${chambreLibre}%
              `,
                backgroundColor: "white",
                height: 12,
              }}
            />
          </div>
        </div>
        <div>
          <div className="p-5 bg-green-900 rounded-lg w-90">
            <div className="flex justify-between">
              <h1>
                {selectedDay ? (
                  <div>
                    {` Ch.reservees le ${selectedDay}/${selectMonth}/${selectYear}`}
                  </div>
                ) : (
                  <div>{"Pourcentage de reservation"}</div>
                )}
              </h1>
              {selectedDay && <h1>{tauxDeRemplissage}%</h1>}
            </div>
            <div className="w-50 bg-gray-400 rounded-lg">
              <div
                style={{
                  borderRadius: "15px",
                  width: `${tauxDeRemplissage}%`,
                  backgroundColor: "white",
                  height: 12,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="p-5 bg-green-900 rounded-lg w-90">
          <div className="flex justify-between">
            <h1>
              {selectedDay ? (
                <div>
                  {` Ch.reservees le ${selectedDay}/${selectMonth}/${selectYear}`}
                </div>
              ) : (
                <div>{"Pourcentage de reservation"}</div>
              )}
            </h1>
            {selectedDay && <h1>{filteredReservations.length}</h1>}
          </div>
          <div className="w-50 bg-gray-400 rounded-lg">
            <div
              style={{
                borderRadius: "15px",
                width: `${
                  selectedDay
                    ? String(filteredReservations.length * 2) + "%"
                    : "200px"
                }`,
                backgroundColor: "white",
                height: 12,
              }}
            />
          </div>
        </div>
        <div className="p-5 bg-green-900 rounded-lg w-90">
          <div className="flex justify-between">
            <h1>
              {selectedDay ? (
                <div>
                  {` Ch.reservees le ${selectedDay}/${selectMonth}/${selectYear}`}
                </div>
              ) : (
                <div>{"Pourcentage de reservation"}</div>
              )}
            </h1>
            {selectedDay && <h1>{beneficeNet} Ar</h1>}
          </div>
          <div className="w-50 bg-gray-400 rounded-lg">
            <div
              style={{
                borderRadius: "15px",
                width: `${beneficeNet / 800}px`,
                backgroundColor: "white",
                height: 12,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// FONCTION PRINCIPALE
function Calendrier() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelecteYear] = useState("");

  // FILTRE LES Reservation
  const dateRecherche = `${selectYear}-0${selectMonth}-${selectedDay}`;
  const filteredReservations = selectedDay
    ? reservation.filter((res) => res.sejour.includes(dateRecherche))
    : reservation.filter((_, index) => index > reservation.length - 5);

  const joursDuSejours = filteredReservations.map((client) => {
    return {
      jours: client.sejour.map((dateStr) => new Date(dateStr).getDate()),
    };
  });
  console.log(joursDuSejours);

  return (
    <div className="flex">
      <div className="bg-white w-[50%] m-5 rounded-xl shadow-lg">
        <Calendar
          setSelectedDay={setSelectedDay}
          setSelectMonth={setSelectMonth}
          setSelecteYear={setSelecteYear}
        />
        <LigneHorizontale />
        <div>
          <h2 className="mt-4 mb-2 text-center">
            Réservations pour le {selectedDay || "mois"}
          </h2>
          <table>
            {/* ------------------------------------------------MAP EN BAS------------ */}
            <tbody>
              {filteredReservations.map((reserv) => (
                <tr key={`${reserv.id}`} className="flex gap-15 my-5">
                  <td>
                    <ImageCard src={reserv.image} alt="" />
                  </td>
                  <td className="w-50 pl-2">
                    {reserv.typeChambre}
                    <div className="flex gap-2 items-center pt-2">
                      <ImageProfile src={reserv.picture} alt="" />
                      <div>{reserv.nom}</div>
                    </div>
                  </td>
                  <td className="pt-10">
                    <span className="text-sm">il y a 12min</span>
                  </td>
                  <td>
                    <span
                      className={`${
                        reserv.sejour.length > 1 ? "bg-red-500" : "bg-green-500"
                      } ${
                        reserv.sejour.length === 2 && "bg-yellow-500"
                      } p-3 rounded  ml-15`}
                    >
                      {" "}
                      {reserv.sejour
                        .map((dateStr) => new Date(dateStr).getDate())
                        .join(", ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredReservations.length === 0 && selectedDay && (
            <li className="text-center">Aucune réservation pour ce jour</li>
          )}
        </div>
      </div>
      <div>
        {/* POURCENTAGE DE LA RESERVATION */}
        <div>
          <div>
            {/* Jauge */}
            <Jauge
              filteredReservations={filteredReservations}
              selectedDay={selectedDay}
              selectMonth={selectMonth}
              selectYear={selectYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const LigneHorizontale = styled.div`
  width: 700px;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.2);
  margin: auto;
`;
const ImageCard = styled.img`
  width: 155px;
  height: 100px;
  margin-left: 10px;
  border-radius: 10px;
`;
const ImageProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

export default Calendrier;
