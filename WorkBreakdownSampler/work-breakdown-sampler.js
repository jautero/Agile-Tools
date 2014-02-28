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

var interval=600;

function setup() {
    updateStats();
    setTimeout(open_popup,interval*1000);   
}

var popup;

function handle_button(category) {
    popup.close()
    sample(category);
    updateStats();
    setTimeout(open_popup,interval*1000);
}
function insert_button(contentElement,category,prepend)
{
    var button=$("<button>");
    button.attr("onclick","opener.handle_button('"+category+"');");
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

function open_popup(argument) {
    popup=window.open();
    var popup_content=$(popup.document);
    fill_popup(popup_content);
}

function insert_category() {
    var new_category=$("#categoryname").val();
    WBSdata.categories.push(new_category);
    WBSdata.samples[new_category]=0;
    updateStats();
}