import { Link } from "react-router";
import LoginImage from "../../../src/assets/Login.jpg";
import Logologo from "../../assets/Preview.png";

function handleSubmit(e) {
  return e.preventDefault();
}

function Login() {
  return (
    <div className="grid grid-cols-[1.5fr_2fr] max-sm:flex flex-col">
      <div className="relative h-240 w-full">
        <div className="absolute inset-0 shadow-lg shadow-black/20 ">
          <img src={LoginImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-5 mt-40">
          <img src={Logologo} className="w-30  rounded-full" />
          <h1 className="text-3xl font-semibold">Heureux de vous revoir</h1>
          <div>
            <p className="text-gray-600">
              Experience utilisateur & conception d'interfce
            </p>
            <p className="opacity-60 text-center">Strategie Solution SaaS</p>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-red-50 flex flex-col items-center justify-center h-240">
          <div className="flex flex-col items-center justify-center gap-10 ">
            <h2 className="text-3xl font-semibold">
              Connectez vous avec un compte admin
            </h2>
            <div>
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
                  <button className="bg-red-600 text-white rounded-sm px-25 h-10 hover:opacity-70 transition">
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
