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
import { LiensContext } from "../../utils/context";
import { useState, useContext, useEffect } from "react";

function NavBar() {
  const [bgColor, setBgcolor] = useState(null);
  const dashBordNavigation = [
    { name: "Tableau de bord", logo: <Home />, href: "/Dashbord" },
    { name: "Clients", logo: <User />, href: "/Clients" },
    { name: "Chambres", logo: <DoorClosed />, href: "/Chambres" },
    { name: "Calendrier", logo: <Calendar />, href: "/Calendrier" },
    { name: "Reservations", logo: <CheckCircle />, href: "/Reservation" },
    { name: "Factures", logo: <FileText />, href: "/Factures" },
    { name: "Checkout", logo: <ShoppingBag /> },
    { name: "Appels", logo: <Phone /> },
    { name: "Clients connectes", logo: <Users2Icon /> },
  ];
  const { liens } = useContext(LiensContext);

  useEffect(() => {
    if (liens === "Tableau de bord") {
      setBgcolor(0);
    }
    if (liens === "Liste des clients") {
      setBgcolor(1);
    }
    if (liens === "Chambres") {
      setBgcolor(2);
    }
    if (liens === "Calendrier") {
      setBgcolor(3);
    }
    if (liens === "Commande") {
      setBgcolor(4);
    }
    if (liens === "Factures") {
      setBgcolor(5);
    }
  }, [liens]);

  return (
    <div>
      <ul className="flex flex-col gap-7">
        {dashBordNavigation.map((nav, index) => (
          <Link
            to={`${nav.href}`}
            key={`${nav.name}-${index}`}
            className={`font-semibold flex gap-5 hover:scale-101 transition-all ${
              bgColor === index
                ? "text-blue-600 bg-blue-100 rounded-full p-1 shadow"
                : ""
            }`}
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
