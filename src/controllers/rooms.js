const bookingModel = require('../models/booking/model');

const getRooms = async (req, res) => {
  try {
    const { checkin, checkout, location } = req.query;
    let rooms = await bookingModel.find({ checkin, checkout }).populate([
      {
        path: 'id_room',
        populate: [{ path: 'location' }, { path: 'agency' }],
      },
    ]);
    const filterRooms = rooms.filter(
      (room) => room.id_room.location.code === location
    );
    rooms = filterRooms.map((room) => ({
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
    return res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Something went wrong' });
  }
};

const createRoom = (req, res) => {
  try {
    const room = new roomModel(req.body);
    room.save();
    return res.status(200).json({ Message: 'Room created' });
  } catch (error) {
    return res.status(500).json({ Message: 'Something went wrong' });
  }
};

module.exports = {
  getRooms,
  createRoom,
};
