
const sheetUrl = "https://script.google.com/macros/s/AKfycbzsQcgLp6fcWM4Z2btrCaepz8JaUOVjCZxpsZuGdn4tFm2L2fDs-vcvD8DGsxeuzurhEg/exec";
let originalData = [];

window.onload = fetchData;

function fetchData() {
  fetch(sheetUrl)
    .then(res => res.json())
    .then(data => {
      originalData = data.records;
      renderTable(data.records);
    });
}

function renderTable(data) {
  const tbody = document.querySelector("#recordTable tbody");
  tbody.innerHTML = "";
  data.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.phone}</td>
      <td>${row.model}</td>
      <td>${row.plate}</td>
      <td>${row.service}</td>
      <td>${row.date}</td>
      <td>${row.time}</td>
      <td><button onclick="deleteRow('${row.timestamp}')">刪除</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteRow(timestamp) {
  fetch(sheetUrl, {
    method: "POST",
    body: JSON.stringify({ action: "delete", timestamp }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(() => fetchData());
}

function sortByTime() {
  const sorted = [...originalData].sort((a, b) => {
    const aTime = new Date(`${a.date} ${a.time}`);
    const bTime = new Date(`${b.date} ${b.time}`);
    return aTime - bTime;
  });
  renderTable(sorted);
}

document.getElementById("searchInput").addEventListener("input", function() {
  const keyword = this.value.trim().toLowerCase();
  const filtered = originalData.filter(row =>
    row.name.toLowerCase().includes(keyword) ||
    row.phone.toLowerCase().includes(keyword) ||
    row.plate.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});
