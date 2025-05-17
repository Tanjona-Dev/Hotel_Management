import * as React from "react";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { cn } from "../../lib/utils";
import { LiensContext } from "../../utils/context";
import { Button } from "../../Components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { Calendar } from "../../Components/ui/calendar";
import { Archive, Factory, Files, MoreVertical, Plus } from "lucide-react";
import { reservationsPourPageReservation } from "../../Data/reservations_noms";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../Components/ui/popover";
import { Link } from "react-router";

export function DatePickerWithRange({ className, setDate, date }) {
  console.log(date);
  return (
    <div className={cn("grid gap-2 pt-3", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Tabs({ activeIndex, setActiveIndex, setStatus }) {
  function addStyleElement(index) {
    setActiveIndex(index);
  }
  const element = [
    {
      elem: "Tout",
      status: "",
    },
    {
      elem: "Complete",
      status: "complète",
    },
    {
      elem: "En cours",
      status: "en cours",
    },
  ];
  return (
    <div>
      <ul className="flex gap-7 pt-3  border-b border-gray-300 w-70 mb-2 ">
        {element.map((elem, index) => (
          <li
            key={`${elem}-${index}`}
            onClick={() => {
              addStyleElement(index);
              setStatus(elem.status);
            }}
            className={`${
              activeIndex === index
                ? "border-b border-green-600 text-green-600"
                : ""
            } mx-2 cursor-pointer hover:text-teal-600`}
          >
            {elem.elem}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AfficherTitreTableau() {
  const titreTableau = [
    "Client",
    "Date",
    "Reference",
    "Total",
    "Paye",
    "Solde",
    "Status",
    "Actions",
  ];
  return (
    <tr>
      {titreTableau.map((titre) => (
        <td key={titre} className="px-5 text-lg font-semibold">
          {titre}
        </td>
      ))}
    </tr>
  );
}

function ButtonNewReservation() {
  return (
    <Link to={`/NouvelleReservation`}>
      <button
        className="group text-white/80 relative overflow-hidden bg-blue-400  h-8 mt-3 mr-10 px-4 
    rounded-lg transform transition-all duration-300 hover:scale-101 hover:shadow-sm"
      >
        Nouvelle reservation +
        <span className="absolute inset-0 bg-white opacity-10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
      </button>
    </Link>
  );
}

const filterReservation = (status, date) => {
  return reservationsPourPageReservation.filter((reservation) => {
    const statusMatch = !status || reservation.status === status;
    const reservDate = new Date(reservation.date);
    const dateMatch =
      !date?.from ||
      !date?.to ||
      (reservDate >= date.from && reservDate <= date.to);

    return dateMatch && statusMatch;
  });
};

function Reservation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [getIndex, setGetIndex] = useState(null);

  // Props DatePickerWithRange
  const [date, setDate] = React.useState({
    from: new Date(2025, 4, 1),
    to: addDays(new Date(2025, 4, 30), 31),
  });

  const reservationFiltree = filterReservation(status, date);

  const { setLiens } = useContext(LiensContext);
  useEffect(() => {
    setLiens("Commande");
  }, [setLiens]);

  return (
    <div>
      <div className=" flex justify-between">
        <Tabs
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          setStatus={setStatus}
        />
        <div className="flex gap-4">
          <DatePickerWithRange setDate={setDate} date={date} />
          <ButtonNewReservation />
        </div>
      </div>

      <div className=" pt-3 h-202 overflow-y-scroll scroll-on-hover transition-scroll">
        <table className="w-392 border-collapse m-5 shadow-xl rounded-lg">
          <thead>
            <AfficherTitreTableau />
          </thead>
          <tbody>
            {reservationFiltree.map((reservation, index) => {
              return (
                <tr key={`${reservation.id}-${index}`}>
                  <td className="p-5 flex gap-1">
                    <img
                      src={reservation.picture}
                      alt=""
                      className="w-10 h-10 rounded-lg"
                    />
                    <div className="flex flex-col">
                      <h1>{reservation.nom}</h1>
                      <h1 className="text-red-500 text-sm">
                        #{reservation.reference}
                      </h1>
                    </div>
                  </td>
                  <td className="p-5">{reservation.date}</td>
                  <td className="p-5">{reservation.reference}</td>
                  <td className="p-5">{reservation.total}</td>
                  <td className="p-5">{reservation.paye}</td>
                  <td className="p-5">{reservation.solde}</td>
                  <td className={`p-5`}>
                    <div
                      className={`p-2 text-center ${
                        reservation.status === "en cours"
                          ? "bg-red-500"
                          : "bg-green-500"
                      } rounded-lg`}
                    >
                      {reservation.status}
                    </div>
                  </td>
                  <td className="pl-10 relative">
                    <MoreVertical
                      size={15}
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setGetIndex(index);
                      }}
                    />
                    <div>
                      {isOpen ||
                        (getIndex === index && (
                          <div className=" z-100 absolute w-45 right-3.5 flex flex-col gap-3 bg-white/70 p-2 justify-center rounded  ">
                            <div className="flex gap-2 text-sm">
                              {" "}
                              <Files size={20} />
                              <h1 className=" hover:bg-orange-200 hover:shadow-xl px-1 rounded-sm">
                                Details
                              </h1>
                            </div>
                            <div className="flex gap-2">
                              {" "}
                              <Factory size={20} />
                              <h1 className=" hover:bg-orange-200 hover:shadow-xl  px-1 rounded-sm">
                                {" "}
                                Voir les factures
                              </h1>
                            </div>
                            <div className="flex gap-2">
                              {" "}
                              <Plus size={20} />
                              <h1 className=" hover:bg-orange-200 hover:shadow-xl rounded-sm">
                                {" "}
                                Ajouter une facture
                              </h1>
                            </div>
                            <div className="flex gap-2">
                              <Files size={20} />
                              <h1 className=" hover:bg-orange-200 hover:shadow-xl  px-1 rounded-sm">
                                Modifier
                              </h1>
                            </div>
                            <div className="flex gap-2">
                              <Archive size={20} />
                              <h1 className=" hover:bg-orange-200 hover:shadow-xl  px-1 rounded-sm">
                                Archiver
                              </h1>
                            </div>
                          </div>
                        ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Reservation;
