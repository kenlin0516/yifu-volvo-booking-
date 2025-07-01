const scriptURL = 'https://script.google.com/macros/s/AKfycbzsQcgLp6fcWM4Z2btrCaepz8JaUOVjCZxpsZuGdn4tFm2L2fDs-vcvD8DGsxeuzurhEg/exec';

let records = [];
const tableBody = document.querySelector('#recordsTable tbody');
const searchInput = document.getElementById('searchInput');

function fetchRecords() {
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      records = data.records;
      renderTable(records);
    });
}

function renderTable(data) {
  tableBody.innerHTML = '';
  data.forEach(record => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${record.name}</td>
      <td>${record.phone}</td>
      <td>${record.carModel}</td>
      <td>${record.plate}</td>
      <td>${record.service}</td>
      <td>${record.date}</td>
      <td>${record.time}</td>
      <td><button onclick="deleteRecord(${record.rowNumber})">刪除</button></td>
    `;
    tableBody.appendChild(tr);
  });
}

function deleteRecord(rowNumber) {
  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', rowNumber })
  })
  .then(res => res.json())
  .then(() => fetchRecords())
  .catch(error => alert('刪除失敗：' + error));
}

function sortByDate() {
  const sorted = [...records].sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
  renderTable(sorted);
}

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = records.filter(r =>
    r.name.toLowerCase().includes(keyword) ||
    r.phone.includes(keyword) ||
    r.plate.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

fetchRecords();
