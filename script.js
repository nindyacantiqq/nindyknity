const products = [
  {id:1,name:"Mellow Cardigan",type:"cardigan",price:189000,image:"https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=700&q=85",tag:"NEW"},
  {id:2,name:"Cloud Knit",type:"sweater",price:229000,image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85",tag:"BEST"},
  {id:3,name:"Sage Knit Vest",type:"vest",price:169000,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85",tag:"NEW"},
  {id:4,name:"Creamy Knit Set",type:"set",price:279000,image:"https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=700&q=85",tag:"20% OFF"},
  {id:5,name:"Rose Daily Knit",type:"sweater",price:199000,image:"https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=700&q=85",tag:""},
  {id:6,name:"Softline Cardigan",type:"cardigan",price:219000,image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85",tag:"BEST"},
  {id:7,name:"Oat Knit Vest",type:"vest",price:179000,image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85",tag:""},
  {id:8,name:"Weekend Knit Set",type:"set",price:299000,image:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=85",tag:"NEW"}
];

const translations = {
  id:{
    "nav.home":"Home","nav.shop":"Shop","nav.promo":"Promo","nav.about":"About","nav.contact":"Contact",
    "hero.eyebrow":"SOFT • SIMPLE • YOURS","hero.title":"Knitwear that<br><em>feels like you.</em>",
    "hero.text":"Knitwear minimalis dengan warna lembut untuk menemani hari-harimu.","hero.cta":"Shop Collection →","hero.more":"Explore KStudio","hero.note":"Designed for everyday moments",
    "shop.eyebrow":"THE EDIT","shop.title":"Knitwear you’ll want<br>to live in.","shop.desc":"Potongan clean, tekstur cozy, dan palet pastel yang gampang dipadukan.",
    "cat.all":"All","cat.cardigan":"Cardigan","cat.sweater":"Sweater","cat.vest":"Knit Vest","cat.set":"Knit Set",
    "promo.title":"Soft days,<br>special prices.","promo.text":"Dapatkan diskon hingga 20% untuk koleksi pilihan minggu ini.","promo.cta":"Shop Promo →",
    "about.eyebrow":"OUR STORY","about.title":"Less noise.<br>More <em>you.</em>","about.text":"KStudio hadir untuk membuat knitwear yang terasa effortless. Kami percaya pakaian yang bagus tidak harus ramai—cukup nyaman, timeless, dan punya karakter.",
    "about.v1":"Soft & comfy","about.v2":"Easy to style","about.v3":"Made for everyday",
    "newsletter.title":"Get the soft updates.","newsletter.text":"Promo, new drops, dan cerita KStudio langsung ke inbox kamu.","newsletter.button":"Subscribe",
    "footer.tag":"Soft knitwear for your everyday story.","cart.title":"Your Bag","cart.total":"Total","cart.checkout":"Checkout via WhatsApp",
    "search.placeholder":"Cari knitwear favoritmu..."
  },
  en:{
    "nav.home":"Home","nav.shop":"Shop","nav.promo":"Promo","nav.about":"About","nav.contact":"Contact",
    "hero.eyebrow":"SOFT • SIMPLE • YOURS","hero.title":"Knitwear that<br><em>feels like you.</em>",
    "hero.text":"Minimal knitwear in soft tones, made to accompany your everyday moments.","hero.cta":"Shop Collection →","hero.more":"Explore KStudio","hero.note":"Designed for everyday moments",
    "shop.eyebrow":"THE EDIT","shop.title":"Knitwear you’ll want<br>to live in.","shop.desc":"Clean silhouettes, cozy textures, and pastel tones that are easy to style.",
    "cat.all":"All","cat.cardigan":"Cardigan","cat.sweater":"Sweater","cat.vest":"Knit Vest","cat.set":"Knit Set",
    "promo.title":"Soft days,<br>special prices.","promo.text":"Enjoy up to 20% off selected pieces this week.","promo.cta":"Shop Promo →",
    "about.eyebrow":"OUR STORY","about.title":"Less noise.<br>More <em>you.</em>","about.text":"KStudio creates effortless knitwear for everyday life. We believe great clothing doesn’t need to be loud—just comfortable, timeless, and full of character.",
    "about.v1":"Soft & comfy","about.v2":"Easy to style","about.v3":"Made for everyday",
    "newsletter.title":"Get the soft updates.","newsletter.text":"Promos, new drops, and KStudio stories straight to your inbox.","newsletter.button":"Subscribe",
    "footer.tag":"Soft knitwear for your everyday story.","cart.title":"Your Bag","cart.total":"Total","cart.checkout":"Checkout via WhatsApp",
    "search.placeholder":"Search your favorite knitwear..."
  }
};

let currentLang = "id";
let currentSlide = 0;
let cart = JSON.parse(localStorage.getItem("kstudio-cart") || "[]");

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

function money(n){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n).replace("Rp","Rp ")}
function renderProducts(filter="all"){
  const list = filter==="all" ? products : products.filter(p=>p.type===filter);
  productGrid.innerHTML = list.map(p=>`
    <article class="product-card" data-name="${p.name.toLowerCase()}">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.tag?`<span class="product-tag">${p.tag}</span>`:""}
        <button class="add-cart" data-add="${p.id}" aria-label="Add ${p.name}">+</button>
      </div>
      <div class="product-info">
        <div><div class="product-name">${p.name}</div><div class="product-type">${p.type}</div></div>
        <div class="price">${money(p.price)}</div>
      </div>
    </article>`).join("");
}
function updateCart(){
  cartCount.textContent=cart.reduce((s,i)=>s+i.qty,0);
  localStorage.setItem("kstudio-cart",JSON.stringify(cart));
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(i=>`
    <div class="cart-item">
      <img src="${i.image}" alt="${i.name}">
      <div><h4>${i.name}</h4><p>${money(i.price)}</p>
      <div class="qty"><button data-dec="${i.id}">−</button><span>${i.qty}</span><button data-inc="${i.id}">+</button></div></div>
      <button class="remove" data-remove="${i.id}">×</button>
    </div>`).join(""):`<div class="cart-empty">Your bag is still empty ✦</div>`;
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0));
}
function addToCart(id){
  const p=products.find(x=>x.id===id); const item=cart.find(x=>x.id===id);
  item?item.qty++:cart.push({...p,qty:1}); updateCart(); showToast(`${p.name} added to bag`);
}
function showToast(t){toast.textContent=t;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800)}
function openCart(){cartDrawer.classList.add("open");overlay.classList.add("show")}
function closeCart(){cartDrawer.classList.remove("open");overlay.classList.remove("show")}

document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]"); if(add){addToCart(+add.dataset.add);return}
  const inc=e.target.closest("[data-inc]"); if(inc){const i=cart.find(x=>x.id===+inc.dataset.inc);i.qty++;updateCart();return}
  const dec=e.target.closest("[data-dec]"); if(dec){const i=cart.find(x=>x.id===+dec.dataset.dec);i.qty--;if(i.qty<=0)cart=cart.filter(x=>x.id!==i.id);updateCart();return}
  const rem=e.target.closest("[data-remove]"); if(rem){cart=cart.filter(x=>x.id!==+rem.dataset.remove);updateCart();return}
});

