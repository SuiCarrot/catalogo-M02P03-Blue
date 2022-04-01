const closeMessage = document.querySelector(".close");
const message = document.querySelector(".mensagem");

closeMessage.addEventListener("click", () => {
    message.style.display = "none";
});

setTimeout(() => {
    message.style.display = "none";
    location.reload();
}, 5000);