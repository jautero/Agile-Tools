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

test("Check sprint end date", function() {
    testbacklogburner.startSprint("2013-10-21");
    equal(testbacklogburner.endDate,"2013-11-15","Sprint ends on friday of 4th week");
});


test("Check isWorkday",function () {
    ok(isWorkday(new Date("2013-11-11")),"Regular Monday is workday")
    ok(isWorkday(new Date("2013-11-12")),"Regular Tuesday is workday")
    ok(isWorkday(new Date("2013-11-13")),"Regular Wednesday is workday")
    ok(isWorkday(new Date("2013-11-14")),"Regular Thursday is workday")
    ok(isWorkday(new Date("2013-11-15")),"Regular Friday is workday")
    ok(!isWorkday(new Date("2013-11-16")),"Regular Saturday is not workday")
    ok(!isWorkday(new Date("2013-11-17")),"Regular Sunday is not workday")
    // Christian Holidays (in Finland)
    // Kirkkolaki 4. luku §3 http://www.finlex.fi/fi/laki/ajantasa/1993/19931054#L4P3
    ok(!isWorkday(new Date("2013-12-25")), "Christmas Day is not workday")
    ok(!isWorkday(new Date("2013-12-26")), "Boxing Day is not workday")
    ok(!isWorkday(new Date("2014-01-01")), "New Year is not workday")
    ok(!isWorkday(new Date("2014-01-06")), "Epiphany is not workday")
    
    
});

test("Check addDays",function () {
    var startDate="2013-07-15"
    equal(addDays(startDate,3),"2013-07-18","Simple addition");
    equal(addDays(startDate,17),"2013-08-01","Start of next month");
    equal(addDays(startDate,31),"2013-08-15","Full month");
    equal(addDays(startDate,48),"2013-09-01","Start of September");
});
test("Check workDays", function () {
    equal(workDays("2013-10-21","2013-10-27"),5,"Normal work week has 5 days");
    //equal(dateDelta("2012-01-01","2013-01-01"),366,"Leap year should have 366 days");
    //equal(dateDelta("2013-04-01","2013-10-01"),183,"Normal months within a year")
    //equal(dateDelta("2013-01-01","2013-01-15"),14,"Half month")
});

test("Check main sprint page",function () {
    testbacklogburner.startSprint();
    equal(testbacklogburner.currentDate,testbacklogburner.startDate,"Sprint current date is start date");
    equal(testbacklogburner.daysLeft(),19,"Days left is 20 work days/sprint - first day");
});
