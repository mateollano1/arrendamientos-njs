const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose')

beforeAll(async() => {
    const url = process.env.TESTMONGODB
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, })
})
afterAll(async() => {
    await mongoose.connection.close()
})
describe("test endpoint rooms", () => {
    test('get the endpoint rooms/search', async done => {
        const response = await request.get('/api/rooms/search?location=MDE&checkin=2020-06-16&checkout=2020-06-30');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        done();
    })
    test('get the endpoint rooms/search with invalid range of dates', async done => {
        const response = await request.get('/api/rooms/search?location=MDE&checkin=2020-06-16&checkout=2020-06-10');
        expect(response.status).toBe(401);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Inconsistencia en las fechas ingresadas.")
        done();
    })
    test('get the endpoint rooms/search with no rooms in location', async done => {
        const response = await request.get('/api/rooms/search?location=SLD&checkin=2020-06-16&checkout=2020-06-20');
        expect(response.status).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Room not found ")
        done();
    })
    test('get the endpoint rooms ', async done => {
        const response = await request.get('/api/rooms/5ed540c7d109422e4cbb9198	');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.id).toBe("5ed540c7d109422e4cbb9198")
        done();
    })
    test('get the endpoint rooms with invalid code', async done => {
        const response = await request.get('/api/rooms/5ed540c7d109422e4cbb919');
        expect(response.status).toBe(500);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Something went wrong")
        done();
    })
    test('get the endpoint rooms ', async done => {
        const response = await request.get('/api/rooms/5ed540c7d109422e4cbb9190');
        expect(response.status).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Room not found ")
        done();
    })
    test('post the endpoint rooms/create with all fields ok', async done => {
        const response = await request.post('/api/rooms/create').send({
            currency: "COP",
            description: "Casa con vista al mar",
            images: ["img 1", "img 2"],
            property_name: "Casa avenida al mar",
            thumbnail: "thmbnail",
            price: 40000,
            rating: 4,
            agency: "5ed53e0fd109422e4cbb9194",
            location: "5ed53f3ed109422e4cbb9197",
            services: ["Wifi", "TV", "Cocina"]
        })
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        done();
    })
    test('post the endpoint rooms/create with empty location ', async done => {
        const response = await request.post('/api/rooms/create').send({
            currency: "COP",
            description: "Casa con vista al mar",
            images: ["img 1", "img 2"],
            property_name: "Casa avenida al mar",
            thumbnail: "thmbnail",
            price: 40000,
            rating: 4,
            agency: "5ed53e0fd109422e4cbb9194",
            location: "",
            services: ["Wifi", "TV", "Cocina"]
        })
        expect(response.status).toBe(500);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Something went wrong")
        done();
    })
})

describe("test endpoint location", () => {
    test('get the endpoint location', async done => {
        const response = await request.get('/api/location/location');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        done();
    })
    test('post the endpoint location', async done => {
        const response = await request.post('/api/location/location').send({
            latitude: "4216",
            longitude: "1254",
            code: "IBE",
            name: "Ibagué"
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        done();
    })
})

describe("test endpoint agency ", () => {
    test('get the endpoint agency', async done => {
        const response = await request.get('/api/agency/agency');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        done();
    })
    test('post the endpoint agency ', async done => {
        const response = await request.post('/api/agency/agency').send({
            name: "agency test",
            logo: "logo test"
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Agency created")
        done();
    })
})

// describe("test endpoint booking",()=>{
//     test('post the endpoint booking  ok', async done=>{
//         const response = await request.post('/api/booking').send({
//             checkin: "2021-06-06",
//             checkout: "2021-06-10",
//             email: "pedro@correo.com",
//             name: "Pedro",
//             id_room: "5ed54112d109422e4cbb9199"
//           });
//         expect(response.status).toBe(200);
//         expect(response.type).toBe('application/json');
//         expect(response.body).not.toBeNull();
//         done();
//     })
//     test('post the endpoint booking  invalid dates, checkin lower than sysdate', async done=>{
//         const response = await request.post('/api/booking').send({
//             checkin: "2021-06-06",
//             checkout: "2021-06-10",
//             email: "pedro@correo.com",
//             name: "Pedro",
//             id_room: "5ed54112d109422e4cbb9199"
//           });
//         expect(response.status).toBe(200);
//         expect(response.type).toBe('application/json');
//         expect(response.body).not.toBeNull();
//         done();
//     })


//     test('post the endpoint booking dates with invalid checkin date', async done => {
//         const response = await request.post('/api/booking').send({
//             checkin: "2020-05-22",
//             checkout: "2020-06-08",
//             email: "pedro@correo.com",
//             name: "Pedro",
//             id_room: "5ed54112d109422e4cbb9199"
//           });
//         expect(response.status).toBe(400);
//         expect(response.type).toBe('application/json');
//         expect(response.body).not.toBeNull();
//         expect(response.body.error).toBe("Inconsistencia en datos ingresados")
//         done();
//       });
//       test('post the endpoint booking dates with invalid checkout date', async done => {
//         const response = await request.post('/api/booking').send({
//             checkin: "2021-05-22",
//             checkout: "2021-05-20",
//             email: "pedro@correo.com",
//             name: "Pedro",
//             id_room: "5ed54112d109422e4cbb9199"
//           });
//         expect(response.status).toBe(400);
//         expect(response.type).toBe('application/json');
//         expect(response.body).not.toBeNull();
//         expect(response.body.error).toBe("Inconsistencia en datos ingresados")
//         done();
//       });
//       test('post the endpoint booking dates with undefined checkin date', async done => {
//         const response = await request.post('/api/booking').send({
//             checkin: undefined,
//             checkout: "2021-05-20",
//             email: "pedro@correo.com",
//             name: "Pedro",
//             id_room: "5ed54112d109422e4cbb9199"
//           });
//         expect(response.status).toBe(400);
//         expect(response.type).toBe('application/json');
//         expect(response.body).not.toBeNull();
//         expect(response.body.error).toBe("Inconsistencia en datos ingresados")
//         done();
//       });
//       test('post the endpoint booking dates with undefined checkout date', async done => {
//         const response = await request.post('/api/booking').send({
//             checkin: "2021-05-31",
//             checkout: undefined,
//             email: "pedro@correo.com",
//             name: "Pedro",
//             id_room: "5ed54112d109422e4cbb9199"
//           });
//         expect(response.status).toBe(400);
//         expect(response.type).toBe('application/json');
//         expect(response.body).not.toBeNull();
//         expect(response.body.error).toBe("Inconsistencia en datos ingresados")
//         done();
//       });

// })