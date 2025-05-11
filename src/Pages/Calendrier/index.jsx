import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { reservation } from "../../Data/reservation";

const Calendar = ({ setDate }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(null); // ← ici

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day(); // 0 (dimanche) à 6 (samedi)
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  useEffect(() => {
    if (selectedDay !== null) {
      setDate(selectedDay);
    }
  }, [selectedDay, setDate]);

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected = selectedDay === d;
    days.push(
      <div
        key={d}
        onClick={() => {
          setSelectedDay(d);
        }}
        className={`p-2  rounded-lg text-center cursor-pointer 
          ${isSelected ? "bg-green-300" : "hover:bg-blue-100"}`}
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

function filtreReservation(date) {
  const reservationFiltree = reservation.filter((reserv) => {
    const filtreDate = reserv.sejour.includes(date);
    return filtreDate;
  });
  return reservationFiltree;
}
const newReservation = filtreReservation();

function Calendrier() {
  const [date, setDate] = useState("");
  filtreReservation(date);

  return (
    <div>
      <h1>Calendrier</h1>
      <div>
        <Calendar setDate={setDate} />
        <div>
          <ul>
            {newReservation.map((reserv) => (
              <li key={reserv.id}>{reserv.sejour}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Calendrier;
