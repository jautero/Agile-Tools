module("TDDStateTracker");
test("create tdd state tracker", function() {
    expect(0);
    tracker = new TDDStateTracker();
});

function mockCheck () {
	return this.mockResult;
};

test("Get current state", function() {
    tracker = new TDDStateTracker(mockCheck);
    tracker.mockResult=true;
    equal(tracker.initState(),TDDStates["test"],"If everything works, write failing unit test next");
    tracker.mockResult=false;
    equal(tracker.initState(),TDDStates["implement"],"If it doesn't, fix unit tests.");
});
