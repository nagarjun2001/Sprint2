import React from 'react'
import logo from "../../assets/CandidateDashboard/RelevantzLogo.png";
import darkmode from "../../assets/CandidateDashboard/DarkMode.png";
import { Link } from 'react-router-dom';

function CandidateNavbar() {
  return (
    <div>
      <header className="bg-gray-100 py-2 w-full flex justify-center justify-between items-center shadow-md">
          <Link to="/candidatedashboard">
            <img
              src={logo}
              className="ml-14"
              alt="Relevantz Technology Services"
              width="170"
              height="44"
            ></img>
          </Link>
          <nav>
            <ul className="flex mr-14 text-black/1000 font-sm space-x-8">
              {/* <li>
                <img src={darkmode} className="mt-1" width={20}></img>
              </li> */}
              {/* <li>
                <Link to="/appliedjobs" className="hover:text-[#27235C] "> Applied Jobs</Link>
              </li>
              <li>
                <Link to="/appliedjobs">View All jobs</Link>
              </li> */}
              {/* <li>
                <Link to="/appliedjobs">Profile</Link>
              </li> */}
              <li>
                <Link to="/">Logout </Link>
              </li>
            </ul>
          </nav>
        </header>
    </div>
  )
}

export default CandidateNavbar;
