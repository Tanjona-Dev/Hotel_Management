import { Folder, Printer } from "lucide-react";
import { reservationsPourPageReservation } from "../../Data/reservations_noms";

function ReservationFacture() {
  return (
    <div className="pb-5">
      <h1 className="font-semibold text-xl px-5 mt-5">
        Facture des Reservations
      </h1>
      <div className=" h-196 pb-2 overflow-hidden overflow-y-scroll hide-scrollbar scroll-smooth ">
        <table className="w-[90%] mb-5 text-center bg-white m-auto mt-5 rounded-lg">
          <thead className="sticky top-0 z-10 bg-green-100">
            <tr className="border-b shadow ">
              <th className="pt-5 pb-4">ID</th>
              <th className="pt-5 pb-4">Date de publication</th>
              <th className="pt-5 pb-4">Total</th>
              <th className="pt-5 pb-4">Solde</th>
              <th className="pt-5 pb-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservationsPourPageReservation.map((reserv, index) => {
              return (
                <tr key={index}>
                  <td className="p-3">{reserv.reference}</td>
                  <td className=" text-gray-500">{reserv.date}</td>
                  <td className="p-3">{reserv.paye}</td>
                  <td className="p-3">{reserv.solde}</td>
                  <td>
                    <div className="flex justify-center gap-4">
                      <button className="flex justify-center items-center gap-2 rounded-lg cursor-pointer bg-purple-400 px-2 py-1 shadow-lg hover:scale-x-101">
                        <Folder size={16} />
                        <span>Voir</span>
                      </button>
                      <button className="flex justify-center items-center gap-1 px-2 py-1 rounded-lg cursor-pointer bg-orange-400 shadow-lg hover:scale-x-101 ">
                        <Printer size={16} />
                        <h1>Imprimer</h1>
                      </button>
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

export default ReservationFacture;
