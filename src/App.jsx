import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import DonorPage from "./pages/DonorPage";
import RecipientPage from "./pages/RecipientPage";
import ImpactPage from "./pages/ImpactPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/recipient" element={<RecipientPage />} />
        <Route
          path="/how-it-works"
          element={<h1>How It Works Page</h1>}
        />
        <Route path="/impact" element={<ImpactPage />} />
        <Route
          path="/about"
          element={<h1>About Page</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;