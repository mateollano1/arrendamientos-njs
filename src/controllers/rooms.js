const bookingModel = require('../models/booking/model');
const roomModel = require('../models/room/model');
const {formatBookingResponse,formatRoomResponse }= require('../helpers/roomHelper');

const getRooms = async (req, res) => {
  try {
    const { checkin, checkout, location } = req.query;
    let rooms = await bookingModel.find({ checkin, checkout }).populate([
      {
        path: 'id_room',
        populate: [{ path: 'location' }, { path: 'agency' }],
      },
    ]);
    rooms = formatBookingResponse(rooms, location);
    return res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Something went wrong' });
  }
};

const getRoomById = async (req,res)=>{
  const {id}= req.params;
  try {
    const response = await roomModel.findById({_id: id}).populate([
         { path: 'location' }, { path: 'agency' }
    ]);
    console.log(response);
    if (response){
      const room =  formatRoomResponse(response);
      return res.status(200).json(room) 
    }
    return res.status(400).json({ Message: 'Room not found ' })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Something went wrong' });
  }
}

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
  getRoomById
};
