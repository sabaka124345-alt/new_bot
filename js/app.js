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
