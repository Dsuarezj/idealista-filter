let redFlags = cleanAndCreateArray(localStorage.getItem('redFlags')) || [];

spotBadListings();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_RED_FLAGS') {
      const redFlags = localStorage.getItem('redFlags');
      sendResponse({ redFlags: redFlags });
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'SAVE_RED_FLAGS') {
      redFlags = cleanAndCreateArray(message.redFlags);
      localStorage.setItem('redFlags', redFlags);
      sendResponse({status: 'success'});
      spotBadListings();
  }
});

function spotBadListings() {
  const color = '#FFB6C1';
  const listingItems = document.querySelectorAll('.listing-items');

  listingItems.forEach(listingItem => {
    const items = listingItem.querySelectorAll('.item');
    items.forEach(item => {
      const itemInfoContainer = item.querySelector('.item-info-container');
      const linkElement = itemInfoContainer.querySelector('.item-link');
      const url = linkElement.href;
      const priceRowElement = itemInfoContainer.querySelector('.price-row');
      const priceText = priceRowElement.querySelector('.item-price').textContent;
      

      fetch(url)
        .then(response => response.text())
        .then(htmlText => {
          const regex = /<div class="adCommentsLanguage expandable is-expandable"(.*?)<\/div>/gs;
          const matches = htmlText.match(regex);
          if (matches) {
            for (const match of matches) {
              isUnwanted = redFlags.some(palabra => decodeHtmlEntities(match).toLowerCase().includes(palabra))
              if (isUnwanted) {
                itemInfoContainer.style.backgroundColor = color;
              }
              else {
                getPriceSpan(parseFloat(priceText.replace(/[^0-9.-]+/g, "")));
              }
            }
          }
        })
        .catch(error => {
          console.error('Error al hacer la solicitud Fetch:', error);
        });
    });
  });
}

function getPriceSpan(price) {
  console.log(`Precio encontrado: ${price.toFixed(2)} €/mes`);
  console.log('Si se divide en partes iguales para 2: ' + (price / 2).toFixed(2));
}

function decodeHtmlEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

function cleanAndCreateArray(inputString) {
  if (!inputString) {
    return [];
  }
  const splitArray = inputString.split(',');
  const cleanedArray = splitArray.map(element => element.trim());
  return cleanedArray;
}