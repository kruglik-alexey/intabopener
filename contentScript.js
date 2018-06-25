console.log('Intab opener attached');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Incoming request', request);
    if (request.action === 'openEntity' && request.entityId) {
        if (request.entityType) {
            window.location.hash = `page=${request.entityType}/${request.entityId}`;
            sendResponse({ok: true});
            return;
        }

        fetch(window.location.origin + `/api/v1/generals/${request.entityId}?include=[entitytype[name]]&format=json`, {credentials: 'include'})
            .then(r => r.text())
            .then(r => JSON.parse(r))
            .then(r => {
                var entityType = r.EntityType.Name.toLowerCase();
                window.location.hash = `page=${entityType}/${request.entityId}`;
            })
            .then(() => sendResponse({ok: true}))
            .catch(() => sendResponse({ok: false}));

        return true; // says that we're async
    } else {
        sendResponse({ok: false});
    }
});
