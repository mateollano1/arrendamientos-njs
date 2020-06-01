const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose')

beforeAll(async () => {
  const url = process.env.TESTMONGODB
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,})
})
afterAll(async () => {
    await mongoose.connection.close()
})
describe("test endpoint rooms",()=>{
    test('get the endpoint rooms/search', async done=>{
        const response = await request.get('/api/rooms/search?location=MDE&checkin=2020-06-16&checkout=2020-06-30');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        //expect(response.body.result).toBe(7)
        done();
    })
    test('get the endpoint rooms/search with invalid range of dates', async done=>{
        const response = await request.get('/api/rooms/search?location=MDE&checkin=2020-06-16&checkout=2020-06-10');
        expect(response.status).toBe(401);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Inconsistencia en las fechas ingresadas.")
        done();
    })
    test('get the endpoint rooms/search with no rooms in location', async done=>{
        const response = await request.get('/api/rooms/search?location=SLD&checkin=2020-06-16&checkout=2020-06-20');
        expect(response.status).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Room not found ")
        done();
    })
    test('get the endpoint rooms ', async done=>{
        const response = await request.get('/api/rooms/5ed540c7d109422e4cbb9198	');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.id).toBe("5ed540c7d109422e4cbb9198")
        done();
    })
    test('get the endpoint rooms with invalid code', async done=>{
        const response = await request.get('/api/rooms/5ed540c7d109422e4cbb919');
        expect(response.status).toBe(500);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Something went wrong")
        done();
    })
    test('get the endpoint rooms ', async done=>{
        const response = await request.get('/api/rooms/5ed540c7d109422e4cbb9190');
        expect(response.status).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Room not found ")
        done();
    })
    test('get the endpoint rooms/create with all fields ok', async done=>{
        const response = await request.post('/api/rooms/create').send({
            currency: "COP",
            description: "Casa con vista al mar",
            images: ["img 1","img 2"],
            property_name: "Casa avenida al mar",
            thumbnail: "thmbnail",
            price: 40000,
            rating: 4,
            agency: "5ed53e0fd109422e4cbb9194",
            location: "5ed53f3ed109422e4cbb9197",
            services: ["Wifi","TV","Cocina"]
          })
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        //expect(response.body.id).toBe("5ed540c7d109422e4cbb9198")
        done();
    })
    test('get the endpoint rooms/create with empty location ', async done=>{
        const response = await request.post('/api/rooms/create').send({
            currency: "COP",
            description: "Casa con vista al mar",
            images: ["img 1","img 2"],
            property_name: "Casa avenida al mar",
            thumbnail: "thmbnail",
            price: 40000,
            rating: 4,
            agency: "5ed53e0fd109422e4cbb9194",
            location: "",
            services: ["Wifi","TV","Cocina"]
          })
        expect(response.status).toBe(500);
        expect(response.type).toBe('application/json');
        expect(response.body).not.toBeNull();
        expect(response.body.Message).toBe("Something went wrong")
        done();
    })
})

