var WBSdata={categories:[],samples:{},total:0};

function sample(category) {
    if (WBSdata.samples[category] == undefined) {
        WBSdata.samples[category]=0;
    } 
    WBSdata.samples[category]++;
    WBSdata.total++;
}
function getCategoryStats(category) {
    var count=WBSdata.samples[category];
    var total=WBSdata.total;
    var percentage=total?count/total:0;
    return percentage.toFixed(1)+"% ( "+count+" / "+total+" )";
}

function updateStatsRow(statsTable,category) {
    var tablerow=statsTable.get("#"+category);
    if (tablerow == undefined) {
        tablerow=$("<tr>");
        tablerow.attr("id",category);
        tablerow.html("<td class=category>"+category+"</td><td class=stats></td>");
        statsTable.find("tr:last").before(tablerow);
    }
    tablerow.find("td.stats").text(getCategoryStats(category));
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

function insert_button(contentElement,category,prepend)
{
    var button=$("<button>");
    button.attr("onclick","opener.sample('"+category+"');window.close();");
    button.text(category);
    if (prepend) {
        contentElement.prepend(button);
    } else {
        contentElement.append(button);
    }
}

function fill_popup(contentElement) {
    for (var i = WBSdata.categories.length - 1; i >= 0; i--) {
        insert_button(contentElement,WBSdata.categories[i],true);
    }
}

function insert_category() {
    var new_category=$("#categoryname").val();
    WBSdata.categories.push(new_category);
    WBSdata.samples[new_category]=0;
}