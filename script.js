document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = {
        name: document.getElementsByName('name')[0].value,
        phone: document.getElementsByName('phone')[0].value,
        carModel: document.getElementsByName('carModel')[0].value,
        license: document.getElementsByName('licensePlate')[0].value,
        service: document.getElementsByName('serviceItem')[0].value,
        date: document.getElementsByName('date')[0].value,
        time: document.getElementsByName('time')[0].value,
      };

      fetch('https://script.google.com/macros/s/AKfycbw5Su_3xvgWLTq9BQrGp1IB5JbjWpiFywvtY19rAk2v-R1D0OBmCvo8SRxJ-C3Gq/exec', {
        method: 'POST',
        body: JSON.stringify({ contents: JSON.stringify(data) }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.text())
        .then(res => {
          if (res === 'Success') {
            document.getElementById('successMessage').style.display = 'block';
            form.reset();
          } else {
            alert('發生錯誤，請稍後再試～');
          }
        });
    });
  }

  // 清除網址參數
  if (window.location.search) {
    const url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, document.title, url.toString());
  }
});