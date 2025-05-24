import { Check, Mail, Plus, Printer } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reservationsPourPageReservation } from "../../Data/reservations_noms";

export function AfficherTableau({ page, setPage }) {
  const clientPerPage = 6;
  const startPage = (page - 1) * clientPerPage;
  const totalPage = Math.ceil(
    reservationsPourPageReservation.length / clientPerPage
  );
  const pagePartage = reservationsPourPageReservation.slice(
    startPage,
    startPage + clientPerPage
  );
  function Pagination({ page, setPage }) {
    return (
      <div className="flex gap-5 justify-center items-center">
        <div className="border rounded border-green-700 p-1 mb-2 cursor-pointer hover:scale-105 transition">
          <ChevronLeft
            onClick={() => setPage(page === 1 ? 1 : page - 1)}
            color="green"
          />
        </div>
        <div className="w-9 h-8 pt-1 mb-2 text-center text-white bg-green-700 rounded">
          {page}
        </div>
        <div className="border rounded border-green-700 p-1 mb-2 cursor-pointer hover:scale-105 transition">
          <ChevronRight
            onClick={() => setPage(page === totalPage ? totalPage : page + 1)}
            color="green"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="border-b-2 border-green-600 w-15 text-center m-4">
          Tout
        </h1>
        <button className="flex gap-2 items-center px-5 bg-green-700 h-9 mt-3 mr-5 rounded-lg text-white cursor-pointer relative group overflow-hidden hover:scale-101 hover:shadow-lg transition duration-300">
          Nouvelle facture{" "}
          <Plus size={18} className="group-hover:animate-spin" />
          <span className="absolute inset-0 bg-white opacity-9 -translate-x-full w-[100%] group-hover:translate-x-0 transition-all duration-500 ease-out"></span>
        </button>
      </div>
      <div className="m-5 bg-white rounded-lg h-180 overflow-hidden">
        <table className=" w-full ">
          <thead className="text-center text-lg">
            <tr>
              <th className="w-1/4 p-5">Client</th>
              <th className="w-1/9 p-5">Date de publication</th>
              <th className="w-1/9 p-5">Total</th>
              <th className="w-1/9 p-5">Solde</th>
              <th className="w-1/8 p-5">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {pagePartage.map((reservation, index) => {
              return (
                <tr key={`${index}-${reservation.id}`}>
                  <td className="flex gap-2 ml-5 py-4">
                    <img
                      src={reservation.picture}
                      alt=""
                      className="w-20 h-19 rounded"
                    />
                    <div className="text-left">
                      <h1 className="font-semibold">{reservation.nom}</h1>
                      <h1 className="text-red-500 opacity-90">
                        #{reservation.reference}
                      </h1>
                    </div>
                  </td>
                  <td className="text-gray-500">{reservation.date}</td>
                  <td className="font-semibold">{reservation.total} Ar</td>
                  <td>
                    {reservation.total === reservation.solde ||
                    reservation.solde === 0 ? (
                      <div className="text-right text-white flex items-center gap-1 bg-green-500 rounded-full text-sm mx-15 p-1 justify-center">
                        <Check size={18} />
                        Paye
                      </div>
                    ) : (
                      <div className="font-semibold">
                        {reservation.solde + " Ar"}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2 text-white">
                      <button className="flex gap-2 justify-center items-center bg-red-500 p-2 px-5 rounded-xl hover:shadow-lg hover:scale-101 transition cursor-pointer hover:bg-gradient-to-r from-red-500 to-red-600">
                        <h1 className="text-sm">Envoyer</h1>
                        <Mail size={18} />
                      </button>
                      <button className="flex gap-2 justify-center items-center bg-purple-500 p-2 px-5 rounded-xl hover:shadow-lg hover:scale-101 transition cursor-pointer hover:bg-gradient-to-r from-cyan-500 to-blue-500">
                        <h1 className="text-sm">Imprimer</h1>
                        <Printer size={18} />
                      </button>
                      <button>
                        <Plus
                          color="gray"
                          className="hover:animate-pulse cursor-pointer"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mr-10">
        <Pagination
          reservationsPourPageReservation={reservationsPourPageReservation}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
