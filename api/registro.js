export default async function handler(req, res) {

  if(req.method !== "POST"){
    return res.status(405).json({error:"Metodo no permitido"});
  }

  const form = await req.formData();

  const datos = Object.fromEntries(form);

  // 👉 llamar a Google Apps Script
  const respuesta = await fetch(
    "https://script.google.com/macros/s/AKfycbxyrSg2PkETwI9ZxyBWebngL14g9bPG--nvmJzGYt0eegI0E-fhvmTGy1ihcSBxhtANgA/exec",
    {
      method:"POST",
      body:new URLSearchParams(datos)
    }
  );

  const texto = await respuesta.text();

  res.status(200).send(texto);
}