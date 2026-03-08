console.log("APP START");

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

document.getElementById("main").innerHTML = `
<h1>Market started</h1>
<p>Telegram user loaded</p>
`;
