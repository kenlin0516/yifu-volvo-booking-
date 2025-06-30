document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const carModel = document.getElementById('carModel').value;
  const license = document.getElementById('license').value;
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const listItem = document.createElement('li');
  listItem.textContent = `🧰 ${service} | 🚗 ${carModel}（${license}） | 📅 ${date} ${time} | 👤 ${name} 📞 ${phone}`;
  document.getElementById('list').appendChild(listItem);
  document.getElementById('successMessage').style.display = 'block';
  document.getElementById('bookingForm').reset();
});
