let btn = document.getElementById("navBtn");
let nav = document.getElementById("sideNav");
let rowData = document.getElementById("rowData");
let contactSec = document.getElementById("contactSec");
let searchSec = document.getElementById("searchSec");
let btnClose = document.querySelector(".btn-close");
let loader = document.querySelector(".loader-overlay");

document.getElementById("searchBtn").addEventListener("click", () => {
  closeNav();
  rowData.innerHTML = "";
  contactSec.classList.add("d-none");
  searchSec.classList.remove("d-none");
  document.querySelector(".info").classList.add("d-none");
});
function openNav() {
  $(".sideContainer").animate(
    {
      left: 0,
    },
    500
  );
  $("#navBtn").addClass("fa-x");
  $("#navBtn").removeClass("fa-align-justify");
}
function closeNav() {
  let boxWidth = $(".sideContainer .nav-tabs").outerWidth();
  $(".sideContainer").animate(
    {
      left: -boxWidth,
    },
    500
  );
  $("#navBtn").addClass("fa-align-justify");
  $("#navBtn").removeClass("fa-x");
}
$("#navBtn").click(() => {
  if ($(".sideContainer").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});
async function getApi(attr) {
  loader.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${attr}`
  );
  response = await response.json();
  display(response.meals);
  loader.classList.add("d-none");
}
function display(array) {
  let box = ``;
  for (let i = 0; i < array.length; i++) {
    box += `
            <div class="col">
                <div onclick="getMealDetails('${array[i].idMeal}')" class="inner position-relative overflow-hidden rounded-3 cursor-pointer">
                    <img src="${array[i].strMealThumb}" class="w-100 " alt="">
                    <div class="img-layer position-absolute  w-100 h-100 d-flex align-items-center ">
                        <h3>${array[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        
        `;
  }
  rowData.innerHTML = box;
}
getApi("a");

async function getCategories() {
  loader.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  loader.classList.add("d-none");
}

function displayCategories(arr) {
  let box = ``;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].strCategory == "Pork") {
      continue;
    } else {
      box += `
      <div class="col">
                <div onclick="getCategoryMeals('${
                  arr[i].strCategory
                }')" class="inner position-relative overflow-hidden rounded-3 cursor-pointer">
                    <img src="${arr[i].strCategoryThumb}" class="w-100 " alt="">
                    <div class="img-layer position-absolute  w-100 h-100 d-flex flex-column align-items-center ">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 10)
                          .join(" ")}</p>
                    </div>
                </div>
            </div>
    `;
    }

    rowData.innerHTML = box;
  }
}
document.getElementById("categoryBtn").addEventListener("click", () => {
  searchSec.classList.add("d-none");
  contactSec.classList.add("d-none");
  rowData.innerHTML = "";
  document.querySelector(".info").classList.add("d-none");
  closeNav();
  getCategories();
});

async function getArea() {
  loader.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  loader.classList.add("d-none");
}
function displayArea(arr) {
  let box = "";
  for (let i = 0; i < arr.length; i++) {
    box += `
    <div class="col">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="inner text-center position-relative overflow-hidden rounded-3 cursor-pointer">
                    <i class="text-light fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="text-light" >${arr[i].strArea}</h3>
                </div>
            </div>
    `;
    rowData.innerHTML = box;
  }
}
document.getElementById("areaBtn").addEventListener("click", () => {
  searchSec.classList.add("d-none");
  contactSec.classList.add("d-none");
  rowData.innerHTML = "";
  document.querySelector(".info").classList.add("d-none");
  closeNav();
  getArea();
});
async function getIngredients() {
  loader.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));
  loader.classList.add("d-none");
}

function displayIngredients(arr) {
  let box = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].strIngredient == "Pork" || arr[i].strIngredient == "Bacon") {
      continue;
    } else {
      box += `
    <div class="col">
                <div onclick="getIngredientsMeals('${
                  arr[i].strIngredient
                }')" class="inner text-center position-relative overflow-hidden rounded-3 cursor-pointer">
                    <i class="text-light  fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="text-light" >${arr[i].strIngredient}</h3>
                        <p class="text-light">${arr[i].strDescription
                          .split(" ")
                          .slice(0, 10)
                          .join(" ")}</p>
                </div>
            </div>
    `;
    }
  }
  rowData.innerHTML = box;
}
document.getElementById("ingredientsBtn").addEventListener("click", () => {
  searchSec.classList.add("d-none");
  contactSec.classList.add("d-none");
  rowData.innerHTML = "";
  document.querySelector(".info").classList.add("d-none");
  closeNav();
  getIngredients();
});

async function getCategoryMeals(attr) {
  rowData.innerHTML = "";
  loader.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${attr}`
  );
  response = await response.json();
  display(response.meals.slice(0, 10));
  loader.classList.add("d-none");
}

