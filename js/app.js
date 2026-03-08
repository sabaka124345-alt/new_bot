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

function enterMarket(){

if(!selectedCity){
alert("Выберите город");
return;
}

document.getElementById("cityGate").style.display="none";
document.getElementById("main").style.display="block";

document.getElementById("main").innerHTML = `
<h1>Город: ${selectedCity}</h1>
<p>Маркет загружен</p>
`;

}
