const products=[
{id:1,name:"Cloud Knit Cardigan",cat:"knit",price:189000,img:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=85",tag:"NEW"},
{id:2,name:"Blush Everyday Top",cat:"tops",price:159000,img:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=85",tag:"NEW"},
{id:3,name:"Blue Hour Dress",cat:"dress",price:229000,img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85",tag:"BEST"},
{id:4,name:"Cream Soft Knit",cat:"knit",price:199000,img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85",tag:"HOT"},
{id:5,name:"Pastel Weekend Set",cat:"tops",price:249000,img:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=700&q=85",tag:"NEW"},
{id:6,name:"Rosy Mini Dress",cat:"dress",price:219000,img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85",tag:""},
{id:7,name:"Sky Knit Vest",cat:"knit",price:179000,img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85",tag:""},
{id:8,name:"Daily Layer Top",cat:"tops",price:149000,img:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=85",tag:""}];
let cart=JSON.parse(localStorage.getItem("kstudioCart")||"[]"),filter="all";
const money=n=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
function card(p){return `<article class="product"><div class="product-img"><img loading="lazy" src="${p.img}" alt="${p.name}">${p.tag?`<span class="tag">${p.tag}</span>`:""}<button class="heart" onclick="fav(this)">♡</button></div><div class="info"><h3>${p.name}</h3><p>${p.cat.toUpperCase()}</p><p class="price">${money(p.price)}</p><button class="add" onclick="add(${p.id})">+ Add to bag</button></div></article>`}
function render(){newProducts.innerHTML=products.slice(0,4).map(card).join("");shopProducts.innerHTML=products.filter(p=>filter==="all"||p.cat===filter).map(card).join("");renderCart()}
function add(id){const p=products.find(x=>x.id===id),x=cart.find(x=>x.id===id);x?x.qty++:cart.push({id,qty:1});save();toast(p.name+" added to your bag")}
function save(){localStorage.setItem("kstudioCart",JSON.stringify(cart));renderCart()}
function renderCart(){let total=0,count=0;cartItems.innerHTML=cart.length?cart.map(x=>{let p=products.find(p=>p.id===x.id);total+=p.price*x.qty;count+=x.qty;return `<div class="row"><img src="${p.img}"><div><strong>${p.name}</strong><small>${x.qty} × ${money(p.price)}</small></div><button class="remove" onclick="removeItem(${p.id})">×</button></div>`}).join(""):'<div style="padding:50px 0;text-align:center;color:#999">Your bag is empty ♡</div>';cartCount.textContent=count;subtotal.textContent=money(total)}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save()}
function toast(t){toastEl.textContent=t;toastEl.classList.add("show");setTimeout(()=>toastEl.classList.remove("show"),2200)}
function fav(b){b.textContent=b.textContent==="♡"?"♥":"♡"}
const toastEl=document.getElementById("toast");
cartBtn.onclick=()=>{cartPanel.classList.add("open");overlay.classList.add("show")};closeCart.onclick=()=>{cartPanel.classList.remove("open");overlay.classList.remove("show")};overlay.onclick=closeCart.onclick;
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;render()});
searchBtn.onclick=()=>{searchPanel.classList.add("open");searchInput.focus()};closeSearch.onclick=()=>searchPanel.classList.remove("open");
searchInput.oninput=e=>{let q=e.target.value.toLowerCase();results.innerHTML=products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q)).map(p=>`<div class="result" onclick="add(${p.id})"><strong>${p.name}</strong> — ${money(p.price)}</div>`).join("")};
promoBtn.onclick=async()=>{await navigator.clipboard?.writeText("PASTEL15");toast("Promo code PASTEL15 copied!")};
checkout.onclick=()=>{if(!cart.length)return toast("Your bag is empty");let t="Halo kak aku mau pesan baju ";cart.forEach(x=>{let p=products.find(p=>p.id===x.id);t+=p.name+" "+x.qty+" ya, "});location.href="https://wa.me/6285219577704?text="+encodeURIComponent(t)};
newsletter.onsubmit=e=>{e.preventDefault();toast("Thank you for joining KStudio ♡");e.target.reset()};
const translations={id:"Fashion kekinian dengan warna pastel, potongan nyaman, dan detail yang bikin outfit kamu terasa lebih kamu.",en:"Modern fashion in pastel colors, easy silhouettes and little details made to feel like you."};
language.onchange=e=>document.querySelector('[data-id="heroText"]').textContent=translations[e.target.value];
window.addEventListener("load",()=>setTimeout(()=>loader.style.opacity=0,500));setTimeout(()=>loader.remove(),1300);render();