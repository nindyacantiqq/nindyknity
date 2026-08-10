const slides=[
"https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
];
const products=[
{id:1,name:"Safa Gamis",type:"gamis",price:289000,img:slides[0],tag:"NEW"},
{id:2,name:"Alya Pashmina",type:"hijab",price:79000,img:slides[1],tag:"BEST"},
{id:3,name:"Noura Tunik",type:"tunik",price:199000,img:slides[2],tag:"NEW"},
{id:4,name:"Maira Set",type:"set",price:329000,img:slides[3],tag:"20% OFF"},
{id:5,name:"Luna Gamis",type:"gamis",price:299000,img:slides[4],tag:""},
{id:6,name:"Cloud Pashmina",type:"hijab",price:89000,img:slides[0],tag:"BEST"},
{id:7,name:"Sage Tunik",type:"tunik",price:189000,img:slides[3],tag:""},
{id:8,name:"Ayla Modest Set",type:"set",price:319000,img:slides[1],tag:"NEW"}
];
let slideIndex=0,cart=JSON.parse(localStorage.getItem("nindyknity-cart")||"[]"),currentFilter="all";
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const rupiah=n=>"Rp "+n.toLocaleString("id-ID");

function renderSlider(){
  $("#slider").innerHTML=slides.map((url,i)=>`<div class="slide ${i===0?"active":""}"><img src="${url}" alt="Koleksi NindyKnity ${i+1}"><span class="slide-no">${String(i+1).padStart(2,"0")} / 05</span></div>`).join("");
  $("#dots").innerHTML=slides.map((_,i)=>`<button class="dot ${i===0?"active":""}" data-slide="${i}"></button>`).join("");
}
function showSlide(n){
  slideIndex=(n+slides.length)%slides.length;
  $$(".slide").forEach((x,i)=>x.classList.toggle("active",i===slideIndex));
  $$(".dot").forEach((x,i)=>x.classList.toggle("active",i===slideIndex));
}
function renderProducts(){
  const q=$("#searchInput").value.trim().toLowerCase();
  const list=products.filter(p=>(currentFilter==="all"||p.type===currentFilter)&&p.name.toLowerCase().includes(q));
  $("#products").innerHTML=list.length?list.map(p=>`<article class="product"><div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy">${p.tag?`<span class="tag">${p.tag}</span>`:""}<button class="add" data-add="${p.id}" aria-label="Tambah ${p.name}">+</button></div><div class="info"><div><strong>${p.name}</strong><div class="type">${p.type}</div></div><span class="price">${rupiah(p.price)}</span></div></article>`).join(""):`<p style="color:#999">Produk tidak ditemukan.</p>`;
}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  $("#cartCount").textContent=count;$("#total").textContent=rupiah(total);
  $("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><img src="${x.img}" alt="${x.name}"><div><h4>${x.name}</h4><p>${rupiah(x.price)}</p><div class="qty"><button data-dec="${x.id}">−</button><span>${x.qty}</span><button data-inc="${x.id}">+</button></div></div><button class="remove" data-remove="${x.id}">×</button></div>`).join(""):`<div class="empty">Keranjangmu masih kosong ✦</div>`;
  localStorage.setItem("nindyknity-cart",JSON.stringify(cart));
}
function showToast(msg){$("#toast").textContent=msg;$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),1700)}
function openCart(){$("#drawer").classList.add("open");$("#overlay").classList.add("show")}
function closeCart(){$("#drawer").classList.remove("open");$("#overlay").classList.remove("show")}

document.addEventListener("click",e=>{
  if(e.target.matches("[data-add]")){
    const p=products.find(x=>x.id===+e.target.dataset.add),item=cart.find(x=>x.id===p.id);
    item?item.qty++:cart.push({...p,qty:1});renderCart();showToast(p.name+" ditambahkan ✦");
  }
  if(e.target.matches("[data-inc]")){cart.find(x=>x.id===+e.target.dataset.inc).qty++;renderCart()}
  if(e.target.matches("[data-dec]")){const i=cart.find(x=>x.id===+e.target.dataset.dec);i.qty--;if(i.qty<1)cart=cart.filter(x=>x.id!==i.id);renderCart()}
  if(e.target.matches("[data-remove]")){cart=cart.filter(x=>x.id!==+e.target.dataset.remove);renderCart()}
  if(e.target.matches("[data-slide]"))showSlide(+e.target.dataset.slide);
});

$$(".filter").forEach(btn=>btn.onclick=()=>{$$(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");currentFilter=btn.dataset.filter;renderProducts()});
$("#prev").onclick=()=>showSlide(slideIndex-1);$("#next").onclick=()=>showSlide(slideIndex+1);setInterval(()=>showSlide(slideIndex+1),5000);
$("#cartBtn").onclick=openCart;$("#closeCart").onclick=closeCart;$("#overlay").onclick=closeCart;
$("#checkout").onclick=()=>{
  if(!cart.length){showToast("Keranjang masih kosong");return}
  const items=cart.map(x=>`${x.name} ${x.qty} pack`).join(", ");
  const msg=`Halo kak aku mau pesan gamis ${items} ya`;
  window.open("https://wa.me/6285219577704?text="+encodeURIComponent(msg),"_blank");
};
$("#searchBtn").onclick=()=>{$("#searchPanel").classList.toggle("show");$("#searchInput").focus()};
$("#closeSearch").onclick=()=>$("#searchPanel").classList.remove("show");
$("#searchInput").oninput=renderProducts;
$("#menuBtn").onclick=()=>$("#nav").classList.toggle("open");
$$('#nav a').forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
$$(".lang").forEach(btn=>btn.onclick=()=>{
  const lang=btn.dataset.lang;
  $$(".lang").forEach(x=>x.classList.toggle("active",x.dataset.lang===lang));
  $$("[data-id]").forEach(el=>{if(el.dataset[lang])el.innerHTML=el.dataset[lang]});
  $$("[data-id-placeholder]").forEach(el=>el.placeholder=el.dataset[lang+"Placeholder"]);
  document.documentElement.lang=lang;
});
$("#newsletter").onsubmit=e=>{e.preventDefault();showToast("Terima kasih! ✦");e.target.reset()};
renderSlider();renderProducts();renderCart();
