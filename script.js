const API = "https://script.google.com/macros/s/AKfycbzRxeSco9StkiQomTxk_6vsgB0K1Y1fPm6yQyjrpXJc-LIYt0wz0-Y08imkrpCdnW5e/exec";
document.getElementById("bookingForm").addEventListener("submit", e => {
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
  fetch(API, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
  .then(() => {document.getElementById("successMsg").style.display="block";document.getElementById("bookingForm").reset();load();})
  .catch(() => alert("送出失敗，請稍後再試！"));
});
function load(){
  fetch(API).then(r=>r.json()).then(data=>{
    const ul = document.getElementById("list"); ul.innerHTML="";
    data.reverse().forEach(r=>{const li=document.createElement("li");li.textContent=`🧑‍🔧${r.姓名}／📞${r.電話}／🚗${r.車種}（${r.車牌}） ${r.項目} ${r.日期} ${r.時間}`;ul.appendChild(li);});
  }).catch(console.error);
}
load();