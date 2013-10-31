module("SprintBacklogBurner", {
	setup: function() {
		testbacklogburner = new SprintBacklogBurner();
	}
});
test("CreateBacklogItem",function(){
	ok(testbacklogburner,"Function was called.");
});
test("setSprintBacklog", function() {
	testbacklogburner.setSprintSize(100);
	equal(testbacklogburner.getSprintSize(),100,"Sprint size is what was set");
});
test("Reduct hours", function () {
	testbacklogburner.setSprintSize(100);
	ok(testbacklogburner.burnHours(4),"Burn 4 hours should be successfull");
	equal(testbacklogburner.getSprintSize(),96,"Sprint size updated in burn");
	
});