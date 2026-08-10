const translations = {
  id: {
    topbar:"FREE SHIPPING · NEW DROP IS HERE ✦", navShop:"Shop", navNew:"New In", navPromo:"Promo", navAbout:"About", navContact:"Contact",
    heroEyebrow:"KSTUDIO / NEW SEASON", heroTitle:"Wear your<br><em>soft side.</em>",
    heroText:"Fashion kekinian dengan warna pastel, siluet effortless, dan pieces yang gampang dipadukan untuk everyday look kamu.",
    shopNow:"Shop now ↗", discover:"Discover KStudio", shopEyebrow:"SHOP THE EDIT", shopTitle:"Pieces you'll<br><em>keep reaching for.</em>", viewAll:"View all ↗",
    newTag:"NEW", addBag:"+ Add to bag", promoEyebrow:"KSTUDIO SPECIAL", promoTitle:"Soft sale,<br><em>sweet deal.</em>",
    promoText:"Get 15% off your first order. Because you deserve a little something new.", shopPromo:"Shop promo ↗",
    aboutEyebrow:"ABOUT KSTUDIO", aboutTitle:"Not just clothes.<br><em>It's a mood.</em>",
    aboutText1:"KStudio hadir untuk kamu yang suka tampil stylish tanpa terasa terlalu effort. Kami menggabungkan warna pastel, potongan modern, dan detail playful dalam koleksi yang nyaman dipakai sehari-hari.",
    aboutText2:"Simple enough for every day. Special enough to feel like you.", readStory:"Read our story ↗",
    feature1Title:"Curated styles",feature1Text:"Pieces yang dipilih untuk wardrobe modern.",
    feature2Title:"Pastel palette",feature2Text:"Soft colors yang mudah dipadukan.",
    feature3Title:"Easy shopping",feature3Text:"Order cepat langsung lewat WhatsApp.",
    contactEyebrow:"LET'S TALK",contactTitle:"Need help choosing<br><em>your next look?</em>",
    contactText:"Chat dengan KStudio untuk tanya ukuran, warna, stok, atau rekomendasi outfit.",
    footerText:"Contemporary fashion, soft pastel mood.",footerExplore:"Explore",footerHelp:"Help",
    searchEyebrow:"SEARCH KSTUDIO",searchPlaceholder:"Search cardigan, blouse...",chatUs:"Chat us"
  },
  en: {
    topbar:"FREE SHIPPING · NEW DROP IS HERE ✦", navShop:"Shop", navNew:"New In", navPromo:"Promo", navAbout:"About", navContact:"Contact",
    heroEyebrow:"KSTUDIO / NEW SEASON", heroTitle:"Wear your<br><em>soft side.</em>",
    heroText:"Contemporary fashion in soft pastel tones, effortless silhouettes, and easy-to-style pieces made for your everyday look.",
    shopNow:"Shop now ↗", discover:"Discover KStudio", shopEyebrow:"SHOP THE EDIT", shopTitle:"Pieces you'll<br><em>keep reaching for.</em>", viewAll:"View all ↗",
    newTag:"NEW", addBag:"+ Add to bag", promoEyebrow:"KSTUDIO SPECIAL", promoTitle:"Soft sale,<br><em>sweet deal.</em>",
    promoText:"Get 15% off your first order. Because you deserve a little something new.", shopPromo:"Shop promo ↗",
    aboutEyebrow:"ABOUT KSTUDIO", aboutTitle:"Not just clothes.<br><em>It's a mood.</em>",
    aboutText1:"KStudio is for anyone who loves looking stylish without trying too hard. We combine pastel colors, modern cuts, and playful details in comfortable everyday collections.",
    aboutText2:"Simple enough for every day. Special enough to feel like you.", readStory:"Read our story ↗",
    feature1Title:"Curated styles",feature1Text:"Pieces selected for a modern wardrobe.",
    feature2Title:"Pastel palette",feature2Text:"Soft colors that are easy to style.",
    feature3Title:"Easy shopping",feature3Text:"Quick orders directly through WhatsApp.",
    contactEyebrow:"LET'S TALK",contactTitle:"Need help choosing<br><em>your next look?</em>",
    contactText:"Chat with KStudio about sizing, colors, availability, or outfit recommendations.",
    footerText:"Contemporary fashion, soft pastel mood.",footerExplore:"Explore",footerHelp:"Help",
    searchEyebrow:"SEARCH KSTUDIO",searchPlaceholder:"Search cardigan, blouse...",chatUs:"Chat us"
  }
};

