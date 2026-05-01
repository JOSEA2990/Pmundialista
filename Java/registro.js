/*if(localStorage.getItem("usuarioID")){
   window.location.href="app.html";
}*/

async function registrar(){

 const nombre = document.getElementById("nombre").value;
 const celular = document.getElementById("celular").value;

 const datos = new FormData();
 datos.append("tipo","registro");
 datos.append("nombre",nombre);
 datos.append("celular",celular);

 alert("hola");

const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

 const res = await fetch(URL,{
   method:"POST",
   body:datos
 });

 const r = await res.json();

 if(r.status==="nuevo"){
   alert("✅ Usuario creado\nTu ID es: " + r.id);
   window.location.href="index.html";
 }

 if(r.status==="existe"){
   alert("⚠️ Ya existe un usuario con ese celular");
 }
}