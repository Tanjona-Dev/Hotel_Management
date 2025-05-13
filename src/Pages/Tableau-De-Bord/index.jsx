import dayjs from "dayjs";
import styled from "styled-components";
import { useState } from "react";
import { ChambreReservee } from "../../Data";
import StatistiqueReservation from "../../Components/Statistique";
import {
  BedDouble,
  NotepadText,
  PhoneIncoming,
  PhoneMissed,
  Save,
  Verified,
} from "lucide-react";
import { appelRecents } from "../../Data";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { reservation } from "../../Data/reservation";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(null); // ← ici

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day(); // 0 (dimanche) à 6 (samedi)
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected = selectedDay === d;
    days.push(
      <div
        key={d}
        onClick={() => {
          setSelectedDay(d)
        }}
        className={`p-2  rounded-lg text-center cursor-pointer 
          ${isSelected ? "bg-green-300" : "hover:bg-blue-100"}`}
      >
        {d}
      </div>
    );
  }

  return (
    <div className="w-100 mx-auto h-90 p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-orange-500 hover:underline">
          ← Mois précédent
        </button>
        <h2 className="text-xl font-bold">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={nextMonth} className="text-orange-500 hover:underline">
          Mois suivant →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center bg-white font-medium">
        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((d) => (
          <div key={d} className="text-orange-400">
            {d}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

const LundiDuMois = reservation.filter((reserv)=> {
  reserv.sejour === ''
})

function AffichageChambreReservee() {
  return (
    <div>
      <ul className="flex flex-col gap-8 ml-3 pt-7">
        {ChambreReservee.map((reservation) => (
          <li key={reservation.id} className="flex gap-6 px-5">
            <ImageCard src={reservation.picture} alt="" />
            <div className="w-50">
              <h3 className="font-semibold">{reservation.name}</h3>
              <div>
                <ImageProfile src={reservation.profile} alt="" />
                <div className="flex gap-5">
                  <h1 className="font-semibold text-gray-700">
                    {reservation.client}
                  </h1>
                </div>
              </div>
            </div>
            <div className="pt-15">
              <span>{reservation.connected}</span>
            </div>
            <div>
              <button
                className={`${
                  reservation.date.length > 2 ? "bg-red-500" : "bg-green-500"
                } px-3 h-10 rounded-sm shadow-lg ${
                  reservation.id === 3 && "bg-yellow-500"
                }`}
              >
                {reservation.date}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TauxDeRemplissage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center px-3">
        <h1 className="text-xl">Taux de remplissage </h1>
        <span className="text-green-400 font-bold items-right"> + 18,2%</span>
      </div>
      <div className="flex px-8">
        <div>
          <div className="flex gap-3">
            <div className="w-8 bg-green-200 h-8 rounded-sm">
              <NotepadText color="green" className="m-auto pt-1" size={27} />
            </div>
            <h3 className="text-gray-600">Reservees</h3>
          </div>
          <br />
          <h1>62,2%</h1>
          <br />
          <p>12</p>
        </div>
        <LigneVerticale />
        <div>
          <div className="flex gap-3">
            <h1>Libre</h1>
            <div className="w-8 bg-blue-200 h-8 rounded-sm">
              <NotepadText color="blue" className="m-auto pt-1" size={27} />
            </div>
          </div>
          <br />
          <h1>37,8%</h1>
          <br />
          <p>8</p>
        </div>
      </div>
    </div>
  );
}

function RevenuGenere() {
  const data = [
    { name: "Jan", value: 43 },
    { name: "Feb", value: 35 },
    { name: "Mar", value: 40 },
    { name: "Apr", value: 80 },
    { name: "May", value: 50 },
  ];

  return (
    <div className="px-3">
      <div>
        <NotepadText className=" rounded-full bg-green-300" color="green" />
        <h4 className="text-lg">Revenue genere</h4>
      </div>
      <div className="text-center h-50">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Statistique() {
  return (
    <div>
      <div>
        <StatistiqueReservation />
      </div>
    </div>
  );
}
function ResumerStatPartie1() {
  return (
    <div className="flex gap-9 justify-start pl-12">
      <Card4>
        <div className="flex justify-around">
          <div className="bg-red-100 w-18 h-16 rounded-lg">
            <BedDouble color="red" size={45} className="m-auto pt-5" />
          </div>
          <div>
            <h1 className="font-bold text-xl">87</h1>
            <h1 className="text-gray-500">Nouvelle reservation</h1>
          </div>
        </div>
      </Card4>
      <Card4>
        <div className="flex justify-around">
          <div className="bg-red-100 w-18 h-16 rounded-lg">
            <BedDouble color="red" size={45} className="m-auto pt-5" />
          </div>
          <div>
            <h1 className="font-bold text-xl">165</h1>
            <h1 className="text-gray-500">Reservation</h1>
          </div>
        </div>
      </Card4>
      <div className="flex gap-7 pl-4">
        <CardSpecial>
          <div className="flex justify-around">
            <div className="bg-red-100 w-18 h-16 rounded-lg">
              <Save color="red" size={45} className="m-auto pt-5" />
            </div>
            <div>
              <h1 className="font-bold text-xl">50</h1>
              <h1 className="text-gray-500">Enregistrement</h1>
            </div>
          </div>
        </CardSpecial>
        <CardSpecial>
          <div className="flex justify-around">
            <div className="bg-red-100 w-18 h-16 rounded-lg">
              <Verified color="red" size={45} className="m-auto pt-5" />
            </div>
            <div>
              <h1 className="font-bold text-xl">10</h1>
              <h1 className="text-gray-500">Verification</h1>
            </div>
          </div>
        </CardSpecial>
      </div>
    </div>
  );
}

function AfficheAppelRecents() {
  return (
    <div>
      <div className="flex justify-between px-5">
        <div>
          <h1 className="text-2xl">Appels recentes</h1>
        </div>
        <div>
          <h1>Voir tout</h1>
        </div>
      </div>
      <br />
      <ul>
        {appelRecents.map((liste) => {
          return (
            <li key={`${liste.id}-${liste.date}`}>
              <div className="flex justify-between px-5">
                <div className="flex gap-4">
                  <span>
                    {liste.status ? (
                      <div className="w-9 h-8 bg-green-200 rounded-lg ">
                        <PhoneIncoming
                          color="green"
                          size={25}
                          className="m-auto pt-2"
                        />
                      </div>
                    ) : (
                      <div className="w-9 h-8 bg-red-200 rounded-lg ">
                        <PhoneMissed
                          color="red"
                          size={25}
                          className="m-auto pt-2"
                        />
                      </div>
                    )}
                  </span>
                  <div className="flex flex-col gap-4">
                    <h1 className="font-semibold">{liste.name}</h1>
                    <div className="flex gap-3">
                      <ImageProfile src={liste.profile} />
                      <h1 className="font-semibold">{liste.client}</h1>
                    </div>
                  </div>
                </div>
                <div>
                  <h1>{liste.date}</h1>
                  <div>
                    <p className="text-red-500">{liste.cause}</p>
                  </div>
                </div>
              </div>
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Dashbord() {
  return (
    <div>
      <div>
        <ResumerStatPartie1 />
      </div>
      <div className="flex gap-12">
        <div className="flex flex-col">
          <Card>
            <Calendar />
            <LigneHorizontale />
            <AffichageChambreReservee />
          </Card>
        </div>
        <div>
          <div className="flex gap-8">
            <Card2>
              <TauxDeRemplissage />
            </Card2>
            <Card2>
              <RevenuGenere />
            </Card2>
          </div>
          <br />
          <Card3>
            <Statistique />
          </Card3>
          <Card3>
            <AfficheAppelRecents />
          </Card3>
        </div>
      </div>
    </div>
  );
}

const Card = styled.div`
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgb(0, 0, 0, 0.2);
  width: 700px;
  background-color: white;
  margin-left: 50px;
  margin-top: 10px;
  padding-bottom: 30px;
`;
const Card2 = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgb(0, 0, 0, 0.2);
  width: 350px;
  height: 250px;
  background-color: white;
  padding-top: 40px;
`;
const Card3 = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgb(0, 0, 0, 0.2);
  width: 730px;
  height: 400px;
  background-color: white;
  padding-top: 40px;
`;
const Card4 = styled.div`
  width: 332px;
  height: 100px;
  background-color: white;
  padding-top: 22px;
  box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const CardSpecial = styled.div`
  width: 350px;
  height: 100px;
  background-color: white;
  padding-top: 22px;
  box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const ImageCard = styled.img`
  width: 155px;
  height: 100px;
  margin-left: 10px;
  border-radius: 10px;
`;
const ImageProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;
const LigneHorizontale = styled.div`
  width: 550px;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.2);
  margin: auto;
`;
const LigneVerticale = styled.div`
  height: 50px;
  width: 1px;
  background-color: rgb(0, 0, 0, 0.2);
  margin: auto;
`;
export default Dashbord;
