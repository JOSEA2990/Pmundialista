const reglas = {
 A:["B","C","D","E","F","G","H","I","J","K","L"],
 B:["A","C","D","E","F","G","H","I","J","K","L"],
 D:["A","B","C","E","F","G","H","I","J","K","L"],
 E:["A","B","C","D","F","G","H","I","J","K","L"],
 G:["A","B","C","D","E","F","H","I","J","K","L"],
 I:["A","B","C","D","E","F","G","H","J","K","L"],
 K:["A","B","C","D","E","F","G","H","I","J","L"],
 L:["A","B","C","D","E","F","G","H","I","J","K"]
};

const ordenAsignacion = ["A","B","D","E","G","I","K","L"];

export function generarCruces(primeros, tercerosClasificados){

   let disponibles = [...tercerosClasificados];
   const cruces = [];

   ordenAsignacion.forEach(grupo => {

      const rival = disponibles.find(t =>
         reglas[grupo].includes(t)
      );

      cruces.push({
         local: "1"+grupo,
         visitante: "3"+rival
      });

      disponibles =
         disponibles.filter(t => t !== rival);
   });

   return cruces;
}

export function pintarOctavos(cruces){

   const contenedor =
      document.getElementById("octavos");

   contenedor.innerHTML = "";

   cruces.forEach(c => {
      contenedor.innerHTML += `
         <div>${c.local} vs ${c.visitante}</div>
      `;
   });
}

export function obtenerClasificados(tablasGrupos){

 const posiciones={};
 const primeros=[];
 const segundos=[];
 const terceros=[];

 for(const grupo in tablasGrupos){

   const equipos = Object.values(tablasGrupos[grupo]);

   if(equipos.length < 3) continue;

   equipos.sort((a,b)=>
     b.PTS-a.PTS ||
     b.DG-a.DG ||
     b.GF-a.GF
   );

   posiciones[grupo]={
     primero:equipos[0],
     segundo:equipos[1],
     tercero:equipos[2]
   };

   primeros.push({...equipos[0],grupo});
   segundos.push({...equipos[1],grupo});
   terceros.push({...equipos[2],grupo});
 }

 /* ranking global terceros */
 terceros.sort((a,b)=>
   b.PTS-a.PTS ||
   b.DG-a.DG ||
   b.GF-a.GF
 );

 const mejoresTerceros=terceros.slice(0,8);

 return{
   posiciones,
   primeros,
   segundos,
   mejoresTerceros
 };
}