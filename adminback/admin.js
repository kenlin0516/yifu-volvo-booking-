const base = location.href.split('?')[0];
let currentSort = 'asc';

// 取得並顯示紀錄
async function fetchRecords() {
  const term = document.getElementById('searchInput').value.trim();
  const params = new URLSearchParams({ json: 'true', sortOrder: currentSort });
  if (term) params.append('searchTerm', term);
  const res = await fetch(base + '?' + params);
  const { records } = await res.json();
  displayRecords(records);
}

// 渲染表格
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
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', rowNumber })
  });
  const r = await res.json();
  alert(r.message);
  fetchRecords();
}

// 排序切換
function toggleSort() {
  currentSort = currentSort === 'asc' ? 'desc' : 'asc';
  document.getElementById('sortButton').innerText = currentSort === 'asc' ? '依時間排序 ↑' : '依時間排序 ↓';
  fetchRecords();
}

// 登出
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  window.location.href = '?';
});

// 綁定事件 & 初始載入
window.onload = () => {
  document.getElementById('searchInput').addEventListener('input', fetchRecords);
  document.getElementById('sortButton').addEventListener('click', toggleSort);
  fetchRecords();
};