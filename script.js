document.getElementById('booking-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const obj = Object.fromEntries(formData.entries());

  fetch("https://script.google.com/macros/s/AKfycbzRxeSco9StkiQomTxk_6vsgB0K1Y1fPm6yQyjrpXJc-LIYt0wz0-Y08imkrpCdnW5e/exec", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(res => res.text())
  .then(text => {
    document.getElementById("success-message").style.display = "block";
    this.reset();
  })
  .catch(err => alert("發送失敗，請稍後再試"));
});
