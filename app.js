function processData() {
  // Read in data from U/N/L fields and raw data.
  let upper = d3.select("#upper").node().value;
  let nominal = d3.select("#nominal").node().value;
  let lower = d3.select("#lower").node().value;
  let rawData = d3.select("#rawdata").node().value.split(/\s+/);

  // Clear error message if there is one.
  d3.select("#error-message").text("");

  // Clean up and validate the rawData and limits.
  rawData = cleanRaw(rawData);
  var limits = checkLimits([upper, nominal, lower]);
  validateRaw(rawData, limits[0], limits[2]);

  // Only run the rest of the analysis if there is no error.
  console.log(d3.select("#error-message").text())
  if (d3.select("#error-message").text() == "" && rawData.length > 1 && limits.length == 3) {
    console.log("good to go");
  } else {
    d3.select("#error-message").text("boobies");
  };

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


function cleanRaw(rd) {
  // Return the error if there is one.
  try {
    // Make a copy of the data.
    var rawD = rd;

    // Remove last item if empty string.
    if (rawD[rawD.length-1] == "") {
      rawD.pop();
    };
    // Turn rawData to integers.
    rawD = rawD.map((val) => parseFloat(val));

    // Check every value in the array is a float.
    for (var i in rawD) {
      var value = rawD[i];
      if (typeof value != "number" || value != value) {
        d3.select("#error-message").text("THE ENTERED RAW DATA IS NOT VALID");
        break;
      };
    };
  } catch (e) {
    // Display error.
    d3.select("#error-message").text(e + " - ERROR FOUND");
  };
  // Return the cleaned data.
  return rawD;
};


function checkLimits(lims) {
  let arr = lims;
  // Turn the values into floats.
  arr = arr.map((val) => parseFloat(val));
  // Make sure all values are floats (not NaN etc).
  for (var i in arr) {
    var value = arr[i];
    if (typeof value != "number" || value != value) {
      d3.select("#error-message").text("THE ENTERED LIMITS ARE NOT VALID");
      break;
    };
  };
  // Check order is correct.
  if (arr[1] < arr[0] || arr[2] < arr[1] || arr[2] < arr[0] || arr[0] > arr[1]) {
    d3.select("#error-message").text("THE ENTERED LIMITS ARE NOT VALID");
  };
  return arr;
};


function validateRaw(rd, u, l) {
  // Check none of the raw data is outside the limits.
  for (let i in rd) {
    if (rd[i] > u || rd[i] < l) {
      console.log(rd[i], u);
      console.log(rd[i], l);
      d3.select("#error-message").text("THE ENTERED DATA ARE NOT VALID");
      break;
    };
  };
};
