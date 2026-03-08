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
"Новосибирск",
"Омск",
"Самара",
"Челябинск"
];

let selectedCity = null;
renderCities(cities);

function renderCities(list){

const container = document.getElementById("cityList");
container.innerHTML = "";

list.forEach(city => {

const div = document.createElement("div");
div.innerText = city;

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

main.innerHTML = "<h1>Категории</h1>";

categories.forEach(cat => {

const div = document.createElement("div");

div.innerText = cat;

div.style.padding = "12px";
div.style.margin = "10px";
div.style.background = "#111";
div.style.cursor = "pointer";

div.onclick = () => {
openCategory(cat);
};

main.appendChild(div);

});

}
