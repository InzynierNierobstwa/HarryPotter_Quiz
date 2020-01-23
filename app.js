document.addEventListener("DOMContentLoaded", function() {
  const sectionPlace = document.querySelector(".questionPlace");

  //btns
  const lvlBtn = document.querySelectorAll(".lvlBundle__button");
  const categoryBtn = document.querySelectorAll(".categoryBundle__button");
  const answerBtn = document.getElementsByClassName("question__answerBtn");

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //funkcja ktora wczyta pytanie
  function getQuiz() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/json/database.json", true);

    xhr.onload = function() {
      if (xhr.status == 200) {
        let question = JSON.parse(xhr.responseText);

        const quesFrame = document.createElement("div");
        quesFrame.classList.add("question__frame");

        const latwy = question.postaci[0].latwy;
        const sredni = question.postaci[0].sredni;
        const trudny = question.postaci[0].trudny;
        const mix = question.postaci[0].mix; // na razie nie dziala

        let poziom;
        if (requirementArr[0] === "łatwy" || requirementArr[1] === "łatwy") {
          console.log("łatwy");
          poziom = latwy;
        } else if (
          requirementArr[0] === "średni" ||
          requirementArr[1] === "średni"
        ) {
          console.log("średni");
          poziom = sredni;
        } else if (
          requirementArr[0] === "trudny" ||
          requirementArr[1] === "trudny"
        ) {
          console.log("trudny");
          poziom = trudny;
        } else {
          console.log("nie dziala");
        }

        const questionRandom = getRandom(0, poziom.length);
        const quesTitle = document.createElement("div");
        quesTitle.classList.add("question__title");
        quesTitle.innerHTML =
          question.postaci[0].latwy[questionRandom].question;

        const quesAnswerBundler = document.createElement("div");
        quesAnswerBundler.classList.add("question__answer");

        quesFrame.appendChild(quesTitle);
        quesFrame.appendChild(quesAnswerBundler);
        sectionPlace.appendChild(quesFrame);

        const answerA =
          question.postaci[0].latwy[questionRandom].answerA[0].answer;
        const answerB =
          question.postaci[0].latwy[questionRandom].answerB[0].answer;
        const answerC =
          question.postaci[0].latwy[questionRandom].answerC[0].answer;
        const answerD =
          question.postaci[0].latwy[questionRandom].answerD[0].answer;

        const answerArr = [answerA, answerB, answerC, answerD];

        for (let i = 0; i < 4; i++) {
          const quesAnswer = document.createElement("button");
          quesAnswer.classList.add("question__answerBtn");
          quesAnswer.innerHTML = answerArr[i];
          quesAnswerBundler.appendChild(quesAnswer);
        }
      } else {
        console.log("program failed UPLOAD UPLOAD");
      }
    };
    xhr.send();
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
      getQuiz();
    }
  }

  let requirementArr = [];
  //obiekt wprowadzajacy dane o lvl i kategorii
  const checkRequirem = {
    level: function() {
      lvlBtn.forEach(function(elem) {
        elem.addEventListener("click", function(e) {
          requirementArr.push(e.target.innerText);
          disableLvlBtn.clearBtnStyle();
          showQuestion(requirementArr);
        });
      });
    },
    category: function() {
      categoryBtn.forEach(function(elem) {
        elem.addEventListener("click", function(e) {
          requirementArr.push(e.target.innerText);
          disableLvlCategory.clearBtnStyle();
          showQuestion(requirementArr);
        });
      });
    }
  };

  checkRequirem.level();
  checkRequirem.category();
});
