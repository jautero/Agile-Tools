var TDDStates = {
    test: {color: "#FF0000", desc:"Develop failing unit test (not compiling is also failing)", fail: "implement", success: "test"},
    implement: {color: "#00FF00", desc:"Write code that makes unit test pass (but no more)", fail: "implement", success:"refactor"},
    refactor:{color: "#0000FF", desc:"Refactor code while making sure that unit tests stay green", fail: "refactor", success:"test"},
};

function TDDStateTracker(testElement,unitTestCheck) {
	this.unitTestCheck=unitTestCheck;
	this.testElement=testElement;
    this.initState=function() {
        this.currentState=this.unitTestCheck()?"test":"implement";
		var stateObject = TDDStates[this.currentState];
		testElement.text(stateObject.desc);
		testElement.css("background-color",stateObject.color);
        return stateObject;
    };
	this.update=function() {
		if (this.unitTestCheck()) {
			this.currentState=TDDStates[this.currentState].success
		} else {
			this.currentState=TDDStates[this.currentState].fail
		}
		return TDDStates[this.currentState];
	}
};