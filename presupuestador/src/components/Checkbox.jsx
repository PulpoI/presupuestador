import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import { PresupuestoContext } from "./PresupuestoContext";
import { db } from "../utils/firebase";

const RadioButton = ({ changeCheckbox, checkbox, generateJpg }) => {
  const { presupuesto } = useContext(PresupuestoContext);

  const [orderId, setOrderId] = useState("");
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);

  const sendOrder = (e) => {
    e.preventDefault();
    // setCreatingOrder(true);

    //objeto con info del comprador y su orden
    const newOrder = {
      buyer: formData,
      date: Timestamp.fromDate(new Date()),
      items: presupuesto,
    };

    // referencia de la collecion

    const orderCollection = collection(db, "orders");
    addDoc(orderCollection, newOrder)
      .then((resp) => setOrderId(resp.id))
      .catch((err) => console.log(err))
      .finally(() => {
        setCreatingOrder(false);

        setFormData({ name: "", phone: "" });
      });
  };

  return (
    <div className="">
      <FormGroup>
        <Input type="checkbox" onChange={changeCheckbox} />
        <Label check>
          Acepto <a href="#">terminos y condiciones</a>
        </Label>
      </FormGroup>
      <form onSubmit={sendOrder} onChange={handleChange}>
        <div className="mb-2 d-flex text-start flex-column ">
          <label className="form-label">
            <b>Nombre y apellido:</b>
          </label>

          <input
            type="name"
            className="form-control form-control--color"
            name="name"
            defaultValue={formData.name}
            required
          />
        </div>
        <div className="mb-2 d-flex text-start flex-column ">
          <label className="form-label">
            {" "}
            <b>Teléfono:</b>
          </label>
          <input
            type="number"
            onkeydown="return event.keyCode !== 69"
            className="form-control form-control--color"
            name="phone"
            defaultValue={formData.phone}
            required
          />
        </div>

        <button
          onClick={generateJpg}
          className="mt-3 btn btn-primary"
          disabled={
            !formData.name ||
            !formData.phone ||
            checkbox ||
            presupuesto.servicio.length === 0
          }
        >
          Enviar y Descargar presupuesto
        </button>
      </form>

      <hr></hr>
      <Link to="/">
        <button className=" btn btn-secondary">Volver al presupuestador</button>
      </Link>
    </div>
  );
};

export default RadioButton;
