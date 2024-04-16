const loadData = async (e) => {
    e.preventDefault
    const favContainer= document.querySelector('main');
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
    function toggleFav(btn){
        let id = parseInt(btn.getAttribute('data-idMeal'));
        if(fav.includes(id)){
            fav.splice(fav.indexOf(id), 1);
            btn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        }else{
            fav.push(id);
            btn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        }
        console.log(fav)
    }

    // --LA LOGICA DE LA FUNCION COMIENZA AQUI-- //

    const data = await getRandoms();
    createNodeItem(data);
    let fav = [];
    let btns = document.querySelectorAll('.favbutton');
    for (let i = 0; i < btns.length; i++){
        btns[i].addEventListener('click',function(){
            toggleFav(btns[i]);
        })
    }
}

window.addEventListener('load', loadData);