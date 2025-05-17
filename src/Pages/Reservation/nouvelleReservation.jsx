import { useContext, useEffect } from "react";
import { LiensContext } from "../../utils/context";
import { Check } from "lucide-react";

export default function NouvelleReservation() {
  const { setLiens } = useContext(LiensContext);
  useEffect(() => {
    setLiens("Reservation");
  }, [setLiens]);
  return (
    <div className="bg-white shadow rounded-lg m-5 p-6">
      <h1 className="text-3xl font-semibold">Nouvelle reservation</h1>
      <div>
        <form action="" className="flex justify-center items-center my-20">
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
                >
                  <option value="">Choisir une chambre</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="nombre" className="font-bold">
                  Nombre de jours / nuits
                </label>
                <input
                  type="number"
                  placeholder="3"
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
                <select
                  name=""
                  id="client"
                  className="w-150 border  h-10 rounded shadow"
                >
                  <option value="">Choisir un client</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="reservation" className="font-bold">
                  Date de reservation
                </label>
                <input
                  type="text"
                  className="w-150 border  h-10 rounded shadow"
                  placeholder="jj/mm/aaaa"
                  id="reservation"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="arrivee" className="font-bold">
                  Date d'arrivee
                </label>
                <input
                  type="text"
                  placeholder="jj/mm/aaaa"
                  className="w-150 border  h-10 rounded shadow"
                  id="arrivee"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="depart" className="font-bold">
                  Date de depart
                </label>
                <input
                  type="text"
                  placeholder="jj/mm/aaaa"
                  className="w-150 border  h-10 rounded shadow"
                  id="depart"
                />
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
              <button className="flex justify-center gap-3 shadow-lg shadow-green-100 bg-green-700 w-305 p-1 rounded hover:bg-green-600 text-white ">
                {<Check />} <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
