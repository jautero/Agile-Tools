module("SprintBacklogBurner", {
	setup: function() {
        burngorman = $("#burnarea");
		testbacklogburner = new SprintBacklogBurner(burngorman);
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

test("You can delete hours",function(){
	deepEqual(testbacklogburner.burnlist,[], "burn list is empty");
	testbacklogburner.burnHours(2);
	testbacklogburner.burnHours(4);
	testbacklogburner.burnHours(2);
	deepEqual(testbacklogburner.burnlist,[2,4,2], "burn list is updated");
	testbacklogburner.unburn();
	deepEqual(testbacklogburner.burnlist,[2,4], "last value is removed");
});

test("deleting from empty list does nothing", function(){
	deepEqual(testbacklogburner.burnlist,[], "burn list is empty at start");
	testbacklogburner.unburn();
	deepEqual(testbacklogburner.burnlist,[], "burn list is still empty");
});
test("Generate html representation of a list", function() {
    equal(generateList([1,2],"test").prop("outerHTML"),"<ul class=\"test\"><li>1</li><li>2</li></ul>","burnlist matches spec.")
});
test("Sum empty burnlist",function(){
   equal(testbacklogburner.burnListSum(),0,"empty list = 0");
});
test("Generate empty burn page",function () {
    equal(burngorman.html(),"","Nothing burned");
});

test("Burn page with 1 burn", function () {
    testbacklogburner.burnHours(2);
    var testdiv=$("<div>").append(generateList([2],"burnlist")).append($("<div>",{class:"total"}).text("Total: 2"));
    equal(burngorman.html(),testdiv.html(),"One item list and total div");
});

test("Burn page with 2 burns", function () {
    testbacklogburner.burnHours(2);
    testbacklogburner.burnHours(4);
    var testdiv=$("<div>").append(generateList([2,4],"burnlist")).append($("<div>",{class:"total"}).text("Total: 6"));
    equal(burngorman.html(),testdiv.html(),"One item list and total div");
});

test("Check sprint length", function() {
	equal(testbacklogburner.sprintWeeks,4,"Sprint lasts 4 weeks");
});
