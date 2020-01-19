document.addEventListener("DOMContentLoaded", function() {
  const sectionPlace = document.querySelector(".questionPlace");

  //btns
  const lvlBtn = document.querySelectorAll(".lvlBundle__button");
  const categoryBtn = document.querySelectorAll(".categoryBundle__button");

  function loadJSON() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/json/database.json", true);

    xhr.onload = function() {
      if (xhr.status == 200) {
        let json = JSON.parse(xhr.responseText);
        console.log(json);
        return json;
      }
    };
    xhr.send();
  }

  loadJSON();

  //tworzy ramke na pytania
  function questionFrame(question, answer) {
    const quesFrame = document.createElement("div");
    quesFrame.classList.add("question__frame");

    const quesTitle = document.createElement("div");
    quesTitle.classList.add("question__title");
    quesTitle.innerHTML = question;

    const quesAnswerBundler = document.createElement("div");
    quesAnswerBundler.classList.add("question__answer");

    quesFrame.appendChild(quesTitle);
    quesFrame.appendChild(quesAnswerBundler);
    sectionPlace.appendChild(quesFrame);

    for (let i = 0; i < 4; i++) {
      const quesAnswer = document.createElement("button");
      quesAnswer.classList.add("question__answerBtn");
      quesAnswer.innerHTML = "1993";
      quesAnswerBundler.appendChild(quesAnswer);
    }
  }

  //obiekt ktory uniemozliwia ponowne klikniecie
  function Disable(classId, name) {
    this.name = name;
    this.clearBtnStyle = function() {
      classId.forEach(function(elem) {
        elem.style.pointerEvents = "none";
      });
    };
  }

  const disableLvlBtn = new Disable(lvlBtn, "level");
  const disableLvlCategory = new Disable(categoryBtn, "category");

  //sprwadz czy tablica ma dwa argumenty
  function showQuestion(arr) {
    if (arr.length === 2) {
      questionFrame();
    }
  }

  let requirementArr = [];
  //obiekt wprowadzajacy dane o lvl i kategorii
  const checkRequirem = {
    level: function() {
      lvlBtn.forEach(function(elem) {
        elem.addEventListener("click", function(e) {
          requirementArr.push(e.target.innerText);
          console.log(requirementArr);
          disableLvlBtn.clearBtnStyle();
          showQuestion(requirementArr);
        });
      });
    },
    category: function() {
      categoryBtn.forEach(function(elem) {
        elem.addEventListener("click", function(e) {
          requirementArr.push(e.target.innerText);
          console.log(requirementArr);
          disableLvlCategory.clearBtnStyle();
          showQuestion(requirementArr);
        });
      });
    }
  };

  checkRequirem.level();
  checkRequirem.category();
});
