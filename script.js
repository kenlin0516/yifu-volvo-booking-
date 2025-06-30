document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    fetch("https://script.google.com/macros/s/AKfycbzRxeSco9StkiQomTxk_6vsgB0K1Y1t9Wz0-Y98imrpCdnl5e/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(), // 👈 這裡一定要轉成 string
    })
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.text(); // 👈 確保回傳為純文字
      })
      .then(response => {
        alert("✅ 預約已送出成功！");
        form.reset();
      })
      .catch(err => {
        alert("❌ 發生錯誤，請稍後再試。");
        console.error("Fetch error:", err);
      });
  });
});
