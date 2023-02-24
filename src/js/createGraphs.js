export const createGraphCard = (arr) => {
  google.charts.load("current", { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Element", "Density", { role: "style" }],
      ["мар", arr.marchTransfers.expenses, "#116ACC"],
      ["апр", arr.aprilTransfers.expenses, "#116ACC"],
      ["май", arr.mayTransfers.expenses, "#116ACC"],
      ["июн", arr.juneTransfers.expenses, "#116ACC"],
      ["июл", arr.julyTransfers.expenses, "#116ACC"],
      ["авг", arr.augustTransfers.expenses, "#116ACC"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation"
      },
      2]);

    var options = {
      width: 510,
      height: 165,
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("balance"));
    chart.draw(view, options);
  }
}
export const createGraphBalance = (array) => {
  google.charts.load("current", { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawCharts);
  function drawCharts() {
    var data = google.visualization.arrayToDataTable([
      ["Element", "Fantasy & Sci Fi", { role: "style" }],
      ["янв", array.januaryTransfers.profit, "#116ACC"],
      ["фев", array.februaryTransfers.profit, "#116ACC"],
      ["мар", array.marchTransfers.profit, "#116ACC"],
      ["апр", array.aprilTransfers.profit, "#116ACC"],
      ["май", array.mayTransfers.profit, "#116ACC"],
      ["июн", array.juneTransfers.profit, "#116ACC"],
      ["июл", array.julyTransfers.profit, "#116ACC"],
      ["авг", array.augustTransfers.profit, "#116ACC"],
      ["сен", array.septemberTransfers.profit, "#116ACC"],
      ["окт", array.octoberTransfers.profit, "#116ACC"],
      ["ноя", array.novemberTransfers.profit, "#116ACC"],
      ["дек", array.decemberTransfers.profit, "#116ACC"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation"
      },
      2]);

    var options = {
      width: 1100,
      height: 165,
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("chartBalance"));
    chart.draw(view, options);
  }
}
export const createGraphTranslation = (array) => {
  google.charts.load("current", { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChartsy);
  function drawChartsy() {
    var data = google.visualization.arrayToDataTable([
      ['Element', 'profit','expenses', { role: 'annotation' } ],
      ["янв", array.januaryTransfers.profit, array.januaryTransfers.expenses, ''],
      ["фев", array.februaryTransfers.profit,array.februaryTransfers.expenses, ""],
      ["мар", array.marchTransfers.profit,array.marchTransfers.expenses, ""],
      ["апр", array.aprilTransfers.profit,array.aprilTransfers.expenses, ""],
      ["май", array.mayTransfers.profit,array.mayTransfers.expenses, ""],
      ["июн", array.juneTransfers.profit,array.juneTransfers.expenses, ""],
      ["июл", array.julyTransfers.profit,array.julyTransfers.expenses, ""],
      ["авг", array.augustTransfers.profit,array.augustTransfers.expenses, ""],
      ["сен", array.septemberTransfers.profit,array.septemberTransfers.expenses, ""],
      ["окт", array.octoberTransfers.profit,array.octoberTransfers.expenses, ""],
      ["ноя", array.novemberTransfers.profit,array.novemberTransfers.expenses, ""],
      ["дек", array.decemberTransfers.profit,array.decemberTransfers.expenses, ""],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation"
      },
      2]);

      var options = {
        width: 1100,
        height: 165,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
      };
    var chart = new google.visualization.ColumnChart(document.getElementById("chartTranslation"));
    chart.draw(view, options);
  }
}
