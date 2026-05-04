function generarPrimeraEliminatoria(datos){


 const P=datos.posiciones;
 const T=datos.mejoresTerceros;

 return [

 {id:73, local:P.A.segundo.equipo, visitante:P.B.segundo.equipo},

 {id:74, local:P.E.primero.equipo, visitante:T[0].equipo},

 {id:75, local:P.F.primero.equipo, visitante:P.C.segundo.equipo},

 {id:76, local:P.C.primero.equipo, visitante:P.F.segundo.equipo},

 {id:77, local:P.I.primero.equipo, visitante:T[1].equipo},

 {id:78, local:P.E.segundo.equipo, visitante:P.I.segundo.equipo},

 {id:79, local:P.A.primero.equipo, visitante:T[2].equipo},

 {id:80, local:P.L.primero.equipo, visitante:T[3].equipo},

 {id:81, local:P.D.primero.equipo, visitante:T[4].equipo},

 {id:82, local:P.G.primero.equipo, visitante:T[5].equipo},

 {id:83, local:P.K.segundo.equipo, visitante:P.L.segundo.equipo},

 {id:84, local:P.H.primero.equipo, visitante:P.J.segundo.equipo},

 {id:85, local:P.B.primero.equipo, visitante:T[6].equipo},

 {id:86, local:P.J.primero.equipo, visitante:P.H.segundo.equipo},

 {id:87, local:P.K.primero.equipo, visitante:T[7].equipo},

 {id:88, local:P.D.segundo.equipo, visitante:P.G.segundo.equipo}

 ];
}

function pintarEliminatorias(partidos){

 const cont=document.getElementById("eliminatorias");
 cont.innerHTML="";

 partidos.forEach(p=>{

   cont.innerHTML+=`
   <div class="partido-elim">

     <div class="equipos">${p.local}</div>

     <div class="marcador">
       <input type="number">
       <span>-</span>
       <input type="number">
     </div>

     <div class="equipos">${p.visitante}</div>

   </div>
   `;
 });
}

export {
 generarPrimeraEliminatoria,
 pintarEliminatorias
};