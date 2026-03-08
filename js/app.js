const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

let cities = [
"Москва",
"Санкт-Петербург",
"Казань",
"Екатеринбург",
"Новосибирск",
"Краснодар",
"Ростов-на-Дону",
"Омск",
"Самара",
"Челябинск"
];

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

renderCategories();

}

document.getElementById("cityGate").style.display="none";
document.getElementById("main").style.display="block";

document.getElementById("main").innerHTML = `
<h1>Город: ${selectedCity}</h1>
<p>Маркет загружен</p>
`;

}
function renderCategories(){

const categories = [
"Стимуляторы",
"Эйфория",
"Психоделики",
"Каннабис",
"Диссоциативы"
];

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
