import React, { createContext, useEffect, useState } from "react";

export const PresupuestoContext = createContext([]);

const PresupuestoProvider = ({ children }) => {
  const [presupuesto, setPresupuesto] = useState([]);

  console.log(presupuesto);

  //Guardando el presupuesto en el LS
  function addLocalStorage() {
    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
  }

  useEffect(() => {
    addLocalStorage();
  }, [presupuesto]);

  // window.onload = function () {
  //   const presu = JSON.parse(localStorage.getItem("presupuesto"));
  //   // if (presupuesto) {
  //   setPresupuesto(presu);
  //   console.log(presu);

  //   // }
  // };

  // function limpiarLs() {
  //   addLocalStorage(presupuesto);
  //   localStorage.clear();
  // }

  return (
    <PresupuestoContext.Provider
      value={{ presupuesto, setPresupuesto, addLocalStorage }}
    >
      {children}
    </PresupuestoContext.Provider>
  );
};

export default PresupuestoProvider;
