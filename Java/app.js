const usuarioID = localStorage.getItem("usuarioID");
const nombre = localStorage.getItem("nombre");

if(!usuarioID){
  window.location.href="index.html";
}

document.getElementById("bienvenida").innerText =
"Bienvenido " + usuarioID;

async function cargarMundial(){

const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

const res = await fetch(URL+"?accion=mundial");

const data = await res.json();  
console.log(data);   // 👈 IMPORTANTE

 const equipos = data.groups.slice(1);
 const partidos = data.groupMatches.slice(1);

 renderizarMundial(equipos, partidos);
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

function renderizarMundial(equipos, partidos){

 const contenedor=document.getElementById("mundial");
 contenedor.innerHTML="";

 const grupos={};

 // organizar equipos
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

 // organizar partidos
 partidos.forEach(p=>{
   grupos[p[1]].partidos.push(p);
 });

 // crear tarjetas
 Object.keys(grupos).forEach(grupo=>{

   const g=grupos[grupo];

   const card=document.createElement("div");
   card.className="grupo-card";

   let html=`<h2>Grupo ${grupo}</h2>`;

   /* EQUIPOS */
   html+=`<div class="equipos">`;
   g.equipos.forEach(eq=>{
     html+=`<div>${eq}</div>`;
   });
   html+=`</div>`;

   /* PARTIDOS */
   html+=`<div class="partidos">`;

   g.partidos.forEach(p=>{

     html+=`
     <div class="partido">

       <div class="equipo">
       <span>${p[2]}</span>
       </div>

       <div class="marcador">
       <input type="number"
        data-id="${p[0]}"
        data-equipo="${p[2]}"
        class="gol">

       -

       <input type="number"
        data-id="${p[0]}"
        data-equipo="${p[3]}"
        class="gol">
        </div>

       <div class="equipo">
       <span>${p[3]}</span>
       </div>

     </div>`;
   });

   html+=`</div>`;

   /* TABLA VACIA (se llenará luego) */
   html+=`
   <table class="tabla" id="tabla-${grupo}">
     <thead>
       <tr>
         <th>Equipo</th>
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
}

cargarMundial();

async function guardar(){

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
}

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