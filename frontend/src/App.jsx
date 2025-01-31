import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CVEDashboard from "./components/cve/CVEDashboard";
import CVEPage from "./pages/CVEPage"; // Assuming this is the page to display individual CVE details

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cves/list" element={<CVEDashboard />} />
        <Route path="/cves/list/:id" element={<CVEPage />} />
      </Routes>
    </Router>
  );
}

export default App;
