const searchmeal = async (e) => {
  e.preventDefault();

  const input = document.querySelector('.input');
  const title = document.querySelector('.title');
  const info = document.querySelector('.info');
  const img = document.querySelector('.img');
  const ingredientsOutput = document.querySelector('.ingredients');
  // Funcion que muestra
  const showMealInfo = (meal) => {
    const { strMeal, strMealThumb, strInstructions } = meal;
    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    const html = document.createElement('span')
    html.innerHTML = `${ingredients.map((ing) => `<li class="ing">${ing}</li>`).join("")}`;

    ingredientsOutput.appendChild(html);
  };
  //Funcion de Alerta
  const showAlert = () => {
    alert('Comida no encontrada');
  }
  //Funcion que genera Aleatorios
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //Funcion que solicita data
  const fetchMealData = async (val, mode) => {

    let res;
    //Segun si se quiere buscar por ID o por Nombre
    if (mode) {
      res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
      );
    } else {
      res = await fetch(
        `www.themealdb.com/api/json/v1/1/lookup.php?i=${val}`
      );
    }
    const { meals } = await res.json();
    return meals[getRandomNumber(0, meals.length)];
  };
  //Si hay valor en Barra de Busqueda usalo de parametro
  if (input.value != "") {
    window.location.search = `param=${input.value.trim()}&id=na`;
  }
  //Obten el parametro para la busqueda
  let val = new URLSearchParams(window.location.search).get('param');
  console.log(val)
  //
  if (val) {
    const meals = await fetchMealData(val, true);
    if (!meals) {
      showAlert();
      return;
    }
    showMealInfo(meals);
  } else {
    alert("Please try searching for meal :)");
  }
  //document.querySelector('.input').value = "";
};


document.querySelector('form').addEventListener('submit', searchmeal);
document.querySelector('.magnifier').addEventListener('click', searchmeal);
window.addEventListener('load', searchmeal)

