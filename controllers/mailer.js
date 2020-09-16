const nodemailer = require('nodemailer')
const MAIL_USER = process.env.MAIL_USER
const MAIL_PSWD = process.env.MAIL_PSWD

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
            headers: {
               'From': MAIL_USER
            },
            html: `<!doctype html>
            <html>
               <body>
                  Bienvenido
               </body>
            </html>`
         });
         console.log(msg)
         const info = await transporter.sendMail(msg)

         console.log("Message sent: %s", info.messageId);

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
               <body>
                  Tu contraseña ha sido cambiada exitosamente.
               </body>
            </html>`
         });
         console.log(msg)
         const info = await transporter.sendMail(msg)

         console.log("Message sent: %s", info.messageId);

         res.send('Email sent')
      }
      catch (err) {
         throw (err);
      }
   }
}