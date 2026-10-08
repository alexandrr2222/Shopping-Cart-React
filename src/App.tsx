import { NavLink, Outlet } from "react-router";

function App() {
  return (
    <div>
      <nav className="flex gap-3">
        <NavLink
          className={({ isActive }) => (isActive ? "activePage" : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "activePage" : "")}
          to="/shop"
        >
          Shop
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "activePage" : "")}
          to="/cart"
        >
          Cart
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
