var WBSdata={samples:{},total:0};

function sample(category) {
    if (WBSdata.samples[category] == undefined) {
        WBSdata.samples[category]=0;
    } 
    WBSdata.samples[category]++;
    WBSdata.total++;
}

function setup() {
    
}