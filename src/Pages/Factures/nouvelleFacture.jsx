import Divider from "./divider";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Calendar } from "lucide-react";
import { DayPicker } from "react-day-picker";
import logoHotel from "../../assets/logoHotel.png";
import { useEffect, useRef, useState } from "react";
import { reservationsPourPageReservation } from "../../Data/reservations_noms";

function MyDatePicker({ setIsActive, calendarRef, setDateForInput }) {
  const [selectedDate, setSelectedDate] = useState();
  useEffect(() => {
    setDateForInput(selectedDate);
  }, [setDateForInput, selectedDate]);

  const handleDateSelecte = (date) => {
    setSelectedDate(date);
    setDateForInput(date);
    setIsActive(false);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, [setIsActive, calendarRef]);

  return (
    <div className="bg-purple-100 rounded-lg shadow" ref={calendarRef}>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelecte}
      />
      {selectedDate && (
        <p>Date sélectionnée : {format(selectedDate, "dd/MM/yyyy")}</p>
      )}
    </div>
  );
}

function NouvelleFacture() {
  const [echeanceActive, setEcheanceActive] = useState(false);
  const [publicationActive, setPublicationActive] = useState(false);
  const [publicationDate, setPublicationDate] = useState("");
  const [echeanceDate, setEcheanceDate] = useState("");

  // REFERENCE
  const publicationCalendarRef = useRef(null);
  const echeanceCalendarRef = useRef(null);

  const maxRef = Math.max(
    ...reservationsPourPageReservation.map((item) =>
      parseInt(item.reference.replace("CMD", ""))
    )
  );
  const newRef = "CMD" + String(maxRef + 1).padStart(3, "0");

  return (
    <div className="bg-white m-3 rounded-lg">
      <div className="flex justify-between mx-15  pt-5">
        <div>
          <div className="flex gap-2">
            <img
              src={logoHotel}
              alt="logoHotel"
              className="w-10 h-10 border rounded-full"
            />
            <h1 className="text-lg playwrite">Generation Hotel</h1>
          </div>
          <br />
          <div className="text-sm text-black/80 leading-7">
            <h1>Office 149, 450 Brand Brooklyn</h1>
            <h1>San Diego Country, CA 91905, USA</h1>
            <h1>+261 34 99 896 85, +261 32 894 98</h1>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-5 relative">
            <div className="font-bold text-lg">Facture #{newRef}</div>
            <div className="flex flex-col gap-2">
              <label htmlFor="publication">Date de publication</label>
              <input
                type="text"
                placeholder="jj/mm/aaaa"
                className="border rounded w-80"
                onClick={() => setPublicationActive(!publicationActive)}
                value={
                  publicationDate
                    ? format(new Date(publicationDate), "dd/MM/yyyy")
                    : ""
                }
                readOnly
                id="publication"
              />
              <Calendar
                size={20}
                className="absolute right-1 top-21  opacity-70"
                onClick={() => setPublicationActive(!publicationActive)}
              />
              <div
                className={cn(
                  "absolute right-0 z-10 top-23",
                  publicationActive ? "block" : "hidden"
                )}
              >
                <MyDatePicker
                  setIsActive={setPublicationActive}
                  calendarRef={publicationCalendarRef}
                  setDateForInput={setPublicationDate}
                />
              </div>
              <br />
              <label htmlFor="echeance">Date d'echeance</label>
              <input
                type="text"
                className="border rounded"
                id="echeance"
                value={
                  echeanceDate
                    ? format(new Date(echeanceDate), "dd/MM/yyyy")
                    : ""
                }
                readOnly
                placeholder="jj/mm/aaaa"
                onClick={() => setEcheanceActive(true)}
              />
              <Calendar
                size={20}
                className="absolute top-45 left-74 opacity-70"
                onClick={() => setEcheanceActive(!echeanceActive)}
              />
              <div
                className={cn(
                  "absolute right-0 top-47 z-10",
                  echeanceActive ? "block" : "hidden"
                )}
                ref={echeanceCalendarRef}
              >
                <MyDatePicker
                  setIsActive={setEcheanceActive}
                  calendarRef={echeanceCalendarRef}
                  setDateForInput={setEcheanceDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider height={1} width={400} />
      <div>
        <div className="flex flex-col">
          <label htmlFor="nom">Client</label>
          <select name="" id="nom" className="border w-50">
            <option value="">Choisir une reservation</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default NouvelleFacture;
