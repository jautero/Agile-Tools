var defaultSprintWeeks=4, daysinWeek=7, sprintstartday=1, sprintendday=5;

function extendToTwo(value) {
    if (value < 10) {
        return "0" + value;
    } else {
        return value;
    }
}
fixedDateHolidays=[
{day:1,month:0}, // New year
{day:6,month:0}, // Epiphany
{day:25,month:11}, // Christmas day
{day:26,month:11} // Boxing Day
];
function isWorkday(date) {
    if (date.getDay()==0 || date.getDay() > 5) {
        return false;
    }
    for (var i = fixedDateHolidays.length - 1; i >= 0; i--) {
        var holiday=fixedDateHolidays[i];
        if (date.getDay()==holiday.day,date.getMonth()==holiday.month) {
            return false;
        }
    }
    return true;
}
function addDays(startDate,days) {
    var d=new Date(startDate);
    var result = new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()+days));
    return result.toISOString().substring(0,10);
};

function workDays(star,end) {
    return 5;
}
function SprintBacklogBurner(burnareaelement) {
    this.size=0;
	this.sprintWeeks=defaultSprintWeeks;
    this.burnlist=[];
    this.burnarea=burnareaelement;
    this.setSprintSize=function(size) {
        this.size=size;
    };
    this.getSprintSize=function(size) {
        return this.size;
    };
    this.burnHours=function(amount) {
        this.burnlist.push(amount);
        this.updateBurnPage();
    };
    this.updateBurnPage=function () {
        if (this.burnarea) {
            this.burnarea.html("");
            if (this.burnlist.length > 0) {
                this.burnarea.append(generateList(this.burnlist,"burnlist"));
                this.burnarea.append($("<div>",{class:"total"}).text("Total: "+this.burnListSum()));
            }
        }
    };
    this.burnListSum=function () {
        var sum=0;
        for (var i = this.burnlist.length - 1; i >= 0; i--) {
            sum += this.burnlist[i];
        }
        return sum;
    };

    this.commitHours=function() {
        var totalHours=0;
        for (index in this.burnlist) {
            totalHours += this.burnlist[index];
        }
        if (this.size<totalHours)
            return false;
        this.size -= totalHours;
        this.burnlist=[];
        return true;
    };
    this.sprintinDays=function () {
        return this.sprintWeeks*daysinWeek-(7-(sprintendday-sprintstartday));
    }
    this.startSprint=function(startDate) {
        if (this.size<=0)
            throw "Sprint Backlog needs size before you can start sprint";
        if (startDate === undefined) {
            var today=new Date();
            this.startDate=(new Date()).toISOString().substring(0,10);
        } else {
            this.startDate=startDate;
        }
        this.currentDate=this.startDate;
        this.endDate=addDays(this.startDate,this.sprintinDays());
    };
	this.unburn=function() {
		this.burnlist.pop();
	};
    this.daysLeft=function () {
        return 19;
    }
    this.updateBurnPage();
};

function generateList(items,className) {
    var listElement=$("<ul>",{class:className});
    for (var i = 0; i < items.length; i++) {
        var listitem=$("<li>").text(items[i]);
        listElement.append(listitem);
    }
    return listElement;
};
