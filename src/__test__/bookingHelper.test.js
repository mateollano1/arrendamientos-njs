const { formatBookingResponse } = require('../helpers/bookingHelper');

describe('Testing booking helper', () => {
  test('Testing format booking response', () => {
    const response = formatBookingResponse({
      _id: 5,
      checkin: new Date("2020-06-08"),
      checkout: new Date("2020-06-10"),
      email: 'example@example.com',
      name: 'Example',
      id_room: 1,
    });
    expect(response).toEqual({
      id_booking: 5,
      checkin: '2020-06-08',
      checkout: '2020-06-10',
      email: 'example@example.com',
      name: 'Example',
      id_room: 1,
    });
  });
});
