var TDDStates = {
    test: {color: "#FF0000", desc:"Develop failing unit test (not compiling is also failing)", fail: "implement", success: "test"},
    implement: {color: "#00FF00", desc:"Write code that makes unit test pass (but no more)", fail: "implement", success:"refactor"},
    refactor:{color: "#0000FF", desc:"Refactor code while making sure that unit tests stay green", fail: "refactor", success:"test"},
};

function TDDStateTracker() {
};