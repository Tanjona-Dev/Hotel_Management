import { useContext } from "react";
import { Link } from "react-router";
import { LogOut, Search } from "lucide-react";
import { LiensContext } from "../../utils/context";
import LogoHotel from "../../assets/logoHotel.png"

function NavBarHorizontale() {
  const { liens } = useContext(LiensContext);
  return (
    <div>
      <div className="flex items-center py-3 mx-auto">
        <div>
            <img src={LogoHotel} alt="" className="w-20 h-18 ml-10 mr-22" />
        </div>
        <div className="flex items-center ml-17 w-100 font-bold text-2xl">
          {liens}
        </div>
        <div className="relative mx-auto">
          <Search
            color="black"
            className="absolute left-56 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 "
          />
          <input
            type="text"
            placeholder="Recherche..."
            id="recherche"
            className="pl-10 pr-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-gray-200"
          />
        </div>
        <div>
          <Link to={`/`}>
            <LogOut className="mr-8 cursor-pointer" color="gray" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBarHorizontale;
