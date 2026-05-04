const usuarioID = localStorage.getItem("usuarioID");
const nombre = localStorage.getItem("nombre");

if(!usuarioID){
  window.location.href="index.html";
}

document.getElementById("bienvenida").innerText =
"Bienvenido " + usuarioID;

async function registrar(){

  const nombre = document.getElementById("nombre").value;
  const celular = document.getElementById("celular").value;

  const datos = {
    tipo: "registro",
    nombre: nombre,
    celular: celular
  };

const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

  const res = await fetch(URL,{
      method:"POST",
      body: JSON.stringify(datos)
  });

  const data = await res.json();
  alert(data.status);
  // ✅ MENSAJES DIFERENTES
  if(data.status === "nuevo"){
      alert("✅ Usuario registrado correctamente");
  }

  if(data.status === "existe"){
      alert("⚠️ Este usuario ya está registrado");
  }

}

/*function mostrarGrupos(equipos){

 const contenedor = document.getElementById("grupos");
 contenedor.innerHTML="";

 // agrupar equipos por grupo
 const grupos = {};

 equipos.forEach(e=>{
   const grupo = e[0];
   const equipo = e[1];

   if(!grupos[grupo]) grupos[grupo]=[];
   grupos[grupo].push(equipo);
 });

 // crear HTML
 Object.keys(grupos).forEach(grupo=>{

   const div = document.createElement("div");
   div.className="grupo";

   let html = `<h3>Grupo ${grupo}</h3><ul>`;

   grupos[grupo].forEach(eq=>{
     html+=`<li>${eq}</li>`;
   });

   html+=`</ul>`;

   div.innerHTML=html;
   contenedor.appendChild(div);

 });
}*/

/*function mostrarPartidos(partidos){

 const contenedor=document.getElementById("partidos");
 contenedor.innerHTML="";

 const grupos={};

 // agrupar partidos
 partidos.forEach(p=>{

   const grupo=p[1];

   if(!grupos[grupo]) grupos[grupo]=[];
   grupos[grupo].push(p);

 });

 Object.keys(grupos).forEach(grupo=>{

   const div=document.createElement("div");
   div.className="grupo-partidos";

   let html=`<h3>Partidos Grupo ${grupo}</h3>`;

   grupos[grupo].forEach(p=>{

     html+=`
       <div class="partido">

         <span>${p[2]}</span>

         <input type="number"
           data-id="${p[0]}"
           data-tipo="local"
           min="0">

         vs

         <input type="number"
           data-id="${p[0]}"
           data-tipo="visitante"
           min="0">

         <span>${p[3]}</span>

         <small>${p[4]}</small>

       </div>
     `;
   });

   div.innerHTML=html;
   contenedor.appendChild(div);

 });
}*/

import { cargarMundial } from "./api.js";
import { renderizarMundial } from "./grupos.js";
import { obtenerClasificados } from "./clasificacion.js";
import { pintarTablaTerceros } from "./terceros.js";
import { generarPrimeraEliminatoria, pintarEliminatorias } from "./eliminatoria.js";

import { cargarINDEXC } from "./api.js";

export let INDEXC = [];

/*export async function iniciarApp(){

}*/

async function iniciarApp(){

 const {equipos, partidos} = await cargarMundial();

 renderizarMundial(equipos, partidos);

  INDEXC = await cargarINDEXC();

 await cargarMundial();
}

iniciarApp();

/*setTimeout(()=>{
   autoResultadosPrueba();
},500);*/




/*function llenarOctavos(c){

 const cont=document.getElementById("octavos");

 cont.innerHTML=`

 <div class="match">${c["A"]?.primero} vs ${c["B"]?.segundo}</div>
 <div class="match">${c["C"]?.primero} vs ${c["D"]?.segundo}</div>
 <div class="match">${c["E"]?.primero} vs ${c["F"]?.segundo}</div>
 <div class="match">${c["G"]?.primero} vs ${c["H"]?.segundo}</div>

 <div class="match">${c["B"]?.primero} vs ${c["A"]?.segundo}</div>
 <div class="match">${c["D"]?.primero} vs ${c["C"]?.segundo}</div>
 <div class="match">${c["F"]?.primero} vs ${c["E"]?.segundo}</div>
 <div class="match">${c["H"]?.primero} vs ${c["G"]?.segundo}</div>

 `;
}*/

/* async function registrar() {

  const nombre = document.getElementById("nombre").value;
  const celular = document.getElementById("celular").value;

  if (!nombre || !celular) {
    alert("Debe ingresar nombre y celular");
    return;
  }

  const datos = {
    tipo: "registro",
    nombre: nombre,
    celular: celular
  };

  try {

    await fetch("https://script.google.com/macros/s/AKfycbwPF3pLAnltAI7OkmXF5sLqZT7kSyV_l_fLIP23c3skpNpG3pi2jdQcd84J7f8uchA0iQ/exec", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(datos)
    });

    alert("Registro enviado ✅\nTe asignaré tu ID pronto.");

  } catch (error) {
    alert("Error al registrar");
    console.error(error);
  }
}*/

/*async function guardar(){

  const datos = {
    id: crypto.randomUUID(),
    jugador: "Jose",
    partido: "PAN vs CRC",
    local: "Panamá",
    visitante: "Costa Rica",
    golLocal: 2,
    golVisitante: 1
  };

  await fetch("https://script.google.com/macros/s/AKfycbxyrSg2PkETwI9ZxyBWebngL14g9bPG--nvmJzGYt0eegI0E-fhvmTGy1ihcSBxhtANgA/exec", {
    method: "POST",
    body: JSON.stringify(datos)
  });

  alert("Pronóstico guardado");
}*/