document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderProducts(btn.dataset.filter)
}));

document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
overlay.onclick=closeCart;

document.getElementById("checkoutBtn").onclick=()=>{
  if(!cart.length){showToast("Your bag is empty");return}
  const items=cart.map(i=>`${i.name} x${i.qty}`).join(", ");
  const text=`Halo kak aku mau pesan baju ${items} ya.`;
  window.open(`https://wa.me/6285219577704?text=${encodeURIComponent(text)}`,"_blank");
};

document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchPanel").classList.toggle("show");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchPanel").classList.remove("show");
document.getElementById("searchInput").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase().trim();
  document.querySelectorAll(".product-card").forEach(c=>c.style.display=c.dataset.name.includes(q)?"":"none");
});

document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));

function showSlide(n){
  const slides=document.querySelectorAll(".slide"),dots=document.querySelectorAll(".dot");
  currentSlide=(n+slides.length)%slides.length;
  slides.forEach((s,i)=>s.classList.toggle("active",i===currentSlide));
  dots.forEach((d,i)=>d.classList.toggle("active",i===currentSlide));
}
document.getElementById("prevSlide").onclick=()=>showSlide(currentSlide-1);
document.getElementById("nextSlide").onclick=()=>showSlide(currentSlide+1);
const dots=document.getElementById("dots");
dots.innerHTML=[0,1,2,3,4].map(i=>`<button class="dot ${i===0?"active":""}" data-slide="${i}"></button>`).join("");
dots.addEventListener("click",e=>{if(e.target.dataset.slide)showSlide(+e.target.dataset.slide)});
setInterval(()=>showSlide(currentSlide+1),5000);

function setLanguage(lang){
  currentLang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n;if(translations[lang][key])el.innerHTML=translations[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const key=el.dataset.i18nPlaceholder;if(translations[lang][key])el.placeholder=translations[lang][key];
  });
  document.querySelectorAll(".lang-btn").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  document.documentElement.lang=lang;
}
document.querySelectorAll(".lang-btn").forEach(b=>b.onclick=()=>setLanguage(b.dataset.lang));
document.getElementById("newsletterForm").onsubmit=e=>{e.preventDefault();showToast(currentLang==="id"?"Terima kasih! ✦":"Thank you! ✦");e.target.reset()};

renderProducts();updateCart();
