export async function cargarMundial(){

const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

const res = await fetch(URL+"?accion=mundial");

const data = await res.json();  
console.log(data);   // 👈 IMPORTANTE

 /*const equipos = data.groups.slice(1);
 const partidos = data.groupMatches.slice(1);*/

 return {
   equipos: data.groups.slice(1),
   partidos: data.groupMatches.slice(1)
 };

 /*renderizarMundial(equipos, partidos);*/
}

export async function cargarINDEXC(){

 const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

 const res = await fetch(URL+"?accion=indexc");

 const data = await res.json();

 return data;
}