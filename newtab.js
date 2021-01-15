chrome.storage.sync.get('solidBgColor', function (result) {
    console.log('Value currently is ', result.solidBgColor);

    document.body.style.backgroundColor = result.solidBgColor;
});