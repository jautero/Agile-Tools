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
    ok(isWorkday(new Date(2013,10,11)),"Regular Monday is workday")
    ok(isWorkday(new Date(2013,10,12)),"Regular Tuesday is workday")
    ok(isWorkday(new Date(2013,10,13)),"Regular Wednesday is workday")
    ok(isWorkday(new Date(2013,10,14)),"Regular Thursday is workday")
    ok(isWorkday(new Date(2013,10,15)),"Regular Friday is workday")
    ok(!isWorkday(new Date(2013,10,16)),"Regular Saturday is not workday")
    ok(!isWorkday(new Date(2013,10,17)),"Regular Sunday is not workday")
    // Christian Holidays (in Finland)
    // Kirkkolaki 4. luku §3 http://www.finlex.fi/fi/laki/ajantasa/1993/19931054#L4P3
    ok(!isWorkday(new Date(2013,11,25)), "Christmas Day is not workday")
    ok(!isWorkday(new Date(2013,11,26)), "Boxing Day is not workday")
    ok(!isWorkday(new Date(2014,0,1)), "New Year is not workday")
    ok(!isWorkday(new Date(2014,0,6)), "Epiphany is not workday")
    ok(!isWorkday(new Date(2013,2,29)), "Good Friday 2013 was not workday")
    ok(!isWorkday(new Date(2014,3,18)), "Good Friday 2014 is not workday")
    ok(!isWorkday(new Date(2013,3,1)), "Easter Monday 2013 was not workday")
    ok(!isWorkday(new Date(2014,3,21)), "Easter Monday 2014 is not workday")
    ok(!isWorkday(new Date(2013,4,9)), "Ascencion Day 2013 was not workday")
    ok(!isWorkday(new Date(2014,4,29)), "Ascencion Day 2014 is not workday")
    // All other Finnish Christian Holidays are on Saturdays or Sundays
    // Other Finnish Holidays
    ok(!isWorkday(new Date(2013,4,1)), "Vappu 2013 was not workday");
    ok(!isWorkday(new Date(2013,11,6)), "Finnish Independence Day is not workday");
    // Eves that are free 
    ok(!isWorkday(new Date(2014,11,24)), "Christmas Eve 2014 is not workday")
    ok(!isWorkday(new Date(2013,5,21)), "Midsummer Eve 2013 was not workday")
    ok(!isWorkday(new Date(2014,5,20)), "Midsummer Eve 2014 is not workday")
    ok(isWorkday(new Date(2013,11,23)), "Monday December 23rd, 2013 is workday")
    ok(isWorkday(new Date(2013,11,27)), "Friday December 27rd, 2013 is workday")
});

test("Increment day",function () {
    var day=new Date(2013,10,29);
    incrementDay(day);
    var result=new Date(2013,10,30)
    equal(day.getTime(),result.getTime(),"Next day");
    incrementDay(day);
    var result=new Date(2013,11,1)
    equal(day.getTime(),result.getTime(),"Next month");
    day=new Date(2013,11,31);
    result=new Date(2014,0,1);
    incrementDay(day);
    equal(day.getTime(),result.getTime(),"Next year");    
})

test("Check addDays",function () {
    var startDate="2013-07-15"
    equal(addDays(startDate,3),"2013-07-18","Simple addition");
    equal(addDays(startDate,17),"2013-08-01","Start of next month");
    equal(addDays(startDate,31),"2013-08-15","Full month");
    equal(addDays(startDate,48),"2013-09-01","Start of September");
});
test("Check workDays", function () {
    equal(workDays("2013-10-21","2013-10-27"),5,"Normal work week has 5 days");
    equal(workDays("2013-09-29","2013-10-05"),5,"even if it ends in another month")
    equal(workDays("2014-09-01","2014-09-30"),22,"September 2013 had 22 workdays")
    equal(workDays("2013-12-23","2013-12-29"),2,"Christmas week 2013 has 2 workdays")
});

test("Check main sprint page",function () {
    testbacklogburner.startSprint();
    equal(testbacklogburner.currentDate,testbacklogburner.startDate,"Sprint current date is start date");
    equal(testbacklogburner.daysLeft(),19,"Days left is 20 work days/sprint - first day");
});
