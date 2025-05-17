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
import { useState, useContext, useEffect } from "react";
import { LiensContext } from "../../utils/context";

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
  }, [liens]);

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
