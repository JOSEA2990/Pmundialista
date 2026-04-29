async function login(){

 const id = document.getElementById("id").value;
 const celular = document.getElementById("celular").value;

 const datos = new FormData();
 datos.append("tipo","login");
 datos.append("id",id);
 datos.append("celular",celular);

 const res = await fetch("/api/registro",{
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