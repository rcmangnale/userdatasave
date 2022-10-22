import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddressDetails from "./components/Address";
import ContactDetails from "./components/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactDetails />} />
        <Route path="/address/:id" element={<AddressDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
