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

  const datos = {
    tipo:"registro",
    nombre:document.getElementById("nombre").value,
    celular:document.getElementById("celular").value
  };

  await fetch("https://script.google.com/macros/s/AKfycbwPF3pLAnltAI7OkmXF5sLqZT7kSyV_l_fLIP23c3skpNpG3pi2jdQcd84J7f8uchA0iQ/exec", {
  method: "POST",
  mode: "no-cors",
  body: JSON.stringify(datos)
});

  const json = await res.json();

  alert("Tu ID es: " + json.id);
}
