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

 const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/execc";

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

/*import { cargarMundialUsuario } from "./api.js";*/
import { renderizarMundial } from "./grupos.js";
import { cargarINDEXC } from "./api.js";
import { cargarMundial } from "./api.js";
import { cargarDatosUsuario } from "./api.js";
import { recalcularTablas } from "./grupos.js";
import { recalcularBracketCompleto } from "./clasificacion.js";
import { generarBracketAutomatico } from "./clasificacion.js";

export let INDEXC = [];

/*async function iniciarApp(){
 INDEXC = await cargarINDEXC();
const data =
 await cargarMundialUsuario(usuarioID);
 console.log("DATA SERVIDOR:",data);
 if(!data.error){
    renderizarMundial(
      dataUsuario.equipos,
      dataUsuario.partidos
    );
    return;
 }
 const {equipos, partidos} =
   await cargarMundial();
 renderizarMundial(equipos, partidos);
 activarAutoGuardado();
}*/


async function iniciarApp(){

 INDEXC = await cargarINDEXC();
 const data = await cargarDatosUsuario(usuarioID);
 console.log("DATA:",data);
 console.log("TIPO:",data.tipo);
 /* ===== PRIMER INGRESO ===== */
 if(data.tipo==="base"){
    mostrarLoader();
  renderizarMundial(
     data.groups.slice(1),
     data.groupMatches.slice(1)
   );
    ocultarLoader();
 }
 /* ===== USUARIO EXISTENTE ===== */
 if(data.tipo==="usuario"){
  mostrarLoader();
   reconstruirMundialUsuario(data.datos);
    ocultarLoader();
 }

}
iniciarApp();

function esperarPartidosGrupos(){

   return new Promise(resolve=>{

      const intervalo = setInterval(()=>{

         const partidos =
            document.querySelectorAll(".partido-grupo");

         if(partidos.length>=72){
            clearInterval(intervalo);
            resolve();
         }

      },50);

   });

}

async function reconstruirMundialUsuario(datos){

 /* =========================
    1. CARGAR BASE
 ========================= */

 const base = await cargarMundial();

 await renderizarMundial(
   base.equipos,
   base.partidos
 );

  await esperarPartidosGrupos(); // ⭐ CLAVE
  
 /*console.log("Trae de RendeM:", base.equipos, base.partidos);*/

 /* =========================
    2. RESTAURAR GRUPOS
 ========================= */

 datos.slice(1).forEach(p=>{

   const id = Number(p[0]);

   /* SOLO GRUPOS */
   if(id<1 || id>72) return;

   const gl = p[3];
   const gv = p[4];

   const partido =
 document.querySelector(
   `.partido-grupo[data-idgrupo="${id}"]`
 );

 /*console.log("datos de partidos:", id, gl, gv, partido);*/

   if(!partido) return;

   partido.querySelector(".gol-local").value = gl;
   partido.querySelector(".gol-visitante").value = gv;

 });

 /* =========================
    3. RECALCULAR TABLAS
 ========================= */

 recalcularTablas();

 /* =========================
    4. RESTAURAR ELIMINATORIAS
 ========================= */

/*setTimeout(()=>{

   restaurarEliminatorias(datos);

  /* generarBracketAutomatico("restaurar");*/

   /*recalcularBracketCompleto();

},500);*/
 /* 🔥 ESPERAR A QUE EXISTAN 16AVOS */
 /*await esperarBracket();*/
 /* 🔥 RESTAURAR ELIMINATORIAS */
 /*restaurarEliminatorias(datos);
 recalcularBracketCompleto()*/

/* await esperarBracket();

/* 16avos 
restaurarEliminatorias(datos);
recalcularBracketCompleto();

/* esperar octavos 
await esperarFase(81);

/* octavos 
restaurarEliminatorias(datos);
recalcularBracketCompleto();

/* esperar cuartos 
await esperarFase(89);

/* cuartos + semis + final 
restaurarEliminatorias(datos);
recalcularBracketCompleto();

/* 🔥 semifinales 
await esperarUltimaFase();
restaurarEliminatorias(datos);
recalcularBracketCompleto();*/

/* =========================
   🔥 RESTAURACIÓN PROGRESIVA
========================= */

/* ===== 16AVOS ===== */
await esperarBracket();

restaurarEliminatorias(datos);
recalcularBracketCompleto();


/* ===== OCTAVOS ===== */
await esperarFase(81);

restaurarEliminatorias(datos);
recalcularBracketCompleto();


/* ===== CUARTOS ===== */
await esperarFase(89);

restaurarEliminatorias(datos);
recalcularBracketCompleto();

 /* =========================
    6. SEMIS
 ========================= */

 await esperarFase(101);

 restaurarEliminatorias(datos);
 recalcularBracketCompleto();

 /* =========================
    7. FINAL + 3ER PUESTO 🔥
 ========================= */

 await esperarFinales();
 restaurarEliminatorias(datos);

 recalcularBracketCompleto();

}

