
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("adminAuth") !== "true") {
    alert("請先登入");
    window.location.href = "login.html";
    return;
  }

  const sheetURL = "https://script.google.com/macros/s/AKfycbwhXAjx2AReraUx8ztJbik4018zdwXURd8TsxOowZmtzd2LtsEcJhxhV8utLjFwoBnl6g/exec";

  fetch(sheetURL)
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.querySelector("#records-table tbody");
      data.reverse().forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.phone}</td>
          <td>${item.car}</td>
          <td>${item.plate}</td>
          <td>${item.service}</td>
          <td>${item.date}</td>
          <td>${item.time}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("資料載入錯誤：", error);
    });
});