async function getAreaMeals(attr) {
  rowData.innerHTML = "";
  loader.classList.remove("d-none");
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${attr}`
  );
  response = await response.json();
  display(response.meals.slice(0, 20));
  loader.classList.add("d-none");
}
async function getIngredientsMeals(attr) {
  rowData.innerHTML = "";
  loader.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${attr}`
  );
  response = await response.json();
  display(response.meals.slice(0, 20));
  loader.classList.add("d-none");
}
async function getMealDetails(id) {
  closeNav();
  rowData.innerHTML = "";
  loader.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response = await response.json();
  displayMealDetails(response.meals[0]);
  loader.classList.add("d-none");
}
function displayMealDetails(meal) {
  // searchContainer.innerHTML = "";

  let ingredients = ``;

  for (let i = 0; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `
            <li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${
        meal[`strIngredient${i}`]
      }</li>
            `;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let box = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="food_image">
                    <h2 class="text-light">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2 class="text-light">Instructions</h2>
                <p class="text-light">${meal.strInstructions}</p>
                <h3 class="text-light"><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3 class="text-light"><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3 class="text-light">Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3 class="text-light">Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  document.querySelector(".info").classList.remove("d-none");
  document.getElementById("infoWrapper").innerHTML = box;
}
btnClose.addEventListener("click", () => {
  document.querySelector(".info").classList.add("d-none");
  getApi("a");
});

async function searchByName(term) {
  closeNav();
  rowData.innerHTML = "";
  loader.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  response.meals ? display(response.meals) : display([]);
  loader.classList.add("d-none");
}

async function searchFilter(term) {
  closeNav();
  rowData.innerHTML = "";
  loader.classList.remove("d-none");
  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  response.meals ? display(response.meals) : display([]);
  loader.classList.add("d-none");
}
document.getElementById("searchName").addEventListener("keyup", () => {
  searchByName(document.getElementById("searchName").value);
});
document.getElementById("searchFilter").addEventListener("keyup", () => {
  searchFilter(document.getElementById("searchFilter").value);
});
document.getElementById("contactBtn").addEventListener("click", () => {
  closeNav();
  contactSec.classList.remove("d-none");
  searchSec.classList.add("d-none");
  rowData.innerHTML = "";
});

const inputFields = [
  {
    id: "nameInput",
    touched: false,
    validator: nameValidation,
    alertId: "nameAlert",
  },
  {
    id: "emailInput",
    touched: false,
    validator: emailValidation,
    alertId: "emailAlert",
  },
  {
    id: "phoneInput",
    touched: false,
    validator: phoneValidation,
    alertId: "phoneAlert",
  },
  {
    id: "ageInput",
    touched: false,
    validator: ageValidation,
    alertId: "ageAlert",
  },
  {
    id: "passwordInput",
    touched: false,
    validator: passwordValidation,
    alertId: "passwordAlert",
  },
  {
    id: "repasswordInput",
    touched: false,
    validator: repasswordValidation,
    alertId: "repasswordAlert",
  },
];

inputFields.forEach((field) => {
  const inputElement = document.getElementById(field.id);
  if (inputElement) {
    inputElement.addEventListener("focus", () => (field.touched = true));
  }
});

function inputsValidation() {
  let allValid = true;

  inputFields.forEach((field) => {
    const inputEl = document.getElementById(field.id);
    const alertEl = document.getElementById(field.alertId);

    if (field.touched) {
      const isValid = field.validator();
      alertEl.classList.toggle("d-none", isValid);
      alertEl.classList.toggle("d-block", !isValid);

      if (!isValid) allValid = false;
    }

    if (!field.validator()) allValid = false;
  });

  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.disabled = !allValid;
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ===
    document.getElementById("passwordInput").value
  );
}
