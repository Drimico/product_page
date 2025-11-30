import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col h-full justify-center md:w-40 md:ml-20 s:pr-10 border-r-2">
      <div className="flex text-5xl font-bold text-black/70 w-full h-1/3 my-10">
        <div className="flex flex-col">
          <span>YO</span>
          <span>NO.</span>
        </div>
      </div>
      <div className="flex flex-col gap-30 items-start  w-full h-1/2 text-3xl text-black/50 font-raleway">
        <Link
          to="/"
          className={`transform rotate-270 transition duration-500 ${
            location.pathname === "/" ? "text-black/80 font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/create"
          className={`transform rotate-270 transition duration-500 ${
            location.pathname === "/create" ? "text-black/80 font-semibold" : ""
          }`}
        >
          Create
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
