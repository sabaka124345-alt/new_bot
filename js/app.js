const tg = window.Telegram.WebApp;

if (!tg || !tg.initData) {
    document.body.innerHTML = `
        <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            height:100vh;
            background:#0f0f0f;
            color:white;
            font-size:20px;
        ">
            Open this app inside Telegram
        </div>
    `;
    throw new Error("App opened outside Telegram");
}

tg.expand();

console.log("Telegram WebApp initialized");
const app = document.getElementById("app");

function renderHome() {

    const categories = [
        "Жидкости",
        "POD-системы",
        "Съедобные товары",
        "Расслабляющий чай",
        "Съедобные грибы",
        "Семена конопли"
    ];

    let html = `<div class="categories">`;

    categories.forEach(cat => {
        html += `
    <div class="category-card" onclick="openCategory('${cat}')">
    ${cat}
</div>
`;
});

    html += `</div>`;

    app.innerHTML = html;
}

renderHome();

function openCategory(category){

const items = PRODUCTS.filter(p => p.category === category);

let html = `
<div style="padding:20px">

<h2>${category}</h2>

<div class="products">
`;

items.forEach(p => {

html += `
<div class="product-card">

<div class="product-title">${p.name}</div>

<div class="product-price">${p.price} ₽</div>

<button onclick="addToCart(${p.id})">
Добавить в корзину
</button>

</div>
`;

});

html += `</div></div>`;

app.innerHTML = html;

}
function addToCart(id){

console.log("Added product:", id);

}
