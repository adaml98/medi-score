function mediScore({
  airOrOxygen,
  consciousness,
  respirationRate,
  temperature,
  spo2,
  cbg,
}) {
  let respirationScore;
  let temperatureScore;
  let spo2Score;
  let cbgScore;

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

  if (airOrOxygen === 2) {
    if (spo2 >= 97) {
      spo2Score = 3;
    } else if (spo2 === 95 || spo2 === 96) {
      spo2Score = 2;
    } else if (spo2 === 93 || spo2 === 94) {
      spo2Score = 1;
    } else {
      spo2Score = 0;
    }
  } else {
    if (spo2 <= 83) {
      spo2Score = 3;
    } else if (spo2 === 84 || spo2 === 85) {
      spo2Score = 2;
    } else if (spo2 === 86 || spo2 === 87) {
      spo2Score = 1;
    } else {
      spo2Score = 0;
    }
  }

  if (cbg.fasting) {
    if (cbg.value <= 3.4 || cbg.value >= 6.0) {
      cbgScore = 3;
    } else if (cbg.value >= 4.0 && cbg.value <= 5.4) {
      cbgScore = 0;
    } else {
      cbgScore = 2;
    }
  } else {
    if (cbg.value <= 4.5 || cbg.value >= 9.0) {
      cbgScore = 3;
    } else if (cbg.value >= 5.9 && cbg.value <= 7.8) {
      cbgScore = 0;
    } else {
      cbgScore = 2;
    }
  }

  return (
    airOrOxygen +
    consciousness +
    respirationScore +
    temperatureScore +
    spo2Score +
    cbgScore
  );
}

module.exports = mediScore;
