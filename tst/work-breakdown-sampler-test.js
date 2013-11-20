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
    var tablerows=statstable.toArray("<tr>").length;
    equal(tablerows,3,"Table should have 3 rows");
})