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

 alert("hola");

 const res = await fetch("https://script.google.com/macros/s/AKfycbxyrSg2PkETwI9ZxyBWebngL14g9bPG--nvmJzGYt0eegI0E-fhvmTGy1ihcSBxhtANgA/exec",{
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