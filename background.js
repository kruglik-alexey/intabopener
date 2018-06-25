// TODO case insensivity

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


// https://slack-redir.net/link?url=https%3A%2F%2Fplan.tpondemand.com%2Fentity%2F182918-email-notifications-backend-project-member-recipients
chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
    var re = /.*slack-redir\.net\/link\?url=.*%3A%2F%2F(\w*)\.tpondemand\.com%2Fentity%2F(\d*)/;
    var match = e.url.match(re);
    if (!match) {
        console.log('no match, return');
        return;
    }
    var account = match[1];
    var entityId = match[2];
    console.log(account, entityId);
    if (!account || !entityId) {
        console.log('Smth missing, return');
        return;
    }

    sendMessageToAccountTab(account, {action: "openEntity", entityId}, e.tabId);
}, {url: [{hostContains: 'slack-redir', queryContains: 'tpondemand.com%2Fentity%2F'}]});


// https://www.google.com/url?hl=ru&q=https://plan.tpondemand.com/entity/183233&source=gmail&ust=1529999398532000&usg=AFQjCNEp-mq3ZyPxtRIxt7GEQnuSYmQAEA
chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
    var re = /.*google\..*\/url.*q=.*:\/\/(\w*)\.tpondemand\.com\/entity\/(\d*)/;
    var match = e.url.match(re);
    if (!match) {
        console.log('no match, return');
        return;
    }
    var account = match[1];
    var entityId = match[2];
    console.log(account, entityId);
    if (!account || !entityId) {
        console.log('Smth missing, return');
        return;
    }

    sendMessageToAccountTab(account, {action: "openEntity", entityId}, e.tabId);
}, {url: [{hostContains: 'google', queryContains: 'tpondemand.com/entity/'}]});


// https://plan.tpondemand.com/entity/182291-assign-many-teams-to-epics-and
chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
    var re = /\w*:\/\/(\w*)\.tpondemand\.com\/entity\/(\d*)/;
    var match = e.url.match(re);
    if (!match) {
        console.log('no match, return');
        return;
    }

    var account = match[1];
    var entityId = match[2];
    console.log(account, entityId);
    if (!account || !entityId) {
        console.log('Smth missing, return');
        return;
    }

    sendMessageToAccountTab(account, {action: "openEntity", entityId}, e.tabId);
}, {url: [{hostContains: 'tpondemand.com', pathPrefix: '/entity'}]});


// https://plan.tpondemand.com/restui/board.aspx#page=feature/182291
chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
    var re = /\w*:\/\/(\w*)\.tpondemand\.com\/restui\/board\.aspx.*page=(\w+?)\/(\d+)/;
    var match = e.url.match(re);
    if (!match) {
        console.log('no match, return');
        return;
    }

    var account = match[1];
    var entityType = match[2];
    var entityId = match[3];
    console.log(account, entityType, entityId);
    if (!account || !entityId || !entityType) {
        console.log('Smth missing, return');
        return;
    }

    sendMessageToAccountTab(account, {action: "openEntity", entityId, entityType}, e.tabId);
}, {url: [{hostContains: 'tpondemand.com', pathPrefix: '/restui/board.aspx'}]});
