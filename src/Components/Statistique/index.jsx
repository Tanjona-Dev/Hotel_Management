import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import styled from "styled-components";

const data = [
  { name: "Lundi", Occupe: 40, Disponible: 60 },
  { name: "Mardi", Occupe: 55, Disponible: 60 },
  { name: "Mercredi", Occupe: 30, Disponible: 60 },
  { name: "Jeudi", Occupe: 70, Disponible: 60 },
  { name: "Vendredi", Occupe: 60, Disponible: 60 },
  { name: "Samedi", Occupe: 50, Disponible: 60 },
];

const totalChambreOccupe = data.reduce((acc, item) => acc + item.Occupe, 0);
const totalChambreDisponible = data.reduce(
  (acc, item) => acc + item.Disponible,
  0
);

function MonGraphique() {
  return (
    <>
      <div className="flex gap-5 justify-center">
        <div className="flex gap-1">
          <Square className="bg-green-700" />
          <p>
            Ch. Occupees:<strong> {totalChambreOccupe} </strong>
          </p>
        </div>
        <div className="flex gap-1">
          <Square className="bg-red-500" />
          <p>
            ch. disponibles
            <strong> {totalChambreDisponible}</strong>
          </p>
        </div>
      </div>
      <br />
      <BarChart width={550} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Occupe" fill="ffc658" barSize={12} radius={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={"#006400"} />
          ))}
        </Bar>
        <Bar dataKey="Disponible" fill="ffc658" barSize={12} radius={15}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={"#FF0000"} />
          ))}
        </Bar>
      </BarChart>
    </>
  );
}

function StatistiqueReservation() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-8 px-5">
        <h1 className="text-lg font-semibold">Statistique des reservations</h1>
        <div>
          <span className="text-lg font-semibold">Mensuel</span>
        </div>
      </div>
      <div className="pl-20">
        <MonGraphique />
      </div>
    </div>
  );
}
const Square = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
`;
export default StatistiqueReservation;
