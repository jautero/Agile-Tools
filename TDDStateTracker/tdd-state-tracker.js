var TDDStates = {
    test: {className: "tddstate-test", desc:"Develop failing unit test (not compiling is also failing)", fail: "implement", success: "test"},
    implement: {className: "tddstate-implement", desc:"Write code that makes unit test pass (but no more)", fail: "implement", success:"refactor"},
    refactor:{className: "tddstate-refactor", desc:"Refactor code while making sure that unit tests stay green", fail: "refactor", success:"test"},
};

function changeStateElement(stateElement, newState) {
    var stateObject = TDDStates[newState];
    stateElement.attr("class", stateObject.className);
    stateElement.text(stateObject.desc);
}
function TDDStateTracker(testElement,unitTestCheck,store) {
	this.unitTestCheck=unitTestCheck;
	this.testElement=testElement;
    this.store=store;
    this.initState=function() {
        if (this.store && this.store.TDDState) {
            this.currentState=this.store.TDDState;
        } else {
            this.currentState=this.unitTestCheck()?"test":"implement";
        }
		changeStateElement(this.testElement, this.currentState);
        return TDDStates[this.currentState];
    };
	this.update=function() {
        if (this.timestamper) {
            $.get(this.timestamper,function () {});
        }
		if (this.unitTestCheck()) {
			this.currentState=TDDStates[this.currentState].success
		} else {
			this.currentState=TDDStates[this.currentState].fail
		}
        if (this.store) {
            this.store.TDDState=this.currentState;
        }
        changeStateElement(this.testElement, this.currentState);
		return TDDStates[this.currentState];
	}
};
