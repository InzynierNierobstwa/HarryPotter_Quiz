document.addEventListener("DOMContentLoaded", function() {
  const btnStart = document.querySelector(".playTutorial__button--start");
  const sectionPlace = document.querySelector(".playTutorial");

  //randomquestion
  const mathRandom = function() {
    return Math.floor(Math.random() * 8 + 1);
  };

  //xmlhttp
  const loadQuestion = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/json/database.json", true);

    xhr.onload = function() {
      if (this.status == 200) {
        question = JSON.parse(this.responseText);
      }
    };
    xhr.send();
  };

  //lvl panel
  const lvlStart = function() {
    const lvlBundle = document.createElement("div");
    lvlBundle.classList.add("lvl__bundle");
    sectionPlace.appendChild(lvlBundle);

    const lvlTable = ["easy", "medium", "hard", "mix"];
    let elem;

    lvlTable.forEach(function(el) {
      elem = document.createElement("button");
      elem.classList.add("lvl__button");
      elem.innerHTML = el;
      lvlBundle.appendChild(elem);

      elem.addEventListener("click", function(e) {
        e.preventDefault();
        categoryStart();
      });
    });
  };

  //category panel
  const categoryStart = function() {
    const categoryBundle = document.createElement("div");
    categoryBundle.classList.add("category__bundle");
    sectionPlace.appendChild(categoryBundle);

    const categoryTable = [
      "Spells",
      "Alchemy",
      "Herbology",
      "History",
      "Law",
      "Magical Creatures",
      "Character",
      "All"
    ];

    let elem;
    categoryTable.forEach(function(el) {
      elem = document.createElement("button");
      elem.classList.add("category__button");
      elem.innerHTML = el;
      categoryBundle.appendChild(elem);

      elem.addEventListener("click", function(e) {
        e.preventDefault();
        questionFrame(loadQuestion().innerText);
      });
    });
  };

  //grab info about lvl and category
  const listener = {
    lvl: function() {
      document.addEventListener("click", function(event) {
        if (event.target.classList.contains("lvl__button")) {
          console.log(event.target.innerHTML);
        }
      });
      return event.target.innerHTML;
    },
    category: function() {
      document.addEventListener("click", function(event) {
        if (event.target.classList.contains("category__button")) {
          console.log(event.target.innerHTML);
        }
      });
      return event.target.innerHTML;
    }
  };

  //start
  btnStart.addEventListener("click", function(e) {
    e.preventDefault();
    lvlStart();
  });

  listener.lvl();
  listener.category();

  let test = listener.lvl();
  console.log(test);

  //question frame creator
  const questionFrame = function(question, answer) {
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
  };
});
