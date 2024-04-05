const searchmeal = async (e) => {
    e.preventDefault();

    const input = document.querySelector('.input');
    const title = document.querySelector('.input');
    const info = document.querySelector('.input');
    const img = document.querySelector('.input');
    const ingredientsOutput = document.querySelector('.input');

    const showAlert = () => {
        alert('Comida no encontrada');
    }

    const fetchMealData = async (val) =>{
        const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
        );

        const {meals} = await res.json();
        return meals;
    }

    const val = input.input.value.trim();

    if (val) {
        const meals = await fetchMealData(val);
    }

    if(!meals){
        showAlert();
        return;
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', searchmeal);

const magnifier =  document.querySelector('magnifier');
magnifier.addEventListener('click', searchmeal);

