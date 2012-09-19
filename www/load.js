/* Default Data */

var default_states = {
    MO: "Modeling",
    GP: "Guided Practice",
    NP: "Naturalistic Practice",
    PB: "Progressive Building",
    PLC: "Previously Learning Skills",
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
        $.mobile.changePage('#start-interval-dialog', 'pop', false, true);
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
