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