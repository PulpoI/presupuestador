import React, { useContext, useEffect, useState } from "react";
import { PresupuestoContext } from "./PresupuestoContext";
import Checkbox from "./Checkbox";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

const Form = () => {
  const { presupuesto } = useContext(PresupuestoContext);
  const [checkbox, setCheckbox] = useState(false);

  //change checkbox
  const changeCheckbox = () => {
    setCheckbox(!checkbox);
  };

  //generate jpg
  const generateJpg = () => {
    html2canvas(document.querySelector(".captura")).then((canvas) => {
      let enlace = document.createElement("a");
      enlace.download = "presupuesto.jpg";
      enlace.href = canvas.toDataURL();
      enlace.click();
    });
  };

  return (
    <>
      {presupuesto.length === 0 ? (
        <div className="container-xl text-center mt-5">
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
          <h3>NO HAY presupuesto, selecciona al menos un servicio.</h3>
          <Link to="/">
            <button className="btn btn-primary">Volver</button>
          </Link>
        </div>
      ) : (
        <div className="container-xl mt-3 captura">
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
          <div></div>
          <div className="row mt-4">
            <div className="col-xs-12 col-sm-6 col-md-5">
              <h4>Detalles del presupuesto: </h4>
              <p className="items">
                <b>Servicio/s:</b>{" "}
                {presupuesto.servicio.map((s) => (
                  <li key={s.label}>{s.label}</li>
                ))}
              </p>
              <p className="items">
                <b>Fecha:</b> {presupuesto.fecha}
              </p>
              {
                <>
                  <p className="items">
                    <b>
                      Precio total: $
                      {presupuesto.precio
                        ? new Intl.NumberFormat("de-DE").format(
                            presupuesto.precio
                          )
                        : "0"}
                    </b>
                  </p>
                  <p className="items">
                    {presupuesto.precioCuota > 0 ? (
                      <>
                        {presupuesto.cuotaValue}
                        {presupuesto.cuotaValue === 1
                          ? " pago de $"
                          : "x cuotas de $"}
                        {presupuesto.precioCuota
                          ? new Intl.NumberFormat("de-DE").format(
                              presupuesto.precioCuota
                            )
                          : "0"}
                        {presupuesto.entregaValue > 1
                          ? " ($" +
                            new Intl.NumberFormat("de-DE").format(
                              presupuesto.entregaValue
                            ) +
                            " de adelanto)"
                          : ""}
                      </>
                    ) : (
                      <>
                        {" ($" +
                          new Intl.NumberFormat("de-DE").format(
                            presupuesto.entregaValue
                          ) +
                          " de adelanto)"}
                      </>
                    )}
                  </p>
                </>
              }
            </div>
            <div className="col-xs-12 col-sm-6 col-md-7">
              <h4>Tus datos: </h4>
              <Checkbox
                changeCheckbox={changeCheckbox}
                checkbox={checkbox === true ? false : true}
                generateJpg={generateJpg}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
