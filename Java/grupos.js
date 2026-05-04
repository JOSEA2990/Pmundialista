import { obtenerClasificados, crearMapaClasificados, generarPartidosFijos } from "./clasificacion.js";
import { pintarTablaTerceros } from "./terceros.js";
/*import { generarPrimeraEliminatoria, pintarEliminatorias } from "./eliminatoria.js";*/
/*import { generarCruces, pintarOctavos }from "./clasificacion.js";*/
import { obtenerCodigoTerceros } from "./utils.js";
import { buscarFilaINDEXC, generarCrucesDesdeINDEXC, pintarOctavos} from "./clasificacion.js";

function renderizarMundial(equipos, partidos){

 const contenedor=document.getElementById("mundial");
 contenedor.innerHTML="";

 const grupos={};

 /* =========================
   ORGANIZAR EQUIPOS
========================= */

 equipos.forEach(e=>{

   const grupo=e[0];
   const equipo=e[1];

   if(!grupos[grupo]){
     grupos[grupo]={
       equipos:[],
       partidos:[]
     };
   }

   grupos[grupo].equipos.push(equipo);
 });

 /* =========================
   ORGANIZAR PARTIDOS
========================= */

 partidos.forEach(p=>{
   const grupo=p[1];
   if(grupos[grupo]){
     grupos[grupo].partidos.push(p);
   }
 });

 /* =========================
   CREAR TARJETAS
========================= */

 Object.keys(grupos).forEach(grupo=>{

   const g=grupos[grupo];

   const card=document.createElement("div");
   card.className="grupo-card";

   let html=`<h2>Grupo ${grupo}</h2>`;

   /* -------- EQUIPOS -------- */

   html+=`<div class="equipos">`;
   g.equipos.forEach(eq=>{
     html+=`<div>${eq}</div>`;
   });
   html+=`</div>`;

   /* -------- PARTIDOS -------- */

   html+=`<div class="partidos">`;

   g.partidos.forEach(partido=>{
    /*console.log("GRUPO PARTIDO:", "["+partido[2]+"]","["+partido[3]+"]" );*/

     html+=`
     <div class="partido-grupo" data-grupo="${grupo}">

       <div class="equipo">${partido[2]}</div>

       <div class="marcador">
         <input type="number" class="gol-local"
           data-equipo="${partido[2]}"
           data-grupo="${grupo}">

         <span>-</span>

         <input type="number" class="gol-visitante"
           data-equipo="${partido[3]}"
           data-grupo="${grupo}">
       </div>

       <div class="equipo">${partido[3]}</div>

     </div>
     `;
   });

   html+=`</div>`;

   /* -------- TABLA -------- */

   html+=`
   <table class="tabla" id="tabla-${grupo}">
     <thead>
       <tr>
         <th>Equipo</th>
         <th>PJ</th>
         <th>Pts</th>
         <th>DG</th>
       </tr>
     </thead>
     <tbody></tbody>
   </table>
   `;

   card.innerHTML=html;
   contenedor.appendChild(card);

 });

 /* =========================
   ACTIVAR CALCULO AUTOMATICO
========================= */

 document.querySelectorAll(".gol-local, .gol-visitante")
 .forEach(input=>{
   input.addEventListener("input",recalcularTablas);
 });

}

function recalcularTablas(){

 const grupos = {};
 document.querySelectorAll(".partido-grupo").forEach(p=>{

   const grupo = p.dataset.grupo;

   if(!grupos[grupo]) grupos[grupo]={};

   const local = p.querySelector(".gol-local");
   const visitante = p.querySelector(".gol-visitante");

   const equipoLocal = local.dataset.equipo;
   const equipoVisitante = visitante.dataset.equipo;

   const gl = parseInt(local.value);
   const gv = parseInt(visitante.value);

   if(isNaN(gl) || isNaN(gv)) return;

   iniciarEquipo(grupos[grupo],equipoLocal);
   iniciarEquipo(grupos[grupo],equipoVisitante);

   actualizarStats(grupos[grupo][equipoLocal],gl,gv);
   actualizarStats(grupos[grupo][equipoVisitante],gv,gl);

 });

/* =======================
   1. Pintar tablas grupos
======================= */
 pintarTablas(grupos);

/* =======================
   2. Obtener clasificados
======================= */
 const clasificados = obtenerClasificados(grupos);
 const mapaClasificados = crearMapaClasificados(clasificados);

/* =======================
   3. Tabla terceros
======================= */
 pintarTablaTerceros(clasificados.mejoresTerceros);

/* =======================
   4. Generar cruces FIFA
======================= */
 /*const partidosElim =
   generarPrimeraEliminatoria(clasificados);*/

   /*const tercerosGrupos =
   clasificados.mejoresTerceros.map(t => t.grupo);

   const cruces =
   generarCruces(
      clasificados.primeros,
      tercerosGrupos
   );*/

const codigo = obtenerCodigoTerceros(clasificados.mejoresTerceros);

const filaFIFA = buscarFilaINDEXC(codigo);

/*const cruces = generarCrucesDesdeINDEXC(filaFIFA);*/

const partidosFijos = generarPartidosFijos();
const partidosVariables = generarCrucesDesdeINDEXC(filaFIFA);

/* 🔥 OCTAVOS COMPLETOS */
const octavos = [
   ...partidosFijos,
   ...partidosVariables
];

/* ORDEN FIFA */
octavos.sort((a,b)=>a.id-b.id);


pintarOctavos(octavos,mapaClasificados);

/* =======================
   5. Pintar octavos
======================= */
 /*pintarEliminatorias(partidosElim);*/
}

function iniciarEquipo(grupo,equipo){

 if(!grupo[equipo]){
   grupo[equipo]={
     equipo,
     PJ:0,PG:0,PE:0,PP:0,
     GF:0,GC:0,DG:0,PTS:0
   };
 }
}

function actualizarStats(eq,gf,gc){

 eq.PJ++;
 eq.GF+=gf;
 eq.GC+=gc;
 eq.DG=eq.GF-eq.GC;

 if(gf>gc){
   eq.PG++;
   eq.PTS+=3;
 }
 else if(gf===gc){
   eq.PE++;
   eq.PTS+=1;
 }
 else{
   eq.PP++;
 }
}

function pintarTablas(grupos){

 for(const g in grupos){

   const equipos = Object.values(grupos[g]);

   equipos.sort((a,b)=>
      b.PTS-a.PTS ||
      b.DG-a.DG ||
      b.GF-a.GF
   );

   /* SOLO EL TBODY */
   const tbody = document.querySelector(`#tabla-${g} tbody`);

   /* 🔥 limpiar filas anteriores */
   tbody.innerHTML = "";

   equipos.forEach(e=>{

     tbody.innerHTML += `
       <tr>
         <td>${e.equipo}</td>
         <td>${e.PJ}</td>
         <td>${e.PTS}</td>
         <td>${e.DG}</td>
       </tr>
     `;

   });
 }
}

/*xport function autoResultadosPrueba(){

   const local = querySelectorAll(".gol-local");
   const visitante = querySelectorAll(".gol-visitante");   

   local.forEach(i => i.value = 2);
   visitante.forEach(i => i.value = 1);

   // recalcula todo
   recalcularTablas();
}*/


export {
 renderizarMundial,
 recalcularTablas,
 iniciarEquipo,
 actualizarStats,
 pintarTablas
};