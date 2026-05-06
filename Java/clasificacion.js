/*const reglas = {
 A:["B","C","D","E","F","G","H","I","J","K","L"],
 B:["A","C","D","E","F","G","H","I","J","K","L"],
 D:["A","B","C","E","F","G","H","I","J","K","L"],
 E:["A","B","C","D","F","G","H","I","J","K","L"],
 G:["A","B","C","D","E","F","H","I","J","K","L"],
 I:["A","B","C","D","E","F","G","H","J","K","L"],
 K:["A","B","C","D","E","F","G","H","I","J","L"],
 L:["A","B","C","D","E","F","G","H","I","J","K"]
};

const ordenAsignacion = ["A","B","D","E","G","I","K","L"];*/

/*export function generarCruces(primeros, tercerosClasificados){

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
}*/

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

/*export function activarPenales(){

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
}*/

/*export function activarActualizacionFases(){

 document
   .querySelectorAll(
     ".golLocal, .golVisitante, .penLocal, .penVisitante"
   )
   .forEach(input=>{

     input.addEventListener("input",()=>{
        importarFases();
     });
  

   });
}*/

/*let eventosActivos = false;

export function activarActualizacionFases(){

 if(eventosActivos) return;
 eventosActivos = true;

 document.addEventListener("change",(e)=>{

  if(!e.target.closest(".partido-eliminatoria"))
      return;

   if(
      e.target.classList.contains("golLocal") ||
      e.target.classList.contains("golVisitante") ||
      e.target.classList.contains("penLocal") ||
      e.target.classList.contains("penVisitante")
   ){
      importarFases();
   }

 });
}*/

/*let bloqueandoRender = false;
let ultimoEstado = "";

export async function importarFases(){

   if(bloqueandoRender) return;

   const estadoActual =
      JSON.stringify(
        [...document.querySelectorAll(
          ".golLocal, .golVisitante, .penLocal, .penVisitante"
        )].map(i=>i.value)
      );

   if(estadoActual === ultimoEstado) return;

   ultimoEstado = estadoActual;

   bloqueandoRender = true;

   const mod = await import("./fasesFinales.js");

   mod.pintarFasesFinales();

   /*activarPenales();
   activarActualizacionFases();

   bloqueandoRender = false;
}*/

/*export async function importarFases(){

   if(bloqueandoRender) return;

   bloqueandoRender = true;

   const mod = await import("./fasesFinales.js");

   mod.pintarFasesFinales();

   activarPenales();
   activarActualizacionFases();

   bloqueandoRender = false;
}*/

/*const NUMEROS_PARTIDOS_TERCEROS = [
  {id:74},
  {id:77},
  {id:79},
  {id:80},
  {id:81},
  {id:82},
  {id:85},
  {id:87}
];*/

function obtenerResultadoPartido(p){

 const local =
   p.querySelector(".equipo-local, .local")
    ?.textContent.trim();

 const visitante =
   p.querySelector(".equipo-visitante, .visitante")
    ?.textContent.trim();

 const gl =
   Number(p.querySelector(".gol-local, .golLocal")?.value || 0);

 const gv =
   Number(p.querySelector(".gol-visitante, .golVisitante")?.value || 0);

 const penales =
   p.querySelector(".penales")?.checked;

 const pl =
   Number(p.querySelector(".penLocal")?.value || 0);

 const pv =
   Number(p.querySelector(".penVisitante")?.value || 0);

 if(gl>gv) return {ganador:local,perdedor:visitante};
 if(gv>gl) return {ganador:visitante,perdedor:local};

 if(penales){
   if(pl>pv) return {ganador:local,perdedor:visitante};
   if(pv>pl) return {ganador:visitante,perdedor:local};
 }

 return null;
}

export function pintardieciseis(cruces, clasificados){

 const contenedor =
   document.getElementById("dieciseis");

 contenedor.innerHTML =
   "<h2>Dieciseiavos de Final</h2>";

 cruces.forEach((c,i)=>{
 
   const numero = c.id || c.partido?.id;

   const local = clasificados[c.local];

   const visitante = clasificados[c.visitante];

   contenedor.innerHTML += `
   <div class="partido-eliminatoria" data-partido="${c.id}">

      <div class="numero">
         Partido ${numero}
      </div>

      <div class="linea-equipos">
      <span class="local">${c.local} ${local.equipo}</span>

      <input type="number"
         class="golLocal"
         data-partido="${c.id}">
      <span>-</span>
      <input type="number"
         class="golVisitante"
         data-partido="${c.id}">

      <span class="visitante">${c.visitante} ${visitante.equipo}</span>
      </div>


      <label>
        <input type="checkbox"
           class="penales"
           data-partido="${c.id}">
        Penales
      </label>

      <div class="penales-box hidden">
         <input type="number" placeholder="Pen L" class="penLocal"
         data-partido="${c.id}">
         <span>-</span>
         <input type="number" placeholder="Pen V" class="penVisitante"
         data-partido="${c.id}">
      </div>

   </div>
   `;
 });

 generarBracketAutomatico();
}

