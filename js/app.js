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
