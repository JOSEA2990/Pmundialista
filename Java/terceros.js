export function pintarTablaTerceros(terceros){

 const cont = document.getElementById("tabla-terceros");

 if(!cont) return;

 cont.innerHTML = `
 <table class="tabla terceros">
   <thead>
     <tr>
       <th>#</th>
       <th>Grupo</th>
       <th>Equipo</th>
       <th>PTS</th>
       <th>DG</th>
       <th>GF</th>
     </tr>
   </thead>
   <tbody>
   ${terceros.map((t,i)=>`
     <tr class="${i<8 ? "clasifica" : "eliminado"}">
       <td>${i+1}</td>
       <td>${t.grupo}</td>
       <td>${t.equipo}</td>
       <td>${t.PTS}</td>
       <td>${t.DG}</td>
       <td>${t.GF}</td>
     </tr>
   `).join("")}
   </tbody>
 </table>
 `;
}