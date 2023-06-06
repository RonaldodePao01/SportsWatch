let expect = require("chai").expect;
let request = require("request");

it("retrieving data with a valid token", (done) => {
  request(
    "http://localhost:8032/users/allMatches",
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjg2MDQ0MzAyfQ.N8tLwKJRp1jzVWy3Olt1HyKTv45Wdh-sKAOdgqckDOI`,
      },
    },
    (error, res) => {
      const response = JSON.parse(res.body);
      expect(response).to.be.an("array");
      done();
    }
  );
});
