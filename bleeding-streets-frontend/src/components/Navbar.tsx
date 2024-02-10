import { Outlet, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header className="flex">
        <NavLink to="/"><img className="w-40" src={require('../images/bleeding-streets-logo.jpg')} alt="image"></img></NavLink>
        <nav className="navbar">
          <ul className="flex">
            <li className="p-5">
              <NavLink to="/">Characters</NavLink>
            </li>
            <li className="p-5">
              <NavLink to="roll-dice">Roll Dice</NavLink>
            </li>
            <li className="p-5">
              <NavLink to="about">About</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}