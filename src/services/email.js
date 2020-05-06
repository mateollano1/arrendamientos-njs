const nodemailer = require("nodemailer");
const pug = require('pug');
const emailHelpers = require('../helpers/email/emailHelper')
var path = require("path");
const config = require('../../config/config');
const roomService = require('./room')

sendMail = async(booking) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.USERMAIL,
            pass: config.PASSWORD // naturally, replace both with your real credentials or an application-specific password
        }
    });
    let room = await roomService.getRoomById(booking.id_room);
    let checkin = emailHelpers.getFormatDate(booking.checkin)
    let checkout = emailHelpers.getFormatDate(booking.checkout)
    let days = emailHelpers.getDays(booking.checkin, booking.checkout)
    const compiledFunction = pug.compileFile(path.resolve("./") + '/src/helpers/email/bookingMessage.pug');
    let info = await transporter.sendMail({
        from: '"Arrendamientos njs 🏢" <arrendamientosnjs@gmail.com>', // sender address
        to: booking.email, // list of receivers
        subject: `Confirmación ${booking.name} reserva ✔`, // Subject line
        html: compiledFunction({
            name: booking.name,
            email: booking.email,
            roomName: room.property_name,
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