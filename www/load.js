/* Default Data */

var namespaces = ({ 

    SCI : {
        level1_states: {
            MO: "Modeling",
            GP: "Guided Practice",
            NP: "Naturalistic Practice",
            PB: "Progressive Building",
            PLC: "Previously Learning Skills",
            OTHER: "Other"
        
        },
        
        level2_states: {
            FE: "Facial Expressions",
            ASB: "Appropriate Speaker Behaviors",
            ALB: "Appropriate Learning Behaviors",
            TT: "Turn Taking",
            ER: "Emotional Ranges",
            RP: "Recognizing Perspectives",
            PI: "Problem Identification",
            MPS: "Multiple Problem Solutions",
            OTHER: "Other"
           
        },
        
        default_events: {
            VVE: "Verbal/Visual Expectations",
            SVF: "Specific Verbal Feedback",
            EXT: "Extension",
            PRO: "Prompting",
            SM: "Self-Monitor",
            EI: "Explicit Instruction",
            CS: "Cognitive Strategies"
        }
    },
    Ryan: {
        level1_states: {
            HAPPY: "Happy",
            SAD: "Sad"
            
        },
        
        level2_states: {
            CALM: "Calm",
            THOUGHT: "Thoughful"
        },
        
        default_events: {
            SPK: "Spoke",
            MOV: "Moved"
        }
        
        
    }


});
/* GLOBAL FUNCTIONS */

function test() {
    alert("!!!");
    $("#popupPanel").popup("open");
    //$.mobile.changePage('#popupPanel');
}

function load_states(namespace) {
    for(var i in namespace["level1_states"]) {
        var states = namespace["level1_states"];
       var str = " ";
       str += "<label for=\" "+states[i]+" \">"+states[i]+"</label>";
       str += "<input data-mini=\"true\" class=\"clearable\" type=\"radio\" name=\"group1\" id=\" "+states[i]+" \" value=\""+i+" \" />";
       
       $(str).appendTo("#start-level1");
       $(str).appendTo("#recur-level1");
    }

    for(var i in namespace["level2_states"]) {
        var states = namespace["level2_states"];
        var str = " ";
       str += "<label for=\" "+states[i]+" \">"+states[i]+"</label>";
       str += "<input data-mini=\"true\" class=\"clearable\"type=\"radio\" name=\"group2\" id=\" "+states[i]+" \" value=\""+i+" \" />";
       
       $(str).appendTo("#start-level2");
       $(str).appendTo("#recur-level2");
    }
    
    $("input[type='radio']").prop("type", "radio").checkboxradio();
    $("#start-level1").controlgroup("create");
    $("#start-level2").controlgroup("create");
    $("#recur-level1").controlgroup("create");
    $("#recur-level2").controlgroup("create");
  
}

function load_events(namespace) {
    for(var i in namespace["default_events"]) {
        var events = namespace["default_events"];
        
        var str = "<td><button data-mini=\"true\" class=\"event-button\" onclick=tally(\""+i+"\")>"+events[i]+"</button></td>";
        $(str).appendTo("#event-button-row");
    }
    
    $(".event-button").button().trigger("create");
    
}

/* DOCUMENT LOADING ZONE */

$(document).bind("mobileinit", function() {
        $.mobile.defaultTransition = 'none';
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
        
        //this doesn't seem to be occurring.
        
        
    });


var show = false;

$("#stage").live('pageshow', function(event, ui) {
    load_states(namespaces.SCI);
    load_events(namespaces.SCI);
    if(show === false) {
        //alert("page init!");
        //$.mobile.changePage('#start-interval-dialog', 'pop', false, true);
        
        $('#initial-sample-popup').popup("open");
        popupTimerHandle = new Timer(1000, _popupTimer);
        popupTimerHandle.start();
        show = true;
        
        
    }

});

var frequency = 15000;

$("#observe").live('pageshow', function(event, ui) {
    
    //alert("observe loaded!");
    //$(".timeSlider").slider();
        $(".timeSlider").bind("change", function(event, ui) {
            
            frequency = 1000 * parseInt($(".timeSlider option:selected").val());
            console.log("FREQUENCY: "+frequency);
            
      //  alert($(".timeSlider").val());
    });
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

/* DUNGEON ZONE */

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
    var current_interval = 1;
    
    //to hold our javascript interval object
    var intervalHandle;
    
    //to hold our javascript interval timer object
    var timerHandle;
    
    var popupTimerHandle;
    
    //the amount of seconds elapsed
    var seconds = 0;
    
    //the amount of minutes elapsed
    var minutes = 0;
			
            
    var observationStarted = false;
    
    function startObservation() {
        if(!observationStarted) {
            
            //console.log("FORM VALUE: "+$(".timeSlider option:selected").val())
            //var thisFrequency = 1000 * parseInt($(".timeSlider option:selected").val());
           // console.log("FREQUENCY AT TIME OF START OBSERVATION:" +frequency);
            observationStarted = true;
            intervalHandle = new Timer(frequency, _interval);
            timerHandle = new Timer(1000, _timer);
    
            intervalHandle.start();
            timerHandle.start();
            
        //add third timer here
            
            //window.location.href="#";
        }
    }
    
    function hideBehaviorDialog() {
        //$("#interval-behaviors-dialog").dialog('close');
        $('#recurring-sample-popup').popup("close");
        //handle interval data here
        intervalHandle.resume();
        timerHandle.resume();
        
        popupTimerHandle.stop();
        
    }
    
    function hideInitialPopup() {
        $("#initial-sample-popup").popup("close");
        popupTimerHandle.stop();
        startObservation();
    }
    
    function stopObservation() {
        clearInterval(intervalHandle);
        clearInterval(timerHandle);
        
        $.mobile.changePage('report.html');
    }
    
    function _interval() {
        //$.mobile.changePage('#interval-behaviors-dialog', {transition: 'pop', role: 'dialog'});
        
        intervalHandle.pause();
        timerHandle.pause();
        clearIntervalStates();
        
        seconds = 0;
        minutes = 0;
        
        $('#interval-label').text("Interval "+current_interval);
        $('#recurring-sample-popup').popup("open");
        
        current_interval += 1;
				
        session.intervals[current_interval] = new Object();
        session.intervals[current_interval].behaviors = new Array();
        
        clearTally();
        
        popupTimerHandle.start();
 
    }
    
    
    var elapsedSeconds = 0;
    var first = false;
    function _popupTimer() {
        //decrement counter in recurring popup
        elapsedSeconds += 1;
        var secondsRemaining = 10;
        if(!first) {
            secondsRemaining = 6 - elapsedSeconds;
            $("#initial-time-remaining").text("Time Remaining: "+secondsRemaining);
        } else {
            secondsRemaining = 4 - elapsedSeconds;
            $("#time-remaining").text("Time Remaining: "+secondsRemaining);
        }

        //if it reaches 0, hide the popup
        if(secondsRemaining <= 0) {
            if(!first) {
                first = true;
                hideInitialPopup();
                elapsedSeconds = 0;
                return;
            } else {
                elapsedSeconds = 0;
                hideBehaviorDialog();
            }
        }
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

