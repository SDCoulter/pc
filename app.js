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
  if (d3.select("#error-message").text() == "" && rawData.length > 1 && limits.length == 3) {
    console.log("Data Validation Passed");

    // Store all data in Object.
    var data = findStats(rawData, upper, nominal, lower);
    console.log(data);
    // Then populate the values of the divs with the matching names.
    populateFields(data);
  };
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
  if (!(arr[2] < arr[1] & arr[1] < arr[0])) {
    d3.select("#error-message").text("THE ENTERED LIMITS ARE NOT VALID");
  };
  return arr;
};


function validateRaw(rd, u, l) {
  // Check none of the raw data is outside the limits.
  for (let i in rd) {
    if (rd[i] > u || rd[i] < l) {
      d3.select("#error-message").text("THE ENTERED DATA ARE NOT VALID");
      break;
    };
  };
};


function findStats(rd, u, n, l) {
  // Populate the stats with functions.
  let stats = {
    average: getAverage(rd),
    //stdev: getStdev(),
    max: Math.max(...rd),
    //median: getMedian(rd),
    min: Math.min(...rd),
    range: getRange(rd),/*
    cpk: getCpk(rd, u, l),
    cr: getCr(),
    cp: getCp(),
    cpu: getCpu(),
    cpl: getCpl(),
    cpm: getCpm()*/
  };

  return stats
};

// Data functions start here.
function getAverage(rd) {
  let len = rd.length;
  let sum = 0;
  rd.forEach((val) => sum += val);
  return sum / len;
};
function getStdev(rd) {

};
function getRange(rd) {
  // Max number minus min number.
  return Math.max(...rd) - Math.min(...rd);
}
function getMedian(rd) {

};
function getCpk(rd, u, l) {

};
function getCr() {

};
function getCp() {

};
function getCpu() {

};
function getCpl() {

};
function getCpm() {

};
// Data functions end here.




function populateFields(data) {
  // Fill the empty fields with data.
  d3.select("#average").text(data.average);
  //d3.select("#stdev").text(data.stdev);
  d3.select("#max").text(data.max);
  //d3.select("#median").text(data.median);
  d3.select("#min").text(data.min);
  d3.select("#range").text(data.range);
  //d3.select("#cpk").text(data.cpk);
  //d3.select("#cr").text(data.cr);
  //d3.select("#cp").text(data.cp);
  //d3.select("#cpu").text(data.cpu);
  //d3.select("#cpl").text(data.cpl);
  //d3.select("#cpm").text(data.cpm);
};
