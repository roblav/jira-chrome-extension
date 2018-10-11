
document.addEventListener('DOMContentLoaded', function() {

  var analyseIssuesButton = document.getElementById('checkPage');

  analyseIssuesButton.addEventListener('click', function(){

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {

      chrome.tabs.sendMessage(tabs[0].id, {data: "hello"}, response => {

        if (chrome.runtime.lastError) {
          // An error occurred :(
          displayError(chrome.runtime.lastError)
          console.log("ERROR: ", chrome.runtime.lastError);
        }
        if (response) {
          createTable(JSON.parse(response.data))
        }

      });

    });

  });

});

function displayError(msg) {
  var errorMsg = document.createElement("p");
  errorMsg.innerHTML = msg.message
  document.getElementById("container").appendChild(errorMsg);
}

function createTable(issues){

  // If a table exists delete it first
  var oldTable = document.getElementById("resultsTable");
  if (oldTable) {
    oldTable.remove();
  }

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