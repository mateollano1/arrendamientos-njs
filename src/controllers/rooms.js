var roomService = require('../services/room');
var { getBooking } = require('../services/booking');
const validate = require('../helpers/datesHelpers');
const { formatRoomResponse, formatBookingResponse, formatFilter } = require('../helpers/roomHelper');

const getRooms = async (req, res) => {
  try {
    const { checkin, checkout, location } = req.query;
    let validation = await validate.validateDates(checkin, checkout);
    if (validation) {
      let booking = await getBooking(checkin, checkout);
      booking = formatFilter(booking);
      let rooms = await roomService.getRooms(location, booking);
      if (rooms.length !== 0) {
        rooms = formatBookingResponse(rooms);
        if (rooms.length !== 0) {
          return res.status(200).json(rooms);
        }
      }
      return res.status(200).json([]);
    }
    return res.status(400).json({ Message: 'Inconsistencia en las fechas ingresadas.' });
  } catch (error) {
    return res.status(500).json({ Message: 'Something went wrong' });
  }
};

const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await roomService.getRoomById(id);
    if (response !== undefined && response !== null) {
      response = formatRoomResponse(response);
      return res.status(200).json(response);
    }
    return res.status(404).json({ Message: 'Room not found ' });
  } catch (error) {
    return res.status(500).json({ Message: 'Something went wrong' });
  }
};

const createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body);
    return res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({ Message: 'Something went wrong' });
  }
};

module.exports = {
  getRooms,
  createRoom,
  getRoomById,
};
