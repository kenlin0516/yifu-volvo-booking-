const scriptURL = "https://script.google.com/macros/s/AKfycbzRxeSco9StkiQomTxk_6vsgB0K1Y1fPm6yQyjrpXJc-LIYt0wz0-Y08imkrpCdnW5e/exec";

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = {
    "姓名": document.getElementById("姓名").value,
    "電話": document.getElementById("電話").value,
    "車種": document.getElementById("車種").value,
    "車牌": document.getElementById("車牌").value,
    "項目": document.getElementById("項目").value,
    "日期": document.getElementById("日期").value,
    "時間": document.getElementById("時間").value
  };
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(() => {
    document.getElementById('successMsg').style.display = 'block';
    document.getElementById("bookingForm").reset();
    loadAppointments();
  })
  .catch(() => alert('送出失敗，請稍後再試！'));
});

function loadAppointments() {
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      list.innerHTML = "";
      data.reverse().forEach(row => {
        const li = document.createElement("li");
        li.textContent = `🧑‍🔧${row.姓名}／📞${row.電話}／🚗${row.車種}（${row.車牌}） - ${row.項目}（${row.日期} ${row.時間}）`;
        list.appendChild(li);
      });
    })
    .catch(err => console.error("無法載入預約資料", err));
}
loadAppointments();