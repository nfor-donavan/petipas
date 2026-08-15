import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Tips from "./pages/Tips";
import Milestones from "./pages/Milestones";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
