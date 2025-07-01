document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    carModel: document.getElementById('carModel').value,
    license: document.getElementById('license').value,
    service: document.getElementById('service').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value
  };
  fetch("https://script.google.com/macros/s/AKfycbw5Su_3xvgWLTq9BQrGp1IBSJbjNYipiFywutYi9fXa2v-R1DOoOBmCv0sSRxJ-c3Gq/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(res => {
    if(res === "Success") {
      document.getElementById('successMessage').style.display = 'block';
      document.getElementById('bookingForm').reset();
    } else {
      alert('發生錯誤，請稍後再試');
    }
  }).catch(() => {
    alert('發生錯誤，請稍後再試');
  });
});
