document.addEventListener('DOMContentLoaded', (event) => {
  const redFlagsInput = document.getElementById('redFlagsInput');
  const buyRentToggle = document.getElementById('buyRentToggle');
  const redFlagsValue = localStorage.getItem('redFlags');
  const buyRentValue = localStorage.getItem('buyRent');

  if (redFlagsValue) {
      redFlagsInput.value = redFlagsValue;
  }

  if (buyRentValue) {
      buyRentToggle.checked = buyRentValue === 'true';
  }

  document.getElementById('configForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const form = event.target;
      const redFlagsValue = form.querySelector('#redFlagsInput').value;
      const isRentSelected = form.querySelector('#buyRentToggle').checked;
      localStorage.setItem('redFlags', redFlagsValue);
      localStorage.setItem('buyRent', isRentSelected);
      chrome.runtime.sendMessage({
            type: 'SAVE_RED_FLAGS',
            redFlags: redFlagsValue,
        }, function(response) {
            console.log('Response from content script:', response);
        });
  });

  document.getElementById('saveButton').addEventListener('click', function() {
      event.preventDefault();
      const redFlagsBuying = ["inmueble sin posesión", "ocupad", "okupad", "arrendado a tercero", "renta antigua", "alquilad", "despacho/estudio", "despacho", "oficina", "nuda", "procedimiento judicial", "no tiene hecha división horizontal", "contrato hasta"];
      const redFlagsRenting = ["temporal", "temporada", "alquiler por meses", "alquiler mensual", "contratos por meses", "contrato por meses", "11 meses", "disponible hasta"];

      const buyRentValue = buyRentToggle.checked;
      if (buyRentValue) {
          localStorage.setItem('redFlags', redFlagsRenting);
      } else {
          localStorage.setItem('redFlags', redFlagsBuying);
      }
      const redFlagsValue = localStorage.getItem('redFlags');
      redFlagsInput.value = redFlagsValue;
  });
});