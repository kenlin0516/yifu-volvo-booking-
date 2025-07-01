const scriptURL = 'https://script.google.com/macros/s/AKfycbzsQcgLp6fcWM4Z2btrCaepz8JaUOVjCZxpsZuGdn4tFm2L2fDs-vcvD8DGsxeuzurhEg/exec';
let currentSort = 'asc';

// 取得並更新紀錄
async function fetchRecords() {
  const searchTerm = document.getElementById('searchInput').value.trim();
  const params = new URLSearchParams();
  if (searchTerm) params.append('searchTerm', searchTerm);
  if (currentSort) params.append('sortOrder', currentSort);
  const url = scriptURL + (params.toString() ? '?' + params.toString() : '');

  try {
    const res = await fetch(url);
    const json = await res.json();
    displayRecords(json.records);
  } catch (err) {
    console.error('讀取失敗', err);
  }
}

// 顯示資料表
function displayRecords(data) {
  const tbody = document.getElementById('recordTableBody');
  tbody.innerHTML = '';
  data.forEach(rec => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${rec.name}</td>
      <td>${rec.phone}</td>
      <td>${rec.carModel}</td>
      <td>${rec.plate}</td>
      <td>${rec.service}</td>
      <td>${rec.date}</td>
      <td>${rec.time}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteRecord(${rec.rowNumber})">刪除</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// 刪除功能
async function deleteRecord(rowNumber) {
  if (!confirm('確定要刪除這筆紀錄嗎？')) return;
  try {
    const res = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', rowNumber })
    });
    const result = await res.json();
    if (result.status === 'success') {
      alert('刪除成功');
      fetchRecords();
    } else {
      alert('刪除失敗：' + result.message);
    }
  } catch (err) {
    alert('刪除失敗：' + err.message);
  }
}

// 排序切換
function toggleSort() {
  currentSort = currentSort === 'asc' ? 'desc' : 'asc';
  document.getElementById('sortButton').innerText = currentSort === 'asc' ? '依時間排序 ↑' : '依時間排序 ↓';
  fetchRecords();
}

// 綁定事件
document.getElementById('searchInput').addEventListener('input', fetchRecords);
document.getElementById('sortButton').addEventListener('click', toggleSort);

// 初始載入
window.onload = fetchRecords;