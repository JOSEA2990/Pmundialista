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
   renderizarMundial(
     data.groups.slice(1),
     data.groupMatches.slice(1)
   );
 }
 /* ===== USUARIO EXISTENTE ===== */
 if(data.tipo==="usuario"){
   reconstruirMundialUsuario(data.datos);
 }

}
iniciarApp();

async function reconstruirMundialUsuario(datos){

 /* =========================
    1. CARGAR BASE
 ========================= */

 const base = await cargarMundial();

 renderizarMundial(
   base.equipos,
   base.partidos
 );

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
     document.querySelectorAll(".partido-grupo")[id-1];

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

 setTimeout(()=>{

   restaurarEliminatorias(datos);

 },500);

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

   partidos.push([
     id,
     p.querySelector(".equipo-local,.local,.equipo:nth-child(1)")
      ?.textContent.trim(),

     p.querySelector(".equipo-visitante,.visitante,.equipo:nth-child(3)")
      ?.textContent.trim(),

     p.querySelector(".golLocal,.gol-local")?.value || "",
     p.querySelector(".golVisitante,.gol-visitante")?.value || "",
     p.querySelector(".penLocal")?.value || "",
     p.querySelector(".penVisitante")?.value || ""
   ]);

 });

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

 console.log("✅ Guardado automático");

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
