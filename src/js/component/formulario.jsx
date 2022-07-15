import React from "react";
import '../../styles/formulario.css';

// se trata del input con una funcion onKeyDown con props
// la funcion insertar proviene desde el archivo lista-tareas
const Formulario = (props) => {
  return (
    <div className="contenedor-form">
      <input
      className="entrada-tarea px-3 px-lg-5"
      onKeyDown={props.insertar}
      type="text"
      placeholder="What needs to be done?"
      value ={props.value}
      onChange={props.setValue}
      />
    </div>
  )
}

export default Formulario;