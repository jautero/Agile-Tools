function SprintBacklogBurner(burnareaelement) {
    this.size=0;
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
    this.startSprint=function(startDate) {
        if (this.size<=0)
            throw "Sprint Backlog needs size before you can start sprint";
        if (startDate === undefined) {
            var today=new Date();
            this.startDate=(new Date()).toISOString().substring(0,10);
        } else {
            this.startDate=startDate;
        }
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
}
