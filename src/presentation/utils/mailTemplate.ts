const logoMacro="https://res.cloudinary.com/dfjbiwu8y/image/upload/v1727566558/db1s6rwneta6nagxza1u.png"
const logoFacebook="https://res.cloudinary.com/dfjbiwu8y/image/upload/v1727566558/w1wyljlc4a7l9x88tu1m.png";
const logoInstagram="https://res.cloudinary.com/dfjbiwu8y/image/upload/v1727566558/aflghepoiog9es8zg64c.png";
const logoYoutube="https://res.cloudinary.com/dfjbiwu8y/image/upload/v1727566558/xnfqiljpnprhd6i5jh0g.png";
const logoApleStore="https://res.cloudinary.com/dfjbiwu8y/image/upload/v1727566558/nzhurz07yfyo2vly4mnk.png";
const logoPlayStore="https://res.cloudinary.com/dfjbiwu8y/image/upload/v1727566558/vqcedt31jqxwtgurfpr4.png";
export function UserDataMailTemplate(){

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Correo Servicio al Cliente</title>
  <style>
    .body-container {
      width: 100vw;
      min-height: fit-content;
      background-color: #f4f4f4;
    }
    .mail-container {
      margin: 0 auto;
      width: 80%;
      min-height: 100vh;
      background-color: #ebeff2;
      padding: 2%;
    }
    h1, h2, h3{
      text-align: center;
    }
    h1 {
      font-size: 18px;
      color: gray;
      font-weight: 500;
    }
    h2 {
      font-size: 28px;
      color: gray;
      text-transform: uppercase;
      font-weight: 500;
    }
    h3 {
      font-size: 24px;
      color: #0b3659;
      text-transform: uppercase;
      font-weight: 500;
    }
  h4 {
  margin: 0 auto;
  margin-top: 3%;
  padding: 10px;
  width: 65%;
  font-size: 18px;
  text-decoration: underline;
  text-align: start;
}
    table {
      width: 80%;
      margin: 0 auto;
      margin-bottom: 3%;
    }

    .mail-top-container td img{
    height:30px
    }
    table.mail-center-table {
      width: 65%;
    }
    td {
      padding: 10px;
      vertical-align: top;
      font-size: 16px;
    }
    td img {
      display: block;
      margin: 0 auto;
    }
    a {
      display: block;
      text-align: center;
      margin-top: 5vh;
      font-size: 22px;
      font-weight: 500;
      color: #0b3659;
      text-decoration: none;
    }
    hr {
      width: 65%;
      margin: 0 auto;
      margin-top: 2vh;
      border-color: #0b3659;
    }
    .mail-bottom-container {
      width: 65%;
      margin: 0 auto;
    }
    .mail-bottom-container td {
   
      text-align: center;
      color: gray;
    }
    .mail-bottom-container td img {
     display:inline;
      margin-right: 15px;
      height: 30px;
    }
  </style>
</head>
<body>
  <div class="mail-container">
    <table class="mail-top-container">
      <tr>
        <td><h1>Servicio al cliente</h1></td> 
        <td><img src="${logoMacro}" alt="logo" /></td>
      </tr>
    </table>

    <h2 class='wellcome'>Hola Belladati</h2>
    <h3>Enviamos la información solicitada:</h3>

    <h4>Datos de cliente:</h4>
    <table class="mail-center-table">
      <tr>
        <td><strong>Nombre</strong></td> 
        <td>Belladati Belladati</td> 
      </tr>
      <tr>
        <td><strong>Fecha de registro</strong></td> 
        <td>Viernes 27 de septiembre 2024, 19:45 hs</td> 
      </tr>
      <tr>
        <td><strong>Direccion de correo electrónico</strong></td> 
        <td>belladati.poc@gmail.com</td>
      </tr>
      <tr>
        <td><strong>Teléfono</strong></td> 
        <td>+54 9 342 456456154 </td> 
      </tr>
      <tr>
        <td><strong>Género</strong></td> 
        <td>Masculino</td> 
      </tr>
      <tr>
        <td><strong>Ciudad actual</strong></td> 
        <td>Buenos Aires</td> 
      </tr>
      <tr>
        <td><strong>Estado civil</strong></td> 
        <td>Soltero</td> 
      </tr>
    </table>

    <a href="https://www.macro.com.ar/">MACRO.COM.AR</a>
    <hr />

    <table class="mail-bottom-container">
      <tr>
        <td>ENCUÉNTRANOS EN REDES</td>
        <td>DESCARGA LA APP DE MACRO</td>
      </tr>
      <tr>
        <td>
          <img src=${logoFacebook} alt="Facebook" />
          <img src=${logoYoutube} alt="YouTube" />
          <img src=${logoInstagram} alt="Instagram" />
        </td>
        <td>
          <img src=${logoPlayStore} alt="Google Play Store" />
          <img src=${logoApleStore} alt="Apple App Store" />
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`
}