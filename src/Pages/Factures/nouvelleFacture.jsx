import Divider from "./divider";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { ArrowDown, Calendar, Check, CheckCheck } from "lucide-react";
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

function AfficheFacturerInput() {
  return (
    <div>
      <h1 className="font-semibold">Facturer:</h1>
      <p className="text-gray-500">Code rapide: BR91905</p>
      <br />
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div>
            <label htmlFor="totaldu">Total du</label>
            <br />
            <input
              type="text"
              id="totaldu"
              placeholder="2 000 000 Ar"
              className="border rounded shadow"
            />
          </div>
          <div>
            <label htmlFor="banque">Banque</label>
            <br />
            <input
              type="text"
              id="banque"
              placeholder="Societe General"
              className="border rounded shadow"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <label htmlFor="pays">Pays</label>
            <br />
            <input
              type="text"
              id="pays"
              placeholder="Madagascar"
              className="border rounded shadow"
            />
          </div>
          <div>
            <label htmlFor="iban">IBAN</label>
            <br />
            <input
              type="text"
              id="iban"
              placeholder="ETD95462132198121"
              className="border rounded shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AfficherElements() {
  return (
    <div className="mx-5 flex flex-col items-end gap-3">
      <h1>Elements</h1>
      <table>
        <thead className="border-b">
          <tr>
            <th className="p-3">Element</th>
            <th className="p-3">Description</th>
            <th className="p-3">PU</th>
            <th className="p-3">Quantite</th>
            <th className="p-3">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 text-black/70">SMM</td>
            <td className="p-3 w-90 text-black/70">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim sit
              consequuntur quo veniam amet. Exercitationem veritatis, dicta sint
              iure cupiditate excepturi.
            </td>
            <td className="p-3 text-center text-black/70">150 000</td>
            <td className="p-3 text-center text-black/70">2</td>
            <td className="p-3 text-center text-black/70">300 000 Ar</td>
          </tr>
        </tbody>
      </table>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="element" className="font-semibold">
            Element
          </label>
          <input
            type="text"
            id="element"
            placeholder="Homard grille au four"
            className="rounded border shadow w-94"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <input
            type="text"
            placeholder="Description"
            id="description"
            className="rounded border shadow w-94"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="prixUnitaire" className="font-semibold">
            Prix Unitaire
          </label>
          <input
            type="text"
            placeholder="19 000 Ar"
            id="prixUnitaire"
            className="rounded border shadow w-94"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quantite" className="font-semibold">
            Quantite
          </label>
          <input
            type="text"
            id="quantite"
            placeholder="1"
            className="rounded border shadow w-94"
          />
        </div>
      </div>
      <div className="flex gap-180">
        <ArrowDown size={20} color="green" className="animate-bounce" />
        <button className="bg-purple-500 px-2 py-1 rounded-lg text-center text-white">
          + Ajouter
        </button>
      </div>
    </div>
  );
}

function FooterFacture() {
  return (
    <div className="flex justify-between px-5">
      <div>
        <h1>Responsable</h1>
        <select
          name="responsable"
          id=""
          className="border rounded shadow text-gray-500"
        >
          <option value="">choisir un responsable</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <h1>Sous total</h1>
          <h1>2 000 000 Ar</h1>
        </div>
        <div className="flex gap-3">
          <h1>Remise</h1>
          <h1>0 Ar</h1>
        </div>
        <div className="flex gap-3">
          <h1>Taxe:</h1>
          <h1>0</h1>
        </div>
        <div className="flex gap-3">
          <h1>Total:</h1>
          <h1>2 000 000 Ar</h1>
        </div>
      </div>
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
    <div className="bg-white m-3 rounded-lg h-205 overflow-hidden overflow-y-scroll hide-scrollbar">
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
                className="border rounded w-80 shadow"
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
                className="border rounded shadow"
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
                />{" "}
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider height={1} width={400} />
      <div className="flex justify-between mx-5">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold">Facture Pour:</h1>
          <br />
          <label htmlFor="nom">Client</label>
          <select
            name=""
            id="nom"
            className="border w-50 rounded shadow text-gray-500"
          >
            <option value="">Choisir une reservation</option>
          </select>
        </div>
        <div>
          <AfficheFacturerInput />
        </div>
      </div>
      <Divider height={1} width={400} />
      <div>
        <AfficherElements />
      </div>
      <br />
      <FooterFacture />
      <br />
      <div>
        <div className="text-white py-1 rounded mx-6 bg-teal-700 w-[97%] flex items-center justify-center gap-3">
          <Check />
          <h1>Enregistrer</h1>
        </div>
      </div>
    </div>
  );
}
export default NouvelleFacture;