let currentLang = "id";
const langBtn = document.getElementById("languageBtn");
const langMenu = document.getElementById("languageMenu");

langBtn.addEventListener("click", e => {
  e.stopPropagation();
  langMenu.classList.toggle("open");
});
document.addEventListener("click", () => langMenu.classList.remove("open"));

document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    document.documentElement.lang = currentLang;
    langBtn.innerHTML = currentLang.toUpperCase() + " <span>⌄</span>";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      el.placeholder = translations[currentLang][el.dataset.i18nPlaceholder];
    });
  });
});

// Mobile menu
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => {
  document.getElementById("navLinks").classList.remove("open");
}));

// Slider
const slides = document.getElementById("slides");
const progress = document.getElementById("sliderProgress");
let slideIndex = 0;
const totalSlides = 5;

function goToSlide(index) {
  slideIndex = (index + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
  progress.style.width = `${((slideIndex + 1) / totalSlides) * 100}%`;
}
document.getElementById("nextSlide").addEventListener("click", () => goToSlide(slideIndex + 1));
document.getElementById("prevSlide").addEventListener("click", () => goToSlide(slideIndex - 1));

let autoSlide = setInterval(() => goToSlide(slideIndex + 1), 5000);
document.querySelector(".slider").addEventListener("mouseenter", () => clearInterval(autoSlide));
document.querySelector(".slider").addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => goToSlide(slideIndex + 1), 5000);
});

// Search
const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

document.getElementById("searchOpen").addEventListener("click", () => {
  searchOverlay.classList.add("open");
  document.body.classList.add("no-scroll");
  setTimeout(() => searchInput.focus(), 100);
});
document.getElementById("searchClose").addEventListener("click", closeSearch);
searchOverlay.addEventListener("click", e => { if (e.target === searchOverlay) closeSearch(); });

function closeSearch() {
  searchOverlay.classList.remove("open");
  document.body.classList.remove("no-scroll");
}
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase().trim();
  if (!q) {
    searchResults.innerHTML = "";
    return;
  }
  const products = [...document.querySelectorAll(".product")].filter(p =>
    p.dataset.name.toLowerCase().includes(q)
  );
  searchResults.innerHTML = products.length
    ? products.map(p => `<div>✦ ${p.dataset.name} — Rp${Number(p.dataset.price).toLocaleString("id-ID")}</div>`).join("")
    : `<div>${currentLang === "id" ? "Produk belum ditemukan. Coba kata lain." : "No product found. Try another keyword."}</div>`;
});

// Cart
let cart = [];
const bagCount = document.getElementById("bagCount");
const bagOverlay = document.getElementById("bagOverlay");
const bagList = document.getElementById("bagList");
const bagItemsText = document.getElementById("bagItemsText");
const checkoutLink = document.getElementById("checkoutLink");
const toast = document.getElementById("toast");

function toastMessage(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product");
    cart.push({name: product.dataset.name, price: Number(product.dataset.price)});
    updateCart();
    toastMessage(`${product.dataset.name} added to bag ✦`);
  });
});

function updateCart() {
  bagCount.textContent = cart.length;
  bagItemsText.textContent = `${cart.length} ${cart.length === 1 ? "item" : "items"}`;

  bagList.innerHTML = cart.length
    ? cart.map((item, i) => `
      <div class="bag-row">
        <span>${i + 1}. ${item.name}</span>
        <strong>Rp${item.price.toLocaleString("id-ID")}</strong>
      </div>`).join("")
    : `<p style="color:#777;font-size:12px">Your bag is empty ♡</p>`;

  const names = cart.map(item => item.name).join(", ");
  const message = cart.length
    ? `Halo kak aku mau pesan baju ${names} ya;`
    : "Halo kak aku mau pesan baju .... 5 ya;";
  checkoutLink.href = `https://wa.me/6285219577704?text=${encodeURIComponent(message)}`;
}

document.getElementById("bagButton").addEventListener("click", () => {
  bagOverlay.classList.add("open");
  document.body.classList.add("no-scroll");
});
document.getElementById("bagClose").addEventListener("click", () => {
  bagOverlay.classList.remove("open");
  document.body.classList.remove("no-scroll");
});
bagOverlay.addEventListener("click", e => {
  if (e.target === bagOverlay) {
    bagOverlay.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }
});

updateCart();
