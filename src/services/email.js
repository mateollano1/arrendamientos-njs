const nodemailer = require("nodemailer");
const pug = require('pug');

sendMail = async(email, name, roomName, days, checkin, checkout) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arrendamientosnjs@gmail.com',
            pass: 'appempresariales' // naturally, replace both with your real credentials or an application-specific password
        }
    });

    const compiledFunction = pug.compileFile(__dirname + '/bookingMessage.pug');
    let info = await transporter.sendMail({
        from: '"Arrendamientos njs 🏢" <arrendamientosnjs@gmail.com>', // sender address
        to: "mateo.llano1@gmail.com", // list of receivers
        subject: `Confirmación ${name} reserva ✔`, // Subject line
        html: compiledFunction({
            name: name,
            email: email,
            roomName: roomName,
            days: days,
            checkin: checkin,
            checkout: checkout
        })

    });

    transporter.sendMail(info, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}
module.exports = { sendMail }