var svgWidth = window.innerWidth / 4.25,
  boxWidth = 20,
  taskImageSize = 0.14,
  textSpace = (svgWidth - boxWidth) / 2,
  margin = { top: 50, right: textSpace, bottom: 50, left: textSpace },
  width = svgWidth - margin.left - margin.right,
  height = window.innerHeight - window.innerWidth * taskImageSize - margin.top - margin.bottom;

var min = Infinity,
  max = - Infinity;

var data = [
  [],
  [],
  [],
  []
];

window.onload = function () {
  var chart = d3.box()
    .whiskers(iqr(1.5))
    .width(width)
    .height(height);

  var svg = d3.select("#d3-container").selectAll("svg")
    .data(data)
    .enter().append("svg")
    .attr("class", "box")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
 
  // Global function, used to apply a new data set
  window.refreshData = function (entries) {
    svg
      .data(function () {
        // Query for new graph queries
        entries.forEach(function (entry) {
          entry.forEach(function (entryValue) {
            min = Math.min(min, entryValue);
            max = Math.max(max, entryValue);
          })
        });

        chart.domain([min, max]);

        return entries;
      })
      .call(chart.duration(1000));
  }

  // Returns a function to compute the interquartile range.
  function iqr(k) {
    return function (d, i) {
      var q1 = d.quartiles[0],
        q3 = d.quartiles[2],
        iqr = (q3 - q1) * k,
        i = -1,
        j = d.length;
      while (d[++i] < q1 - iqr);
      while (d[--j] > q3 + iqr);
      return [i, j];
    };
  }
};