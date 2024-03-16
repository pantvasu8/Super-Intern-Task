// tests/unit/dataController.test.js

const request = require('supertest');
const app = require('../../src/app');

describe('Data API', () => {
    it('should get data from database', async () => {
        const res = await request(app).get('/api/get-data');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should add data to database', async () => {
        const newData = { name: "Test", id: 2, number: 987654321 };
        const res = await request(app).post('/api/add-data').send(newData);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(newData.name);
        expect(res.body.id).toEqual(newData.id);
        expect(res.body.number).toEqual(newData.number);
    });
});
