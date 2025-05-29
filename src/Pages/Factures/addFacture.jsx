import Divider from "./divider";
import { useParams } from "react-router";
import logoHotel from "../../assets/logoHotel.png";
import { reservationsPourPageReservation } from "../../Data/reservations_noms";
import { DollarSign, Edit, FileText, Mail, Printer } from "lucide-react";

function AfficheFacturePourSection({ reservation }) {
  return (
    <div className="flex justify-between ">
      <div className=" leading-8">
        <h1 className="font-semibold">Facture pour:</h1>
        <p className="text-sm text-black/80">{reservation.nom}</p>
        <p className="text-sm text-black/80">Richardson and Sons LLC</p>
        <p className="text-sm text-black/80">78083 Laura Pines, Bhutan</p>
        <p className="text-sm text-black/80">+261 34 43 281 40</p>
        <p className="text-sm text-black/80">pwillis@cross.org</p>
      </div>
      <div className="leading-8">
        <h1 className="font-semibold">Facturer:</h1>
        <p className="text-sm text-black/80">
          Total du: {reservation.total} Ar
        </p>
        <p className="text-sm text-black/80">Banque: SG</p>
        <p className="text-sm text-black/80">Pays: Paris</p>
        <p className="text-sm text-black/80">IBAN: ETD95476213874685</p>
        <p className="text-sm text-black/80">Code rapide: BR91905</p>
      </div>
    </div>
  );
}

function AfficherSectionDate({ reservation }) {
  return (
    <div>
      <h1>Date de publication: {reservation.date}</h1>
      <h1>Date d'echeance: {reservation.sejour}</h1>
    </div>
  );
}

function AfficherElementSection({ reservation, quantite }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Element</th>
            <th>Description</th>
            <th>PU</th>
            <th>Quantite</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">
              <h1>Chambre</h1>
              <h1>{reservation.typeChambre}</h1>
            </td>
            <td className="p-3 w-80">
              <h1>Description</h1>
              <h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                sapiente? Deleniti quam facnd.
              </h1>
            </td>
            <td className="p-3">
              <h1>{reservation.total / quantite}</h1>
            </td>
            <td className="p-3">
              <h1>{quantite}</h1>
            </td>
            <td className="p-3">{reservation.total} Ar</td>
          </tr>
          <tr>
            <td className="p-3">
              <h1>SMM</h1>
            </td>
            <td className="p-3 w-80">
              <h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                sapiente? Deleniti quam facnd.
              </h1>
            </td>
            <td className="p-3">
              <h1>{reservation.total / quantite}</h1>
            </td>
            <td className="p-3">
              <h1>{quantite}</h1>
            </td>
            <td className="p-3">{reservation.total} Ar</td>
          </tr>
          <tr>
            <td className="p-3">
              <h1>Dejeuner</h1>
            </td>
            <td className="p-3 w-80">
              <h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                sapiente? Deleniti quam facnd.
              </h1>
            </td>
            <td className="p-3">
              <h1>{reservation.total / quantite}</h1>
            </td>
            <td className="p-3">
              <h1>{quantite}</h1>
            </td>
            <td className="p-3">{reservation.total} Ar</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function AfficherResponsableSection({ reservation, quantite }) {
  return (
    <div>
      <table className="mx-3">
        <thead>
          <tr>
            <th className="pr-200">Responsable</th>
            <td>
              Sous total{" "}
              {reservation.total + (reservation.total / quantite) * 3} Ar{" "}
            </td>
          </tr>
          <tr>
            <td>{reservation.nom}</td>
            <td>Remise 0 Ar</td>
          </tr>
          <tr>
            <td>Richardson and Sons LLC</td>
            <td className="flex flex-col">
              <h1>Taxes: 0</h1>
              <h1>Total: 2 000 000 Ar</h1>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

function AddFacture() {
  const { reference } = useParams();
  const quantite = 2;

  const reservation = reservationsPourPageReservation.find(
    (reserv) => reserv.reference === reference
  );

  return (
    <div className="flex">
      <div className="bg-white m-5 px-3 w-[70%] rounded shadow-xl">
        <div className="flex justify-between mx-7 pt-5">
          <div>
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
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-lg font-semibold">Facture #{reference}</h1>
            <div>
              <AfficherSectionDate reservation={reservation} />
            </div>
          </div>
        </div>
        <Divider height={1} width={95} />
        <div>
          <AfficheFacturePourSection reservation={reservation} />
        </div>
        <Divider height={1} width={95} />
        <div>
          <AfficherElementSection
            reservation={reservation}
            quantite={quantite}
          />
        </div>
        <div>
          <AfficherResponsableSection
            reservation={reservation}
            quantite={quantite}
          />
        </div>
      </div>
      <div className="m-5 pt-5 bg-white w-[20%] h-92 shadow-xl rounded ">
        <button className="w-70 text-white m-auto flex gap-2 items-center text-teal-700 justify-center bg-teal-700 p-1 px-5 shadow-lg rounded-lg">
          <Mail size={20} />
          <h1>Envoyer</h1>
        </button>
        <br />
        <br />
        <button className="flex justify-center text-teal-700 gap-2 m-auto rounded shadow-lg w-70  p-1 px-5 ">
          <FileText size={20} />
          <h1>Telecharger en pdf</h1>
        </button>
        <br />
        <br />
        <button className="flex justify-center gap-2 m-auto rounded shadow-lg w-70 text-teal-700  p-1 px-5 ">
          <Printer size={20} />
          <h1>Imprimer</h1>
        </button>
        <br />
        <br />
        <button className="flex justify-center gap-2 m-auto rounded text-teal-700 shadow-lg w-70  p-1 px-5 ">
          <Edit size={20} />
          <h1>Modifier</h1>
        </button>
        <br />
        <button className="w-70 text-white m-auto flex gap-2 items-center text-teal-700 justify-center bg-teal-700 p-1 px-5 shadow-lg rounded-lg">
          <DollarSign size={20} />
          <h1>Ajouter un paiement</h1>
        </button>
        <br />
      </div>
    </div>
  );
}
export default AddFacture;
