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

    chrome.tabs.query({url: `*://${account}.tpondemand.com/*`}, function(tabs) {
        tabs = tabs.filter(t => t.id !== e.tabId);
        if (tabs.length === 0) {
            console.log('No tabs, do nothing');
            return;
        }
        if (tabs.length > 1) {
            console.log('Several tabs, do nothing');
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, {action: "openEntity", entityId}, function(response) {
            if (!response) {
                console.log('No response from tab');
                return;
            }
            if (response.ok) {
                console.log('Closing just opened tab');
                chrome.tabs.remove(e.tabId);

                console.log('Activating existing tab');
                chrome.tabs.update(tabs[0].id, {active: true});
            } else {
                console.log('Not ot response from tab');
            }
        });
    });
}, {url: [{hostContains: 'slack-redir', queryContains: 'tpondemand.com'}]});


// https://plan.tpondemand.com/entity/182918-email-notifications-backend-project-member-recipients
chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
    if (e.transitionType === 'forward_back') {
        console.log('forward_back, return');
        return;
    }

    var re = /\w*:\/\/(\w*)\.tpondemand\.\w*\/restui\/board\.aspx\?#page=(\w+?)\/(\d+)/;
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

    chrome.tabs.query({url: `*://${account}.tpondemand.com/*`}, function(tabs) {
        tabs = tabs.filter(t => t.id !== e.tabId);
        if (tabs.length === 0) {
            console.log('No tabs, do nothing');
            return;
        }
        if (tabs.length > 1) {
            console.log('Several tabs, do nothing');
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, {action: "openEntity", entityId, entityType}, function(response) {
            if (!response) {
                console.log('No response from tab');
                return;
            }
            if (response.ok) {
                console.log('Closing just opened tab');
                chrome.tabs.remove(e.tabId);

                console.log('Activating existing tab');
                chrome.tabs.update(tabs[0].id, {active: true});
            } else {
                console.log('Not ot response from tab');
            }
        });
    });
}, {url: [{hostContains: 'tpondemand.com', pathPrefix: '/restui/board.aspx'}]});

chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
    if (e.transitionType === 'forward_back') {
        console.log('forward_back, return');
        return;
    }

    var re = /\w*:\/\/(\w*)\.tpondemand\.\w*\/restui\/board\.aspx\?#page=(\w+?)\/(\d+)/;
    var match = e.url.match(re);
    if (!match) {
        console.log('no match, return');
        return;
    }

    var account = match[1];
    var entityType = match[3];
    var entityId = match[3];
    console.log(account, entityType, entityId);
    if (!account || !entityId || !entityType) {
        console.log('Smth missing, return');
        return;
    }

    chrome.tabs.query({url: `*://${account}.tpondemand.net/*`}, function(tabs) {
        tabs = tabs.filter(t => t.id !== e.tabId);
        if (tabs.length === 0) {
            console.log('No tabs, do nothing');
            return;
        }
        if (tabs.length > 1) {
            console.log('Several tabs, do nothing');
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, {action: "openEntity", entityId, entityType}, function(response) {
            if (!response) {
                console.log('No response from tab');
                return;
            }
            if (response.ok) {
                console.log('Closing just opened tab');
                chrome.tabs.remove(e.tabId);

                console.log('Activating existing tab');
                chrome.tabs.update(tabs[0].id, {active: true});
            } else {
                console.log('Not ot response from tab');
            }
        });
    });
}, {url: [{hostContains: 'tpondemand.net', pathPrefix: '/restui/board.aspx'}]});


// http://localhost/targetprocess/entity/168-lorem-ipsum-dolor-sit-amet-consectetur
chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
    if (e.transitionType === 'forward_back') {
        console.log('forward_back, return');
        return;
    }

    var re = /http:\/\/localhost\/targetprocess\/restui\/board\.aspx\?#page=(\w+?)\/(\d+)/;
    var match = e.url.match(re);
    if (!match) {
        console.log('no match, return');
        return;
    }

    var entityType = match[1];
    var entityId = match[2];
    console.log('localhost', entityType, entityId);

    if (!entityId) {
        console.log('no entityId, return');
        return;
    }

    if (!entityType) {
        console.log('no entityType, return');
        return;
    }

    chrome.tabs.query({url: 'http://localhost/targetprocess/*'}, function(tabs) {
        tabs = tabs.filter(t => t.id !== e.tabId);
        if (tabs.length === 0) {
            console.log('No tabs, do nothing');
            return;
        }
        if (tabs.length > 1) {
            console.log('Several tabs, do nothing');
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, {action: "openEntity", entityId, entityType}, function(response) {
            if (!response) {
                console.log('No response from tab');
                return;
            }
            if (response.ok) {
                console.log('Closing just opened tab');
                chrome.tabs.remove(e.tabId);

                console.log('Activating existing tab');
                chrome.tabs.update(tabs[0].id, {active: true});
            } else {
                console.log('Not ot response from tab');
            }
        });
    });
}, {url: [{hostContains: 'localhost', pathPrefix: '/targetprocess/restui/board.aspx'}]});
