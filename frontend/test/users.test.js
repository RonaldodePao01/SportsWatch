let expect = require("chai").expect;
let request = require("request");

it("testing existing user", (done) => {
  const data = {
    username: "test@gmail.com",
    password: "password",
  };

  request(
    "http://localhost:8032/users/newUser",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    },
    (error, res, body) => {
      const response = JSON.parse(res.body);
      expect(response.msg).to.equal("AccFound");
      done();
    }
  );
});

