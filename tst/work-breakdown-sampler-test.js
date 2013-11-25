module("WorkBreakdownSampler", {
    setup: function () {
    WBSdata={categories:["test1","test2","test3"],samples:{test1:0,test2:0,test3:0},total:0};
}});
test("test_sample",function () {
    sample("test1");
    equal(WBSdata.samples.test1,1,"samples of test1 should be 1 and not "+WBSdata.samples.test1);
    equal(WBSdata.total,1,"total should be 1 and not "+WBSdata.total);
});

test("test_three_samples",function () {
    sample("test1");
    sample("test1");
    sample("test2");
    equal(WBSdata.samples.test1,2,"samples of test1 should be 2 and not "+WBSdata.samples.test1);
    equal(WBSdata.samples.test2,1,"samples of test2 should be 1 and not "+WBSdata.samples.test2);
    equal(WBSdata.total,3,"total should be 3 and not "+WBSdata.total);    
});

test("test_setup",function () {
    setup();
    var statstable=$("#WBSStats");
    var tablerows=statstable.find("tr").toArray();
    equal(tablerows.length,4,"Table should have 3 rows");
});

function get_button_text(category) {
    return "<button onclick=\"opener.sample('"+category+"');window.close();\">"+category+"</button>";
}
test("test_insert_button", function () {
    var testdiv=$("<div>")
    insert_button(testdiv,"test");
    equal(testdiv.html(),get_button_text("test"));
});

test("test_popup_content", function() {
    var testdiv=$("<div>");
    fill_popup(testdiv);
    var buttons=testdiv.find("button").toArray();
    equal(buttons.length,3,"There should be 3 buttons");
    for (var i = buttons.length - 1; i >= 0; i--) {
        var button=$(buttons[i]);        
        var category="test"+(i+1);
        equal(button[0].outerHTML,get_button_text(category),"HTML should be button text.");
    }
});

test("test_insert_category", function () {
    var newcategoryname=$("#categoryname");
    newcategoryname.val("test4");
    insert_category();
    equal(WBSdata.categories.length,4,"New category added");
    equal(WBSdata.categories[3],"test4","It is added last with correct name");
    equal(WBSdata.samples["test4"],0,"It has no samples.");
})