
/* TIMER MODEL */
function Timer(time_in_seconds, intervalFunction) {
    this.intervalTime = time_in_seconds;
    //this.intervalId = window.setInterval(_interval(), time_in_seconds);
    
    this.start = function() {
        this.intervalId = window.setInterval(this._interval, this.intervalTime);
    }
    
    this.pause = function() {
        window.clearInterval(this.intervalId);
    }
    
    this.resume = function() {
        this.intervalId = window.setInterval(this._interval, this.intervalTime);
    }
    
    this.stop = function() {
        window.clearInterval(this.intervalId);
        this.elapsedSeconds = 0;
        this.elapsedMinutes = 0;
    }
    
    this.elapsedSeconds = 0;
    this.elapsedMinutes = 0;
    
    this._interval = function() {
        //console.log(elapsedSeconds);
        //elapsedSeconds += 1;
    
        intervalFunction();
    };
}

var intervalTimer = Timer(15, function() {
    //do stuff
    });

var popupTimer = Timer(5, function() {
    //count down
    });


/* OBSERVATION MODEL */
var observation = new Object();
observation.intervalFrequency = 15;
var intervals = new Array();

var states = new Array();
intervals.push(states);
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

