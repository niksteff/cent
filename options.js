let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');

    button.style.backgroundColor = item;
    button.addEventListener('click', function () {
      chrome.storage.sync.set({ solidBgColor: item }, function () {
        chrome.storage.sync.get('solidBgColor', function(result) {
          console.log('solidBgColor set to: ', result);
        });
      })
    });

    page.appendChild(button);
  }
}
constructOptions(kButtonColors);