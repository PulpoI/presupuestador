import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";

import "./Checkbox.css";

const RadioButton = ({ changeCheckbox, checkbox }) => {
  return (
    <div className="">
      <FormGroup>
        <Input type="checkbox" onChange={changeCheckbox} />
        <Label check>
          Acepto <a href="#">terminos y condiciones</a>
        </Label>
      </FormGroup>
      <Link to="/">
        <button className="btn btn-primary" disabled={checkbox}>
          Enviar
        </button>
      </Link>

      <hr></hr>
      <Link to="/">
        <button className="btn btn-primary">
          <b>Volver al presupuesto</b>
        </button>
      </Link>
    </div>
  );
};

export default RadioButton;
