document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch("https://script.google.com/macros/s/AKfycbxkZiQ72rHKzcsxM-MkJulHmHMAmrwecFYISwi9FS5_tbo4_6gVgKHfHTu5OyuH7S46/exec", {
      method: "POST",
      body: new URLSearchParams(data),
    })
      .then(res => res.text())
      .then(response => {
        alert("✅ 預約已送出成功！");
        form.reset();
      })
      .catch(err => {
        alert("❌ 發生錯誤，請稍後再試。");
        console.error(err);
      });
  });
});
