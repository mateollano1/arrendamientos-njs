const formatRoomResponse= (response)=>{
  return {
      id: response._id,
      images: response.images,
      location: {
        name: response.location.name,
        code: response.location.code,
        latitude : response.location.latitude,
        longitude: response.location.longitude
      },
      price: response.price,
      currency: response.currency,
      agency:{
        name: response.agency.name,
        id: response.agency._id,
        logo_url: response.agency.logo
      },
      property_name:response.property_name,
      rating: response.rating,
      services: response.services

    }

}

const formatBookingResponse = (rooms)=>{
  return filterRooms(rooms).map((room) => ({
      id: room.id,
      thumbnail: room.thumbnail,
      location: {
        latitude: room.location.latitude,
        longitude: room.location.longitude,
        code: room.location.code,
        name: room.location.name,
      },
      price: room.price,
      currency: room.currency,
      agency: {
        name: room.agency.name,
        id: room.agency._id,
      },
      property_name: room.property_name,
      rating: room.rating,
    }));
}

const filterRooms =(rooms)=>{
  return rooms.filter(
      (room) => room.location
    );     
}
const formatFilter=(booking)=>{
  return booking = booking.map((bookin)=>({
    _id: bookin.id_room
  }));
}

module.exports= {formatBookingResponse,formatRoomResponse, formatFilter };
