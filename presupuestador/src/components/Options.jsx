import React, { useState } from "react";
import Select from "react-select";

const servicios = [
  { value: "book15clascio", label: "Book de 15 (Clásico)", price: 13900 },
  { value: "book15dorado", label: "Book de 15 (Dorado)", price: 17900 },
  { value: "fiesta15", label: "Fiesta de 15", price: 17000 },
];

const cuotas = [
  { value: 3, label: "3x (sin interés)", porcentaje: 0 },
  { value: 6, label: "6x (sin interés)", porcentaje: 0 },
  { value: 9, label: "9x", porcentaje: 30 },
  { value: 12, label: "12x", porcentaje: 50 },
  { value: 18, label: "18x", porcentaje: 75 },
  { value: 24, label: "24x", porcentaje: 100 },
  { value: 30, label: "30x", porcentaje: 125 },
  { value: 36, label: "36x", porcentaje: 150 },
];

const Options = () => {
  const [servicio, setServicio] = useState([]);
  const [cuota, setCuota] = useState(1);

  const handleService = (e) => {
    setServicio(e);
  };

  const handleCuota = (e) => {
    setCuota(e);
  };
  console.log(servicio.map((item) => item.price));
  //sumar los precios de los items servicio
  const total = servicio.map((item) => item.price).reduce((a, b) => a + b, 0);
  console.log(total);

  //calcular el total con el porcentaje de la cuota
  const totalConCuota = total + (total * cuota.porcentaje) / 100;
  console.log(Math.round(totalConCuota / cuota.value));

  return (
    <>
      <Select options={servicios} isMulti onChange={handleService} />
      <h2>Elegir CUOTAS</h2>
      <Select options={cuotas} onChange={handleCuota} />
    </>
  );
};

export default Options;
