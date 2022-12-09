const express = require("express");
const request = require("supertest");
const {
  describe,
  beforeAll,
  afterAll,
  // beforeEach,
  // afterEach,
  test,
  expect,
} = require("@jest/globals");

const { signup } = require("../controllers/users/");

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

  beforeAll(() => (server = app.listen(PORT)));

  afterAll(() => server.close());

  test("should return status code 201", async () => {
    const response = await request(app)
      .post("/signup")
      .set("Content-type", "application/json")
      .send({ email: "test_jest@mail.ru", password: "12345" });

    expect(response.status).toBe(201);
    // expect(typeof response.body).toBe(typeof Object);
    // expect.objectContaining({
    //   user: { email: "test_jest@mail.ru", subscription: "starter" },
    // });
  }, 20000);
});
