const searchMealById = async (e) => {
  e.preventDefault();

  const title = document.querySelector('.title');
  const info = document.querySelector('.info');
  const img = document.querySelector('.img');
  const ingredientsOutput = document.querySelector('.ingredients');
  //Mostrar Informacion de Meal
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
//funcion redirecciona al buscar
function redirect(){
  let input = document.querySelector('.input').value.trim();
  if(input != ""){
    window.location.href = `../HTML/detailByName.html?param=${input}`;
  }
}

window.onload = searchMealById;
document.querySelector('form').addEventListener('submit', redirect);
document.querySelector('.magnifier').addEventListener('click', redirect);


