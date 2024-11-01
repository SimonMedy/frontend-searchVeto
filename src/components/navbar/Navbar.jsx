import {
  ArrowRightStartOnRectangleIcon,
  EyeDropperIcon,
} from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeSwitcherDropdown from "../theme/ThemeSwitcherDropdown";
import LogoutModal from "./LogoutModal";
import Logo from "./Logo";

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  return (
    <div className="navbar w-full bg-primary text-primary-content">
      <div className="flex-1 font-bold flex justify-between items-center">
        <Link to={"/"}>
          <div className="btn btn-ghost flex justify-center items-center">
            <Logo
              circleColor="text-base-content"
              iconColor=" text-base-100"
              className="w-12 h-12"
            />
            <span className="text-lg">SearchVeto</span>
          </div>
        </Link>
        <div className="flex-1 flex justify-center space-x-4">
          <Link to="/animals" className="btn btn-ghost">
            <span className="text-lg">Mes animaux</span>
          </Link>
          <Link to="/rendezvous" className="btn btn-ghost">
            <span className="text-lg">Mes rendez-vous</span>
          </Link>
          <Link to="/clinics" className="btn btn-ghost">
            <span className="text-lg">Cliniques vétérinaires</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4 me-3">
          <div className="dropdown dropdown-end dropdown-hover">
            <button tabIndex={0} className="btn m-1">
              <EyeDropperIcon className="w-5 h-5" />
              <h2 className="text-base">Themes</h2>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <ThemeSwitcherDropdown />
              </li>
            </ul>
          </div>
          <button className="btn btn-circle" onClick={openLogoutModal}>
            <ArrowRightStartOnRectangleIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
      {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal} />
      )}
    </div>
  );
};

export default Navbar;
