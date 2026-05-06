/*import { activarActualizacionFases, activarPenales } from "./clasificacion.js";

export const BRACKET_FIFA = [

 OCTAVOS 
 {id:89, local:74, visitante:77},
 {id:90, local:73, visitante:75},
 {id:91, local:76, visitante:78},
 {id:92, local:79, visitante:80},
 {id:93, local:83, visitante:84},
 {id:94, local:81, visitante:82},
 {id:95, local:86, visitante:88},
 {id:96, local:85, visitante:87},

 /* CUARTOS 
 {id:97, local:89, visitante:90},
 {id:98, local:93, visitante:94},
 {id:99, local:91, visitante:92},
 {id:100, local:95, visitante:96},

 /* SEMI 
 {id:101, local:97, visitante:98},
 {id:102, local:99, visitante:100},

 /* TERCER LUGAR 
 {id:103, local:"P101", visitante:"P102"},

 /* FINAL 
{id:104, local:101, visitante:102}
];*/

/*export function obtenerGanador(id){

  const gl =
   document.querySelector(
     `.golLocal[data-partido="${id}"]`
   );

 const gv =
   document.querySelector(
     `.golVisitante[data-partido="${id}"]`
   );


 if(!gl || !gv) return null;

 const l = Number(gl.value);
 const v = Number(gv.value);

 if(isNaN(l)||isNaN(v)) return null;

 if(l>v) return "L";
 if(v>l) return "V";

 /* EMPATE → PENALES 

const pl =
   document.querySelector(
     `.penLocal[data-partido="${id}"]`
   );

 const pv =
   document.querySelector(
     `.penVisitante[data-partido="${id}"]`
   );

 if(!pl || !pv) return null;

 const penL=Number(pl.value);
 const penV=Number(pv.value);

 if(penL>penV) return "L";
 if(penV>penL) return "V";

 return null;
}*/

/*function resolverReferencia(ref){

 if(typeof ref==="number"){

   const ganador = obtenerGanador(ref);
   if(!ganador) return "Por definir";

   const nombre =
     document.querySelector(
       `.partido-eliminatoria[data-partido="${ref}"] .${ganador==="L"?"local":"visitante"}`
     );

   return nombre?.innerText || "Por definir";
 }

 if(typeof ref==="string" && ref.startsWith("P")){

 const id = Number(ref.replace("P",""));
 const ganador = obtenerGanador(id);

 if(!ganador) return "Por definir";

 const perdedor =
   document.querySelector(
     `.partido-eliminatoria[data-partido="${id}"] .${ganador==="L"?"visitante":"local"}`
   );

 return perdedor?.innerText || "Por definir";
}
}*/

/*export function pintarFasesFinales(){

 const cont = document.getElementById("fases-finales");

 if(!cont) return;

 cont.innerHTML="";

 let faseActual="";
 let htmlFase="";

 BRACKET_FIFA.forEach((p,index)=>{
  
   const fase = obtenerNombreFase(p.id);

   if(!fase) return; // ← CLAVE

   /* CAMBIO DE FASE 
   if(fase!==faseActual){

     /* pintar fase anterior 
     if(htmlFase!==""){
        cont.innerHTML += htmlFase;
        htmlFase="";
     }

 
     faseActual=fase;

     htmlFase += `
       <div class="fase">
         <h2 class="titulo-fase">${fase}</h2>
     `;
   }

   const local = resolverReferencia(p.local);
   const visitante = resolverReferencia(p.visitante);

   htmlFase += `
   <div class="partido-eliminatoria" data-partido="${p.id}">

      <div class="numero">
         Partido ${p.id}
      </div>

      <div class="linea-equipos">

         <span class="local">
            ${limpiarNombreEquipo(local)}
         </span>

            <input type="number"
              class="golLocal"
              data-partido="${p.id}">
            <span>-</span>
            <input type="number"
              class="golVisitante"
              data-partido="${p.id}">

         <span class="visitante">
            ${limpiarNombreEquipo(visitante)}
         </span>

      </div>

      <label>
        <input type="checkbox"
           class="penales"
           data-partido="${p.id}">
        Penales
      </label>

      <div class="penales-box hidden">
 
         <input type="number" placeholder="Pen L" class="penLocal"
           data-partido="${p.id}">

         <span>-</span>

          <input type="number" placeholder="Pen V" class="penVisitante"
           data-partido="${p.id}">
      </div>

   </div>
   `;

   /* cerrar ultima fase */
   /*if(index===BRACKET_FIFA.length-1){
      htmlFase += `</div>`;
      cont.innerHTML += htmlFase;
   }*/

      /* ✅ cerrar última fase 
if(htmlFase!==""){
   cont.innerHTML += "</div>";
}

 });

 if(htmlFase!==""){
   cont.innerHTML+=htmlFase;
}
}*/

/*function obtenerNombreFase(id){

 if(id<=96) return "Octavos de Final";
 /*if(id<=100) return "Cuartos de Final";
 if(id<=102) return "Semifinales";
 if(id===103) return "Tercer Lugar";
 if(id===104) return "Final";
}*/

/* limpiarNombreEquipo(nombre){

 if(!nombre) return "Por definir";

 const partes = nombre.split(" ");

 partes.shift(); // elimina 1A, 2D, etc

 return partes.join(" ");
}

function faseCompleta(inicio, fin){

 for(let id=inicio; id<=fin; id++){
   if(!obtenerGanador(id)){
      return false;
   }
 }

 return true;
}

function faseDisponible(id){

 if(id<=96) return true;

 if(id<=100)
   return faseCompleta(89,96);

 /*if(id<=102)
   return faseCompleta(97,100);

 if(id===103 || id===104)
   return faseCompleta(101,102);

 return false;
}*/

/*function partidoCompleto(partido){

   const gLocal =
      document.querySelector(`#gL-${partido.id}`)?.value;

   const gVisit =
      document.querySelector(`#gV-${partido.id}`)?.value;

   return gLocal !== "" && gVisit !== "";
}*/