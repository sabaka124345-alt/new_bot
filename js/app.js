const tg = window.Telegram.WebApp;

tg.expand();

console.log("Mini App started");

const user = tg.initDataUnsafe.user;

if(user){
console.log("User ID:", user.id);
console.log("Username:", user.username);
}
