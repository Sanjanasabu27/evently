import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div className="app-shell">

      <Sidebar />

      <div className="main-content">

        <main className="page-shell">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;