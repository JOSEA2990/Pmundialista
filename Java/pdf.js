export async function generarPDF(){

 const { jsPDF } = window.jspdf;

 const usuarioID =
   localStorage.getItem("usuarioID");

 const contenedor =
   document.getElementById("contenidoPDF");

 /* ✅ esperar render final */
 await new Promise(r=>setTimeout(r,800));

 const canvas = await html2canvas(contenedor,{
    scale:2,
    useCORS:true,
    scrollY:-window.scrollY
 });

 const imgData = canvas.toDataURL("image/png");

 const pdf = new jsPDF("p","mm","a4");

 const pdfWidth = pdf.internal.pageSize.getWidth();
 const pdfHeight =
   (canvas.height * pdfWidth) / canvas.width;

 pdf.addImage(
   imgData,
   "PNG",
   0,
   0,
   pdfWidth,
   pdfHeight
 );

 pdf.save(`Porra_${usuarioID}.pdf`);
}