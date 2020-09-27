const nodemailer = require('nodemailer')
const MAIL_USER = process.env.MAIL_USER
const MAIL_PSWD = process.env.MAIL_PSWD
const projectPath = require('path').dirname(require.main.filename)

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
   host: "papita.org",
   port: 465,
   secure: true, // true for 465, false for other ports
   auth: {
      user: MAIL_USER,
      pass: MAIL_PSWD,
   },
});


module.exports = {
   sendEmail: async (req, res) => {
      try {
         const { from, to, subject, body } = req.body

         // send mail with defined transport object
         const msg = await transporter.sendMail({
            from: '"ITA" ' + '<' + MAIL_USER + '>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            // text: "Hello world", // plain text body
            // html: "Hola, esto es un mensaje de <b>prueba</b>", // html body
            html: body,
            headers: {
               'From': MAIL_USER
            },
            amp: `<!doctype html>
            <html>
               <body>
                  Esto está en el body
               </body>
            </html>`
         });
         console.log(msg)
         const info = await transporter.sendMail(msg)

         console.log("Message sent: %s", info.messageId);
         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

         // Preview only available when sending through an Ethereal account
         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

         res.send('Email sent')
      }
      catch (err) {
         throw (err);
      }
   },
   sendWelcomeEmail: async (req, res) => {
      try {
         const { to } = req.body
         const msg = await transporter.sendMail({
            from: '"ITA" ' + '<' + MAIL_USER + '>',
            to: to,
            subject: "Bienvenido a ITA",
            envelope: {
               from: 'ITA ' + MAIL_USER,
               to: to,
            },
            headers: {
               'From': MAIL_USER,
               'x-from': MAIL_USER,
            },
            html: `<!doctype html>
            <html>
               <head>
                  <style>
                     p { font-size: 16px; }
                  </style>
               </head>
               <body style = "font-family: Tahoma, Geneva, sans-serif;">
               <div style="min-width: 260px; min-height: 100%; padding: 30px 0 30px 0; margin: 0 auto; background-color: #f6f6f6;">
                  <div style="max-width: 600px; min-width: 300px; margin: 10px auto 10px auto; padding: 30px 40px 30px 40px; background-color: #ffffff;">
                     <p>¡Felicitaciones!</p>
                     <p>Tu registro de ITA está completo para el correo ` + to + `.</p>
                     <p>Recuerda ingresar a tu cuenta y registrar a tus hij@s.</p>
                     <p>Si tienes alguna duda, consulta o pregunta sobre ITA, puedes contactar a <a href="mailto:estoesla@papita.org?subject=Soporte ITA" target="_blank">nuestro equipo</a>.</p>
                     <p>Saludos, </p>
                     <p>Equipo ITA</p>
                     <div style="text-align: center;">
                        <img src="cid:ita09232020">
                     </div>
                  </div>
               </div>
               </body>
            </html>`,
            attachments: [{
               filename: 'ita3d_1_small.png',
               path: projectPath + "/public/images/ita3d_1_small.png",
               cid: 'ita09232020'
            }]
         });

         // const info = await transporter.sendMail(msg)

         // console.log("Message sent: %s", info.messageId);

         res.send('Email sent')
      }
      catch (err) {
         throw (err);
      }
   },
   sendPasswordChangedMail: async (req, res) => {
      try {
         const { to } = req.body
         const msg = await transporter.sendMail({
            from: '"ITA" ' + '<' + MAIL_USER + '>',
            to: to,
            subject: "Tu contraseña ha sido cambiada",
            headers: {
               'From': MAIL_USER
            },
            html: `<!doctype html>
            <html>
               <head>
                  <style>
                     p { font-size: 16px; }
                  </style>
               </head>
               <body style = "font-family: Tahoma, Geneva, sans-serif;">
               <div style="min-width: 260px; min-height: 100%; padding: 30px 0 30px 0; margin: 0 auto; background-color: #f6f6f6;">
                  <div style="max-width: 600px; min-width: 300px; margin: 10px auto 10px auto; padding: 30px 40px 30px 40px; background-color: #ffffff;">
                     <p>Estimad@</p>
                     <p>La contraseña para su cuenta de ITA (` + to + `) fue exitosamente cambiada a las ` + getCurrentDate() + `.</p>
                     <p>Si tiene alguna duda o pregunta, contacte a <a href="mailto:estoesla@papita.org?subject=Soporte ITA" target="_blank">nuestro equipo</a>. Si ha recibido este correo por equivocación, recomendamos que cambie su actual contraseña.</p>
                     <p>Saludos, </p>
                     <p>Equipo ITA</p>
                     <div style="text-align: center;">
                        <img src="cid:ita092320201">
                     </div>
                  </div>
               </div>
               </body>
            </html>`,
            attachments: [{
               filename: 'ita3d_1_small.png',
               path: projectPath + "/public/images/ita3d_1_small.png",
               cid: 'ita092320201'
            }]
         });

         res.send('Email sent')
      }
      catch (err) {
         throw (err);
      }
   }
}

function getCurrentDate() {
   let d = new Date();
   let hour = d.toString().split(" ")[4]
   let month
   switch (d.getMonth()) {
      case 0:
         month = "Enero"
         break;
      case 1:
         month = "Febrero"
         break;
      case 2:
         month = "Marzo"
         break;
      case 3:
         month = "Abril"
         break;
      case 4:
         month = "Mayo"
         break;
      case 5:
         month = "Junio"
         break;
      case 6:
         month = "Julio"
         break;
      case 7:
         month = "Agosto"
         break;
      case 8:
         month = "Septiembre"
         break;
      case 9:
         month = "Octubre"
         break;
      case 10:
         month = "Noviembre"
         break;
      case 11:
         month = "Diciembre"
         break;
      default:
         break;
   }
   return hour.split(":")[0] + ":" + hour.split(":")[1] + " horas del " + d.getDate() + " de " + month + " " + d.getFullYear()
}