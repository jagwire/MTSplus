var observation = new Object();
var intervals = new Array();

var states = new Array();
intervals[0].states = states;

var events = new Object();
intervals[0].events = events;

observation.intervals = intervals;


function addInterval(interval) {
    observation.intervals.pus(interval);
}

function getInterval(index) {
    return observation.intervals[index];
}

function addStateToInterval(interval, state) {
    
    var index = interval.states.indexOf(state);

    //if the index is NOT undefined, ergo...if the state is present
    if(index != -1) { 
        //remove it from the array
        interval.states.splice(index, 1);

    }
    
    //add the state
    interval.states.push(state);
}

function addEventToInterval(interval, event) {
    interval.events[event] = 0;
}

function incrementEventForInterval(interval, event) {
    interval.events[event] += 1;
}

/* REPORTING API */

function wrapTableData(string) {
    return "<td>"+string+"</td>";
}
function processObservationResults(observation) {
    
    var tableRow;
    for(var interval in observation.intervals) {
        
    }
}

