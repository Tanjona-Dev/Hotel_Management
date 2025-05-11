import { Link } from "react-router";
import { LiensContext } from "../../utils/context";
import { useContext } from "react";
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

function NavBar() {
  const dashBordNavigation = [
    { name: "Tableau de bord", logo: <Home />, href: "/Dashbord" },
    { name: "Clients", logo: <User />, href: "/Clients" },
    { name: "Chambres", logo: <DoorClosed />, href: "/Chambres" },
    { name: "Calendrier", logo: <Calendar />, href:"/Calendrier" },
    { name: "Reservations", logo: <CheckCircle /> },
    { name: "Factures", logo: <FileText /> },
    { name: "Checkout", logo: <ShoppingBag /> },
    { name: "Appels", logo: <Phone /> },
    { name: "Clients connectes", logo: <Users2Icon /> },
  ];

  const { setLiens } = useContext(LiensContext);

  function getLiensName(lienName) {
    setLiens(lienName);
  }

  return (
    <div>
      <ul className="flex flex-col gap-5">
        {dashBordNavigation.map((nav, index) => (
          <Link
            to={`${nav.href}`}
            key={`${nav.name}-${index}`}
            onClick={() => getLiensName(nav.name)}
            className="font-semibold flex gap-5 focus:text-blue-600"
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
