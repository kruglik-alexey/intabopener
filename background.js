function processResponse(response, existingTabId, newTabId) {
    if (!response) {
        console.log('No response from tab');
        return;
    }
    if (response.ok) {
        console.log('Closing just opened tab');
        chrome.tabs.remove(newTabId);

        console.log('Activating existing tab');
        chrome.tabs.update(existingTabId, {active: true});
    } else {
        console.log('Not ot response from tab');
    }
}

function sendMessageToExisitngTab(message, existingTabId, newTabId) {
    console.log('Sending message to the existing tab');
    chrome.tabs.sendMessage(existingTabId, message, function(response) {
        processResponse(response, existingTabId, newTabId);
    });
}

function getAccountTab(account, newTabId) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({url: `*://${account}.tpondemand.com/*`}, function(tabs) {
            tabs = tabs.filter(t => t.id !== newTabId);
            if (tabs.length === 0) {
                console.log('No tabs, do nothing');
                reject();
                return;
            }
            if (tabs.length > 1) {
                console.log('Several tabs, do nothing');
                reject();
                return;
            }

            resolve(tabs[0]);
        });
    });
}

function sendMessageToAccountTab(account, message, newTabId) {
    getAccountTab(account, newTabId).then(t => {
        sendMessageToExisitngTab(message, t.id, newTabId);
    }, () => {});
}

// Should handle direct urls as well as redirects of kind 'https://slack-redir.net/link?url=https%3A%2F%2Fplan.tpondemand.com%2Fentity%2F183866'
var targetprocessEntityUrlRe = /.*:\/\/(\w*)\.tpondemand\.com\/entity\/(\d*)/;
var targetprocessPageUrlRe = /.*:\/\/(\w*)\.tpondemand\.com\/restui\/board\.aspx.*page=(\w+?)\/(\d+)/;
// TODO add support for [...]Board.aspx#page=board/4843129481926989378&appConfig=eyJhY2lkIjoiRTI2Njg5NzI5MkUxM0Q2ODIxOTBFOUFGODcxODRBQUUifQ==&boardPopup=userstory/169989/silent
function tryParseTargetprocessEntityUrl(url) {
    url = decodeURIComponent(url);

    var match = url.match(targetprocessEntityUrlRe);
    if (match) {
        return {
            account: match[1],
            entityId: match[2]
        };
    }

    match = url.match(targetprocessPageUrlRe);
    if (match) {
        return {
            account: match[1],
            entityType: match[2],
            entityId: match[3]
        };
    }

    return null;
}

chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
    var entity = tryParseTargetprocessEntityUrl(e.url);
    if (entity) {
        sendMessageToAccountTab(entity.account, {action: "openEntity", entityId: entity.entityId, entityType: entity.entityType}, e.tabId);
    }
});
