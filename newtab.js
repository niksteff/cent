chrome.runtime.sendMessage({ data: "getCurrentColor" }, function (currentColor) {
    console.log('currentColor', currentColor);
    document.body.style.backgroundColor = currentColor.hex;
});
