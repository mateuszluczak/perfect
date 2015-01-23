(function() {
    'use strict';

    var timing = performance.timing;
    var api = {};
    var firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;

    // Time to first paint
    api.firstPaintTime = Math.round(firstPaint - (window.chrome.loadTimes().startLoadTime*1000));
    // Total time from start to load
    api.loadTime = timing.loadEventEnd - timing.navigationStart;
    // Time spent constructing the DOM tree
    api.domReadyTime = timing.domComplete - timing.domInteractive;
    // Time consumed preparing the new page
    api.readyStart = timing.fetchStart - timing.navigationStart;
    // Time spent during redirection
    api.redirectTime = timing.redirectEnd - timing.redirectStart;
    // AppCache
    api.appcacheTime = timing.domainLookupStart - timing.fetchStart;
    // Time spent unloading documents
    api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
    // DNS query time
    api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
    // TCP connection time
    api.connectTime = timing.connectEnd - timing.connectStart;
    // Time spent during the request
    api.requestTime = timing.responseEnd - timing.requestStart;
    // Request to completion of the DOM loading
    api.initDomTreeTime = timing.domInteractive - timing.responseEnd;
    // Load event time
    api.loadEventTime = timing.loadEventEnd - timing.loadEventStart;

    return api;
})();