let penalesListenerActivo = false;

export function activarPenales(){

 if(penalesListenerActivo) return;
 penalesListenerActivo = true;

 document.addEventListener("change", e => {

   if(!e.target.classList.contains("penales")) return;

   const box =
     e.target
      .closest(".partido-eliminatoria")
      .querySelector(".penales-box");

   if(!box) return;

   box.classList.toggle(
     "hidden",
     !e.target.checked
   );

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
   GENERAR 16 AVOS
===================== */

const MAPA_PARTIDOS_TERCEROS = {
  "1A":79,
  "1B":85,
  "1D":81,
  "1E":74,
  "1G":82,
  "1I":77,
  "1K":87,
  "1L":80
};

export function generarCrucesDesdeINDEXC(fila){

 const header = INDEXC[0];
 const cruces=[];

 let indicePartido=0;

 for(let c=13;c<header.length;c++){

   const primero = header[c];
   const rival = fila[c];

   if(rival){
      cruces.push({
        id: MAPA_PARTIDOS_TERCEROS[primero],
        local: primero,
        visitante: rival
      });
      indicePartido++;
   }
 }

 return cruces;
}

import { BRACKET_FIFA } from "./bracketFIFA.js";

export function generarBracketAutomatico(){

   /*const contenedor = document.getElementById("fasesFinales");
   if(contenedor) contenedor.innerHTML="";*/

  const resultados = {};

  /* ===== LEER 16AVOS EXISTENTES ===== */

  const partidos =
    document.querySelectorAll(
      "#dieciseis .partido-eliminatoria"
    );

  partidos.forEach(p => {

    const id =
      Number(p.dataset.partido);

    const local =
      p.querySelector(".local")
       ?.textContent.trim();

    const visitante =
      p.querySelector(".visitante")
       ?.textContent.trim();

    const gl =
      p.querySelector(".golLocal");

    const gv =
      p.querySelector(".golVisitante");

    /* marcador automatico */
    if(gl && gv){
       gl.value = 1;
       gv.value = 0;
    }

    resultados[id]={
      ganador: local,
      perdedor: visitante
    };

  });

  construirFases(resultados);
}

function limpiarNombreEquipo(nombre){

 if(!nombre) return "";

 /* elimina 1A 2B 3C etc */
 return nombre.replace(/^[123][A-Z]\s*/, "");
}

function crearPartidoFase(id, local, visitante, contenedor){
   
  /*const contenedor =
    document.getElementById("fasesFinales");*/

  if(!contenedor) return;

  /* ✅ si ya existe → NO recrear */
 if(document.querySelector(`[data-partido="${id}"]`))
   return;

  /*contenedor.innerHTML += `*/
  contenedor.insertAdjacentHTML("beforeend",`
      <div class="partido-eliminatoria" data-partido="${id}">

     <div class="numero">
       Partido ${id}
     </div>

     <div class="linea-equipos">

       <span class="local">${limpiarNombreEquipo(local)}</span>

       <input type="number"
         class="golLocal" value="1">

       <span>-</span>

       <input type="number"
         class="golVisitante" value="0">

       <span class="visitante">${limpiarNombreEquipo(visitante)}</span>

     </div>

     <label>
       <input type="checkbox"
         class="penales">
       Penales
     </label>

     <div class="penales-box hidden">
       <input type="number"
          class="penLocal" placeholder="Pen L">
       <span>-</span>
       <input type="number"
          class="penVisitante" placeholder="Pen V">
     </div>

   </div>
 `);
}

function obtenerContenedorFase(nombre,id){

 let fase =
   document.getElementById(id);

 if(!fase){

   const principal =
     document.getElementById("fasesFinales");

   fase = document.createElement("div");
   fase.id = id;
   fase.className = "fase";

   fase.innerHTML = `<h2>${nombre}</h2>`;

   principal.appendChild(fase);
 }

 return fase;
}

function construirFases(resultados){

  /* ===== ORDEN CORRECTO ===== */

  /*const orden = [
    [89,90,91,92,93,94,95,96], // OCTAVOS
    [97,98,99,100],             // CUARTOS
    [101,102],                  // SEMIS
    [103],                      // TERCER PUESTO
    [104]                       // FINAL
  ];*/

  const fases = [
 {nombre:"Octavos de Final", id:"octavos", partidos:[89,90,91,92,93,94,95,96]},
 {nombre:"Cuartos de Final", id:"cuartos", partidos:[97,98,99,100]},
 {nombre:"Semifinales", id:"semis", partidos:[101,102]},
 {nombre:"Tercer Puesto", id:"tercero", partidos:[103]},
 {nombre:"Final", id:"final", partidos:[104]}
];

  fases.forEach(fase=>{

    const contenedorFase =
     obtenerContenedorFase(
     fase.nombre,
     fase.id
      );

    fase.partidos.forEach(id=>{

      const deps = BRACKET_FIFA[id];

      let equipoA;
      let equipoB;

      /* FINAL NORMAL */
      if(typeof deps[0] === "number"){

        if(!resultados[deps[0]] ||
           !resultados[deps[1]]) return;

        equipoA = resultados[deps[0]].ganador;
        equipoB = resultados[deps[1]].ganador;
      }

      /* TERCER PUESTO */
      if(typeof deps[0] === "string"){

        if(!resultados[101] ||
           !resultados[102]) return;

        equipoA = resultados[101].perdedor;
        equipoB = resultados[102].perdedor;
      }

       crearPartidoFase(
     id,
     equipoA,
     equipoB,
     contenedorFase
   );


      crearPartidoFase(id,equipoA,equipoB);
      actualizarEquipos(id,equipoA,equipoB);

      /* SOLO si el usuario aún no decidió el partido */
       if(!resultados[id]){
       resultados[id]={
        ganador:equipoA,
        perdedor:equipoB
       };
      }

    });

  });

}
activarPenales();

export function recalcularBracketCompleto(){

 const resultados = {};

 document
   .querySelectorAll(".partido-eliminatoria")
   .forEach(p=>{

     const id = Number(p.dataset.partido);
     if(!id) return;

     const r = obtenerResultadoPartido(p);
     if(!r) return;

     resultados[id] = r;
 });

 /* limpiar fases posteriores 
 const contenedor = document.getElementById("fasesFinales");
 if(contenedor) contenedor.innerHTML="";*/

 construirFases(resultados);

}

function actualizarEquipos(id, local, visitante){

 const p =
   document.querySelector(
     `[data-partido="${id}"]`
   );

 if(!p) return;

p.querySelector(".local").textContent =
   limpiarNombreEquipo(local);

p.querySelector(".visitante").textContent =
   limpiarNombreEquipo(visitante);
}
/*export function activarActualizacionFases(){

 document.addEventListener("input", e=>{

   if(
      !e.target.classList.contains("golLocal") &&
      !e.target.classList.contains("golVisitante")
   ) return;

   recalcularBracket();

 });

}*/

/*function recalcularBracket(){

 const resultados = {};

 const partidos =
   document.querySelectorAll(".partido-eliminatoria");

 partidos.forEach(p=>{

   const id = Number(p.dataset.partido);

   if(!id || id>88) return; // SOLO 16avos

   const local =
     p.querySelector(".local")?.textContent.trim();

   const visitante =
     p.querySelector(".visitante")?.textContent.trim();

   const gl =
     Number(p.querySelector(".golLocal")?.value || 0);

   const gv =
     Number(p.querySelector(".golVisitante")?.value || 0);

   let ganador = local;
   let perdedor = visitante;

   if(gv > gl){
      ganador = visitante;
      perdedor = local;
   }

   resultados[id] = { ganador, perdedor };

 });

 /* limpiar fases siguientes 
 const contenedor =
   document.getElementById("fasesFinales");

 if(contenedor) contenedor.innerHTML="";

 construirFases(resultados);

}*/

/*function recalcularBracket(){

 const resultados = {};

 const partidos =
   document.querySelectorAll(".partido-eliminatoria");

 partidos.forEach(p=>{

   const id = Number(p.dataset.partido);
   if(!id) return;
   /*if(!id || id>88) return; // SOLO 16avos*/

   /*const local =
     p.querySelector(".equipo-local, .local")
      ?.textContent.trim();

   const visitante =
     p.querySelector(".equipo-visitante, .visitante")
      ?.textContent.trim();

   const gl =
     Number(p.querySelector(".gol-local, .golLocal")?.value || 0);

   const gv =
     Number(p.querySelector(".gol-visitante, .golVisitante")?.value || 0);

   const penales =
     p.querySelector(".penales")?.checked;

   const pl =
     Number(p.querySelector(".penLocal")?.value || 0);

   const pv =
     Number(p.querySelector(".penVisitante")?.value || 0);

   let ganador;
   let perdedor;

   /* ===== RESULTADO NORMAL ===== 

   if(gl > gv){
      ganador = local;
      perdedor = visitante;
   }
   else if(gv > gl){
      ganador = visitante;
      perdedor = local;
   }

   /* ===== EMPATE → PENALES ===== 

   else if(penales){

      if(pl > pv){
         ganador = local;
         perdedor = visitante;
      }else{
         ganador = visitante;
         perdedor = local;
      }

   }else{
      return; // aún sin decidir
   }

   resultados[id]={ ganador, perdedor };

 });

 /* limpiar fases siguientes 
 const contenedor =
   document.getElementById("fasesFinales");

 if(contenedor) contenedor.innerHTML="";

 construirFases(resultados);

}*/
