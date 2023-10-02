const mediScore = require("../mediScore.js");

test("should return an integer", () => {
  const patient = {
    airOrOxygen: 0,
    consciousness: 0,
    respirationRate: 15,
    spo2: 95,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: true },
  };
  const result = mediScore(patient);
  expect(typeof result).toBe("number");
});

test("should return a score of 0 if a patient does not require extra oxygen", () => {
  const patient = {
    airOrOxygen: 0,
    consciousness: 0,
    respirationRate: 15,
    spo2: 95,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: true },
  };
  const result = mediScore(patient);
  expect(result).toBe(0);
});

test("should return a score of 2 if a patient requires extra oxygen", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 0,
    respirationRate: 15,
    spo2: 92,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: true },
  };
  const result = mediScore(patient);
  expect(result).toBe(2);
});

test("should return the correct score if a patient is unconscious", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 15,
    spo2: 92,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: true },
  };
  const result = mediScore(patient);
  expect(result).toBe(4);
});

test("should return the correct score if a patient's respiration rate is out of range", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 11,
    spo2: 92,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: true },
  };
  const result = mediScore(patient);
  expect(result).toBe(5);

  const patient2 = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 26,
    spo2: 92,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: true },
  };
  const result2 = mediScore(patient2);
  expect(result2).toBe(7);
});

test("should return the correct score if a patient's temperature is abnormal", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 15,
    spo2: 92,
    temperature: 34.55,
    cbg: { value: 5.4, fasting: true },
  };
  const result = mediScore(patient);
  expect(result).toBe(7);

  const patient2 = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 15,
    spo2: 92,
    temperature: 38.55,
    cbg: { value: 5.4, fasting: true },
  };
  const result2 = mediScore(patient2);
  expect(result2).toBe(5);
});

test("should return the correct score if a patients spo2 is out of range", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 0,
    respirationRate: 15,
    spo2: 96,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: true },
  };
  const result = mediScore(patient);
  expect(result).toBe(4);

  const patient2 = {
    airOrOxygen: 0,
    consciousness: 0,
    respirationRate: 15,
    spo2: 93,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: true },
  };
  const result2 = mediScore(patient2);
  expect(result2).toBe(0);
});

test("should return the correct score depending on a patient's CBG", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 15,
    spo2: 92,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: false },
  };
  const result = mediScore(patient);
  expect(result).toBe(6);

  const patient2 = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 15,
    spo2: 92,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: true },
  };
  const result2 = mediScore(patient2);
  expect(result2).toBe(4);
});

test("should return a warning message if a patients mediScore has increased by more than 2 since the last evaluation", () => {
  const patient = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 11,
    spo2: 92,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: false },
    previousMediScore: 4,
  };
  const result = mediScore(patient);
  expect(result.mediScore).toBe(7);
  expect(result.warning).toBe("Warning - MediScore increased by 3 in 24 hours");

  const patient2 = {
    airOrOxygen: 2,
    consciousness: 2,
    respirationRate: 11,
    spo2: 92,
    temperature: 37.1,
    cbg: { value: 5.4, fasting: false },
    previousMediScore: 6,
  };
  const result2 = mediScore(patient2);
  expect(result2).toBe(7);
});
