document.addEventListener("DOMContentLoaded", function() {
  const btnStart = document.querySelector(".playTutorial__button--start");
  const sectionPlace = document.querySelector(".playTutorial");

  //xmlhttp
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    if (xhr.status === 200) {
      const json = JSON.parse(xhr.response);
      console.log(json.characters);
    }
  });

  xhr.addEventListener("error", function() {
    alert("nie udalo sie nawiazac polaczenia");
  });

  xhr.open("GET", "/json/database.json", true);
  xhr.send();

  //randomquestion
  const mathRandom = function() {
    return Math.floor(Math.random() * 8 + 1);
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
        console.log("dziala");
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
        questionFrame();
      });
    });
  };

  //start
  btnStart.addEventListener("click", function(e) {
    e.preventDefault();
    lvlStart();
  });

  //question creator
  const questionCreator = function(lvl, category) {
    question.innerHTML = "";
  };

  //question frame creator
  const questionFrame = function() {
    const quesFrame = document.createElement("div");
    quesFrame.classList.add("question__frame");

    const quesTitle = document.createElement("div");
    quesTitle.classList.add("question__title");
    quesTitle.innerHTML =
      "W ktorym roku Harry Potter zaczal uczeszczac do Szkoly Magii i Czarodziejstwa Hoghwart?";

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
