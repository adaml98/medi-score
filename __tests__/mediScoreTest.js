const mediScore = require("../mediScore.js");

test("should return an integer", () => {
  const patient = {
    airOrOxygen: 0,
    consciousness: 0,
    respirationRate: 15,
    spo2: 95,
    temperature: 37.1,
  };
  const result = mediScore(patient);
  expect(typeof result).toBe("number");
});

test("should return a score of 0 if patient does not require extra oxygen", () => {
  const patient = {
    airOrOxygen: 0,
    consciousness: 0,
    respirationRate: 15,
    spo2: 95,
    temperature: 37.1,
  };
  const result = mediScore(patient);

  expect(result).toBe(0);
});
