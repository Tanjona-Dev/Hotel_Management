import { useState } from "react";
import styled from "styled-components";
import {
  ChevronLeftCircleIcon,
  ChevronRightCircle,
  MoreVertical,
} from "lucide-react";
import { chambresHotel } from "../../Data/liste_hotels";

// La navitagtion Tout, Dispo, Reservees en bas-----
function Tabs({ tabsStyle, setTabsStyle, setGetIndex, setfiltre }) {
  const liste = [
    {
      id: 1,
      titre: "Tout",
      status: "",
    },
    {
      id: 2,
      titre: "Disponibles",
      status: "Libre",
    },
    {
      id: 3,
      titre: "Réservées",
      status: "Occupée",
    },
  ];
  return (
    <div className="pl-5">
      <div className="flex border-b border-gray-300 w-70 space-x-8 text-sm pt-5">
        {liste.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            onClick={() => {
              return (
                setTabsStyle(item.titre),
                setGetIndex(index),
                setfiltre(item.status)
              );
            }}
            className={`pl-2 pb-2 font-medium ${
              tabsStyle === item.titre
                ? "text-black border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            {item.titre}
          </button>
        ))}
      </div>
    </div>
  );
}

// Boutton En Haut de la Page
function ButtonNouvelleChambre() {
  return (
    <div>
      <button className="bg-emerald-700 py-1 px-2 rounded-lg mt-5 mr-5 text-white">
        Nouvelle chambre +
      </button>
    </div>
  );
}

function TitreTableau() {
  const listeTitre = [
    "Nom de chambre",
    "Type de lit",
    "Etage",
    "Equipement",
    "Prix",
    "Status",
    "Actions",
  ];
  return (
    <tr>
      {listeTitre.map((titre, index) => (
        <th key={index}>{titre}</th>
      ))}
    </tr>
  );
}

// Fonction principale..........................
function Chambres() {
  const [getIndex, setGetIndex] = useState("");
  const [tabsStyle, setTabsStyle] = useState(null);
  const [filtre, setfiltre] = useState("");
  const [page, setPage] = useState(1);

  // FILTRE
  const chambreFiltree = () => {
    return chambresHotel.filter((ch) => {
      const disponible = !filtre || filtre === ch.status;
      return disponible;
    });
  };
  const chambreAftreFiltre = chambreFiltree();

  // Pagingantion
  const clientPerPage = 5;
  const totalePage = Math.ceil(chambreAftreFiltre.length / clientPerPage);
  const startListClient = (page - 1) * clientPerPage;
  const pageDivisee = chambreAftreFiltre.slice(
    startListClient,
    startListClient + clientPerPage
  );

  // Condition pour les Couleur
  const ConditionColor = (status) => {
    if (status === "Réservée") {
      return "bg-red-500";
    }
    if (status === "Occupée") {
      return "bg-orange-500";
    }
    if (status === "Libre") {
      return "bg-green-500";
    }
    if (status === "En maintenance") {
      return "bg-yellow-500";
    }
    if (status === "En nettoyage") {
      return "bg-blue-500";
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Tabs
          tabsStyle={tabsStyle}
          setTabsStyle={setTabsStyle}
          getIndex={getIndex}
          setGetIndex={setGetIndex}
          setfiltre={setfiltre}
          filtre={filtre}
        />
        <ButtonNouvelleChambre />
      </div>
      <div>
        <table className="border-separate border-spacing-x-10  border-spacing-y-10">
          <thead>
            <TitreTableau />
          </thead>
          <tbody>
            {pageDivisee.map((chambre, index) => (
              <tr key={index}>
                <td className="w-65">
                  <div className="flex gap-2">
                    <Image src={chambre.image} alt="" />
                    <div className="flex flex-col">
                      <span className="text-green-500">{chambre.numero}</span>
                      <span className="font-semibold">{chambre.classe}</span>
                    </div>
                  </div>
                </td>
                <td className="opacity-60">{chambre.typeLit}</td>
                <td className="font-semibold">{chambre.etage}</td>
                <td className="w-120 opacity-60">{chambre.equipements}</td>
                <td className="font-semibold">{chambre.prix} Ar / nuit</td>
                <td>
                  <span
                    className={`${ConditionColor(
                      chambre.status
                    )} flex items-center justify-center px-3 py-2 rounded-lg`}
                  >
                    {chambre.status}
                  </span>
                </td>
                <td>
                  <MoreVertical />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex gap-5 justify-end items-center px-10">
          <button disabled={page === 1} className={`disabled:opacity-50`}>
            <ChevronLeftCircleIcon
              size={40}
              color="green"
              onClick={() => setPage(page === 1 ? 1 : page - 1)}
            />
          </button>

          <div className="flex justify-center items-center w-5 h-5 border p-4 rounded-full">
            {page}
          </div>
          <button
            disabled={page === totalePage}
            className="disabled:opacity-50"
          >
            {console.log(totalePage)}
            <ChevronRightCircle
              size={40}
              color="green"
              onClick={() =>
                setPage(page === totalePage ? totalePage : page + 1)
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

const Image = styled.img`
  width: 150px;
  height: 80px;
  border-radius: 5px;
`;
export default Chambres;