function esperarFase(idMinimo){

 return new Promise(resolve=>{

   const intervalo = setInterval(()=>{

      const partidos =
        document.querySelectorAll(".partido-eliminatoria");

      const existe = [...partidos]
        .some(p => Number(p.dataset.partido) >= idMinimo);

      if(existe){
         clearInterval(intervalo);
         resolve();
      }

   },100);

 });
}

function restaurarEliminatorias(datos){
 datos.slice(1).forEach(p=>{

   const id = Number(p[0]);

   if(id<73 || id>104) return;

   const gl = p[3];
   const gv = p[4];
   const pl = p[5];
   const pv = p[6];

   const partido =
     document.querySelector(
       `[data-partido="${id}"]`
     );

   if(!partido) return;

   /* GOLES */

   const inputGL =
     partido.querySelector(
       ".golLocal, .gol-local"
     );

   const inputGV =
     partido.querySelector(
       ".golVisitante, .gol-visitante"
     );

   if(inputGL) inputGL.value = gl;
   if(inputGV) inputGV.value = gv;

   /* PENALES */

   if(pl || pv){

      const chk =
        partido.querySelector(".penales");

      if(chk){

         chk.checked = true;

         const box =
           partido.querySelector(".penales-box");

         if(box){
            box.classList.remove("hidden");
         }
      }

      const penL =
        partido.querySelector(".penLocal");

      const penV =
        partido.querySelector(".penVisitante");

      if(penL) penL.value = pl;
      if(penV) penV.value = pv;
   }

 });

 /* 🔥 RECALCULAR TODO */
 recalcularBracketCompleto();

}

/*BOTON DE SIMULACION*/
function simularResultadosGrupos(){

 document
   .querySelectorAll(".partido-grupo")
   .forEach(partido=>{

     const gl =
       partido.querySelector(".gol-local");

     const gv =
       partido.querySelector(".gol-visitante");

     if(gl && gv){
        gl.value = 2;
        gv.value = 1;
     }
   });

 /* 🔥 recalcular TODO el mundial 
 recalcularTablas();*/
}
document.getElementById("simularResultados")
 ?.addEventListener("click",simularResultadosGrupos);
     
/*--------------
import { activarActualizacionFases } from "./clasificacion.js";
activarActualizacionFases();*/

document.addEventListener("change", e=>{

 if(!e.target.matches(".golLocal, .golVisitante, .penLocal, .penVisitante")) return;

 recalcularBracketCompleto();

});

document.addEventListener("change", e=>{

 if(!e.target.classList.contains("penales")) return;

 recalcularBracketCompleto();

});

document.addEventListener("input", e => {

 if(
   e.target.classList.contains("golLocal") ||
   e.target.classList.contains("golVisitante") ||
   e.target.classList.contains("gol-local") ||
   e.target.classList.contains("gol-visitante")
 ){
    guardarUsuario();
 }

});


function activarAutoGuardado(){

 document.addEventListener(
   "input",
   debounce(guardarUsuario,2000)
 );
}

function debounce(fn,delay){

 let timer;

 return function(){
   clearTimeout(timer);
   timer = setTimeout(fn,delay);
 };

}

