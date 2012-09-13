function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getUrlVar(key) {
    return getUrlVars()[key];
}

/*
 * Object model is as follows:
 * Session
 *  - (Array - Interval)Intervals
 *
 *-- Interval
 *  --- (Array)behaviors
 *  --- (Object)events
 *
 *
 */

function interval() {
    this.behaviors = new Array();
    this.events = new Object();
}



function getIntervals(session) {
    return session.intervals;
}

function getInterval(session, interval_number) {
    return getIntervals(session)[interval_number];
}

function getBehaviors(interval) {
    return interval.behaviors;
}

function getBehavior(interval, behavior_id) {
    return getBehaviors(interval)[behavior_id];
}

function getEvents(interval) {
    return interval.events;
}

function getNumberOfTimesEventOccurred(interval, event_id) {
    return interval.events[event_id];
}