import React, { useState } from "react";
import Select from "react-select";
const servicios = [
  { value: "book15clascio", label: "Book de 15 (Clásico)", price: 13900 },
  { value: "book15dorado", label: "Book de 15 (Dorado)", price: 17900 },
  { value: "fiesta15", label: "Fiesta de 15 (Completa)", price: 17000 },
  { value: "fiesta3hs", label: "Fiesta/Reunión (3 hs)", price: 7000 },
  { value: "fiesta5hs", label: "Fiesta/Reunión (5 hs)", price: 10000 },
  {
    value: "sesionInfExpress",
    label: "Sesión infantil (Express)",
    price: 4800,
  },
  {
    value: "sesionInfClasico",
    label: "Sesión infantil (Clásico)",
    price: 5800,
  },
  {
    value: "sesionInfMagico",
    label: "Sesión infantil (Mágico)",
    price: 7800,
  },
];

const Options = () => {
  const [change, setChange] = useState("");

  function handleChange(e) {
    setChange(e.target.value);
  }

  return (
    <>
      <form>
        <label>
          <select multiple={true} value={change} onChange={handleChange}>
            {servicios.map((servicio) => (
              <option key={servicio.value} value={servicio.value}>
                {servicio.label}
              </option>
            ))}
          </select>
          <div>{change}</div>
        </label>
      </form>
    </>
  );
};

export default Options;
