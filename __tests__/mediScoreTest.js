const caculateMediScore = require("../mediScore.js");
describe("calculateMediScore()", () => {
  test("should return an integer", () => {
    const patient = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
    expect(typeof result).toBe("number");
  });

  test("should return a score of 0 if a patient does not require extra oxygen, and everything else is within normal ranges", () => {
    const patient = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(0);
  });

  test("should return a score of 2 if a patient requires extra oxygen, and everything else is within normal ranges", () => {
    const patient = {
      airOrOxygen: 2,
      consciousness: 0,
      respirationRate: 15,
      spo2: 92,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
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
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(4);
  });
});
describe("calculateRespirationScore()", () => {
  test("should return the correct score if a patient's respiration rate is out of range", () => {
    const patient = {
      airOrOxygen: 2,
      consciousness: 2,
      respirationRate: 11,
      spo2: 92,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(5);

    const patient2 = {
      airOrOxygen: 2,
      consciousness: 2,
      respirationRate: 26,
      spo2: 92,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result2 = caculateMediScore(patient2);
    expect(result2).toBe(7);
  });
});
describe("calculateTemperatureScore()", () => {
  test("should return the correct score if a patient's temperature is abnormal", () => {
    const patient = {
      airOrOxygen: 2,
      consciousness: 2,
      respirationRate: 15,
      spo2: 92,
      temperature: 34.55,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(7);

    const patient2 = {
      airOrOxygen: 2,
      consciousness: 2,
      respirationRate: 15,
      spo2: 92,
      temperature: 38.55,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result2 = caculateMediScore(patient2);
    expect(result2).toBe(5);
  });
});
describe("calculateSPO2Score()", () => {
  test("should return the correct score if a patients spo2 is out of range", () => {
    const patient = {
      airOrOxygen: 2,
      consciousness: 0,
      respirationRate: 15,
      spo2: 96,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(4);

    const patient2 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 93,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result2 = caculateMediScore(patient2);
    expect(result2).toBe(0);
  });
});
describe("calculateCBGScore()", () => {
  test("should return the correct score depending on a patient's CBG", () => {
    const patient = {
      airOrOxygen: 2,
      consciousness: 2,
      respirationRate: 15,
      spo2: 92,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(6);

    const patient2 = {
      airOrOxygen: 2,
      consciousness: 2,
      respirationRate: 15,
      spo2: 92,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result2 = caculateMediScore(patient2);
    expect(result2).toBe(4);
  });
});
describe("hasIncreased24hours()", () => {
  test("should return a warning message if a patients caculateMediScore has increased by more than 2 in 24 hours", () => {
    const patient = {
      airOrOxygen: 2,
      consciousness: 2,
      respirationRate: 11,
      spo2: 92,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
      previousMediScore: {
        score: 4,
        dateOfScore: new Date("October 2, 2023 08:11:00"),
      },
    };
    const result = caculateMediScore(patient);
    console.log(result);
    expect(result.mediScore).toBe(7);
    expect(result.warning).toBe(
      "Warning - MediScore increased by more than 2 within 24 hours"
    );
  });

  test("should not return a warning message if a patients caculateMediScore has not increased by more than 2 in 24 hours", () => {
    const patient = {
      airOrOxygen: 2,
      consciousness: 2,
      respirationRate: 11,
      spo2: 92,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: false },
      dateOfScore: new Date("October 2, 2023 08:11:00"),
      previousMediScore: {
        score: 6,
        dateOfScore: new Date("October 3, 2023 08:11:00"),
      },
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(7);
  });

  test("should not return a warning message if a patients caculateMediScore has increased by more than 2 in more than 24 hours", () => {
    const patient = {
      airOrOxygen: 2,
      consciousness: 2,
      respirationRate: 11,
      spo2: 92,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: false },
      dateOfScore: new Date("October 2, 2023 08:11:00"),
      previousMediScore: {
        score: 6,
        dateOfScore: new Date("October 3, 2023 08:11:00"),
      },
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(7);
  });
});

describe("Edge Cases", () => {
  test("should return correct scores for edge cases of respiration rate", () => {
    const patient = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 12,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(0);

    const patient2 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 20,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result2 = caculateMediScore(patient2);
    expect(result2).toBe(0);

    const patient3 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 9,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result3 = caculateMediScore(patient3);
    expect(result3).toBe(1);

    const patient4 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 24,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result4 = caculateMediScore(patient4);
    expect(result4).toBe(2);
  });

  test("should return the correct score for edge cases of temperature", () => {
    const patient = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 35,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result = caculateMediScore(patient);
    expect(result).toBe(3);
  });

  const patient2 = {
    airOrOxygen: 0,
    consciousness: 0,
    respirationRate: 15,
    spo2: 95,
    temperature: 39.1,
    cbg: { value: 5.4, fasting: true },
    dateOfScore: new Date("October 3, 2023 08:11:00"),
  };
  const result2 = caculateMediScore(patient2);
  expect(result2).toBe(2);

  const patient3 = {
    airOrOxygen: 0,
    consciousness: 0,
    respirationRate: 15,
    spo2: 95,
    temperature: 36.1,
    cbg: { value: 5.4, fasting: true },
    dateOfScore: new Date("October 3, 2023 08:11:00"),
  };
  const result3 = caculateMediScore(patient3);
  expect(result3).toBe(0);

  const patient4 = {
    airOrOxygen: 0,
    consciousness: 0,
    respirationRate: 15,
    spo2: 95,
    temperature: 38.0,
    cbg: { value: 5.4, fasting: true },
    dateOfScore: new Date("October 3, 2023 08:11:00"),
  };
  const result4 = caculateMediScore(patient4);
  expect(result4).toBe(0);

  test("should return the correct score for edge cases of SPO2", () => {
    const patient1 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 83,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result1 = caculateMediScore(patient1);
    expect(result1).toBe(3);

    const patient2 = {
      airOrOxygen: 2,
      consciousness: 0,
      respirationRate: 15,
      spo2: 97,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result2 = caculateMediScore(patient2);
    expect(result2).toBe(5);

    const patient3 = {
      airOrOxygen: 2,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result3 = caculateMediScore(patient3);
    expect(result3).toBe(4);

    const patient4 = {
      airOrOxygen: 2,
      consciousness: 0,
      respirationRate: 15,
      spo2: 96,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result4 = caculateMediScore(patient4);
    expect(result4).toBe(4);

    const patient5 = {
      airOrOxygen: 2,
      consciousness: 0,
      respirationRate: 15,
      spo2: 93,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result5 = caculateMediScore(patient5);
    expect(result5).toBe(3);

    const patient6 = {
      airOrOxygen: 2,
      consciousness: 0,
      respirationRate: 15,
      spo2: 99,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result6 = caculateMediScore(patient6);
    expect(result6).toBe(5);
  });
  test("should return the correct score for edge cases of CBG when fasting", () => {
    const patient1 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 3.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result1 = caculateMediScore(patient1);
    expect(result1).toBe(3);

    const patient2 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 6.0, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result2 = caculateMediScore(patient2);
    expect(result2).toBe(3);

    const patient3 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 4.0, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result3 = caculateMediScore(patient3);
    expect(result3).toBe(0);

    const patient4 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.4, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result4 = caculateMediScore(patient4);
    expect(result4).toBe(0);

    const patient5 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 3.5, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result5 = caculateMediScore(patient5);
    expect(result5).toBe(2);

    const patient6 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 3.9, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result6 = caculateMediScore(patient6);
    expect(result6).toBe(2);

    const patient7 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.5, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result7 = caculateMediScore(patient7);
    expect(result7).toBe(2);

    const patient8 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.9, fasting: true },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result8 = caculateMediScore(patient8);
    expect(result8).toBe(2);
  });
  test("should return the correct score for edge cases of CBG when not fasting", () => {
    const patient1 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 4.5, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result1 = caculateMediScore(patient1);
    expect(result1).toBe(3);

    const patient2 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 9.0, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result2 = caculateMediScore(patient2);
    expect(result2).toBe(3);

    const patient3 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.9, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result3 = caculateMediScore(patient3);
    expect(result3).toBe(0);

    const patient4 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 7.8, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result4 = caculateMediScore(patient4);
    expect(result4).toBe(0);

    const patient5 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 4.5, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result5 = caculateMediScore(patient5);
    expect(result5).toBe(3);

    const patient6 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 5.8, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result6 = caculateMediScore(patient6);
    expect(result6).toBe(2);

    const patient7 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 7.9, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result7 = caculateMediScore(patient7);
    expect(result7).toBe(2);

    const patient8 = {
      airOrOxygen: 0,
      consciousness: 0,
      respirationRate: 15,
      spo2: 95,
      temperature: 37.1,
      cbg: { value: 8.9, fasting: false },
      dateOfScore: new Date("October 3, 2023 08:11:00"),
    };
    const result8 = caculateMediScore(patient8);
    expect(result8).toBe(2);
  });
});
