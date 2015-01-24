(function() {
    'use strict';

    var timing = performance.timing;
    var api = {};
    var firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;

    // Time to first paint
    api.firstPaintTime = Math.round(0, firstPaint - (window.chrome.loadTimes().startLoadTime*1000));
    // Total time from start to load
    api.loadTime = Math.max(0, timing.loadEventEnd - timing.navigationStart);
    // Time spent constructing the DOM tree
    api.domReadyTime =  Math.max(0, timing.domComplete - timing.domInteractive);
    // Time consumed preparing the new page
    api.readyStart = Math.max(0, timing.fetchStart - timing.navigationStart);
    // Time spent during redirection
    api.redirectTime = Math.max(0, timing.redirectEnd - timing.redirectStart);
    // AppCache
    api.appcacheTime = Math.max(0, timing.domainLookupStart - timing.fetchStart);
    // Time spent unloading documents
    api.unloadEventTime = Math.max(0, timing.unloadEventEnd - timing.unloadEventStart);
    // DNS query time
    api.lookupDomainTime = Math.max(0, timing.domainLookupEnd - timing.domainLookupStart);
    // TCP connection time
    api.connectTime = Math.max(0, timing.connectEnd - timing.connectStart);
    // Time spent during the request
    api.requestTime = Math.max(0, timing.responseEnd - timing.requestStart);
    // Request to completion of the DOM loading
    api.initDomTreeTime = Math.max(0, timing.domInteractive - timing.responseEnd);
    // Load event time
    api.loadEventTime = Math.max(0, timing.loadEventEnd - timing.loadEventStart);

    return api;
})();