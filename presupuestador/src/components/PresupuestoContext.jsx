import React, { createContext, useEffect, useState } from "react";

export const PresupuestoContext = createContext([]);

const PresupuestoProvider = ({ children }) => {
  const [presupuesto, setPresupuesto] = useState([]);

  console.log(presupuesto);

  //Guardando el presupuesto en el LS
  // function addLocalStorage() {
  //   localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
  // }

  // function addToLocalStorage() {
  //   addLocalStorage();
  // }

  //Recuperando el presupuesto del LS
  // function getLocalStorage() {
  //   const presupuestoLS = localStorage.getItem("presupuesto");
  //   if (presupuestoLS) {
  //     setPresupuesto(JSON.parse(presupuestoLS));
  //   }
  // }

  // if (presupuesto.length == 0) {
  //   window.onload = function () {
  //     const presu = JSON.parse(localStorage.getItem("presupuesto"));
  //     setPresupuesto(presu);
  //     console.log(presu);
  //   };
  // } else {
  //   addToLocalStorage();
  // }

  // function limpiarLs() {
  //   addLocalStorage(presupuesto);
  //   localStorage.clear();
  // }

  return (
    <PresupuestoContext.Provider
      value={{
        presupuesto,
        setPresupuesto,
        // addLocalStorage,
        // addToLocalStorage,
      }}
    >
      {children}
    </PresupuestoContext.Provider>
  );
};

export default PresupuestoProvider;
