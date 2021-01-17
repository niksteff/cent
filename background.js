const pantoneYearColors = [
    {
        "hex": "#F5DF4D",
        "code": "13-0647 TCX",
        "name": "Illuminating",
        "year": 2021
    },
    {
        "hex": "#939597",
        "code": "17-5104 TCX",
        "name": "Ultimate Gray",
        "year": 2021
    },
    {
        "hex": "#0F4C81",
        "code": "19-4052 TCX",
        "name": "Classic Blue",
        "year": 2020
    },
    {
        "hex": "#FA7268",
        "code": "16-1546 TPX",
        "name": "Living Coral",
        "year": 2019
    },
    {
        "hex": "#5F4B8B",
        "code": "18-3838 TCX",
        "name": "Ultra Violet",
        "year": 2018
    },
    {
        "hex": "#88B04B",
        "code": "15-0343 TCX",
        "name": "Greenery",
        "year": 2017
    },
    {
        "hex": "#F7CAC9",
        "code": "13-1520 TCX",
        "name": "Rose Quartz",
        "year": 2016
    },
    {
        "hex": "#92A8D1",
        "code": "15-3919 TCX",
        "name": "Serenity",
        "year": 2016
    },
    {
        "hex": "#955251",
        "code": "18-1438 TCX",
        "name": "Marsala",
        "year": 2015
    },
    {
        "hex": "#B565A7",
        "code": "18-3224 TCX",
        "name": "Radiant Orchid",
        "year": 2014
    },
    {
        "hex": "#009B77",
        "code": "17-5641 TCX",
        "name": "Emerald",
        "year": 2013
    },
    {
        "hex": "#dd4124",
        "code": "17-1463 TCX",
        "name": "Tangerine Tango",
        "year": 2012
    }
];

chrome.runtime.onInstalled.addListener(function () {
    // Set the default color to the newest pantone color of the year
    chrome.storage.sync.set({ userColorSetting: pantoneYearColors[0] });

    chrome.storage.sync.set({ randomSetting: true });
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
        chrome.storage.sync.get('randomSetting', function (setting) {
            if (setting.randomSetting == true) {
                getRandomColor(pantoneYearColors.length, 0, function (newRandomColor) {
                    console.debug('Send random color', newRandomColor);
                    sendResponse(newRandomColor);
                });

                return true;
            } else {
                chrome.storage.sync.get('userColorSetting', function (setting) {
                    sendResponse(setting.userColorSetting);
                });
                return true;
            }
        });

        return true;
    }
});

// Returns a random color from the year array
function getRandomColor(max, min, callback) {
    let index = Math.floor(Math.random() * (max - min) + min);
    let newRandomColor = pantoneYearColors[index];

    chrome.storage.sync.get('lastRandomColor', (setting) => {
        if (newRandomColor.hex == setting.lastRandomColor.hex) {
            getRandomColor(max, min, callback);
            return true;
        }

        chrome.storage.sync.set({ lastRandomColor: newRandomColor }, () => {
            callback(newRandomColor);
        });
    });
}
