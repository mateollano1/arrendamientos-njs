const formatBookingResponse= (response)=>{
    return {
        id_booking: response._id,
        checkin: response.checkin,
        checkout: response.checkout,
        email: response.email,
        name: response.name,
        id_room: response.id_room
    }
  
  }

module.exports = {
    formatBookingResponse
}