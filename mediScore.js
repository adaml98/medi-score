function calculateRespirationScore(respirationRate) {
  //calculate respiration score
  if (respirationRate >= 12 && respirationRate <= 20) {
    return 0;
  } else if (respirationRate >= 9 && respirationRate <= 11) {
    return 1;
  } else if (respirationRate >= 21 && respirationRate <= 24) {
    return 2;
  } else {
    return 3;
  }
}

function calculateTemperatureScore(temperature) {
  //Calculate temperature score
  if (temperature <= 35) {
    return 3;
  } else if (temperature >= 39.1) {
    return 2;
  } else if (temperature >= 36.1 && temperature <= 38.0) {
    return 0;
  } else {
    return 1;
  }
}

function calculateSPO2Score(airOrOxygen, spo2) {
  //Calculate SPO2 score
  if (airOrOxygen === 2) {
    if (spo2 >= 97) {
      return 3;
    } else if (spo2 === 95 || spo2 === 96) {
      return 2;
    } else if (spo2 === 93 || spo2 === 94) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if (spo2 <= 83) {
      return 3;
    } else if (spo2 === 84 || spo2 === 85) {
      return 2;
    } else if (spo2 === 86 || spo2 === 87) {
      return 1;
    } else {
      return 0;
    }
  }
}

function calculateCBGScore(cbg) {
  //Calculate CBG score
  if (cbg.fasting) {
    if (cbg.value <= 3.4 || cbg.value >= 6.0) {
      return 3;
    } else if (cbg.value >= 4.0 && cbg.value <= 5.4) {
      return 0;
    } else {
      return 2;
    }
  } else {
    if (cbg.value <= 4.5 || cbg.value >= 9.0) {
      return 3;
    } else if (cbg.value >= 5.9 && cbg.value <= 7.8) {
      return 0;
    } else {
      return 2;
    }
  }
}

function hasScoreIncreased24Hours(mediScore, dateOfScore, previousMediScore) {
  //Check if score has increased by more than 2 in 24 hours and return true or false if not
  return (
    previousMediScore &&
    dateOfScore - previousMediScore.dateOfScore <= 86400000 &&
    mediScore - previousMediScore.score > 2
  );
}

function caculateMediScore({
  airOrOxygen,
  consciousness,
  respirationRate,
  temperature,
  spo2,
  cbg,
  dateOfScore,
  previousMediScore,
}) {
  //Calculate the Medi score
  const mediScore =
    airOrOxygen +
    consciousness +
    calculateRespirationScore(respirationRate) +
    calculateTemperatureScore(temperature) +
    calculateSPO2Score(airOrOxygen, spo2) +
    calculateCBGScore(cbg);

  // Return Medi score and a warning if needed
  return hasScoreIncreased24Hours(mediScore, dateOfScore, previousMediScore)
    ? {
        mediScore,
        warning: "Warning - MediScore increased by more than 2 within 24 hours",
      }
    : mediScore;
}

module.exports = caculateMediScore;
