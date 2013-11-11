var defaultSprintWeeks=4, daysinWeek=7, sprintstartday=1, sprintendday=5;

function daysinMonth(year,month) {
    if (month==2) {
        if (((year % 4) == 0 && (year % 100) != 0) || (year % 400) == 0) {
            return 29;
        }
        return 28;
    };
    if (month==4 || month==6 || month==9 || month==11) {
        return 30;
    };
    return 31;
}

function extendToTwo(value) {
    if (value < 10) {
        return "0" + value;
    } else {
        return value;
    }
}

function addDays(startDate,days) {
    var splitDate=startDate.split("-");
    for (var i = splitDate.length - 1; i >= 0; i--) {
        splitDate[i]*=1; // Convert to integer
    }
    splitDate[2]+=days;
    while (splitDate[2]>daysinMonth(splitDate[0],splitDate[1])) {
        splitDate[2]-=daysinMonth(splitDate[0],splitDate[1]);
        splitDate[1]++;
        if (splitDate[1]>12) {
            splitDate[1]=1;
            splitDate[0]++;
        }
    }
    return splitDate.map(extendToTwo).join("-");
}

function SprintBacklogBurner(burnareaelement) {
    this.size=0;
	this.sprintWeeks=defaultSprintWeeks;
    this.burnlist=[];
    this.burnarea=burnareaelement
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
        this.endDate=addDays(this.startDate,this.sprintinDays());
    };
	this.unburn=function() {
		this.burnlist.pop();
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
