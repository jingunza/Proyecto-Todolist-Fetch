import React, {useEffect, useState} from "react";
import '../../styles/lista-tareas.css';
import ElementsFromArray from './elementsFromArray.jsx';
import Formulario from './formulario.jsx';
import { TiDeleteOutline } from "react-icons/ti";

const ListaDeTareas = () => {
  
  /* --------------datos originales de la lista ------------------------------------ */
  //const dataServidor = [{label: 'lavar', done: false}, {label: 'estudiar', done: false}, {label: 'planchar', done: false}];
  const [registro, setRegistro] = useState([]);
  //const [entrada, setEntrada] =
  const [value, setValue] = useState('');
  // let entrada = [];
  // let salida = [];
  // let compare = [];

  const getInit = () => {
    let url= 'https://assets.breatheco.de/apis/fake/todos/user/alesanchezr';
    //let options = {};
    fetch(url)
    .then((response)=> {
       if (!response.ok) {
       throw Error(response.statusText);
      }
   // Read the response as json.
       return response.json();
    })
     .then((responseAsJson)=> {
   // Do stuff with the JSON
      // entrada= responseAsJson;
      // console.log(entrada);
      setRegistro(responseAsJson);
      //console.log(registro);
    })
   .catch(function(error) {
      //  console.log('Looks like there was a problem: \n', error);
   });
  };
  useEffect(()=>{
    getInit();
  },[]);
  // console.log(entrada);
  // console.log(registro); //el registro debe ser igual a 1 objeto de prueba

  const put = () => {
    let url = 'https://assets.breatheco.de/apis/fake/todos/user/alesanchezr';
    let options = {
      method: "PUT",
      body: JSON.stringify(registro),
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch(url, options)
      .then(resp => {
        if (resp.ok)  {
          console.log(resp.ok);
          getInit();
        }
          // console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
          // console.log(resp.status); // el código de estado = 200 o código = 400 etc.
          // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
          // return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
    //   .then(data => {
    //       //Aquí es donde debe comenzar tu código después de que finalice la búsqueda

    //       console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor UNDEFINED
    // })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
  }


  /*---------------funcion para eliminar elemento de lista con click ----------------*/
  // esta funcion tiene como parametro un id, el cual luego será reemplazado por el valor
  // de id real que proviene del array del state (en este caso se llamara registro.id, pero
  // como estara dentro de un mapeo basado ya en ese state "registro", se pasara como item.id)
  // IMPORTANTE: PARA QUE EL ID DEL PARAMETRO TENGA DE DONDE COGERSE, NECESITA QUE LA FUNCION
  // ACTUE DENTRO DEL MAPEO PUES ESTE TRAE EL ARRAY DEL CUAL SALE EL ID, ES DECIR, EL MAPEO ESCRIBE EL HTML E INCLUYE LA FUNCION ELIMINAR.
  // LA FUNCION INSERTAR EN CAMBIO NO NECESITA ESTAR DENTRO DEL MAPEO, PUES NO REQUIERE UNA REFERENCIA
  // esta funcion debera ser incluiuda dentro de una lambda porque necesita un segundo parentesis para declarar el argumento.
  const eliminarTarea = (item) => {
    setRegistro(registro.filter((elem)=>elem!==item)); //referencio al id del elemento del array que voya a eliminar dentro del map
    // salida = registro;
    // console.log(salida);
    put();
    // getCompare();
    // console.log(compare);

  };

  /*---------------funcion para insertar elemento con click ------------------------- */
  // esta funcion ya esta basada en eventos en su definicion, y no tiene parametros
  // por eso al reemplazar al prop no requiere una funcion lambda
  let currentTime = new Date();
  let hora = currentTime.getHours().toString();
  let minuto = currentTime.getMinutes().toString();
  let segundo = currentTime.getSeconds().toString();
  const insertarTarea = (e) =>{
    if(e.target.value.trim().length!==0 && e.key==='Enter'){
      setRegistro([...registro, {label: e.target.value, done: false}]); //esto SOLO funciona con DECONSTRUCCION, NO USAR PUSH
      setValue('');
      };
      // salida = registro;
      // console.log(salida);
      put();
      // getInit();
      // console.log(compare);
  };

  /* -----useEffect para borrar el input cada vez que se presione 'Enter'------------*/

  // useEffect(()=>{
  //   put();
  // },[registro]);

  /*----------------------------------------------------------------------------------*/
  // notese que el key esta siendo declarado en la caja padre de todas, dentro del elemento de lista, esto es porque 
  // la key sera reconocida en el padre unicamente
	return (
		<div className="body-hijo row justify-content-center">
			<div className="cuaderno col-10 col-sm-8 col-md-6 col-lg-5 pt-5 pb-3 px-0 mt-5">
				<h1 className="titulo-lista text-center mt-0 mb-4">todos</h1>
        <div className="zona-rayada">
          <Formulario setValue={(e)=>{setValue(e.target.value)}} value={value} insertar={insertarTarea} />
          <ElementsFromArray registro={(registro.length==0)? 
            <div className="lista-elemento d-flex align-items-center justify-content-between">
              <div className="lista-texto px-3 px-lg-5">
                No hay tareas, añadir tareas
              </div>
            </div>
            : registro.map((item)=>
            <div key={item.label+hora+minuto+segundo} className="lista-elemento d-flex align-items-center justify-content-between">
              <div className="lista-texto px-3 px-lg-5" id={item.label+hora+minuto+segundo}>
                {item.label}
              </div>
              <div
                onClick = {()=> eliminarTarea(item)} // aqui notese que lleva funcion lambda porque la func eliminar necesita argumentos
                className="contenedor-icono-eliminar px-3 px-lg-4"
              >
                <TiDeleteOutline className="icono-eliminar" />
              </div>
            </div>)}
          />
					<div className="pie-pagina pt-3 ps-3">{registro.length} items left</div>
        </div>
      </div>
		</div>	
	);
};

export default ListaDeTareas;