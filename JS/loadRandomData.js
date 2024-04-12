const res = [];
console.log('Creo Arrya Comidas')
const getRandoms = async (e) => {
    console.log('Funcion getRandoms');
    e.preventDefault();
    let i = 0;
   while (res.length != 10) {
        console.log('Ejecuatando Peticion');
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        console.log('Tomando Respuesta')
        const  {meals} = await response.json();
        console.log('ID Meal: '+meals[0].idMeal);
        let flag = false;
        for(let i; i < res.length; i++){
            if(res[i] === meals[0].idMeal){
                flag = true;
                break;
            }
        }
        if(!flag){
            res.push(meals[0]);
        }
    }
    console.log(res);
}
window.addEventListener('load',getRandoms);
