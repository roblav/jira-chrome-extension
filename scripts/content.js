// Listen for messages

//console.log("UPDATED v2.6 /////////////////////////////////////////////////")

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

    var container = document.querySelector('#issuetable tbody');
    var issues = container.querySelectorAll('tr')
    var data = new Map()

    issues.forEach(function(issue) {
        var storyType = issue.querySelector('td.issuetype > a:nth-child(2) > img').getAttribute('alt')
        var points = issue.querySelector('td.customfield_10004').innerText
        // Does the type already exist?
        if( data.has(storyType) ) {
            var total = parseInt(points) + data.get(storyType)
            data.set(storyType, total)
        } else {
            data.set(storyType, parseInt(points))
        }
        
    })

    var result = JSON.stringify([...data])
    
    sendResponse({data: result});
});
