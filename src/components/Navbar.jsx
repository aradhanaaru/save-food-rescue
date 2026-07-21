import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? "bg-marigold text-white" : "text-ink/70 hover:bg-sand"
    }`;

  return (
    <nav className="border-b border-ink/10 bg-white">
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-display text-lg font-medium text-ink">
          SAVE
        </NavLink>
        <div className="flex gap-2">
          <NavLink to="/donor" className={linkClass}>
            Donate
          </NavLink>
          <NavLink to="/recipient" className={linkClass}>
            Recipient
          </NavLink>
          <NavLink to="/impact" className={linkClass}>
            Impact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
