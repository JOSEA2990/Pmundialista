async function cargarMundial(){

 const res = await fetch("data/worldcup2026.json");
 const data = await res.json();

 mostrarGrupos(data.groups);
 mostrarPartidos(data.groupMatches);
}

function mostrarGrupos(groups){

 const container = document.getElementById("groups");

 for(const grupo in groups){

   const div = document.createElement("div");
   div.className="group";

   div.innerHTML = `
      <h2>Grupo ${grupo}</h2>
      ${groups[grupo].map(e=>`<p>${e}</p>`).join("")}
   `;

   container.appendChild(div);
 }
}

function mostrarPartidos(matches){

 const container = document.getElementById("groups");

 matches.forEach(match=>{

   const div=document.createElement("div");

   div.innerHTML=`
     <p>
       ${match.home}
       <input type="number" min="0" id="h${match.id}" style="width:40px">
       -
       <input type="number" min="0" id="a${match.id}" style="width:40px">
       ${match.away}
     </p>
   `;

   container.appendChild(div);
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

  await fetch("https://script.google.com/macros/s/AKfycbwPF3pLAnltAI7OkmXF5sLqZT7kSyV_l_fLIP23c3skpNpG3pi2jdQcd84J7f8uchA0iQ/exec", {
    method: "POST",
    body: JSON.stringify(datos)
  });

  alert("Pronóstico guardado");
}

async function registrar(){

async function registrar(){

  const nombre = document.getElementById("nombre").value;
  const celular = document.getElementById("celular").value;

  const datos = {
    tipo: "registro",
    nombre: nombre,
    celular: celular
  };

  const res = await fetch("/api/registro",{
      method:"POST",
      body: JSON.stringify(datos)
  });

  const data = await res.json();

  // ✅ MENSAJES DIFERENTES
  if(data.status === "nuevo"){
      alert("✅ Usuario registrado correctamente");
  }

  if(data.status === "existe"){
      alert("⚠️ Este usuario ya está registrado");
  }

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