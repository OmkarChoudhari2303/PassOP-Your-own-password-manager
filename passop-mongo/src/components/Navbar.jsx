import React from "react";
const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-around items-center px-4  py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-700">&lt;</span>

          <span>Pass</span>
          <span className="text-green-500">OP&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="#">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
            <a className="hover:font-bold" href="./About.jsx">
              About
            </a>
          </li>
        </ul> */}
        <button className="text-white bg-green-700 cursor-pointer my-5 flex rounded-full flex justify-center items-center ring-white ring-1">
          <img className="invert w-9 p-1" src="icons/github.svg" alt="github" />
          <span className="font-bold px-2 text-black "><a href="https://github.com/OmkarChoudhari2303">Github</a></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
