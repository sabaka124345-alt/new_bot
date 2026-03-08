let selectedWeight = null;
let selectedPrice = 0;

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
    </div>
    `;

    throw new Error("Mini App opened outside Telegram");

}

console.log("User ID:", user.id);
console.log("Username:", user.username);

// выводим пользователя на экран
const content = document.getElementById("content");

content.innerHTML = `
<h2>Добро пожаловать</h2>
<p>Mini App работает</p>

<br>

<b>Ваш Telegram ID:</b> ${user.id}
<br>
<b>Username:</b> @${user.username || "нет username"}
`;
let savedCity = localStorage.getItem("city");

if(!savedCity){

showCitySelector();

}else{

content.innerHTML += `<br><br><b>Ваш город:</b> ${savedCity}`;

}

function showCitySelector(){

let html = `<h3>Выберите город</h3>`;

cities.forEach(city => {

html += `
<div class="city-btn" onclick="selectCity('${city.name}')">
${city.name}
</div>
`;

});

content.innerHTML = html;

}

function selectCity(city){

localStorage.setItem("city", city);

location.reload();

}
function openPage(page){

const content = document.getElementById("content");

if(page === "catalog"){

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
function openCategory(name){

const content = document.getElementById("content");

content.innerHTML = `
<h2>Товары</h2>

<div class="product" onclick="openProduct('blue')">
<div class="product-title">Blue Crystal</div>
<div class="product-price">1200 ₽</div>
</div>

<div class="product" onclick="openProduct('red')">
<div class="product-title">Red Powder</div>
<div class="product-price">950 ₽</div>
</div>

<div class="product" onclick="openProduct('dark')">
<div class="product-title">Dark Matter</div>
<div class="product-price">2100 ₽</div>
</div>
`;

}

function openProduct(name){

const content = document.getElementById("content");

content.innerHTML = `
<h2>Blue Crystal</h2>

<div class="rating">⭐⭐⭐⭐⭐</div>

<p class="product-desc">
Чистый лабораторный кристалл высокой степени.
</p>

<button class="info-btn" onclick="openInfo()">
Подробнее о товаре
</button>

<h3>Выберите фасовку</h3>

<div class="weights">

<div class="weight" onclick="selectWeight('0.5',1200)">0.5 г</div>

<div class="weight" onclick="selectWeight('1',2000)">1 г</div>

<div class="weight" onclick="selectWeight('2',3500)">2 г</div>

<div class="weight" onclick="selectWeight('3',4800)">3 г</div>

<div class="weight" onclick="selectWeight('5',7000)">5 г</div>

</div>

<button class="district-btn" onclick="openDistricts()">
Выбрать район
</button>

<button class="buy-btn" onclick="addToCart()">
Добавить в корзину
</button>

`;

}
function openInfo(){

alert("Подробная информация о товаре");

}

function selectWeight(weight,price){

selectedWeight = weight;
selectedPrice = price;

alert("Вы выбрали "+weight+" г");

}
function openDistricts(){

const content = document.getElementById("content");

content.innerHTML = `
<h2>Выберите район</h2>

<div class="district" onclick="selectDistrict('Центр','⛏️')">
Центр ⛏️
</div>

<div class="district" onclick="selectDistrict('Север','🧲')">
Север 🧲
</div>

<div class="district" onclick="selectDistrict('Юг','🔒')">
Юг 🔒
</div>

<div class="district disabled">
Запад ❌
</div>

`;
}

function selectDistrict(name,type){

alert("Вы выбрали район: "+name+" "+type);

}

function addToCart(){

if(!selectedWeight){
alert("Выберите фасовку");
return;
}

cart.push({
name: "Blue Crystal",
weight: selectedWeight,
price: selectedPrice
});

updateCart();

alert("Товар добавлен в корзину");

}
function updateCart(){

const cartCount = document.getElementById("cartCount");

if(cartCount){
cartCount.innerText = cart.length;
}

}
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
<div class="product-title">${item.name} ${item.weight}г</div>
<div class="product-price">${item.price} ₽</div>
</div>
`;

total += item.price;

});

html += `
<h3>Итого: ${total} ₽</h3>

<button class="buy-btn">
Оформить заказ
</button>
`;

content.innerHTML = html;

}
