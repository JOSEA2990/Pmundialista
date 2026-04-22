export default async function handler(req, res) {

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwPF3pLAnltAI7OkmXF5sLqZT7kSyV_l_fLIP23c3skpNpG3pi2jdQcd84J7f8uchA0iQ/exec",
    {
      method: "POST",
      body: new URLSearchParams(req.body)
    }
  );

  const text = await response.text();

  res.status(200).send(text);
}