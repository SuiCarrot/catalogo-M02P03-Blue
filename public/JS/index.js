const closeMessage = document.querySelector(".close");
const message = document.querySelector(".mensagem");

closeMessage.addEventListener("click", () => {
    message.style.display = "none";
    message = ""
});

setTimeout(() => {
    message.style.display = "none";
    message = ""
    location.reload();
}, 5000);