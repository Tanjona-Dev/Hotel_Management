import { Link } from "react-router";
import {
  Calendar,
  CheckCircle,
  DoorClosed,
  FileText,
  Home,
  Phone,
  ShoppingBag,
  User,
  Users2Icon,
} from "lucide-react";
import { useState } from "react";

function NavBar() {
  const [bgColor, setBgcolor] = useState(null);
  const dashBordNavigation = [
    { name: "Tableau de bord", logo: <Home />, href: "/Dashbord" },
    { name: "Clients", logo: <User />, href: "/Clients" },
    { name: "Chambres", logo: <DoorClosed />, href: "/Chambres" },
    { name: "Calendrier", logo: <Calendar />, href: "/Calendrier" },
    { name: "Reservations", logo: <CheckCircle />, href: "/Reservation" },
    { name: "Factures", logo: <FileText /> },
    { name: "Checkout", logo: <ShoppingBag /> },
    { name: "Appels", logo: <Phone /> },
    { name: "Clients connectes", logo: <Users2Icon /> },
  ];

  function bgControleColor(index) {
    setBgcolor(index);
  }

  return (
    <div>
      <ul className="flex flex-col gap-7">
        {dashBordNavigation.map((nav, index) => (
          <Link
            to={`${nav.href}`}
            key={`${nav.name}-${index}`}
            className={`font-semibold flex gap-5 ${
              bgColor === index ? "text-blue-600" : ""
            }`}
            onClick={() => bgControleColor(index)}
          >
            {nav.logo}
            {nav.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
export default NavBar;
