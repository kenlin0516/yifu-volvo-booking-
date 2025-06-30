
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
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  document.getElementById('bookingForm').reset();
  document.getElementById('successMessage').style.display = 'block';
});

// 讀取 Google Sheets 資料
fetch('https://script.google.com/macros/s/AKfycby8zTiH1b-VrxaabEvXDmsfJ3uy0lepdW3yVGyVk5nRiG1KXIkwhJh4HMLVIqiP2Jeurg/exec')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('list');
    list.innerHTML = '';
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.date} ${item.time} - ${item.name}（${item.phone}）${item.service}`;
      list.appendChild(li);
    });
  });
