module("TDDStateTracker",{
	setup: function() {
		tracker = new TDDStateTracker(mockCheck);
	}
});
test("create tdd state tracker", function() {
    expect(0);
});

function mockCheck () {
	return this.mockResult;
};

test("Get current state", function() {
    tracker.mockResult=true;
    equal(tracker.initState(),TDDStates["test"],"If everything works, write failing unit test next");
    tracker.mockResult=false;
    equal(tracker.initState(),TDDStates["implement"],"If it doesn't, fix unit tests.");
});

test("test - implement - refactor -cycle", function() {
	tracker.mockResult=true;
	equal(tracker.initState(),TDDStates["test"],"init state to test state");
	tracker.mockResult=false; 
	equal(tracker.update(),TDDStates["implement"],"Test fails -> implement state");
	tracker.mockResult=true;
	equal(tracker.update(),TDDStates["refactor"], "Test succeeds -> refactor state");
	equal(tracker.update(),TDDStates["test"], "Tests still succeed -> back to test state");
});