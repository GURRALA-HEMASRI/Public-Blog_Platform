import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span>✒</span> Inkwell
        </Link>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/create">+ Write</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}