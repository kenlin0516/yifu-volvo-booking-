
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    carType: document.getElementById("carType").value,
    plate: document.getElementById("plate").value,
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
  };

  fetch("https://script.google.com/macros/s/AKfycbzRxeSco9StkiQomTxk_6vsgB0K1Y1fPm6yQyjrpXJc-LIYt0wz0-Y08imkrpCdnW5e/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(() => {
    alert("預約成功！");
    document.getElementById("bookingForm").reset();
  }).catch(() => {
    alert("發送失敗，請稍後再試！");
  });
});
