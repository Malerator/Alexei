const popUp = document.createElement("div");
popUp.className = "modal";

const form = document.querySelector("form");
form.className = "form";

const btn = document.querySelector(".btn");

const closeBtn = document.createElement("button");
closeBtn.className = "close";
closeBtn.type = "button";

const img = document.createElement("img");
img.src = "./images/close.svg";
img.width = "15";
img.height = "15";

const sendBtn = document.querySelector(".send");

const TOKEN = "5856059976:AAHi68Tu9T8jSghs6j6tlfVk1dZWWPw-PGc";

const CHAT_ID = "-1001695833016";

const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

closeBtn.append(img);
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

form.addEventListener("submit", function (el) {
  el.preventDefault();

  let message = `<b>Заявка с сайта</b>\n`;
  message += `<b>Модель </b>${this.model.value}\n`;
  message += `<b>Марка </b>${this.mark.value}\n`;
  message += `<b>Пробег </b>${Math.round(this.run.value)}\n`;
  message += `<b>Год выпуска </b>${this.year.value}\n`;
  message += `<b>Имя </b>${this.fName.value}\n`;
  message += `<b>Телефон </b>${this.tel.value}`;
  axios.post(URL, {
    chat_id: CHAT_ID,
    parse_mode: "html",
    text: message,
  });
  el.target.reset();
  closeModal();
});

var currentTab = 0;

showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "ОТПРАВИТЬ";
    // document.getElementById("nextBtn").setAttribute("type", "submit");
    document.getElementById("nextBtn").style.display = "none";
    sendBtn.style.display = "inline-block";
  } else {
    document.getElementById("nextBtn").innerHTML = "ВПЕРЕД";
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    form.submit();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  let x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(num) {
  let i,
    bolProgres = document.getElementsByClassName("step");
  for (i = 0; i < bolProgres.length; i++) {
    bolProgres[i].className = bolProgres[i].className.replace(" active", "");
  }
  bolProgres[num].className += " active";
}

/***/

document.addEventListener("DOMContentLoaded", function () {
  let input = document.querySelector(".maskphone");
  input.addEventListener("input", mask);
  input.addEventListener("focus", mask);
  input.addEventListener("blur", mask);

  function mask(event) {
    let blank = "+_ (___) ___-__-__";
    let i = 0;
    let val = this.value.replace(/\D/g, "").replace(/^8/, "7");

    this.value = blank.replace(/./g, function (char) {
      if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++);

      return i >= val.length ? "" : char;
    });

    if (event.type == "blur") {
      if (this.value.length == 2) this.value = "";
    } else {
      setCursorPosition(this, this.value.length);
    }
  }

  function setCursorPosition(elem, pos) {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
      return;
    }

    if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
      return;
    }
  }
});
