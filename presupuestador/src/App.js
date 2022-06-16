import "./App.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import swal from "sweetalert";
import "./css/bootstrap.min.css";

function App() {
  const [date, setDate] = useState(new Date());
  const [diferenciaMeses, setDiferenciaMeses] = useState();
  const [servicio, setServicio] = useState([]);
  const [cuota, setCuota] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [precio, setPrecio] = useState("");
  const [entrega, setEntrega] = useState(0);

  const servicios = [
    { value: "book15clascio", label: "Book de 15 (Clásico)", price: 13900 },
    { value: "book15dorado", label: "Book de 15 (Dorado)", price: 17900 },
    { value: "fiesta15", label: "Fiesta de 15", price: 17000 },
  ];

  const cuotas = [
    { value: 1, label: "1x", porcentaje: 0 },
    { value: 3, label: "3x (sin interés)", porcentaje: 0 },
    { value: 6, label: "6x (sin interés)", porcentaje: 0 },
    { value: 9, label: "9x", porcentaje: 25 },
    { value: 12, label: "12x", porcentaje: 50 },
    { value: 18, label: "18x", porcentaje: 75 },
    { value: 24, label: "24x", porcentaje: 100 },
    { value: 30, label: "30x", porcentaje: 125 },
    { value: 36, label: "36x", porcentaje: 150 },
  ];

  const entregas = [
    { value: 0, label: "Sin entrega" },
    { value: 3000, label: "$3000" },
    { value: 4000, label: "$4000" },
    { value: 5000, label: "$5000" },
    { value: 6000, label: "$6000" },
    { value: 7000, label: "$7000" },
    { value: 8000, label: "$8000" },
    { value: 9000, label: "$9000" },
    { value: 10000, label: "$10000" },
  ];

  if (diferenciaMeses < cuota.value && cuota.value !== 1) {
    swal("Las cuotas deben finalizar antes de la fecha elegida.");
    setCuota(1);
  }

  // seleccionar servicio/s
  const handleService = (e) => {
    setServicio(e);
    if (e.length > 0) {
      setIsDisabled(false);
      setPrecio(totalConCuota);
      setCuota(1);
    } else {
      setIsDisabled(true);
      setPrecio(0);
      setCuota(1);
    }
  };

  const handleCuota = (e) => {
    setCuota(e);
  };
  let cuotaValue = cuota.value;
  let entregaValue = entrega.value;
  let cuotaPorcentaje = cuota.porcentaje;

  if (cuotaPorcentaje === undefined) {
    cuotaPorcentaje = 1;
  }

  if (entregaValue === undefined) {
    entregaValue = 0;
  }
  if (cuotaValue === undefined) {
    cuotaValue = 1;
  }

  // console.log(servicio.map((item) => item.price));
  //sumar los precios de los items servicio
  const total = servicio.map((item) => item.price).reduce((a, b) => a + b, 0);

  //calcular el total con el porcentaje de la cuota
  const totalConCuota = total + (total * cuota.porcentaje) / 100;

  const precioCuota = Math.round((totalConCuota - entregaValue) / cuotaValue);
  console.log(cuota.porcentaje);
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

  const handleEntrega = (e) => {
    setEntrega(e);
  };

  useEffect(() => {
    if (servicio.length > 0) {
      setPrecio(totalConCuota);
    }
  }, [servicio, cuota, totalConCuota]);

  return (
    <div className="container-xl">
      <h1 className="text-center">Presupuestador</h1>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6">
          <h3>Seleccionar Fecha: </h3>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} locale={"es-ES"} />
          </div>
          <p className="text-center">
            <span className="bold">Fecha seleccionada: </span>
            {fechaElegida}
          </p>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6">
          <h3>Elegir SERVICIO: </h3>
          <Select
            options={servicios}
            isMulti
            onChange={handleService}
            placeholder="Selecciona el o los servicios"
          />
          <h3>¿En cuántas cuotas?</h3>
          <Select
            options={cuotas}
            // defaultValue={cuotas[0]}
            onChange={handleCuota}
            isDisabled={isDisabled}
            placeholder="Selecciona la cantidad de cuotas"
          />
          <h3>¿Queres hacer un adelanto? (opcional)</h3>
          <Select
            options={entregas}
            // defaultValue={entregas[0]}
            onChange={handleEntrega}
            isDisabled={isDisabled}
            placeholder="Selecciona el monto de adelanto"
          ></Select>
        </div>
      </div>

      <h3>
        Precio TOTAL: $
        {precio ? new Intl.NumberFormat("de-DE").format(precio) : "0"}
      </h3>
      <h3>
        ({cuotaValue}x cuotas de $
        {precioCuota ? new Intl.NumberFormat("de-DE").format(precioCuota) : "0"}
        )
      </h3>
    </div>
  );
}

export default App;
