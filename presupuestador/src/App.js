import "./App.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";

function App() {
  const [date, setDate] = useState(new Date());
  const [diferenciaMeses, setDiferenciaMeses] = useState();
  const [servicio, setServicio] = useState([]);
  const [cuota, setCuota] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [precio, setPrecio] = useState("");

  console.log(diferenciaMeses);
  console.log(cuota.value);

  const servicios = [
    { value: "book15clascio", label: "Book de 15 (Clásico)", price: 13900 },
    { value: "book15dorado", label: "Book de 15 (Dorado)", price: 17900 },
    { value: "fiesta15", label: "Fiesta de 15", price: 17000 },
  ];

  const cuotas = [
    { value: 1, label: "1x", porcentaje: 0 },
    { value: 3, label: "3x (sin interés)", porcentaje: 0 },
    { value: 6, label: "6x (sin interés)", porcentaje: 0 },
    { value: 9, label: "9x", porcentaje: 30 },
    { value: 12, label: "12x", porcentaje: 50 },
    { value: 18, label: "18x", porcentaje: 75 },
    { value: 24, label: "24x", porcentaje: 100 },
    { value: 30, label: "30x", porcentaje: 125 },
    { value: 36, label: "36x", porcentaje: 150 },
  ];

  if (diferenciaMeses < cuota.value) {
    alert("Las cuotas deben finalizar antes de la fecha");
    setCuota(1);
  }

  // seleccionar servicio/s
  const handleService = (e) => {
    setServicio(e);
    if (e.length > 0) {
      setIsDisabled(false);
      setPrecio(totalConCuota);
    } else {
      setIsDisabled(true);
      setPrecio(0);
      setCuota(1);
    }
  };

  const handleCuota = (e) => {
    setCuota(e);
  };
  const cuotaValue = cuota.value;

  // console.log(servicio.map((item) => item.price));
  //sumar los precios de los items servicio
  const total = servicio.map((item) => item.price).reduce((a, b) => a + b, 0);

  //calcular el total con el porcentaje de la cuota
  const totalConCuota = total + (total * cuota.porcentaje) / 100;

  const precioCuota = Math.round(totalConCuota / cuota.value);

  // Creamos array con los meses del año
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  // Creamos array con los días de la semana
  const dias_semana = [
    "Domingo",
    "Lunes",
    "martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  // Construimos el formato de salida
  const fechaElegida =
    dias_semana[date.getDay()] +
    ", " +
    date.getDate() +
    " de " +
    meses[date.getMonth()] +
    " de " +
    date.getUTCFullYear();

  useEffect(() => {
    function monthDiff(d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    }
    setDiferenciaMeses(monthDiff(new Date(), new Date(date)));
  }, [date]);

  useEffect(() => {
    if (servicio.length > 0) {
      setPrecio(totalConCuota);
    }
  }, [servicio, cuota, totalConCuota]);

  return (
    <div className="app">
      <h1 className="text-center">Presupuestador</h1>
      <div>
        <h2>Elegir FECHA: </h2>
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} locale={"es-ES"} />
        </div>
        <p className="text-center">
          <span className="bold">Fecha seleccionada: </span>
          {fechaElegida}
        </p>

        <h2>Precio TOTAL: ${precio ? precio : "0"}</h2>
        <h2>
          ({cuotaValue}x cuotas de ${precioCuota ? precioCuota : "0"})
        </h2>
      </div>
      <div>
        <h2>Elegir SERVICIO: </h2>
        <Select
          options={servicios}
          isMulti
          onChange={handleService}
          placeholder="Selecciona el o los servicios"
        />
        <h2>¿En cuántas cuotas?</h2>
        <Select
          options={cuotas}
          onChange={handleCuota}
          isDisabled={isDisabled}
          placeholder="Selecciona la cantidad de cuotas"
        />
      </div>
    </div>
  );
}

export default App;
