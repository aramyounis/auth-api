//-------------------------------rigester--------------------------------------//

document
  .getElementById("formRegister")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    validateRegister();
  });

async function validateRegister() {
  var password = document.getElementById("password");
  var password2 = document.getElementById("password2");

  var passwordValue = document.getElementById("password").value;
  var password2Value = document.getElementById("password2").value;

  var flag = 0;

  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
  } else if (passwordValue.length < 5) {
    setErrorFor(password, "Please increase the password length.");
  } else {
    setSuccessFor(password);
    flag++;
  }

  if (password2Value === "") {
    setErrorFor(password2, "Password two cannot be blank");
  } else if (passwordValue !== password2Value) {
    setErrorFor(password2, "Passwords does not match");
  } else {
    setSuccessFor(password2);
    flag++;
  }

  function setErrorFor(input, message) {
    var formControl = input.parentElement;
    var small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }

  function setSuccessFor(input) {
    var formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  if (flag === 2) {
    var pathname = window.location.pathname;
    pathname = pathname.split("/");

    const config = {
      withCredentials: true,
    };
    const res = await axios
      .post(
        "http://localhost:3000/auth/resetPassowrd",
        {
          newPassword: passwordValue,
        },
        config
      )
      .then((data) => {
        showbox();
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data) {
          errorbox(err.response.data.error_message);
        }
      });
  } else {
    errorbox("check Passowrds Failed");
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }
}
//////////////////////////////////////////////////////////////////
//------------------------box regster access------------------------//

var btnaccess = document.querySelector("#btaccess");
var boxshow = document.querySelector(".rigsee");
var boxerror = document.querySelector(".error-spinner");

let timer;
let timmer;

function showbox() {
  boxshow.classList.add("showrigsee");

  timmer = setTimeout(function () {
    hidebox();
  }, 4000);
}

function hidebox() {
  boxshow.classList.remove("showrigsee");
}

//------box regster error--------//

function errorbox(msg) {
  const err_message = document.getElementById("err_msg");
  err_message.innerText = msg;
  boxerror.classList.add("show-error-spinner");
  timmer = setTimeout(function () {
    hideboxerror();
  }, 4000);
}

function hideboxerror() {
  boxerror.classList.remove("show-error-spinner");
}

//////////////////////////////////////////////////////////////////
