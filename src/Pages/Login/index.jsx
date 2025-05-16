import { Link } from "react-router";
import LoginImage from "../../../src/assets/Login.jpg";
import Logologo from "../../assets/Preview.png";
import logoHotel from "../../assets/logoHotel.png";

function handleSubmit(e) {
  return e.preventDefault();
}

function Login() {
  return (
    <div className="grid grid-cols-[2fr_2fr] max-sm:flex flex-col">
      <div className="relative h-240 w-full">
        <div className="absolute inset-0  shadow-lg shadow-black/20">
          <img src={LoginImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-5 mt-40">
          <img src={logoHotel} className="w-30 opacity-80" />
          <h1 className="text-3xl font-semibold text-white/70">
            Heureux de vous revoir
          </h1>
          <div>
            <p className="text-gray-600 playwrite">
              Experience utilisateur & conception d'interfce
            </p>
            <p className="opacity-60 text-center playwrite">
              Strategie Solution SaaS
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-red-100 flex flex-col items-center justify-center h-240">
          <div className="flex flex-col items-center justify-center gap-10 ">
            <h2 className="text-3xl font-semibold">
              Connectez vous avec un compte admin
            </h2>
            <div className="shadow-xl shadow-red-200 rounded p-10 transition-all duration-400 hover:scale-x-101 hover:shadow-white  ">
              <form action="" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <br />
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="maquette@exemple.com"
                  required
                  className=" rounded-sm bg-white  w-73 h-8"
                />
                <br />
                <br />
                <label htmlFor="password" className="font-medium">
                  Mot de passe
                </label>
                <br />
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="******"
                  required
                  className=" rounded-sm bg-white  w-73 h-8"
                />
                <br />
                <br />
                <input type="checkbox" name="" id="" />
                {/* je dois mettre un lien sur cette bouttoun pour naviger dans la page dashbord */}
                <div>
                  <button className="animate-bounce mt-5 bg-red-600 text-white rounded-sm px-25 h-10 hover:bg-red-700 transition">
                    <Link to={`/Dashbord`}>Se connecter</Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
