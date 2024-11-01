import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import AnimalsPage from "./components/animals/AnimalsPage";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import AdminRoute from "./routes/AdminRoute";
import TestAuthRoute from "./pages/TestAuthRoute";
import TestAdminRoute from "./pages/TestAdminRoute";
import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";
import Accueil from "./pages/Accueil";
import ClinicPage from "./components/clinic/ClinicList";
import ClinicAdd from "./components/clinic/AddClinicForm";
import ClinicDetail from "./components/clinic/ClinicDetail";
import MesRendezVous from "./pages/MesRendezVous";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="bg-base-200">
      <Router>
        <ScrollToTop />
        {isAuthenticated && <Navbar />}
        <div className="flex-grow min-h-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AuthenticatedRoute />}>
              <Route path="/" element={<Accueil />} />
            </Route>
            <Route element={<AuthenticatedRoute />}>
              <Route path="/animals" element={<AnimalsPage />} />
            </Route>
            <Route element={<AuthenticatedRoute />}>
              <Route path="/clinics" element={<ClinicPage />} />
            </Route>
            <Route element={<AuthenticatedRoute />}>
              <Route path="/clinics/:id" element={<ClinicDetail />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/clinics/create" element={<ClinicAdd />} />
            </Route>
            <Route element={<AuthenticatedRoute />}>
              <Route path="/rendezvous" element={<MesRendezVous />} />
            </Route>
            <Route element={<AuthenticatedRoute />}>
              <Route path="/test-auth" element={<TestAuthRoute />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/test-admin" element={<TestAdminRoute />} />
            </Route>
            <Route path="/not-authorized" element={<div>Accès refusé</div>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
