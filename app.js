document.addEventListener("DOMContentLoaded", function(){
    const btnStart = document.querySelector(".playTutorial__button--start");
    const sectionPlace = document.querySelector(".playTutorial");

    //adding category panel
    const categoryStart = function(){
        const categoryBundle = document.createElement("div");
        categoryBundle.classList.add("category__bundle");
        sectionPlace.appendChild(categoryBundle);

        const categoryTable = ["person", "history", "herbsts", "animals"];
        let elem;
        categoryTable.forEach(function(el){
          elem = document.createElement("button");
          elem.classList.add("category__button");
          elem.innerHTML = el;
          categoryBundle.appendChild(elem);
        });

    }

    btnStart.addEventListener("click", function(e){
        e.preventDefault();
        categoryStart();
    })

})

