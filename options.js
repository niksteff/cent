let colorButtons = document.getElementById('buttonDiv');
let randomColor = document.getElementById('randomColorDiv');

function constructOptions() {
  chrome.runtime.sendMessage({ data: "getYearColors" }, (response) => {
    for (let item of response) {
      let button = document.createElement('button');

      button.style.backgroundColor = item.hex;
      button.style.width = "200px"
      button.style.height = "50px";
      button.textContent = item.code + " " + item.name;

      button.addEventListener('click', function () {
        chrome.storage.sync.set({ userColorSetting: item }, function () {
          chrome.storage.sync.get('userColorSetting', function (result) {
            console.log('userColorSetting set to: ', result);
          });
        });
      });

      colorButtons.appendChild(button);
    }
  });

  // Set the random color
  let checkbox = document.createElement('INPUT');
  checkbox.setAttribute("type", "checkbox");
  chrome.storage.sync.get('randomSetting', function (result) {
    checkbox.checked = result.randomSetting;
  });

  checkbox.addEventListener('click', function () {
    chrome.storage.sync.set({ randomSetting: checkbox.checked });
  });

  randomColor.appendChild(checkbox);
}

// Start the option page construction
constructOptions();