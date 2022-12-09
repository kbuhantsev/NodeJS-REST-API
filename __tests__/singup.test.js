const express = require("express");
const request = require("supertest");
const { User } = require("../models/user");
const { signup } = require("../controllers/users");

const app = express();
app.use(express.json());

app.post("/signup", signup);

// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email
// и subscription, имеющие тип данных String
const PORT = 3000;

describe("test singup controller", () => {
  let server;
  const testUser = { email: "test_jest@mail.ru", password: "12345" };
  beforeAll(() => (server = app.listen(PORT)));

  afterAll(() => server.close());

  test("singup method test", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(() => {
      return false;
    });
    jest.spyOn(User.prototype, "save").mockImplementationOnce(() => {
      return true;
    });

    const response = await request(app)
      .post("/signup")
      .set("Content-type", "application/json")
      .send({ ...testUser });

    expect(response.status).toBe(201);
    expect(typeof response.body).toBe("object");
    expect.objectContaining({
      user: { ...testUser },
    });
    expect(response.body.user.subscription).toBe("starter");
  }, 10000);
});
