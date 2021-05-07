# Process Capability

A look at Process Capability and if we can create a web tool to learn something.

**Process Capability - HTML/CSS and JS**

Using knowledge picked up during my day job I have endeavoured to delve more into understanding Process Capability in a manufacturing environment. My goal is to make a usable webpage that takes in upper and lower bounds and 30 points of raw data and provides dynamic analysis on this data. I plan to provide the general statistic values expected when dealing with Process Capability as well as graphs using Plotly.

To read more about Process Capability please see: [Engineering Statistics Handbook - Process Capability](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm)

***Plotly graphs still to come, no need to feature in below list.***

### Ideas for Future Functionality

- Add mouse-over "tooltips" detailing what each metric means.
  - When mousing over statistic have details about the metric and the formula(s) featured there. When mouse moves the information is covered back up.
- Add information on page to explain what Process Capability is and what you intend to show.
- Make the website more responsive to width changes.
- Many graphical improvements to be made.
- Separate out the data-collecting/analysis functions as their own module.
- Add a reset button next to the submit button.
- **BIG JOB** - add ability to run analysis on multiple limits/raw datasets.
- Make sure returned statistics, that are floats, format correctly into field - round data for use.
- Colour fields when returned data does not pass the Process Capability boundaries.
