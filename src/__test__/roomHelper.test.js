const { formatRoomResponse, formatBookingResponse, formatFilter } = require('../helpers/roomHelper');

describe('Testing room helpers functions', () => {
  test('Testing format room response', () => {
    const response = formatRoomResponse({
      _id: 1,
      images: [],
      location: {
        name: 'Medellín',
        code: 'MDE',
        latitude: '-055214',
        longitude: '-055214',
      },
      price: '1000',
      currency: 'COP',
      agency: {
        name: 'Arredamientos njs',
        _id: 1,
        logo: 'URL',
      },
      property_name: 'Property',
      rating: 1,
      services: [],
    });
    expect(response).toEqual({
      id: 1,
      images: [],
      location: {
        name: 'Medellín',
        code: 'MDE',
        latitude: '-055214',
        longitude: '-055214',
      },
      price: '1000',
      currency: 'COP',
      agency: {
        name: 'Arredamientos njs',
        id: 1,
        logo_url: 'URL',
      },
      property_name: 'Property',
      rating: 1,
      services: [],
    });
  });
  test('Testing filter rooms', () => {
    const response = formatBookingResponse([
      {
        id: 1,
        thumbnail: '',
        location: {
          name: 'Medellín',
          code: 'MDE',
          latitude: '-050501',
          longitude: '-050501',
        },
        price: '1000',
        currency: 'COP',
        agency: {
          name: 'arrendamientos njs',
          _id: 1,
        },
        property_name: 'Property',
        rating: 1,
      },
      {
        id: 1,
        thumbnail: '',
        location: null,
        price: '1000',
        currency: 'COP',
        agency: {
          name: 'arrendamientos njs',
          _id: 1,
        },
        property_name: 'Property',
        rating: 1,
      },
    ]);
    expect(response.length).toEqual(1);
    expect(response[0]).toEqual({
      id: 1,
      thumbnail: '',
      location: {
        latitude: '-050501',
        longitude: '-050501',
        code: 'MDE',
        name: 'Medellín',
      },
      price: '1000',
      currency: 'COP',
      agency: {
        name: 'arrendamientos njs',
        id: 1,
      },
      property_name: 'Property',
      rating: 1,
    });
  });
  test('Testing format filter', () => {
    const response = formatFilter([
      {
        _id: 5,
        checkin: '',
        checkout: '',
        email: '',
        name: '',
        id_room: 1,
      },
      {
        _id: 15,
        checkin: '',
        checkout: '',
        email: '',
        name: '',
        id_room: 2,
      },
    ]);
    expect(response.length).toEqual(2);
    expect(response[0]).toEqual({
      _id: 1,
    });
  });
});
