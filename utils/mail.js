const nodemailer = require('nodemailer');

module.exports = {
  transporter: nodemailer.createTransport({
    host: 'smtp.aol.com',
    port: 465, //587
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
  }),

  welcome(name) {
    return `
    <body>
        <h1>Admin Pro</h1>
     <h2>Bienvenido ${name}</h2>
     <p>Felicitaciones, a partir de ahora cuentas con el respaldo de una compañia que te ofrece soluciones óptimas
     para la ejecución de tus proyectos, brindándote herramientas intuitivas para la gestión de los recursos en 
     tu labor diaria. Nos complace darte la bienvenida. Estamos atentos a tus sugerencias para poder seguir mejorando y 
     ofrecerte una mejor experiencia.   </p>
     <h2>Cordialmente, Admin Pro.</h2>
    </body>
  `;
  },
};
