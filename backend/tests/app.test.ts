import request from 'supertest';
import app from '../src/app';

describe('API Endpoints', () => {
    it('GET / should return Server is up !', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Server is up !');
    });

    it('GET /movies should return list of movies', async () => {
        const res = await request(app).get('/movies');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});