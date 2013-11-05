module("TDDStateTracker");
test("create tdd state tracker", function() {
    expect(0);
    tracker = new TDDStateTracker();
});
test("Get current state", function() {
    tracker = new TDDStateTracker();
    tracker.unitTestCheck=function(){return true};
    equal(tracker.initState(),TDDStates["test"],"If everything works, write failing unit test next");
    tracker.unitTestCheck=function(){return false};
    equal(tracker.initState(),TDDStates["implement"],"If it doesn't, fix unit tests.");
});
