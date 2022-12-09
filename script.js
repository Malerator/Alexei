const popUp = document.createElement("div");
popUp.className = "modal";
const form = document.querySelector("form");
form.className = "form";
const btn = document.querySelector(".btn");
const closeBtn = document.createElement("button");
closeBtn.className = "close";
closeBtn.textContent = "Закрыть";
const sendBtn = document.querySelector(".send");

form.append(closeBtn);
popUp.append(form);
document.body.append(popUp);

btn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
popUp.addEventListener("click", closeModal);
form.addEventListener("click", (event) => event.stopPropagation());

function openModal() {
  popUp.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  popUp.style.display = "none";
  document.body.style.overflow = "initial";
}

// function handleSubmit(event) {
//   event.preventDefault();
//   const data = new FormData(event.target);
//   const value = Object.fromEntries(data.entries());
//   console.log(value);
// }

// const TOKEN = "5856059976:AAHi68Tu9T8jSghs6j6tlfVk1dZWWPw-PGc";
// const CHAT_ID = "1194877334";
// const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// form.addEventListener("submit", function (el) {
//   e.preventDefault();

//   let message = `<b>Заявка с сайта</b>\n`;
//   message += `<b>Имя </b>${this.fName.value}\n`;
//   message += `<b>Телефон </b>${this.tel.value}`;

//   axios.post(URL, {
//     chat_id: CHAT_ID,
//     parse_mode: "html",
//     text: message,
//   });
// });
