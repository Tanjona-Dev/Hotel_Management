import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { reservationsPourPageReservation } from "../../Data/reservations_noms";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { addDays } from "date-fns";

import { cn } from "../../lib/utils";
import { Button } from "../../Components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../Components/ui/popover";

export function DatePickerWithRange({ className }) {
  const [date, setDate] = React.useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  console.log("data", date);

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
            } mx-2`}
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

const filterReservation = (status) => {
  return status
    ? reservationsPourPageReservation.filter(
        (reservation) => reservation.status === status
      )
    : reservationsPourPageReservation;
};

function Reservation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState("");
  const reservationFiltree = filterReservation(status);

  return (
    <div>
      <div className=" flex justify-between">
        <Tabs
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          setStatus={setStatus}
        />
        <DatePickerWithRange />
      </div>

      <div className="mx-5 pr-5 pt-3">
        <table className=" w-full border-collapse m-5 mx-3 shadow-xl rounded-lg">
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
                  <td className="pl-10">
                    <MoreVertical size={15} />
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
