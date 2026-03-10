import request from 'supertest';
import mongoose from 'mongoose';
import app from './server.js';
import User from './models/User.js';
import College from './models/College.js';

describe('CareerPath API E2E Testing', () => {
  let createdUserId;
  let authToken;

  beforeAll(async () => {
    // Clear out databases for clean state
    await User.deleteMany({});
    await College.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Auth Logic', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: "Test User",
          email: "test@example.com",
          password: "password123",
          role: "student"
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('token');
      expect(res.body.email).toBe("test@example.com");

      createdUserId = res.body._id;
      authToken = res.body.token; // save token for protected routes
    });

    it('should not allow duplicate email registrations', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: "Duplicate User",
          email: "test@example.com",
          password: "password123"
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });

    it('should log in a user and return a token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: "test@example.com",
          password: "password123"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should fail login with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: "test@example.com",
          password: "wrongpassword"
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    });
  });

  describe('User Profile & Preferences', () => {
    it('should retrieve the user profile using short-lived JWT', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe("test@example.com");
      expect(res.body.studentProfile).toBeDefined();
    });

    it('should fail profile fetch without Auth token (Protected route)', async () => {
      const res = await request(app)
        .get('/api/users/profile');

      expect(res.statusCode).toBe(401);
    });

    it('should update user studentProfile references', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          studentProfile: {
            budget: "$20000",
            marks10: 95,
            preferredCourse: "Computer Science"
          }
        });
      
      if (res.statusCode !== 200) {
        console.error("DEBUG ERROR:", res.body);
      }

      expect(res.statusCode).toBe(200);
      expect(res.body.studentProfile.budget).toBe("$20000");
      expect(res.body.studentProfile.marks10).toBe(95);
    });
  });

  describe('College Explorer', () => {
    it('should return empty list if no colleges added', async () => {
      const res = await request(app).get('/api/colleges');
      expect(res.statusCode).toBe(200);
      expect(res.body.colleges.length).toBe(0);
    });

    it('should block non-admins from creating a college', async () => {
      const res = await request(app)
        .post('/api/colleges')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: "Test Institute",
          location: "New York",
          collegeType: "Public"
        });

      expect(res.statusCode).toBe(403);
    });
  });
});
