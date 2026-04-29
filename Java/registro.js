async function registrar(){

 const nombre = document.getElementById("nombre").value;
 const celular = document.getElementById("celular").value;

 const datos = new FormData();
 datos.append("tipo","registro");
 datos.append("nombre",nombre);
 datos.append("celular",celular);

 const res = await fetch("/api/registro",{
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