import { useParams } from "react-router";
import { reservationsPourPageReservation } from "../../Data/reservations_noms";
import {
  Armchair,
  BathIcon,
  BedDouble,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  Snowflake,
  Tv,
  Wifi,
} from "lucide-react";

function generateRandomTime() {
  const heure = Math.floor(Math.random() * 24)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0");

  return `${heure}:${minutes}:${seconds}`;
}

function DetailsReservation() {
  const { id } = useParams();
  const detailReservation = reservationsPourPageReservation.find(
    (resa) => resa.id == id
  );
  const heureComplet = generateRandomTime();
  return (
    <div className="m-3 p-8 bg-white rounded-lg">
      <div className="flex gap-3">
        <div>
          <img
            className="w-50 h-50 rounded-lg"
            src={detailReservation.picture}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-semibold">{detailReservation.nom}</p>
          <p className="text-gray-600">ID #{detailReservation.reference}</p>
          <div className="flex gap-3">
            <div className="w-15 justify-center items-center p-4 border border-2 border-green-700 rounded-lg">
              <Phone fill="green" color="green-400" />
            </div>
            <div className="flex items-center text-lg gap-3 w-55 rounded-lg justify-center p-2 bg-green-600 text-white ">
              <Mail color="white" />
              <h1 className="text-white">Envoyer un Mail</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-25 my-4">
        <div>
          <h1 className="text-gray-500">Arrive</h1>
          <div className="flex gap-1 items-center">
            {detailReservation.date}
            <div className="h-4 w-[2px] bg-black" />
            {heureComplet}
          </div>
        </div>
        <div>
          <h1 className="text-gray-500">Depart</h1>
          {detailReservation.sejour}
        </div>
      </div>
      <div className="h-[1px] w-[100%] bg-gray-300 my-4 m-auto rounded-xl" />
      <div className="flex gap-15 my-5">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-gray-500 text-lg">Informations</h1>
          </div>
          <div>
            <p className="text-xl font-bold">{detailReservation.typeChambre}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex">
            <h1 className="text-gray-500 text-lg">Prix</h1>
            <h1 className="text-blue-500 font-semibold">(regles inclus)</h1>
          </div>
          <div>
            <h1 className="font-bold text-xl">
              {" "}
              {detailReservation.total} Ar{" "}
              <span className="text-gray-500">/nuit</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="w-200 text-gray-500 ">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
          voluptate corrupti tempora unde veritatis harum, enim vitae explicabo
          non at dolor repellat doloribus molestiae nemo, numquam, veniam
          officiis dolores eum. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Impedit voluptate corrupti tempora unde veritatis
          harum, enim vitae explicabo non at dolor repellat doloribus molestiae
          nemo, numquam, veniam officiis dolores eum.
        </p>
      </div>
      <div>
        <h1>Equipements</h1>
        <div className="flex gap-3 py-5">
          <div className="flex gap-2 px-6 py-2 rounded-xl bg-green-200 text-green-700 shadow ">
            <BedDouble />
            <span>3 espaces de couchages</span>
          </div>
          <div className="flex gap-2 px-6 py-2 rounded-xl bg-green-200 text-green-700 shadow ">
            <ShieldCheck />
            <span>Garde 24 heures</span>
          </div>
          <div className="flex gap-2 px-6 py-2 rounded-xl bg-green-200 text-green-700 shadow  ">
            <Tv />
            <span>Tele</span>
          </div>
          <div className="flex gap-2 px-6 py-2 rounded-xl bg-green-200 text-green-700 shadow  ">
            <Wifi />
            <span>Wifi Gratuit</span>
          </div>
          <div className="flex gap-2 px-6 py-2 rounded-xl bg-green-200 text-green-700 shadow  ">
            <BathIcon />
            <span>2 Douches</span>
          </div>
          <div className="flex gap-2 px-6 py-2 rounded-xl bg-green-200 text-green-700 shadow  ">
            <Snowflake />
            <span>climatiseur</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsReservation;
