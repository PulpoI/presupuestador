import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Form from "./components/Form";
import PresupuestoProvider from "./components/PresupuestoContext";

function Router() {
  return (
    <PresupuestoProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </PresupuestoProvider>
  );
}

export default Router;
