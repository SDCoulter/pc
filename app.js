function limitsEntered(limits) {
  // Split the limits by whitespace (should be copying from Excel).
  var splitLimit = limits.split(/\s+/);
  // Populate input fields with user input.
  console.log(splitLimit[0]);
  d3.select("#upper").data(parseInt(splitLimit[0])).each(function (d) {this.value = d;});
  d3.select("#nominal").data(parseInt(splitLimit[1])).each(function (d) {this.value = d;});
  d3.select("#lower").data(splitLimit[2]).each(function (d) {this.value = d;});
}
