const Room = require('../models/room/model');

const getRooms = async (location,booking) => {
    const rooms = await Room.find({ _id: { $nin : booking } }).populate('location',null,{code: location });
    return rooms
}


const getRoomById = async (id)=>{
    const response = await Room.findById({_id: id}).populate([
        { path: 'location' }, { path: 'agency' }
    ]);
    return  response;
    
}
const createRoom = (room) => {
    let rom = new Room(room);
    return rom.save()
        .then(room => room)
        .catch(err => err);
}

module.exports = {
  getRooms,
  createRoom,
  getRoomById
};
