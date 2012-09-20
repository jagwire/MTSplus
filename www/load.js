/* Default Data */

var level1_states = {
    MO: "Modeling",
    GP: "Guided Practice",
    NP: "Naturalistic Practice",
    PB: "Progressive Building",
    PLC: "Previously Learning Skills",

}
var level2_states = {
    FE: "Facial Expressions",
    ASB: "Appropriate Speaker Behaviors",
    ALB: "Appropriate Learning Behaviors",
    TT: "Turn Taking",
    ER: "Emotional Ranges",
    RP: "Recognizing Perspectives",
    PI: "Problem Identification",
    MPS: "Multiple Problem Solutions"
   
};

var default_events = {
    VVE: "Verbal/Visual Expectations",
    SVF: "Specific Verbal Feedback",
    EXT: "Extension",
    PRO: "Prompting",
    SM: "Self-Monitor",
    EI: "Explicit Instruction",
    CS: "Cognitive Strategies"
};

/* GLOBAL FUNCTIONS */

function test() {
    alert("!!!");
    $("#popupPanel").popup("open");
    //$.mobile.changePage('#popupPanel');
}




/* DOCUMENT LOADING ZONE */

$(document).bind("mobileinit", function() {
        $.mobile.defaultTransition = 'none';
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
    });


var show = false;

$("#stage").live('pageshow', function(event, ui) {
    
    if(show === false) {
        //alert("page init!");
        //$.mobile.changePage('#start-interval-dialog', 'pop', false, true);
        
        $('#initial-sample-popup').popup("open");
        
        show = true;
    }

});


/* DATABASE LOADING ZONE */

var db;
var DATABASE_NAME = "MTS";
var DATABASE_VERSION = "1.0";
var DATABASE_DISPLAY = "MTS+ Configurations";
var DATABASE_SIZE = 1000000; // in bytes

function loadDefaults(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Configs (id unique, data)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS States (Code unique text, Description text')
    tx.executeSql('CREATE TABLE IF NOT EXISTS')
    tx.executeSql('SELECT * FROM CONFIGS WHERE')
}

function onDeviceReady() {
    db = window.openDatabase(DATABASE_NAME, DATABASE_VERSION, DATABASE_DISPLAY, DATABASE_SIZE);
    db.transaction(loadDefaults, error, success);
}

document.addEventListener("deviceready", onDeviceReady, false);

/* dungeon */
var firstInterval = new Object();
            firstInterval.behaviors = new Array();
            firstInterval.events = new Object();
            firstInterval.events['VVE'] = 2;
			
            var session = new Object();
            session['intervals'] = new Array();
            var intervals = session['intervals'];
			
			
            intervals[0] = new Object();//interval();
            intervals[0] = firstInterval;
            //session.intervals[0].events = new Object();
            //session.intervals[0].events['VVE'] += 1;
			
			
            //to denote what interval we are on
            var current_interval = 0;
			
            //to hold our javascript interval object
            var intervalHandle;
			
            //to hold our javascript interval timer object
            var timerHandle;
			
            //the amount of seconds elapsed
            var seconds = 0;
			
            //the amount of minutes elapsed
            var minutes = 0;
			
            function startObservation() {
                //alert("!!!");
                intervalHandle = setInterval(_interval, 15000);
                timerHandle = setInterval(_timer, 1000);
				
               // $("#start-observation-dialog").dialog('close');
                window.location.href="#";
            }
			
            function hideBehaviorDialog() {
                //$("#interval-behaviors-dialog").dialog('close');
				$('#recurring-sample-popup').popup("close");
                //handle interval data here
				
            }
			
            function stopObservation() {
                clearInterval(intervalHandle);
                clearInterval(timerHandle);
				
                $.mobile.changePage('report.html');
            }
			
            function _interval() {
                //$.mobile.changePage('#interval-behaviors-dialog', {transition: 'pop', role: 'dialog'});
                
				$('#recurring-sample-popup').popup("open");
				
				current_interval += 1;
				
                session.intervals[current_interval] = new Object();
                session.intervals[current_interval].behaviors = new Array();
				
            }
			
            function _timer() {
                //calculate elapsed time
                seconds += 1;
                //alert(seconds);
                var mins = 0;
                var secs = 0;
                var minsDisplay;
                var secsDisplay;
				
                mins = Math.floor(seconds/60);
				
                if(mins > 0) {
                    minutes = mins;
                    secs = seconds % 60;
                } else {
                    secs = seconds % 60;	
                }
				
                //var mins_display = "";
                if(mins < 10) {
                    minsDisplay = "0"+mins;
                } else {
                    minsDisplay = mins;
                }
				
                //var secs_display = "";
                if(secs < 10) {
                    secsDisplay = "0"+secs;
                } else {
                    secsDisplay = secs;
                }

                var time_display = minsDisplay + ":"+secsDisplay;
		
                //display elapsed time
                $("#time").text(time_display);
            }

