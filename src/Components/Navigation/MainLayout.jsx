import NavBar from "../NavBar";
import { Outlet } from "react-router";
import NavBarHorizontale from "../NavBarHorizontale";

function MainLayout() {
  return (
    <div className="pl-5">
      <div>
        <NavBarHorizontale />
      </div>
      <div className="grid grid-cols-[15%_85%] max-md:grid-cols-1">
        <div className="">
          <NavBar />
        </div>

        <main className="bg-zinc-100 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default MainLayout;
