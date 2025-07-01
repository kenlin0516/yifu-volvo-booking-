function login(event) {
  event.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === 'admin' && pass === '1234') {
    window.location.href = 'admin.html';
  } else {
    document.getElementById('error').innerText = '帳號或密碼錯誤';
  }
}
