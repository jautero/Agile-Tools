module("WorkBreakdownSampler", {
    setup: function () {
    WBSdata={samples:{},total:0};
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

test("test_setup", function () {
    setup();
    expect(0);
})