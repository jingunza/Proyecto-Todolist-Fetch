/* --------------- IMPORTACIONES--------------------------------------------------------------------------------------- */

import React, {useEffect, useState} from "react";
import '../../styles/App.css';
import { TiDeleteOutline } from "react-icons/ti";

/* --------------- COMPONENTE PRINCIPAL DE LA APLICACION--------------------------------------------------------------- */

const App = () => {
  
  /* --------------- VARIABLES DE HOOKS-------------------------------------------- */
  
  const [registro, setRegistro] = useState([]);
  const [value, setValue] = useState('');

  const [currentUser, setCurrentUser] = useState('');
  const [inputUser, setInputUser] = useState('');

  const [estiloInputTarea, setEstiloInputTarea] = useState('hidden');

  /* --------------- FUNCIONES Y METODOS DE FETCH API------------------------------- */

  // useEffect(()=>{  //pide ingresar User
  //   alert('ingresa tu usuario en el pie de pagina')
  // },[]);

  //     // insertar usuario nuevo---------------------
  // const insertarUser = (e) => { //esta funcion se ejecuta en onKeyDown al dar Enter
  //   if(e.target.value.trim().length!==0 && e.key==='Enter'){
  //     setCurrentUser(e.target.value);
  //     setInputUser(''); //el value de este elemento input lee a la variable inputUser
  //     setEstiloInputTarea('visible');
  //   }
  // };

  // useEffect(()=>{  
  //   fetch(`https://assets.breatheco.de/apis/fake/todos/user/${currentUser}`)
  //     .then((response)=> {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then((responseAsJson)=> {
  //       setRegistro(responseAsJson);
  //     })
  //     .catch((error)=> {
  //         console.log('Looks like there was a problem: \n', error);
  //     });
  // },[insertarUser]);

  //     // get inicial de la aplicacion -------------
  // const getInit = (apendice) =>{
  //   fetch('https://assets.breatheco.de/apis/fake/todos/user/'+ apendice)
  //     .then((response)=> {
  //       if (!response.ok) {
  //         post(apendice);  // mas abajo se define post: se ejecuta solo cuando falla el get 
  //         throw Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then((responseAsJson)=> {
  //       setRegistro(responseAsJson);
  //     })
  //     .catch((error)=> {
  //         console.log('Looks like there was a problem: \n', error);
  //     });
  // };

  //     // post que se ejecuta si falla el get inicial ----------------
  // const post = (apendice) =>{ //solo se ejecuta dentro del get si este falla
  //   fetch('https://assets.breatheco.de/apis/fake/todos/user/'+ apendice, {
  //     method: "POST",
  //     body: JSON.stringify([{"label":"sample task", "done": false }]),
  //     headers: {"Content-type": "application/json; charset=UTF-8"}
  //   })
  //   .then(response =>response.json()) 
  //   .then(json => console.log(json))
  //   .catch(err => console.log(err));
  // };

      // funcion insertar nueva tarea y accesorios -------------------
  let currentTime = new Date();
  let hora = currentTime.getHours().toString();
  let minuto = currentTime.getMinutes().toString();
  let segundo = currentTime.getSeconds().toString();
  const insertarTarea = (e) =>{ //esto se ejecuta en el onKeyDown
    if(e.target.value.trim().length!==0 && e.key==='Enter'){
      setRegistro([...registro, {label: e.target.value, done: false}]); //esto SOLO funciona con DECONSTRUCCION, NO USAR PUSH
      setValue('');
      put(currentUser);
      };
  };

      // funcion eliminar tarea y accesorios -------------------
  const eliminarTarea = (item) => {
    setRegistro(registro.filter((elem)=>elem!==item)); //referencio al id del elemento del array que voya a eliminar dentro del map
    put(currentUser);
  };

      // get recurrente sin post incluido ------------------------------
  const get = () =>{ // este get se usara despues de cada put
    fetch('https://assets.breatheco.de/apis/fake/todos/user/joseingunza')
      .then((response)=> {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((responseAsJson)=> {
        setRegistro(responseAsJson);
      })
      .catch((error)=> {
          console.log('Looks like there was a problem: \n', error);
      });
  };

      // put para actualizar informacion en la API ---------------------
  const put = (apendice) => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/'+ apendice, {
      method: "PUT",
      body: JSON.stringify(registro),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok)  {
          console.log(response.ok);
        }
      })
    .catch(error => {
        console.log(error);
    });
  };

  /* --------------------------RENDERIZACION------------------------------------------ */

	return (
		<div className="body-hijo row justify-content-center">
			<div className="cuaderno col-10 col-sm-8 col-md-6 col-lg-5 pt-5 pb-3 px-0 mt-5">
				<h1 className="titulo-lista text-center mt-0 mb-4">todos</h1>
        <div className="zona-rayada">
          
          <div className="contenedor-form"> 
            <input
            onKeyDown={insertarTarea}
            value ={value} //input controlado de tarea
            onChange={(e)=>{setValue(e.target.value)}} //input controlado de tarea

            className="entrada-tarea px-3 px-lg-5" 
            type="text"
            placeholder="What needs to be done?"
            style={{visibility: estiloInputTarea}} 
            />
          </div>

          <div className="elements-from-array">
            {(registro.length==0)? 
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
          </div>  

					<div className="pie-pagina d-flex justify-content-between pt-4 pb-2 px-3">
              <div className="col-3">{registro.length} items left</div>
              <div className="contenedor-user col-6">
                <input
                  onKeyDown={insertarUser}
                  value ={inputUser} //input controlado de User
                  onChange={(e)=>{setInputUser(e.target.value)}} //input controlado de User

                  className="entrada-user px-3 px-lg-5"
                  placeholder="ingrese usuario"
                  type="text"
                />
              </div>
              <div className="col-3 text-end">{(currentUser!=='')? 'user: '+currentUser : ''}</div>
          </div>

        </div>
      </div>
		</div>	
	);
};

/* -----------------------EXPORTACION DE COMPONENTE----------------------------------- */

export default App;