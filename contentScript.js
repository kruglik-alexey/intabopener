console.log('Intab opener attached');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Incoming request', request);
    if (request.action === 'openEntity' && request.entityId && request.entityType) {
        window.location.hash = `page=${request.entityType}/${request.entityId}`;
        sendResponse({ok: true});
    } else {
        sendResponse({ok: false});
    }
});
