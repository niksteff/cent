chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ solidBgColor: 'coral' }, function () {
        console.debug("Set default installation color.")
    });
});
