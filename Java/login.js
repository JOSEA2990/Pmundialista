/* if(localStorage.getItem("usuarioID")){
   window.location.href="app.html";
}*/

async function login(){

 const id = document.getElementById("id").value;
 const celular = document.getElementById("celular").value;

 const datos = new FormData();
 datos.append("tipo","login");
 datos.append("id",id);
 datos.append("celular",celular);

const URL="https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec";

 const res = await fetch(URL+"?accion=usuarios",{
   method:"POST",
   body:datos
 });

 const r = await res.json();

 if(r.status==="ok"){

   localStorage.setItem("usuarioID",id);
   window.location.href="app.html";

 }else{
   alert("❌ Datos incorrectos");
 }
}