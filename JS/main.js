const add = document.getElementById("add");
const addFooter = document.getElementById("add-footer");
const createCloseFooter = document.getElementById("createClose-footer");
const create = document.getElementById("create");
const Close = document.getElementById("Close");
const form_h1 = document.getElementById("form-h1");
const titleInput = document.getElementById("titleInput");
const descrArea = document.getElementById("descrArea");
const allCards = document.getElementById("allCards");
// النزول للإضافة
add.onclick = function () {
  addFooter.style.display = "none";
  createCloseFooter.style.display = "flex";
  form_h1.style.display = "block";
  scrollTo(0, document.body.scrollHeight);
};

// الاغلاق
Close.onclick = function () {
  addFooter.style.display = "flex"; // flex not block لأنه لو حطيت البلوك فسوف يلغي الفليكس الموجود وبالتالي العناصر لن تتوسط
  createCloseFooter.style.display = "none";
  form_h1.style.display = "none";
  scrollTo(0,0);
};

//  التأكد من انشاء الكروت
create.onclick = () => {
  if (titleInput.value == false && descrArea.value == false) {
    titleInput.style = "border: 2px solid red;";
    descrArea.style = "border: 2px solid red;";

    titleInput.classList.add("check");
    descrArea.classList.add("check");
  } else if (titleInput.value == true && descrArea.value == false) {
    titleInput.style = "border: 1px solid rgb(226 232 240);";
    descrArea.style = "border: 2px solid red;";

    descrArea.classList.add("check");
    titleInput.classList.remove("check");
  } else if (titleInput.value == false && descrArea.value == true) {
    titleInput.style = "border: 2px solid red ;";
    descrArea.style = "border: 1px solid rgb(226 232 240);";

    titleInput.classList.add("check");
    descrArea.classList.remove("check");
  } else {
    titleInput.style = "border: 1px solid rgb(226 232 240);";
    descrArea.style = "border: 1px solid rgb(226 232 240);";
    descrArea.classList.remove("check");
    titleInput.classList.remove("check");
    createTodoCards();
  }
};

// دالة الانشاء والتي سأستدعيها في الايلس
function createTodoCards() {
  
  const myPost = {
    userId: Math.ceil(Math.random() * 12),
    title: document.getElementById("titleInput").value,
    body: document.getElementById("descrArea").value,
  };

  //by using Fetch
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myPost),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log("error", error);
    });

  let newToDoCard = `
                      <div class="TodoCard">
                          <h1 class="title-h1 h-7 text-2xl leading-[29.05px] font-extrabold font-inter text-gray-700">${myPost.title}</h1>
                          <p class="descr-h1 text-gray-500 w-[377px] h-10 font-medium text-base leading-5 order-1">${myPost.body}</p>
                      </div>
                      
                      `;
  allCards.style = 'padding-bottom: 150px;';// لحتى يبين منيح الكارد يلي ضفتي جديد وما تغطي عليه اللينير باك قراوند
  allCards.innerHTML += newToDoCard;
}

//by using AJAX
function getTodoCard() {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.response);
      let allCards = "";
      data.forEach((elm) => {
        allCards += `
                  <div class="TodoCard">
                  <h1 class="title-h1 h-7 text-2xl leading-[29.05px] font-extrabold font-inter text-gray-700">${elm.title}</h1>
                  <p class="descr-h1 text-gray-500 w-[377px] h-10 font-medium text-base leading-5 order-1">${elm.body}</p>
              </div>        
                      `;
      });
      allCards.innerHTML = allCards;
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      throw Error("sth went wrong");
    }
  };

  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
  xhr.send();
}
getTodoCard();
