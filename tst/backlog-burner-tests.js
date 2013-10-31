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
})