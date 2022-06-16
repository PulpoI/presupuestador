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
  const [cuota, setCuota] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [precio, setPrecio] = useState(0);
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
    { value: 3000, label: "$3.000" },
    { value: 4000, label: "$4.000" },
    { value: 5000, label: "$5.000" },
    { value: 6000, label: "$6.000" },
    { value: 7000, label: "$7.000" },
    { value: 8000, label: "$8.000" },
    { value: 9000, label: "$9.000" },
    { value: 10000, label: "$10.000" },
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
    } else {
      setIsDisabled(true);
      setPrecio(0);
      setCuota(1);
    }
  };

  const handleCuota = (e) => {
    setCuota(e);
  };

  useEffect(() => {
    if (servicio.length < 1) {
      setCuota("");
    }
  }, [servicio]);

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

  //sumar los precios de los items servicio
  const total = servicio.map((item) => item.price).reduce((a, b) => a + b, 0);

  //calcular el total con el porcentaje de la cuota
  const totalConCuota = total + (total * cuota.porcentaje) / 100;

  const precioCuota = Math.round((totalConCuota - entregaValue) / cuotaValue);

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
    <div className="container-xl mt-3">
      <h1 className="text-center">Presupuestador</h1>
      <div className="row mt-5">
        <div className="col-xs-12 col-sm-6 col-md-5 elegir-fecha">
          <h4>Elegir fecha: </h4>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} locale={"es-ES"} />
          </div>
          <p>
            <span className="bold">Fecha elegida: </span>
            {fechaElegida}
          </p>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-7">
          <div className="mb-3">
            <h4>Servicio/s: </h4>
            <Select
              options={servicios}
              isMulti
              onChange={handleService}
              placeholder="Seleccionar el servicio. (Puede ser más de uno)"
            />
          </div>
          <div className="mb-3">
            <h4>¿En cuántas cuotas?</h4>
            <Select
              options={cuotas}
              // defaultValue={cuotas[0]}
              onChange={handleCuota}
              isDisabled={isDisabled}
              placeholder="Seleccionar la cantidad de cuotas"
            />
          </div>
          <div className="mb-3">
            <h4>¿Querés hacer un adelanto? (opcional)</h4>
            <Select
              options={entregas}
              // defaultValue={entregas[0]}
              onChange={handleEntrega}
              isDisabled={isDisabled || servicio.length < 1}
              placeholder="Seleccionar el monto de adelanto"
            ></Select>
          </div>
          {(cuota < 0.5) | (servicio.length === 0) ? (
            <div className="pt-5 mb-3 precio-total">
              <h3>Seleccionar fecha, servicio/s y cuota/s.</h3>
            </div>
          ) : (
            <div className="pt-5 mb-3 precio-total">
              <h3>
                Precio TOTAL: $
                {precio ? new Intl.NumberFormat("de-DE").format(precio) : "0"}
              </h3>

              <h3>
                ({cuotaValue}
                {cuotaValue === 1 ? " pago de $" : "x cuotas de $"}
                {precioCuota
                  ? new Intl.NumberFormat("de-DE").format(precioCuota)
                  : "0"}
                )
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
