
document.addEventListener('DOMContentLoaded', function() {

  var analyseIssuesButton = document.getElementById('checkPage');

  analyseIssuesButton.addEventListener('click', function(){

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {

      console.log(tabs[0].id)

      chrome.tabs.sendMessage(tabs[0].id, {data: "hello"}, response => {
        createTable(JSON.parse(response.data))
      });
      
    });

  });

});

function createTable(issues){
  var resultsTable = document.createElement("table");
  resultsTable.setAttribute("id", "resultsTable");
  var row = resultsTable.insertRow();
  var th1 = document.createElement('th');
  th1.innerHTML = "Story Type";
  var th2 = document.createElement('th');
  th2.innerHTML = "Points";
  row.appendChild(th1)
  row.appendChild(th2)

  var total = 0;

  issues.forEach(function(issue){
    var row = resultsTable.insertRow();
    row.insertCell(0).innerHTML = issue[0];
    row.insertCell(1).innerHTML = issue[1];

    total += issue[1];
  })

  // Add a totals row
  var tfoot = resultsTable.insertRow();
  tfoot.setAttribute("class", "table-foot")
  tfoot.insertCell(0).innerHTML = "Totals";
  tfoot.insertCell(1).innerHTML = total;

  document.getElementById("container").appendChild(resultsTable);
}