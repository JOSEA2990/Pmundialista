export default async function handler(req, res) {

  try {

    const form = await req.formData();
    const datos = Object.fromEntries(form);

    const respuesta = await fetch(
      "https://script.google.com/macros/s/AKfycbxyrSg2PkETwI9ZxyBWebngL14g9bPG--nvmJzGYt0eegI0E-fhvmTGy1ihcSBxhtANgA/exec",
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