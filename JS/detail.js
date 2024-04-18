//Funcion que Muetra Data
const showMealInfo = (meal) => {
  const title = document.querySelector('.title');
  const info = document.querySelector('.info');
  const img = document.querySelector('.img');
  const ingredientsOutput = document.querySelector('.ingredients');
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
//Funcion que busca por ID
const searchMealById = async (e) => {
  e.preventDefault();

  const title = document.querySelector('.title');
  const info = document.querySelector('.info');
  const img = document.querySelector('.img');
  const ingredientsOutput = document.querySelector('.ingredients');
  //Mostrar Informacion de Meal

  //if mode = false => SearchById
  const fetchMealData = async (val) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${val}`
    );
    const { meals } = await res.json();
    return meals[0];
  }
  //LOGICA DE FUNCION EMPIEZA AQUI

  //Obtener Parametro ID de la URL
  const val = new URLSearchParams(window.location.search).get('id');
  //Hacer Consulta
  const meals = await fetchMealData(val);
  //Mostrar Alerta si no se encuentran resultados
  if (!meals) {
    showAlert();
    return;
  }
  //Mostrar Informacion
  showMealInfo(meals);
};
//Funcion que busca por Nombre
const searchMealByName = async (e) => {
  e.preventDefault();

  const input = document.querySelector('.input');

  //Funcion que genera Aleatorios
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //Funcion fetch por nombre
  const fetchMealData = async (val) => {
    let res;
    //Segun si se quiere buscar por ID o por Nombre
    res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
    );

    const { meals } = await res.json();
    return meals[getRandomNumber(0, meals.length)];
  };
  //Declara valriable para busqueda
  let val = "";

  //Crea Objeto URLSearchParam para manejar los parametros
  let paramManeger = new URLSearchParams(window.location.search);

  //Si hay valor en Barra de Busqueda usalo de parametro
  if (input.value != "") {   
    //Modifica paramManager
    paramManeger.set('param',input.value.trim());

    //Guarda parametro en variable para busqueda 
    val = paramManeger.get('param', input.value.trim());
  }
  //Si hay valores para buscar
  if (val) {
    //Realiza busqueda con variable
    const meals = await fetchMealData(val);
    if (!meals) {
      showAlert();
      return;
    }
    paramManeger.set('id',meals.idMeal);

    window.location.search = paramManeger.toString();
    showMealInfo(meals);
  } else {
    alert("Please try searching for meal :)");
  }
  //document.querySelector('.input').value = "";
};
window.onload = searchMealById;
document.querySelector('form').addEventListener('submit', searchMealByName);
document.querySelector('.magnifier').addEventListener('click', searchMealByName);