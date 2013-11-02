module("SprintBacklogBurner", {
	setup: function() {
		testbacklogburner = new SprintBacklogBurner;
		testbacklogburner.setSprintSize(100);
	}
});
test("CreateBacklogItem",function(){
	ok(testbacklogburner,"Function was called.");
});
test("setSprintBacklog", function() {
	equal(testbacklogburner.getSprintSize(),100,"Sprint size is what was set");
});
test("Reduct hours", function () {
	testbacklogburner.burnHours(4);
	testbacklogburner.burnHours(2);
	deepEqual(testbacklogburner.burnlist,[4, 2], "burn hours are in burnlist");
	equal(testbacklogburner.getSprintSize(),100,"Sprint size not updated before commit");
	ok(testbacklogburner.commitHours(),"Commit must succeed");
	deepEqual(testbacklogburner.burnlist,[], "burnlist is empty");
	equal(testbacklogburner.getSprintSize(),94,"Sprint size updated after commit");	
});

test("Try to reduct too much hours", function() {
	ok(!testbacklogburner.burnHours(120),"Should return false");
	equal(testbacklogburner.getSprintSize(),100,"Size should not have been reducted");
});

test("Start sprint", function() {
	testbacklogburner.startSprint();
	var d=new Date();
	var isodate=d.toISOString().substr(0,10);
	equal(testbacklogburner.startDate,isodate,"start date is today");
});

test("Set sprint start date", function() {
	testbacklogburner.startSprint("2013-10-08");
	equal(testbacklogburner.startDate,"2013-10-08","Start date is set correctly");
});
