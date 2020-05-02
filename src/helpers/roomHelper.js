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
        rating: response.rating
      }

}

const formatBookingResponse = (rooms, location)=>{
    return filterRooms(rooms, location).map((room) => ({
        id: room.id_room.id,
        thumbnail: room.id_room.tumbnails,
        location: {
          latitude: room.id_room.location.latitude,
          longitude: room.id_room.location.longitude,
          code: room.id_room.location.code,
          name: room.id_room.location.name,
        },
        price: room.id_room.price,
        currency: room.id_room.currency,
        agency: {
          name: room.id_room.agency.name,
          id: room.id_room.agency._id,
        },
        property_name: room.id_room.property_name,
        rating: room.id_room.location.rating,
      }));
}

const filterRooms =(rooms, location)=>{
    return rooms.filter(
        (room) => room.id_room.location.code === location
      );     
}

module.exports= {formatBookingResponse,formatRoomResponse };
