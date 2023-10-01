function mediScore({
  airOrOxygen,
  consciousness,
  respirationRate,
  temperature,
  spo2,
}) {
  let respirationScore;
  let temperatureScore;
  let spo2Score;

  if (respirationRate >= 12 && respirationRate <= 20) {
    respirationScore = 0;
  } else if (respirationRate >= 9 && respirationRate <= 11) {
    respirationScore = 1;
  } else if (respirationRate >= 21 && respirationRate <= 24) {
    respirationScore = 2;
  } else {
    respirationScore = 3;
  }

  if (temperature <= 35) {
    temperatureScore = 3;
  } else if (temperature >= 39.1) {
    temperatureScore = 2;
  } else if (temperature >= 36.1 && temperature <= 38.0) {
    temperatureScore = 0;
  } else {
    temperatureScore = 1;
  }

  if (spo2 <= 83 || (spo2 >= 97 && airOrOxygen === 2)) {
    spo2Score = 3;
  } else if (
    spo2 === 84 ||
    spo2 === 85 ||
    (spo2 === 95 && airOrOxygen === 2) ||
    (spo2 === 96 && airOrOxygen === 2)
  ) {
    spo2Score = 2;
  } else if (
    spo2 === 86 ||
    spo2 === 87 ||
    (spo2 === 93 && airOrOxygen === 2) ||
    (spo2 === 94 && airOrOxygen === 2)
  ) {
    spo2Score = 1;
  } else {
    spo2Score = 0;
  }
  return (
    airOrOxygen +
    consciousness +
    respirationScore +
    temperatureScore +
    spo2Score
  );
}

module.exports = mediScore;
