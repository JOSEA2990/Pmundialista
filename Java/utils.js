export function obtenerCodigoTerceros(mejoresTerceros){

 return mejoresTerceros
   .map(t => t.grupo)
   .sort()
   .join("");

}