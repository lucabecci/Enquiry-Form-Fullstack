const path = require("path");
const dotenv = require("dotenv");
const express = require("express"); //agregando la expressbiblioteca
const app = express(); //estamos creando la aplicación rápida para manejar las solicitudes de API
//import del modulo de nodemailer
const transporter = require("./config");

const buildPath = path.join(__dirname, "..", "build");
dotenv.config();
app.use(express.json()); //configurando un analizador JSON para manejar los datos del formulario
app.use(express.static(buildPath)); //decimos a express que sirva todos los archivos de la buildcarpeta

//estamos creando un postcontrolador de solicitud para el /sendpunto final, por lo que cuando hacemos una llamada a la API desde nuestra aplicación React a la /sendURL, este controlador se ejecutará
app.post("/send", (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email,
      to: process.env.email,
      subject: req.body.subject,
      html: req.body.message,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Something went wrong. Try again later",
        });
      } else {
        res.send({
          success: true,
          message: "Thanks for contacting us. We will get back to you shortly",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong. Try again later",
    });
  }
});

app.listen(3030, () => {
  console.log("server start on port 3030");
}); // iniciando el servidor express para escuchar nuestras solicitudes en el puerto 3030
