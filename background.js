const pantoneYearColors = [
    {
        "hex": "#F5DF4D",
        "code": "PANTONE 13-0647 TCX",
        "name": "Illuminating"
    },
    {
        "hex": "#939597",
        "code": "PANTONE 17-5104 TCX",
        "name": "Ultimate Gray"
    },
    {
        "hex": "#0F4C81",
        "code": "PANTONE  19-4052 TCX",
        "name": "Classic Blue"
    },
    {
        "hex": "#FA7268",
        "code": "PANTONE  16-1546 TPX",
        "name": "Living Coral"
    }
];

chrome.runtime.onInstalled.addListener(function () {
    // Set the default color to the newest pantone color of the year
    chrome.storage.sync.set({ userColorSetting: pantoneYearColors[0] });

    chrome.storage.sync.set({ randomSetting: false });
    chrome.storage.sync.set({ lastRandomColor: pantoneYearColors[0] });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Returns the pantone colors of the year
    if (message.data == "getYearColors") {
        sendResponse(pantoneYearColors);
        return true;
    }

    // Returns the currently set pantone background color. If random is active will randomly select a color.
    if (message.data == "getCurrentColor") {
        chrome.storage.sync.get('randomSetting', function (randomSetting) {
            if (randomSetting.randomSetting == true) {
                getRandomColor(pantoneYearColors.length - 1, 0, function (newRandomColor) {
                    sendResponse(newRandomColor);
                });
            }

            chrome.storage.sync.get('userColorSetting', function (userColorSetting) {
                sendResponse(userColorSetting);
            });
        });

        return true;
    }
});

// Returns a random color from the year array
function getRandomColor(max, min, callback) {
    let index = Math.floor(Math.random() * (max - min) + min);
    let newRandomColor = pantoneYearColors[index];
    chrome.storage.sync.get('lastRandomColor', function (lastRandomColor) {
        console.log('lastRandomColor', lastRandomColor);
        console.log('newRandomColor', newRandomColor);
        if (newRandomColor.hex == lastRandomColor.lastRandomColor.hex) {
            console.log('same random color');
            getRandomColor(max, min, callback);
        }
        
        chrome.storage.sync.set({ lastRandomColor: newRandomColor });
        callback(newRandomColor);
    });
}
