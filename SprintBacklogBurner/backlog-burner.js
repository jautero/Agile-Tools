function SprintBacklogBurner() {
    this.size=0;
    this.burnlist=[];
    this.setSprintSize=function(size) {
        this.size=size;
    };
    this.getSprintSize=function(size) {
        return this.size;
    };
    this.burnHours=function(amount) {
        this.burnlist.push(amount);
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

};