export async function guardarUsuario(){

 const partidos = [];

 document
  .querySelectorAll(".partido-grupo, .partido-eliminatoria")
  .forEach(p=>{

    let id;
/* ======================
      GRUPOS
   ====================== */
   if(p.classList.contains("partido-grupo")){
      id = p.dataset.idgrupo;   // 👈 crearás este atributo
   }

   /* ======================
      ELIMINATORIA
   ====================== */
   if(p.classList.contains("partido-eliminatoria")){
      id = p.dataset.partido;
   }

   if(!id) return;

/*const gl = p.querySelector(
  `.golLocal[data-partido="${id}"],
   .gol-local[data-partido="${id}"]`
);

const gv = p.querySelector(
  `.golVisitante[data-partido="${id}"],
   .gol-visitante[data-partido="${id}"]`
);

const pl = p.querySelector(
  `.penLocal[data-partido="${id}"]`
);

const pv = p.querySelector(
  `.penVisitante[data-partido="${id}"]`
);*/


const gl = p.querySelector(".golLocal, .gol-local");
const gv = p.querySelector(".golVisitante, .gol-visitante");
const pl = p.querySelector(".penLocal");
const pv = p.querySelector(".penVisitante");

 /* ⭐ EQUIPOS */
    const equipos = p.querySelectorAll(
      ".equipo, .local, .visitante"
    );

    const local = equipos[0]?.textContent.trim() || "";
    const visitante = equipos[1]?.textContent.trim() || "";


partidos.push([
 id,
 local,
 visitante,

 gl?.value || "",
 gv?.value || "",
 pl?.value || "",
 pv?.value || ""
]);

 });

document.getElementById("estadoGuardado")
.innerText = "Guardando...";

 const datos2 = {
    tipo:"guardar",
    usuario:usuarioID,
    partidos:partidos
  };

  /*console.log(usuarioID);
  console.log(partidos);*/

 const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

 await fetch(URL,{
   method:"POST",
   body:JSON.stringify(datos2)
 });

 document.getElementById("estadoGuardado")
.innerText = "✅ Guardado";
 console.log("✅ Guardado automático");

}

function esperarBracket(){

 return new Promise(resolve=>{

   const intervalo = setInterval(()=>{

      const partidos =
        document.querySelectorAll(".partido-eliminatoria");

      if(partidos.length > 0){
         clearInterval(intervalo);
         resolve();
      }

   },100);

 });
}

function esperarUltimaFase(){

 return new Promise(resolve=>{

   const intervalo = setInterval(()=>{

      const partidos =
        document.querySelectorAll(".partido-eliminatoria");

      const existeSemi =
        [...partidos].some(p =>
          Number(p.dataset.partido) >= 101
        );

      if(existeSemi){
         clearInterval(intervalo);
         resolve();
      }

   },100);

 });
}

function esperarPartidosHasta(maxID){

 return new Promise(resolve=>{

   const intervalo = setInterval(()=>{

      const partidos =
        document.querySelectorAll(".partido-eliminatoria");

      const idsDOM = [...partidos]
        .map(p=>Number(p.dataset.partido));

      if(idsDOM.includes(maxID)){
         clearInterval(intervalo);
         resolve();
      }

   },100);

 });
}

async function esperarFinales(){

  console.log("esperando finales...");

  while(
    !document.querySelector('.partido-eliminatoria[data-partido="103"]') ||
    !document.querySelector('.partido-eliminatoria[data-partido="104"]')
  ){
     await new Promise(r=>setTimeout(r,100));
  }

  console.log("finales listas ✅");
}


document
.getElementById("btnPDF")
.addEventListener("click", generarPDF);

async function generarPDF(){

 const { jsPDF } = window.jspdf;

 const usuarioID =
   localStorage.getItem("usuarioID");

   const contenedor =
   document.getElementById("bracketCompleto");

 document.body.classList.add("modo-pdf");


 /* ✅ esperar render final */
 await new Promise(r=>setTimeout(r,800));

 const canvas = await html2canvas(contenedor,{
    scale:2,
    useCORS:true,
    scrollY:-window.scrollY
 });

 const imgData = canvas.toDataURL("image/png");

 const pdf = new jsPDF("p","mm","a4");

 const pdfWidth = pdf.internal.pageSize.getWidth();
 const pdfHeight =
   (canvas.height * pdfWidth) / canvas.width;

 const imgWidth = 210;
const pageHeight = 297;

const imgHeight =
  (canvas.height * imgWidth) / canvas.width;

let heightLeft = imgHeight;
let position = 0;

pdf.addImage(imgData,"PNG",0,position,imgWidth,imgHeight);
heightLeft -= pageHeight;

while(heightLeft > 0){

  position = heightLeft - imgHeight;

  pdf.addPage();

  pdf.addImage(
    imgData,
    "PNG",
    0,
    position,
    imgWidth,
    imgHeight
  );

  heightLeft -= pageHeight;
}

 pdf.save(`Porra_${usuarioID}.pdf`);
}

function mostrarLoader(){
   document.getElementById("loader").style.display="flex";
}

function ocultarLoader(){
   document.getElementById("loader").style.display="none";
}

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
