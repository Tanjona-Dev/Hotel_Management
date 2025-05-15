import { useEffect, useState } from "react";
import { listeDesClients } from "../../Data/clients_hotel";
import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreVertical,
} from "lucide-react";
import styled from "styled-components";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays } from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "../../Components/ui/button";
import { Calendar } from "../../Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../Components/ui/popover";

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

const getColor = (status) => {
  if (status === "En cours") {
    return "bg-yellow-500";
  }
  if (status === "Remboursé") {
    return "bg-red-500";
  }
  if (status === "Payé") {
    return "bg-green-500";
  }
  if (status === "Impayé") {
    return "bg-red-500";
  }
};

function Clients() {
  // STATES
  const [page, setPage] = useState(1);
  const [reservation, setReservation] = useState("");
  const [requeteToggle, setRequeteToggle] = useState(null);
  // state DatePickerWithRange
  const [date, setDate] = React.useState({
    from: new Date(2024, 10, 1),
    to: addDays(new Date(2025, 0, 0), 31),
  });

  useEffect(() => {
    setPage(1);
  }, [reservation]);

  // --------------------------------FILTEER------------------------------------

  const filtrerListe = (date) => {
    return listeDesClients.filter((client) => {
      const matchReservation =
        !reservation || reservation === client.etatReservation;
      const dateCommande = new Date(client.commande);
      const dateMatch =
        !date?.from ||
        !date?.to ||
        (dateCommande >= date.from && dateCommande <= date.to);
      return matchReservation && dateMatch;
    });
  };
  const listesClientFiltrer = filtrerListe(date);

  // ----------------------------PAGINATION--------------------------------------------

  const clientPerPage = 6;
  const totalPages = Math.ceil(listesClientFiltrer.length / clientPerPage);
  const startListClient = (page - 1) * clientPerPage;
  const divisionListClient = listesClientFiltrer.slice(
    startListClient,
    startListClient + clientPerPage
  );

  return (
    // --------------BUTTONS FILTER EN BAS----------------------------------------------
    <div>
      <div className="flex justify-between m-6 text-lg cursor-pointer pt-5">
        <div className="flex justify-between gap-193 items-start">
          <div className="flex gap-5  border-b border-gray-300 w-115 pl-2 ">
            <div
              className={`${
                !reservation ? "border-b-3 border-teal-400 transition" : ""
              }`}
            >
              <h1 onClick={() => setReservation("")}>Tout</h1>
            </div>
            <div
              className={`${
                reservation === "En attente" &&
                "border-b-3  border-teal-400 transition"
              }`}
            >
              <h1 onClick={() => setReservation("En attente")}>En attente</h1>
            </div>
            <div
              className={`${
                reservation === "Réservé" &&
                "border-b-3  border-teal-400 transition"
              }`}
            >
              <h1 onClick={() => setReservation("Réservé")}>Réservé</h1>
            </div>
            <div
              className={`${
                reservation === "Annulé" &&
                "border-b-3  border-teal-400 transition"
              }`}
            >
              <h1 onClick={() => setReservation("Annulé")}>Annulé</h1>
            </div>
            <div
              className={`${
                reservation === "Remboursé" &&
                "border-b-3 border-teal-400 transition"
              }`}
            >
              <h1 onClick={() => setReservation("Remboursé")}>Remboursé</h1>
            </div>
          </div>
          <DatePickerWithRange setDate={setDate} date={date} />
        </div>
      </div>

      {/*----------- MAPER LA LISTE FILTREE EN BAS------------------------------------------------- */}
      <Card>
        <div>
          <div>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] pt-5">
              <div className="w-55">Client</div>
              <div>Commande</div>
              <div>Arrive</div>
              <div>Depart</div>
              <div>Requete Special</div>
              <div>Type de chambre</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            <ul className="h-auto overflow-y-auto scroll-on-hover bg-white pt-10 ">
              {divisionListClient.map((client, index) => {
                return (
                  <li
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] "
                    key={`${client.id}-${index}`}
                  >
                    <div className="flex gap-2 w-55 font-semibold">
                      <div>
                        <ImageProfile src={client.picture} alt="" />
                        <br />
                        <br />
                      </div>
                      {client.nom}
                    </div>
                    <div>{client.commande}</div>
                    <div>{client.arrive}</div>
                    <div>{client.depart}</div>
                    <div className="">
                      <button
                        onClick={() =>
                          setRequeteToggle(
                            requeteToggle === index ? null : index
                          )
                        }
                        className="bg-gray-200 rounded-lg p-2"
                      >
                        voir les notes
                      </button>
                      {requeteToggle === index && (
                        <div className="bg-green-50 rounded-lg transition">
                          {client.requeteSpeciale}
                        </div>
                      )}
                    </div>
                    <div>{client.typeChambre}</div>
                    <div
                      className={`flex justify-center min-w-16 items-center h-10 rounded-lg px-2  ${getColor(
                        client.statutPaiement
                      )}`}
                    >
                      {client.statutPaiement}
                    </div>
                    <div className="flex pl-10">
                      <MoreVertical size={15} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* --------------------------------Button de Pagination-------------------------------------- */}

        <div className="flex justify-end gap-4 h-2">
          <div>
            <button
              disabled={page === 1}
              className="px-3  border border-green-800 rounded-lg disabled:opacity-50"
            >
              <ChevronsLeftIcon
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                height={45}
                width={30}
              />
            </button>
          </div>
          <span className="flex justify-center items-center bg-green-700 h-11 w-13 rounded-sm">
            {page}
          </span>
          <div>
            <button
              disabled={page === totalPages}
              className="px-3  border border-green-800 rounded-lg disabled:opacity-50"
            >
              <ChevronsRightIcon
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                height={45}
                width={30}
              />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

const ImageProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 9px;
`;
const Card = styled.div`
  padding: 20px;
  height: 80vh;
  background-color: white;
  border-radius: 20px;
  margin: 15px;
  box-shadow: 3px 3px 3px rgb(0, 0, 0, 0.5);
  overflow: hidden;
  scroll: scroll;
`;
export default Clients;
