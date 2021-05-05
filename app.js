function processData() {
  // Read in data from U/N/L fields and raw data.
  let upper = d3.select("#upper").node().value;
  let nominal = d3.select("#nominal").node().value;
  let lower = d3.select("#lower").node().value;
  let rawData = d3.select("#rawdata").node().value.split(/\s+/);
  // Remove last item if empty string.
  if (rawData[rawData.length-1] == "") {
    rawData.pop();
  };

  // Turn rawData to integers.

  // parseInt is returning NaN values and not triggering error.
  // needs to be fixed.

  try {
    rawData = rawData.map((val) => parseInt(val));
  } catch (e) {
    d3.select("#error-message").text(e + "THE ENTERED RAW DATA ARE NOT USABLE");
  }

  ///////////////////////////

  // Check entered data for non-conformance.
  if (!checkLimits(upper, nominal, lower)) {
    d3.select("#error-message").text("THE ENTERED LIMITS ARE NOT USABLE");
  }
  if (!checkRawData(upper, lower, rawData)) {
    d3.select("#error-message").text("THE ENTERED RAW DATA ARE NOT USABLE");
  }

  //console.log(checkLimits(upper, nominal, lower));
  console.log(checkRawData(upper, lower, rawData));
  // Store rawData as integers.
  rawData = rawData.map((val) => parseInt(val));
  //console.log(rawData);
  /*
  // Store all data in Object - run functions if required.
  var data = {
    average: getAverage(),
    stdev: getStdev(),
    max:
    median:
    min:
    range:
    cpk: getCpk(),
    cr: getCr(),
    cp: getCp(),
    cpu: getCpu(),
    cpl: getCpl(),
    cpm: getCpm()
  };
  // Then populate the values of the divs with the matching names.
  */
};

function checkLimits(u, n, l) {
  let arr = [u, n, l];
  for (var i = 0; i < arr.length; i++) {
    // Check values are between 0-250.
    if (arr[i] < 0 || arr[i] > 250) {
      return false
    };
  };
  return true
};

function checkRawData(u, l, rd) {
  // Return false if any other errors.
  try {
    // Check if values outside scope.

    //////////////////// returning false when values are correct.

    for (var i = 0; i < rd.length; i++) {
      if (rd[i] > u || rd[i] < l) {
        return false
      };
    };
  } catch (e) {
    return false
  };
  return true
};
