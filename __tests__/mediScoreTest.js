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

test("should return a score of 2 if patient requires extra oxygen", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 0,
    respirationRate: 15,
    spo2: 92,
    temperature: 37.1,
  };
  const result = mediScore(patient);
  expect(result).toBe(2);
});

test("should return the correct score if patient is unconscious", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 15,
    spo2: 92,
    temperature: 37.1,
  };
  const result = mediScore(patient);
  expect(result).toBe(4);
});

test("should return the correct score if patient's respiration rate is out of range", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 11,
    spo2: 92,
    temperature: 37.1,
  };
  const result = mediScore(patient);
  expect(result).toBe(5);

  const patient2 = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 26,
    spo2: 92,
    temperature: 37.1,
  };
  const result2 = mediScore(patient2);
  expect(result2).toBe(7);
});

expect(result).toBe(5);
