const slides=[
'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=80'
];
const products=[
{id:1,name:'Mellow Cardigan',type:'cardigan',price:189000,img:slides[4],tag:'NEW'},
{id:2,name:'Cloud Knit',type:'sweater',price:229000,img:slides[1],tag:'BEST'},
{id:3,name:'Sage Knit Vest',type:'vest',price:169000,img:slides[0],tag:'NEW'},
{id:4,name:'Creamy Knit Set',type:'set',price:279000,img:slides[2],tag:'20% OFF'},
{id:5,name:'Rose Daily Knit',type:'sweater',price:199000,img:slides[3],tag:''},
{id:6,name:'Softline Cardigan',type:'cardigan',price:219000,img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80',tag:'BEST'},
{id:7,name:'Oat Knit Vest',type:'vest',price:179000,img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80',tag:''},
{id:8,name:'Weekend Knit Set',type:'set',price:299000,img:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=80',tag:'NEW'}
];
let slide=0,cart=JSON.parse(localStorage.getItem('kstudioCart')||'[]');
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const rupiah=n=>'Rp '+n.toLocaleString('id-ID');
function renderSlider(){ $('#slider').innerHTML=slides.map((s,i)=>`<div class="slide ${i===0?'active':''}"><img src="${s}" alt="Knitwear ${i+1}"><span class="slide-no">${String(i+1).padStart(2,'0')} / 05</span></div>`).join('');$('#dots').innerHTML=slides.map((_,i)=>`<button class="dot ${i===0?'active':''}" data-slide="${i}"></button>`).join('');}
function showSlide(n){slide=(n+slides.length)%slides.length;$$('.slide').forEach((x,i)=>x.classList.toggle('active',i===slide));$$('.dot').forEach((x,i)=>x.classList.toggle('active',i===slide))}
function renderProducts(filter='all',query=''){let list=products.filter(p=>(filter==='all'||p.type===filter)&&p.name.toLowerCase().includes(query.toLowerCase()));$('#products').innerHTML=list.map(p=>`<article class="product" data-name="${p.name.toLowerCase()}"><div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy">${p.tag?`<span class="tag">${p.tag}</span>`:''}<button class="add" data-add="${p.id}">+</button></div><div class="info"><div><strong>${p.name}</strong><div class="type">${p.type}</div></div><span class="price">${rupiah(p.price)}</span></div></article>`).join('')||'<p style="color:#999">Produk tidak ditemukan.</p>'}
function renderCart(){let count=cart.reduce((a,x)=>a+x.qty,0),total=cart.reduce((a,x)=>a+x.price*x.qty,0);$('#cartCount').textContent=count;$('#total').textContent=rupiah(total);$('#cartItems').className='cart-list';$('#cartItems').innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><img src="${x.img}" alt="${x.name}"><div><h4>${x.name}</h4><p>${rupiah(x.price)}</p><div class="qty"><button data-dec="${x.id}">−</button><span>${x.qty}</span><button data-inc="${x.id}">+</button></div></div><button class="remove" data-remove="${x.id}">×</button></div>`).join(''):'<div class="empty">Your bag is still empty ✦</div>';localStorage.setItem('kstudioCart',JSON.stringify(cart))}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),1600)}
function openCart(){$('#drawer').classList.add('open');$('#overlay').classList.add('show')}function closeCart(){$('#drawer').classList.remove('open');$('#overlay').classList.remove('show')}
document.addEventListener('click',e=>{
 if(e.target.matches('[data-add]')){let p=products.find(x=>x.id===+e.target.dataset.add),i=cart.find(x=>x.id===p.id);i?i.qty++:cart.push({...p,qty:1});renderCart();toast(p.name+' added to bag');}
 if(e.target.matches('[data-inc]')){cart.find(x=>x.id===+e.target.dataset.inc).qty++;renderCart()}
 if(e.target.matches('[data-dec]')){let i=cart.find(x=>x.id===+e.target.dataset.dec);i.qty--;if(i.qty<1)cart=cart.filter(x=>x.id!==i.id);renderCart()}
 if(e.target.matches('[data-remove]')){cart=cart.filter(x=>x.id!==+e.target.dataset.remove);renderCart()}
 if(e.target.matches('[data-slide]'))showSlide(+e.target.dataset.slide)
});
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter,$('#searchInput').value)});
$('#prev').onclick=()=>showSlide(slide-1);$('#next').onclick=()=>showSlide(slide+1);setInterval(()=>showSlide(slide+1),5000);
$('#cartBtn').onclick=openCart;$('#closeCart').onclick=closeCart;$('#overlay').onclick=closeCart;
$('#checkout').onclick=()=>{if(!cart.length)return toast('Keranjang masih kosong');let text='Halo kak aku mau pesan baju '+cart.map(x=>x.name+' '+x.qty+' pack').join(', ')+' ya';window.open('https://wa.me/6285219577704?text='+encodeURIComponent(text),'_blank')};
$('#searchBtn').onclick=()=>{$('#searchPanel').classList.toggle('show');$('#searchInput').focus()};$('#closeSearch').onclick=()=>$('#searchPanel').classList.remove('show');$('#searchInput').oninput=e=>renderProducts($('.filter.active').dataset.filter,e.target.value);
$('#menuBtn').onclick=()=>$('#nav').classList.toggle('open');$$('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
$$('.lang').forEach(b=>b.onclick=()=>{let en=b.dataset.lang==='en';$$('.lang').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('[data-lang-text]').forEach(x=>x.textContent=x.dataset[en?'en':'id'])});
$('#newsletter').onsubmit=e=>{e.preventDefault();toast('Terima kasih! ✦');e.target.reset()};
renderSlider();renderProducts();renderCart();
