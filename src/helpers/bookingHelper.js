const dateService = require('./email/emailHelper');

const formatBookingResponse = (response) => {
    return {
        id_booking: response._id,
        checkin: response.checkin,
        checkout: response.checkout,
        email: response.email,
        name: response.name,
        id_room: response.id_room
    }

}

const formatBooking = (response) => {
    return {
        id_room: response.id_room._id,
        checkin: response.checkin,
        checkout: response.checkout,
        total_price: (dateService.getDays(response.checkin, response.checkout) * response.id_room.price),
        id_booking: response._id,
        property_name: response.id_room.property_name,
        agency: {
            name: response.id_room.agency.name,
            id: response.id_room.agency.id
        },
        currency: "COP",
        price: response.id_room.price,
        location: {
            name: response.id_room.location.name,
            code: response.id_room.location.code,
            latitude: response.id_room.location.latitude,
            longitude: response.id_room.location.longitude
        },
        thumbnail: response.id_room.thumbnail
    }
}

module.exports = {
    formatBookingResponse,
    formatBooking
}