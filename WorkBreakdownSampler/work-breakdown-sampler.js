var WBSdata={categories:[],samples:{},total:0};

function sample(category) {
    if (WBSdata.samples[category] == undefined) {
        WBSdata.samples[category]=0;
    } 
    WBSdata.samples[category]++;
    WBSdata.total++;
}
function getCategoryStats(category) {
    return (WBSdata.samples[category]/WBSdata.total).toFixed(1)+"% ("+WBSdata.samples[category]+"/"+WBSdata.total+")";
}
function updateStatsRow(statsTable,category) {
    var tablerow=statsTable.get("#"+category);
    if (tablerow == undefined) {
        tablerow=$("<tr>");
        tablerow.attr("id",category);
        tablerow.html("<td class=category>"+category+"</td><td class=stats></td>");
        statsTable.get("tr:last").before(tablerow);
    }
    tablewrow.get(td.stats).text(getCategoryStats(category));
}

function updateStats() {
    var statsTable=$("#WBSStats");
    for (var i = WBSdata.categories.length - 1; i >= 0; i--) {
        updateStatsRow(statsTable,WBSdata.categories[i]);
    }
}

function setup() {
    updateStats();
}