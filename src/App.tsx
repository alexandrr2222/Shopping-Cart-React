import { NavLink, Outlet } from "react-router";

function App() {
  return (
    <div>
      <NavLink
        className={({ isActive }) => (isActive ? "activePage" : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "activePage" : "")}
        to="/cart"
      >
        Cart
      </NavLink>
      <Outlet />
    </div>
  );
}

export default App;
