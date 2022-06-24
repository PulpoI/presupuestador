import React, { useContext, useEffect, useState } from "react";
import { PresupuestoContext } from "./PresupuestoContext";
import Checkbox from "./Checkbox";

const Form = () => {
  const { presupuesto } = useContext(PresupuestoContext);
  const [checkbox, setCheckbox] = useState(false);

  //change checkbox
  const changeCheckbox = () => {
    setCheckbox(!checkbox);
  };

  console.log(checkbox);
  return (
    <>
      {presupuesto.length === 0 ? (
        <h1>NO HAY presupuesto</h1>
      ) : (
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
            <div className="col-xs-12 col-sm-6 col-md-5">
              <h4>Detalles del presupuesto: </h4>
              <p className="items">
                <b>Servicio/s:</b>{" "}
                {presupuesto.servicio.map((s) => (
                  <li>{s.label}</li>
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

                  <Checkbox
                    changeCheckbox={changeCheckbox}
                    checkbox={checkbox === true ? false : true}
                  />
                </>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
