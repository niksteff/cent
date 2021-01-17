chrome.runtime.sendMessage({ data: "getCurrentColor" }, function (setting) {
    document.body.style.backgroundColor = setting.hex;

    let nameItem = document.getElementById("pantoneName");
    let codeItem = document.getElementById("pantoneCode");

    nameItem.textContent = setting.name + " [" + setting.year + "]";
    codeItem.textContent = setting.code;
});
