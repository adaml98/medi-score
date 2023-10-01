function mediScore({ airOrOxygen, consciousness, respirationRate }) {
  if (respirationRate >= 12 && respirationRate <= 20) {
    respirationRate = 0;
  } else if (respirationRate >= 9 && respirationRate <= 11) {
    respirationRate = 1;
  } else if (respirationRate >= 21 && respirationRate <= 24) {
    respirationRate = 2;
  } else {
    respirationRate = 3;
  }
  return airOrOxygen + consciousness + respirationRate;
}

module.exports = mediScore;
