import { useContext, useEffect, useState } from "react";
//librarys
import Calendar from "react-calendar";
import Select from "react-select";
//react-router-dom
import { PresupuestoContext } from "./components/PresupuestoContext";
import { Link } from "react-router-dom";
//styles components
import "react-calendar/dist/Calendar.css";
import swal from "sweetalert";
import "./css/bootstrap.min.css";
import "./App.css";

function App() {
  //states
  const [date, setDate] = useState(new Date());
  const [diferenciaMeses, setDiferenciaMeses] = useState();
  const [servicio, setServicio] = useState([]);
  const [cuota, setCuota] = useState(1);
  const [precio, setPrecio] = useState(0);
  const [entrega, setEntrega] = useState(0);
  const [presupuestoActual, setPresupuestoActual] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  //context
  const { setPresupuesto } = useContext(PresupuestoContext);

  //date

  //dates of services
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
  // date dues
  const cuotas = [
    { value: 1, label: "1x", porcentaje: 0 },
    { value: 3, label: "3x (sin interés)", porcentaje: 0 },
    { value: 6, label: "6x (sin interés)", porcentaje: 0 },
    { value: 9, label: "9x", porcentaje: 25 },
    { value: 12, label: "12x", porcentaje: 50 },
    { value: 15, label: "15x", porcentaje: 63 },
    { value: 18, label: "18x", porcentaje: 75 },
    { value: 24, label: "24x", porcentaje: 100 },
    { value: 30, label: "30x", porcentaje: 125 },
    { value: 36, label: "36x", porcentaje: 150 },
  ];
  //date advancement
  const entregas = [
    { value: 0, label: "Sin adelanto" },
    { value: 3000, label: "$3.000" },
    { value: 4000, label: "$4.000" },
    { value: 5000, label: "$5.000" },
    { value: 6000, label: "$6.000" },
    { value: 7000, label: "$7.000" },
    { value: 8000, label: "$8.000" },
    { value: 9000, label: "$9.000" },
    { value: 10000, label: "$10.000" },
  ];
  //date months
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
  //date days
  const dias_semana = [
    "Domingo",
    "Lunes",
    "martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  //chosen date text
  const fechaElegida =
    dias_semana[date.getDay()] +
    ", " +
    date.getDate() +
    " de " +
    meses[date.getMonth()] +
    " de " +
    date.getUTCFullYear();

  //price of the service
  let cuotaValue = cuota.value;
  let entregaValue = entrega.value;
  let cuotaPorcentaje = cuota.porcentaje;
  if (cuotaPorcentaje === undefined) {
    cuotaPorcentaje = 0;
  }
  if (entregaValue === undefined) {
    entregaValue = 0;
  }
  if (cuotaValue === undefined) {
    cuotaValue = 1;
  }
  const total = servicio.map((item) => item.price).reduce((a, b) => a + b, 0);
  const totalConEntrega = total - entregaValue;
  const totalConCuota = total + (totalConEntrega * cuotaPorcentaje) / 100;
  const precioCuota = Math.round((totalConCuota - entregaValue) / cuotaValue);

  // functions

  //swal alert functions
  if (diferenciaMeses < cuota.value && cuota.value !== 1) {
    swal(
      "Las cuotas deben finalizar antes de la fecha elegida.",
      "(Cambia la fecha o la cantidad cuotas)"
    );
    setCuota(1);
  }

  //select services
  const handleService = (e) => {
    if (e.length > 0) {
      setIsDisabled(false);
      setPrecio(totalConEntrega);
    } else {
      setIsDisabled(true);
      setPrecio(0);
      setCuota(1);
      setEntrega(0);
    }
    setServicio(e);
  };

  //select shares
  function handleCuota(e) {
    setCuota(e);
  }

  //select advance money
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

  //select delivery
  const handleEntrega = (e) => {
    if (e.value > servicio.map((e) => e.price)) {
      swal(
        "El monto del adelanto no puede ser mayor al total",
        "Cambia el monto del adelanto"
      );
      setEntrega(0);
      setPrecio(0);
      setCuota(1);
    }
    setEntrega(e);
  };

  // select useEffects

  //setPrecio
  useEffect(() => {
    if (servicio.length > 0) {
      setPrecio(totalConCuota);
    }
  }, [servicio, cuota, totalConCuota]);

  //array of budget
  useEffect(() => {
    let presupuesto = [
      {
        fecha: fechaElegida,
        servicio: servicio,
        cuota: cuota,
        entrega: entrega,
        precio: precio,
        totalConCuota: totalConCuota,
        totalConEntrega: totalConEntrega,
        precioCuota: precioCuota,
        cuotaValue: cuotaValue,
        entregaValue: entregaValue,
      },
    ];
    setPresupuestoActual(presupuesto);
  }, [
    servicio,
    cuota,
    entrega,
    fechaElegida,
    precio,
    totalConCuota,
    totalConEntrega,
    precioCuota,
    cuotaValue,
    entregaValue,
  ]);

  //setPresupuestoActual
  const onAdd = () => {
    setPresupuesto(...presupuestoActual);
  };

  return (
    <>
      <div className="container-xl mt-3 ">
        <nav className="text-center">
          <a
            href="https://camilagonzalez.ar/"
            target="_blank"
            rel="noreferrer"
            className="logo"
          >
            Camila Gonzalez
          </a>
        </nav>
        <h1 className="text-center">PRESUPUESTADOR</h1>
        <div className="row mt-4">
          <div className="col-xs-12 col-sm-6 col-md-5 elegir-fecha">
            <div className="fecha">
              <h5>*Elegir fecha: </h5>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} locale={"es-ES"} />
              </div>
              <p className="mt-3">
                <span className="bold">Fecha elegida: </span>
                <b>{fechaElegida}</b>
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-7">
            <div className="mb-4 servicios">
              <h5>*Servicio/s: </h5>
              <Select
                options={servicios}
                isMulti
                onChange={handleService}
                placeholder="Seleccionar el servicio. (Puede ser más de uno)"
              />
              <p className="servicios-texto">
                (Visita{" "}
                <a
                  href="https://camilagonzalez.ar/"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.camilagonzalez.ar
                </a>{" "}
                para mas detalles.)
              </p>
            </div>
            <div className="mb-4 cuotas">
              <h5>*¿En cuántas cuotas?</h5>
              <Select
                options={cuotas}
                // defaultValue={cuotas[0]}
                value={cuota}
                onChange={handleCuota}
                isDisabled={isDisabled}
                placeholder="Seleccionar la cantidad de cuotas"
              />
            </div>
            <div className="mb-4 adelanto">
              <h5>¿Querés hacer un adelanto? (opcional)</h5>
              <Select
                options={entregas}
                // defaultValue={entregas[0]}
                onChange={handleEntrega}
                value={entrega}
                isDisabled={isDisabled || servicio.length < 1}
                placeholder="Seleccionar el monto de adelanto"
              ></Select>
            </div>
            {(cuota < 0.5) | (servicio.length === 0) ? (
              <div className="pt-5 mb-3 precio-total">
                <h3>Seleccionar fecha, servicio/s y cuota/s.</h3>
              </div>
            ) : (
              <div className="pt-4 mb-3 precio-total">
                <h4>
                  <b>
                    Precio total: $
                    {precio
                      ? new Intl.NumberFormat("de-DE").format(precio)
                      : "0"}
                  </b>
                </h4>

                <h4>
                  {precioCuota > 0 ? (
                    <>
                      {cuotaValue}
                      {cuotaValue === 1 ? " pago de $" : "x cuotas de $"}
                      {precioCuota
                        ? new Intl.NumberFormat("de-DE").format(precioCuota)
                        : "0"}
                      {entregaValue > 1
                        ? " ($" +
                          new Intl.NumberFormat("de-DE").format(entregaValue) +
                          " de adelanto)"
                        : ""}
                    </>
                  ) : (
                    <>
                      {" ($" +
                        new Intl.NumberFormat("de-DE").format(entregaValue) +
                        " de adelanto)"}
                    </>
                  )}
                </h4>
              </div>
            )}
            <Link to="/form">
              <button onClick={onAdd} className="btn btn-primary">
                <b>Ver presupuesto</b>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
