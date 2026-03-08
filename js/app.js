let products = {};
let districts = {};
const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

let cities = [];

async function loadCities(){

const res = await fetch("/data/cities.json");

const data = await res.json();

cities = data.map(c => c.name);

}

async function loadDistricts(){

const res = await fetch("/data/districts.json");

districts = await res.json();

}
async function loadProducts(){

const res = await fetch("/data/products.json");

products = await res.json();

}

loadProducts();

loadDistricts();

loadCities();

let selectedCity = null;

function renderCities(list){

const container = document.getElementById("cityList");

container.innerHTML = "";

list.forEach(city => {

const div = document.createElement("div");

div.innerText = city;

div.style.padding = "10px";
div.style.cursor = "pointer";

div.onclick = () => {

selectedCity = city;

document.querySelectorAll("#cityList div").forEach(el=>{
el.style.background = "";
});

div.style.background = "#333";

};

container.appendChild(div);

});

}

renderCities(cities);

document.getElementById("citySearch").addEventListener("input", function(){

const value = this.value.toLowerCase();

const filtered = cities.filter(city =>
city.toLowerCase().includes(value)
);

renderCities(filtered);

// если совпадение точное — выбрать город автоматически
const exact = cities.find(city =>
city.toLowerCase() === value
);

if(exact){
selectedCity = exact;
}

});

function enterMarket(){

if(!selectedCity){
alert("Выберите город");
return;
}

document.getElementById("cityGate").style.display="none";
document.getElementById("main").style.display="block";

renderDistricts();

}

async function renderCategories(){

const res = await fetch("/data/categories.json");
const categories = await res.json();

const main = document.getElementById("main");

main.innerHTML = `<h1>${selectedCity}</h1><h2>Категории</h2>`;

categories.forEach(cat => {

const div = document.createElement("div");

div.innerText = cat;

div.style.padding = "12px";
div.style.margin = "10px";
div.style.background = "#111";
div.style.cursor = "pointer";
div.style.border = "1px solid #333";

main.appendChild(div);

});

}
function renderDistricts(){

const main = document.getElementById("main");

const cityDistricts = districts[selectedCity] || [];

main.innerHTML = `<h1>${selectedCity}</h1><h2>Районы</h2>`;

cityDistricts.forEach(dist => {

const div = document.createElement("div");

div.innerText = dist;

div.style.padding = "12px";
div.style.margin = "10px";
div.style.background = "#111";
div.style.cursor = "pointer";
div.style.border = "1px solid #333";

div.onclick = () => {

openMarket(dist);

};

main.appendChild(div);

});

}
function openMarket(district){

const main = document.getElementById("main");

const categories = [
"Стимуляторы",
"Эйфория",
"Психоделики",
"Каннабис",
"Диссоциативы"
];

main.innerHTML = `
<h1>${selectedCity}</h1>
<h2>Район: ${district}</h2>
<h3>Категории</h3>
`;

categories.forEach(cat => {

const div = document.createElement("div");

div.innerText = cat;

div.onclick = () => {

openCategory(cat);

};

div.style.padding = "12px";
div.style.margin = "10px";
div.style.background = "#111";
div.style.cursor = "pointer";
div.style.border = "1px solid #333";

main.appendChild(div);

});

}
function openCategory(category){

const main = document.getElementById("main");

const items = products[category] || [];

main.innerHTML = `<h2>${category}</h2>`;

items.forEach(item => {

const div = document.createElement("div");

div.innerHTML = `
<b>${item.name}</b><br>
${item.weight} — ${item.price}
`;

div.style.padding = "12px";
div.style.margin = "10px";
div.style.background = "#111";
div.style.border = "1px solid #333";

main.appendChild(div);

});

}
