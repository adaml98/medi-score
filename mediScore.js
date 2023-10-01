function mediScore({
  airOrOxygen,
  consciousness,
  respirationRate,
  temperature,
}) {
  if (respirationRate >= 12 && respirationRate <= 20) {
    respirationRate = 0;
  } else if (respirationRate >= 9 && respirationRate <= 11) {
    respirationRate = 1;
  } else if (respirationRate >= 21 && respirationRate <= 24) {
    respirationRate = 2;
  } else {
    respirationRate = 3;
  }

  if (temperature <= 35) {
    temperature = 3;
  } else if (temperature >= 39.1) {
    temperature = 2;
  } else if (temperature >= 36.1 && temperature <= 38.0) {
    temperature = 0;
  } else {
    temperature = 1;
  }

  return airOrOxygen + consciousness + respirationRate + temperature;
}

module.exports = mediScore;
