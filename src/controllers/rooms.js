var roomService = require('../services/room');
var {getBooking} = require('../services/booking');
const {formatRoomResponse,formatBookingResponse, formatFilter}=  require('../helpers/roomHelper');

const getRooms = async (req, res) => {
  try {
    const { checkin, checkout, location } = req.query;
    
    if(checkin<checkout){
      let booking = await getBooking(checkin, checkout);
      booking =formatFilter(booking);  
      let rooms = await roomService.getRooms(location,booking)
      if(rooms.length!==0){  
        rooms = formatBookingResponse(rooms);
          if(rooms.length!==0){ 
            return res.status(200).json(rooms);  
          }
      }
      return res.status(400).json({ Message: 'Room not found ' });
    }
    return res.status(401).json({ Message: 'Checkout is lower than checkin' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Something went wrong' });
    }
};

const getRoomById = async (req,res)=>{
  const {id}= req.params;
  try {  
    let response = await roomService.getRoomById(id);
    if (response!==undefined && response!==null){
      response=formatRoomResponse(response)
      return res.status(200).json(response) 
    }
    return res.status(400).json({ Message: 'Room not found ' })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Something went wrong' });
  }
}

const createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body);
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
