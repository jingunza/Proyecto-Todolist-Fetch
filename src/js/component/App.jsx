import React, {useEffect, useState} from "react";
import '../../styles/App.css';
import { TiDeleteOutline } from "react-icons/ti";

const App = () => {
  
  const [registro, setRegistro] = useState([]);
  const [value, setValue] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const post = () =>{
    return fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: 'POST', 
      mode: 'cors', 
      redirect: 'follow',
      headers: new Headers({
          'Content-Type': 'text/plain'
      })
  }).then(function() { /* manejar la respuesta */ });
  }


  const get = () => {
    let url= 'https://assets.breatheco.de/apis/fake/todos/user/alesanchezr';
    fetch(url)
    .then((response)=> {
       if (!response.ok) {
       throw Error(response.statusText);
      }
       return response.json();
    })
     .then((responseAsJson)=> {
      setRegistro(responseAsJson);
    })
   .catch(function(error) {
      //  console.log('Looks like there was a problem: \n', error);
   });
  };
  useEffect(()=>{
    get();
  },[]);

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
          get();
        }
      })
    .catch(error => {
        console.log(error);
    });
  }


  const eliminarTarea = (item) => {
    setRegistro(registro.filter((elem)=>elem!==item)); //referencio al id del elemento del array que voya a eliminar dentro del map
    put();
  };

  let currentTime = new Date();
  let hora = currentTime.getHours().toString();
  let minuto = currentTime.getMinutes().toString();
  let segundo = currentTime.getSeconds().toString();
  const insertarTarea = (e) =>{
    if(e.target.value.trim().length!==0 && e.key==='Enter'){
      setRegistro([...registro, {label: e.target.value, done: false}]); //esto SOLO funciona con DECONSTRUCCION, NO USAR PUSH
      setValue('');
      };
      put();
  };

  // useEffect(()=>{
  //   put();
  // },[registro]);

	return (
		<div className="body-hijo row justify-content-center">
			<div className="cuaderno col-10 col-sm-8 col-md-6 col-lg-5 pt-5 pb-3 px-0 mt-5">
				<h1 className="titulo-lista text-center mt-0 mb-4">todos</h1>
        <div className="zona-rayada">
          
          <div className="contenedor-form"> 
            <input
            className="entrada-tarea px-3 px-lg-5" 
            onKeyDown={insertarTarea}
            type="text"
            placeholder="What needs to be done?"
            value ={value}
            onChange={(e)=>{setValue(e.target.value)}} 
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

					<div className="pie-pagina pt-3 ps-3">{registro.length} items left</div>
        </div>
      </div>
		</div>	
	);
};

export default App;