export async function cargarMundial(){

 const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

const res = await fetch(URL+"?accion=mundial");

const data = await res.json();  
 console.log("DATA SERVIDOR:", data);   // 👈 IMPORTANTE

 /*const equipos = data.groups.slice(1);
 const partidos = data.groupMatches.slice(1);*/

 if(data.error){
   throw new Error(data.error);
 }

 return {
   equipos: data.groups.slice(1),
   partidos: data.groupMatches.slice(1)
 };
}

export async function cargarINDEXC(){

 const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

 const res = await fetch(URL+"?accion=indexc");

 const data = await res.json();

 return data;
}

/*export async function cargarMundialUsuario(usuarioID){

const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

const res = await fetch(URL + "?accion=cargarUsuario&usuario=" + usuarioID);
return await res.json();

const data = await res.json();

 console.log("DATA USUARIO:", data);

 if(data.error){
   return null;
 }

 return data.datos;

}*/

export async function cargarDatosUsuario(usuarioID){

const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

const res = await fetch(URL+"?accion=cargarUsuario&usuario="+usuarioID);

return await res.json();

 console.log("DATA USUARIO:", datos);
 console.log("Tipo:", tipo);

 if(data.error){
   return null;
 }

 return data.datos;

}