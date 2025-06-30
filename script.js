
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    fetch("https://script.google.com/macros/s/AKfycbxBmvH_1T1nRRvSvXyx30CyLsvKEBpDn5SNa5HpNgCWmB8Nn2JGGoMKqm5RuS2wM7uW/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
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
