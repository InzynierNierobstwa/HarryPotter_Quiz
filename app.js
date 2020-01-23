document.addEventListener("DOMContentLoaded", function() {
  const sectionPlace = document.querySelector(".questionPlace");

  //btns
  const lvlBtn = document.querySelectorAll(".lvlBundle__button");
  const categoryBtn = document.querySelectorAll(".categoryBundle__button");

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //zbiera dane o wybranej kategorii
  function grabCategory(starter, categoryreq) {
    if (categoryreq[0] === "Zaklęcia" || categoryreq[1] === "Zaklęcia") {
      const zaklecia = starter.zaklecia[0];
      return zaklecia;
    } else if (categoryreq[0] === "Eliksiry" || categoryreq[1] === "Eliksiry") {
      const eliksiry = starter.eliksiry[0];
      return eliksiry;
    } else if (
      categoryreq[0] === "Zielarstwo" ||
      categoryreq[1] === "Zielarstwo"
    ) {
      const zielarstwo = starter.zielarstwo[0];
      return zielarstwo;
    } else if (
      categoryreq[0] === "Historia Magii" ||
      categoryreq[1] === "Historia Magii"
    ) {
      const historia = starter.historiaMagii[0];
      return historia;
    } else if (
      categoryreq[0] === "Prawo Magii" ||
      categoryreq[1] === "Prawo Magii"
    ) {
      const prawo = starter.prawoMagii[0];
      return prawo;
    } else if (
      categoryreq[0] === "Magiczne Zwierzęta" ||
      categoryreq[1] === "Magiczne Zwierzęta"
    ) {
      const zwierzeta = starter.magiczneZwierzeta[0];
      return zwierzeta;
    } else if (categoryreq[0] === "Postaci" || categoryreq[1] === "Postaci") {
      const postaci = starter.postaci[0];
      return postaci;
    } else {
      console.log("category error");
    }
  }
  //zbiera dane na temat poziomu
  function grabLvl(starter, lvlreq) {
    if (lvlreq[0] === "łatwy" || lvlreq[1] === "łatwy") {
      const latwy = starter.latwy;
      return latwy;
    } else if (lvlreq[0] === "średni" || lvlreq[1] === "średni") {
      const sredni = starter.sredni;
      return sredni;
    } else if (lvlreq[0] === "trudny" || lvlreq[1] === "trudny") {
      const trudny = starter.trudny;
      return trudny;
    } else {
      console.log("level error");
    }
  }
  //zbiera dane o lvl i category razem
  function grabReq(starter, category, lvl) {
    const requirement1 = grabCategory(starter, category);
    starter = requirement1;
    const requirement2 = grabLvl(starter, lvl);
    return requirement2;
  }

  function grabAnswer(starter, category, lvl, random) {
    const requirement = grabReq(starter, category, lvl)[random];

    const answerA = requirement.answerA[0].answer;
    const answerB = requirement.answerB[0].answer;
    const answerC = requirement.answerC[0].answer;
    const answerD = requirement.answerD[0].answer;

    const answerArr = [answerA, answerB, answerC, answerD];
    return answerArr;
  }

  function grabCorrectAnswer(starter, category, lvl, random) {
    const requirement = grabReq(starter, category, lvl)[random];

    const answerAcorrect = requirement.answerA[0].correct;
    const answerBcorrect = requirement.answerA[0].correct;
    const answerCcorrect = requirement.answerA[0].correct;
    const answerDcorrect = requirement.answerA[0].correct;

    const answerCorrectArr = [
      answerAcorrect,
      answerBcorrect,
      answerCcorrect,
      answerDcorrect
    ];
    return answerCorrectArr;
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
        const questionRandom = getRandom(
          0,
          grabReq(question, requirementArr, requirementArr).length
        );

        const quesTitle = document.createElement("div");
        quesTitle.classList.add("question__title");
        quesTitle.innerHTML = grabReq(question, requirementArr, requirementArr)[
          questionRandom
        ].question;

        const quesAnswerBundler = document.createElement("div");
        quesAnswerBundler.classList.add("question__answer");

        quesFrame.appendChild(quesTitle);
        quesFrame.appendChild(quesAnswerBundler);
        sectionPlace.appendChild(quesFrame);

        for (let i = 0; i < 4; i++) {
          const quesAnswer = document.createElement("button");
          quesAnswer.classList.add("question__answerBtn");
          quesAnswer.innerHTML = grabAnswer(
            question,
            requirementArr,
            requirementArr,
            questionRandom
          )[i];
          quesAnswerBundler.appendChild(quesAnswer);
        }

        function checkAnswer(correct) {
          if (correct === 1) {
            console.log("poprawna odpowiedz");
          } else {
            console.log("niepoprawna odpowiedz");
          }
        }

        const btnAnswer = document.querySelectorAll(".question__answerBtn");
        console.log(btnAnswer);

        for (let i = 0; i < btnAnswer.length; i++) {
          btnAnswer[i].addEventListener(
            "click",
            function() {
              buttonsControl(this, i);
            },
            false
          );
        }

        function buttonsControl(button, i) {
          console.log(i);
          console.log(button.className);
        }
        console.log(question.postaci[0].latwy[0]);
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
