const loadData = async (e) => {
    e.preventDefault
    const favContainer = document.querySelector('main');
    //Esta funcion obtiene 10 comidas randoms
    async function getRandoms() {
        console.log('getRandom')
        console.log('Funcion getRandoms');
        e.preventDefault();
        let data = [];
        while (data.length != 10) {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const { meals } = await response.json();
            let inArray = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i] === meals[0].idMeal) {
                    inArray = true;
                    break;
                }
            }
            if (!inArray) {
                data.push(meals[0]);
            }
        }
        return data;
    }
    //Esta funcion crea los items de inicio
    async function createNodeItem(data) {
        data.forEach(function (meal) {
            let node = document.createElement('section');
            node.classList.add('receta-del-dia');
            node.innerHTML =
                `<div class="receta-container">
                <a href="../HTML/detail.html?id=${meal.idMeal}">
                    <img src="${meal.strMealThumb}">
                </a>
            </div>
            <div class="receta-info">
                <h3>${meal.strMeal}</h3>
                <button class="favbutton" data-idMeal=${meal.idMeal}>
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>`;
            favContainer.appendChild(node);
        });

    }
    async function createNodeFav(id) {
        //Declara Variable para receta
        let meals;
        //Busca la receta en los datos locales
        for (let i = 0; i < data.length; i++) {
            console.log(id)
            console.log(data[i].idMeal, id)
            if (data[i].idMeal == id) {
                meals = data[i];
                console.log(id)
                console.log('Encontrada')
                break;
            }
            console.log('No encontrada')
        }
        //Si no se encuentra en local hacer solicitud a API
        if (!meals) {
            console.log(`Consulta a API con id = ${id}`)
            const response = await fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const { meals } = await response.json();
            meals = await meals
            console.log(`respuesta de API ${meal}`)
        }

        //Crear Nodo
        const node = document.createElement('div');
        console.log(`Nodo creado ${node}`);
        //Asigna clase        
        node.classList.add('circle-item');
        node.setAttribute('id', meals.idMeal);
        let nombre = meals.strMeal.split(" ")[0];
        //Rellenar Objeto
        node.innerHTML =
            `<a href="../HTML/detail.html?id=${meals.idMeal}">
                <img src="${meals.strMealThumb}">
                <p>${nombre}</p>
            </a>`
            ;
        //Insertar nodo  
        scrollContainer.appendChild(node);
    };
    async function removeNodeFav(id) {
        scrollContainer.removeChild(document.getElementById(id))
    }

    function toggleFav(btn) {
        let id = parseInt(btn.getAttribute('data-idMeal'));
        if (fav.includes(id)) {
            fav.splice(fav.indexOf(id), 1);
            btn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
            removeNodeFav(id)
        } else {
            fav.push(id);
            btn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
            createNodeFav(id)
        }
        console.log(`lista de favoritos ${fav}`)
    }

    // --LA LOGICA DE LA FUNCION COMIENZA AQUI-- //

    const data = await getRandoms();
    console.log(data);
    createNodeItem(data);
    let fav = [];
    const scrollContainer = document.querySelector('.scroll-container');
    let btns = document.querySelectorAll('.favbutton');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
            toggleFav(btns[i]);
        })
    }
}

window.addEventListener('load', loadData);