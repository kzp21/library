
import { Link } from "react-router-dom";

const NavBar = () => {
   return(
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
            Library
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
          <Link to={"/"} className="nav-link">
              Books
          </Link>
          </li>
          <li className="nav-item">
          <Link to={"/add"} className="nav-link">
              Add
          </Link>
          </li>
        </div>
    </nav>
   );
}

export default NavBar;

