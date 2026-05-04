export default async function handler(req, res) {

  try {

    const form = await req.formData();
    const datos = Object.fromEntries(form);

    const respuesta = await fetch(
      "https://script.google.com/macros/s/AKfycbx4FlB1z3KLWH3fSbQdMby57AwcwB1yMvOcR8ahx-_QbubK1cDXmnJPSmfbK-Y8tyj5ag/exec",
      {
        method:"POST",
        body:new URLSearchParams(datos)
      }
    );

    const texto = await respuesta.text();

    res.status(200).send(texto);

  } catch(err){

    console.error(err);
    res.status(500).json({
      error:"Error en API",
      detalle: err.toString()
    });

  }
}