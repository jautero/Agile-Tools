module("TDDStateTracker",{
	setup: function() {
		testElement = $("#test-tddtracker");
        testStore = {};
		tracker = new TDDStateTracker(testElement,mockCheck,testStore);
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
    tracker.initState();
    equal(tracker.currentState,"test","If everything works, write failing unit test next");
    tracker.mockResult=false;
    tracker.initState();
    equal(tracker.currentState,"implement","If it doesn't, fix unit tests.");
});

function checkTDDState(testtracker, trackerelement, expectedstatename) {
    var expectedState = TDDStates[expectedstatename];
    equal(testtracker.currentState,expectedstatename,"tracker.currentState should be " + expectedstatename);
    ok(trackerelement.hasClass(expectedState.className),"tracker should update element class to " + expectedState.className);
    equal(trackerelement.html(),expectedState.desc,"tracker should update element content to \"" + expectedState.desc+"\".");
};

test("test - implement - refactor -cycle", function() {
	tracker.mockResult=true;
    tracker.initState();
    checkTDDState(tracker,testElement,"test");
	tracker.mockResult=false; 
    tracker.update();
    checkTDDState(tracker,testElement,"implement");
	tracker.mockResult=true;
    tracker.update();
    checkTDDState(tracker,testElement,"refactor");
    tracker.update();
    checkTDDState(tracker,testElement,"test");
});

test("state is loaded from store", function() {
   testStore.TDDState="refactor";
   tracker.mockResult=true;
   tracker.initState();
   checkTDDState(tracker,testElement,"refactor");
});
test("state is stored to store after update",function () {
    tracker.mockResult=false;
    tracker.initState();
    checkTDDState(tracker,testElement,"implement");
    tracker.mockResult=true;
    tracker.update();
    checkTDDState(tracker,testElement,"refactor");
    equal(testStore.TDDState,"refactor", "New state is stored to store"); 
});

test("Test current_time function", function () {
	var current_time=Math.floor(new Date().getTime()/1000);
	equal(tracker.current_time(),current_time,"current_time() returns current time to the second.");
});

module("TDDStateTracker time tests",{
	setup: function() {
		testElement = $("#test-tddtracker");
        testStore = {};
		tracker = new TDDStateTracker(testElement,mockCheck,testStore);
		tracker.current_time=function () {
			return 93224109; // December 14, 1972, 22:54:37 UTC
		};
	}
});

test("Without stored timestamp get_cycle_time should return 0.", function () {
	equal(tracker.get_cycle_time(),0,"Check that get_cycle_time() returns 0.");
});

test("get_cycle_time should update timestamp.", function  () {
	testStore.timestamp=0;
	equal(tracker.get_cycle_time(),0,"Check that get_cycle_time() returns 0.");
	equal(testStore.timestamp,93224109,"Timestamp is updated");
});
test("get_cycle_time should return time elapsed from stored timestamp.", function  () {
	testStore.timestamp=93224000;
	equal(tracker.get_cycle_time(),109,"Check that get_cycle_time() returns 109.");
	equal(testStore.timestamp,93224109,"Timestamp is updated");
})

function cycle_time_calculations_test() {
    testStore.average=30;
    testStore.cycles=4;
    testStore.timestamp=93224109-30;
    tracker.update_cycle_time();
	equal(testStore.timestamp,93224109,"Timestamp is updated");
    equal(testStore.cycles,5,"Cycle count is updated");
    equal(testStore.average,30,"Average is the same");
};

test("Test update cycle_time calculations", function () {
    cycle_time_calculations_test();
})

test("Test update cycle_time text", function() {
    testElement.text("");
    cycle_time_calculations_test();
    equal(testElement.text(),"(latest cycle: 30 seconds, average: 30 seconds)","element is updated with cycle info")
});

test("Test update cycle_time text at the end of exisiting text", function () {
    testElement.text("this is a test");
    cycle_time_calculations_test();
    equal(testElement.text(),"this is a test (latest cycle: 30 seconds, average: 30 seconds)","element is updated with cycle info")
    
})