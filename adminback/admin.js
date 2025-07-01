const BASE = location.href.split('?')[0];
let order='asc';

async function loadData(){
  const term=document.getElementById('search').value.trim();
  const params=new URLSearchParams({json:'true',sortOrder:order});
  if(term)params.append('searchTerm',term);
  const res=await fetch(BASE+'?'+params);
  const {records}=await res.json();
  render(records);
}

function render(data){
  const t=document.getElementById('tbody');t.innerHTML='';
  data.forEach(r=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${r.name}</td><td>${r.phone}</td><td>${r.carModel}</td>
      <td>${r.plate}</td><td>${r.service}</td><td>${r.date}</td><td>${r.time}</td>
      <td><button class="btn btn-sm btn-danger" onclick="del(${r.rowNumber})">刪除</button></td>`;
    t.appendChild(tr);
  });
}

async function del(row){
  if(!confirm('確定刪除？'))return;
  const res=await fetch(BASE,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',rowNumber:row})});
  const j=await res.json();alert(j.message);loadData();
}

function toggle(){
  order=order==='asc'?'desc':'asc';
  document.getElementById('sortBtn').innerText=order==='asc'?'依時間排序 ↑':'依時間排序 ↓';
  loadData();
}

document.getElementById('search').oninput=loadData;
document.getElementById('sortBtn').onclick=toggle;
document.getElementById('logout').onclick=()=>{sessionStorage.clear();location.href='login.html';};
window.onload=loadData;