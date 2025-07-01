
const scriptURL = 'https://script.google.com/macros/s/AKfycbzsQcgLp6fcWM4Z2btrCaepz8JaUOVjCZxpsZuGdn4tFm2L2fDs-vcvD8DGsxeuzurhEg/exec';

async function fetchRecords() {
  const res = await fetch(scriptURL);
  const data = await res.json();
  window.originalData = data;
  displayRecords(data);
}

function displayRecords(data) {
  const tbody = document.getElementById('recordTableBody');
  tbody.innerHTML = '';
  data.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>{{row.name}}</td>
      <td>{{row.phone}}</td>
      <td>{{row.carType}}</td>
      <td>{{row.plate}}</td>
      <td>{{row.service}}</td>
      <td>{{row.date}}</td>
      <td>{{row.time}}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteRecord({{index}})">刪除</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function sortByTime() {
  const sorted = [...window.originalData].sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
  displayRecords(sorted);
}

function searchRecords() {
  const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
  const filtered = window.originalData.filter(row =>
    row.name.toLowerCase().includes(keyword) ||
    row.phone.toLowerCase().includes(keyword) ||
    row.plate.toLowerCase().includes(keyword)
  );
  displayRecords(filtered);
}

document.getElementById('searchInput').addEventListener('input', searchRecords);

async function deleteRecord(index) {
  const row = window.originalData[index];
  if (!confirm(`確定要刪除 ${row.name} 的預約嗎？`)) return;

  const formData = new FormData();
  formData.append('action', 'delete');
  formData.append('timestamp', row.timestamp);

  try {
    const res = await fetch(scriptURL, { method: 'POST', body: formData });
    const result = await res.json();
    if (result.success) {
      alert('刪除成功');
      fetchRecords();
    } else {
      alert('刪除失敗');
    }
  } catch (err) {
    alert('刪除失敗：' + err.message);
  }
}

fetchRecords();
