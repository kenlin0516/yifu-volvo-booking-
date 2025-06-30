
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

  fetch('https://script.google.com/macros/s/AKfycby8zTiH1b-VrxaabEvXDmsfJ3uy0lepdW3yVGyVk5nRiG1KXIkwhJh4HMLVIqiP2Jeurg/exec', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    document.getElementById('successMessage').style.display = 'block';
    const listItem = document.createElement('li');
    listItem.textContent = `🧰 ${data.service} | 🚗 ${data.carModel}（${data.license}） | 📅 ${data.date} ${data.time} | 👤 ${data.name} 📞 ${data.phone}`;
    document.getElementById('list').appendChild(listItem);
    document.getElementById('bookingForm').reset();
  })
  .catch(err => alert('預約失敗，請稍後再試'));
});
