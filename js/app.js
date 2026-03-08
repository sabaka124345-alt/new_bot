let selectedWeight = null;
let selectedPrice = 0;
let selectedDistrict = null;
let cart = [];

const tg = window.Telegram.WebApp;
tg.expand();

console.log("Mini App started");

const user = tg.initDataUnsafe.user;

if (!user) {
  document.body.innerHTML = `
    <div style="display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                background:#0f0f10;
                color:white;
                font-size:20px;">
      Откройте магазин через Telegram
    </div>`;
  throw new Error("Mini App opened outside Telegram");
}

console.log("User ID:", user.id);
console.log("Username:", user.username);

const content = document.getElementById("content");
let savedCity = localStorage.getItem("city");

if(!savedCity){
  showCitySelector();
} else {
  renderWelcome(savedCity);
}

// --- функции --- //

function renderWelcome(city){
  content.innerHTML = `
    <h2>Добро пожаловать</h2>
    <p>Mini App работает</p>
    <br>
    <b>Ваш Telegram ID:</b> ${user.id}<br>
    <b>Username:</b> @${user.username || "нет username"}<br>
    <b>Ваш город:</b> ${city}
  `;
}

// Выбор города
function showCitySelector(){
  let html = `<h3>Выберите город</h3>`;
  cities.forEach(city => {
    html += `<div class="city-btn" onclick="selectCity('${city.name}')">${city.name}</div>`;
  });
  content.innerHTML = html;
}

function selectCity(city){
  localStorage.setItem("city", city);
  location.reload();
}

// Переход на страницу каталога
function openPage(page){
  if(page === "catalog"){
    const content = document.getElementById("content");
    content.innerHTML = `
      <h2>Каталог</h2>
      <div class="category" onclick="openCategory('lab')">🔬 Лаборатория</div>
      <div class="category" onclick="openCategory('space')">🌌 Космос</div>
      <div class="category" onclick="openCategory('synthesis')">🧬 Синтез</div>
      <div class="category" onclick="openCategory('crystal')">🧊 Кристаллы</div>
      <div class="category" onclick="openCategory('exp')">🔥 Эксперименты</div>
    `;
  }
}

// Категории товаров
function openCategory(name){
  const content = document.getElementById("content");
  content.innerHTML = `<h2>Товары</h2>`;
  const productsList = products[name]; // products — объект с категориями
  productsList.forEach(p => {
    content.innerHTML += `
      <div class="product" onclick="openProduct('${name}','${p.id}')">
        <div class="product-title">${p.name}</div>
        <div class="product-price">${p.price} ₽</div>
      </div>
    `;
  });
}

function openProduct(categoryId, productId){
    const category = categories.find(c => c.id === categoryId);
    const product = category.products.find(p => p.id === productId);
    const content = document.getElementById("content");

    let html = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <h3>Выберите фасовку</h3>
    `;

    product.weights.forEach(w => {
        html += `
            <div class="weight" onclick="selectWeight(${w.weight}, ${w.price})">
                ${w.weight} г — ${w.price} ₽
            </div>
        `;
    });

    html += `
        <button class="district-btn" onclick="toggleDistricts('${productId}')">Выбрать район</button>
        <div id="district-list-${productId}" class="hidden"></div>
        <button onclick="addToCart('${productId}')">Добавить в корзину</button>
    `;

    content.innerHTML = html;
}

// Рендер районов с emoji
function renderDistricts(districts){
  let html = "";
  districts.forEach(d => {
    if(d.available){
      html += `<div class="district" onclick="selectDistrict('${d.name}','${d.type}')">${d.name} ${d.emoji}</div>`;
    } else {
      html += `<div class="district disabled">${d.name} ❌</div>`;
    }
  });
  return html;
}

// Показ/скрытие районов
function toggleDistricts(){
  const list = document.getElementById("district-list");
  list.classList.toggle("hidden");
}

// Выбор фасовки
function selectWeight(weight, price){
  selectedWeight = weight;
  selectedPrice = price;
  document.querySelectorAll(".weight").forEach(w => w.classList.remove("selected"));
  event.target.classList.add("selected");
}

// Выбор района
function selectDistrict(name,type){
  selectedDistrict = {name,type};
  document.querySelectorAll(".district").forEach(d => d.classList.remove("selected"));
  event.target.classList.add("selected");
}

// Корзина
function addToCart(productId){
  if(!selectedWeight){
    alert("Выберите фасовку");
    return;
  }
  if(!selectedDistrict){
    alert("Выберите район");
    return;
  }

  const product = {id: productId, weight:selectedWeight, price:selectedPrice, district:selectedDistrict};
  cart.push(product);
  updateCart();
  alert("Товар добавлен в корзину");
}

// Обновление корзины
function updateCart(){
  const cartCount = document.getElementById("cartCount");
  if(cartCount) cartCount.innerText = cart.length;
}

// Открытие корзины
function openCart(){
  const content = document.getElementById("content");
  if(cart.length === 0){
    content.innerHTML = "<h2>Корзина пуста</h2>";
    return;
  }

  let html = "<h2>Корзина</h2>";
  let total = 0;

  cart.forEach(item => {
    html += `
      <div class="product">
        <div class="product-title">${item.id} ${item.weight}г — ${item.district.name} ${item.district.emoji}</div>
        <div class="product-price">${item.price} ₽</div>
      </div>
    `;
    total += item.price;
  });

  html += `<h3>Итого: ${total} ₽</h3><button class="buy-btn">Оформить заказ</button>`;
  content.innerHTML = html;
}
function toggleDistricts(productId){
    const product = findProductById(productId); // вспомогательная функция ниже
    const el = document.getElementById(`district-list-${productId}`);
    
    if(el.classList.contains("hidden")){
        el.classList.remove("hidden");
        el.innerHTML = "";
        product.districts.forEach(d => {
            el.innerHTML += `
                <div class="district ${d.type === '❌' ? 'disabled' : ''}" 
                     onclick="selectDistrict('${d.name}','${d.type}')">
                     ${d.name} ${d.type}
                </div>
            `;
        });
    } else {
        el.classList.add("hidden");
    }
}

function findProductById(productId){
    for(const cat of categories){
        const p = cat.products.find(x => x.id === productId);
        if(p) return p;
    }
    return null;
}
