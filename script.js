
const scriptURL = "https://script.google.com/macros/s/AKfycby8zTiH1b-VrxaabEvXDmsfJ3uy0lepdW3yVGyVk5nRiG1KXIkwhJh4HMLVIqiP2Jeurg/exec";

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    carModel: document.getElementById("carModel").value,
    license: document.getElementById("license").value,
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value
  };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    document.getElementById("successMessage").style.display = "block";
    loadAppointments();
    document.getElementById("bookingForm").reset();
  })
  .catch(error => alert("送出失敗！請稍後再試。"));
});

function loadAppointments() {
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      list.innerHTML = "";
      data.reverse().forEach(row => {
        const li = document.createElement("li");
        li.textContent = `🧑‍🔧 ${row.name}／📞 ${row.phone}／🚗 ${row.carModel}（${row.license}） - ${row.service}（${row.date} ${row.time}）`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("無法載入預約資料", err);
    });
}

// 自動載入一次
loadAppointments();
