const reglas = {
 A:["B","C","D","E","F","G","H","I","J","K","L"],
 B:["A","C","D","E","F","G","H","I","J","K","L"],
 D:["A","B","C","E","F","G","H","I","J","K","L"],
 E:["A","B","C","D","F","G","H","I","J","K","L"],
 G:["A","B","C","D","E","F","H","I","J","K","L"],
 I:["A","B","C","D","E","F","G","H","J","K","L"],
 K:["A","B","C","D","E","F","G","H","I","J","L"],
 L:["A","B","C","D","E","F","G","H","I","J","K"]
};

const ordenAsignacion = ["A","B","D","E","G","I","K","L"];

export function generarCruces(primeros, tercerosClasificados){

   let disponibles = [...tercerosClasificados];
   const cruces = [];

   ordenAsignacion.forEach(grupo => {

      const rival = disponibles.find(t =>
         reglas[grupo].includes(t)
      );

      cruces.push({
         local: "1"+grupo,
         visitante: "3"+rival
      });

      disponibles =
         disponibles.filter(t => t !== rival);
   });

   return cruces;
}

/*export function pintarOctavos(cruces){

   const contenedor =
      document.getElementById("octavos");

   contenedor.innerHTML = "";

   cruces.forEach(c => {
      contenedor.innerHTML += `
         <div>${c.local} vs ${c.visitante}</div>
      `;
   });
}*/

export function pintarOctavos(cruces, clasificados){

 const contenedor =
   document.getElementById("octavos");

 contenedor.innerHTML =
   "<h2>Octavos de Final</h2>";

 cruces.forEach((c,i)=>{

   const local =
      clasificados[c.local];

   const visitante =
      clasificados[c.visitante];

   contenedor.innerHTML += `
   <div class="partido-eliminatoria">

      <span>${local.equipo}</span>

      <input type="number"
         class="golLocal"
         data-id="${i}">

      -

      <input type="number"
         class="golVisitante"
         data-id="${i}">

      <span>${visitante.equipo}</span>

      <label>
        <input type="checkbox"
           class="penales"
           data-id="${i}">
        Penales
      </label>

      <div class="penales-box hidden">
         <input type="number" placeholder="Pen L">
         -
         <input type="number" placeholder="Pen V">
      </div>

   </div>
   `;
 });

activarPenales();
}

function activarPenales(){

 document
  .querySelectorAll(".penales")
  .forEach(check => {

   check.addEventListener("change", e => {

     const box =
       e.target
        .closest(".partido-eliminatoria")
        .querySelector(".penales-box");

     box.classList.toggle(
        "hidden",
        !e.target.checked
     );
   });
 });
}

export function obtenerClasificados(tablasGrupos){

 const posiciones={};
 const primeros=[];
 const segundos=[];
 const terceros=[];

 for(const grupo in tablasGrupos){

   const equipos = Object.values(tablasGrupos[grupo]);

   if(equipos.length < 3) continue;

   equipos.sort((a,b)=>
     b.PTS-a.PTS ||
     b.DG-a.DG ||
     b.GF-a.GF
   );

   posiciones[grupo]={
     primero:equipos[0],
     segundo:equipos[1],
     tercero:equipos[2]
   };

   primeros.push({...equipos[0],grupo});
   segundos.push({...equipos[1],grupo});
   terceros.push({...equipos[2],grupo});
 }

 /* ranking global terceros */
 terceros.sort((a,b)=>
   b.PTS-a.PTS ||
   b.DG-a.DG ||
   b.GF-a.GF
 );

 const mejoresTerceros=terceros.slice(0,8);

 return{
   posiciones,
   primeros,
   segundos,
   mejoresTerceros
 };
}

export function generarPartidosFijos(){

 return [

  {id:73, local:"2A", visitante:"2B"},

  {id:75, local:"1F", visitante:"2C"},
  {id:76, local:"1C", visitante:"2F"},

  {id:78, local:"2E", visitante:"2I"},

  {id:83, local:"2K", visitante:"2L"},

  {id:84, local:"1H", visitante:"2J"},
  {id:86, local:"1J", visitante:"2H"},

  {id:88, local:"2D", visitante:"2G"}

 ];
}

export function crearMapaClasificados(datos){

 const mapa={};

 /* PRIMEROS */
 datos.primeros.forEach(e=>{
   mapa["1"+e.grupo]=e;
 });

 /* SEGUNDOS */
 datos.segundos.forEach(e=>{
   mapa["2"+e.grupo]=e;
 });

 /* TERCEROS */
 datos.mejoresTerceros.forEach(e=>{
   mapa["3"+e.grupo]=e;
 });

 return mapa;
}

import { INDEXC } from "./app.js";

/* =====================
   BUSCAR COMBINACION FIFA
===================== */

export function buscarFilaINDEXC(codigo){

 const header = INDEXC[0];
 const columnasTerceros = header.slice(1,13);

 for(let i=1;i<INDEXC.length;i++){

   const fila = INDEXC[i];
   const activos=[];

   columnasTerceros.forEach((col,j)=>{
      if(fila[j+1]==1){
        activos.push(col.replace("3",""));
      }
   });

   if(activos.sort().join("")===codigo){
      return fila;
   }
 }

 return null;
}

/* =====================
   GENERAR OCTAVOS
===================== */

const NUMEROS_PARTIDOS_TERCEROS = [
  74,
  77,
  79,
  80,
  81,
  82,
  85,
  87
];

export function generarCrucesDesdeINDEXC(fila){

 const header = INDEXC[0];
 const cruces=[];

 let indicePartido=0;
 
 for(let c=13;c<header.length;c++){

   const primero = header[c];
   const rival = fila[c];

   if(rival){
      cruces.push({
        partido: NUMEROS_PARTIDOS_TERCEROS[indicePartido],
        local: primero,
        visitante: rival
      });
      indicePartido++;
   }
 }

 return cruces;
}