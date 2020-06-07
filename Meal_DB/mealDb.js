
function getData(displayFunction, firstLetter){
    
    var xhr = new XMLHttpRequest();
    var url = "https://www.themealdb.com/api/json/v1/1/search.php"
    var result = null;
    xhr.open('GET', url + "?f=" + firstLetter)
    xhr.send();

    xhr.onload = function() {
        if( xhr.status === 200 ) {
            result = xhr.response
            displayFunction(result)
        }
        else {
            console.log("Error Code is : " + xhr.status)
        }
    }

}

var printData = function(input){

    input = JSON.parse(input)
    var div = document.getElementById('display')
    var select = document.getElementById('dropDown')

    div.innerHTML = ""
    var h3 = document.createElement('h3')
    h3.innerText = "Choose the recipe of your choice"
    div.append(h3)

    select.innerHTML = ""
    var optnDefault = document.createElement('option')
    optnDefault.innerText = "------------Select your heart's choice :) ------------"
    select.append(optnDefault)

    for( var i = 0; i < input.meals.length; i++ ) {

        var option = document.createElement('option')
        option.innerText = input.meals[i].strMeal
        option.setAttribute('value',input.meals[i].strMeal)
        select.append(option)
    }
    select.style.visibility = 'visible'
    div.append(select)
}

function createCard(displayFunction, item){

    var xhr = new XMLHttpRequest();
    var url = "https://www.themealdb.com/api/json/v1/1/search.php"
    var result = null;
    xhr.open('GET', url + "?s=" + item)
    xhr.send();

    xhr.onload = function() {
        if( xhr.status === 200 ) {
            result = xhr.response
            displayFunction(result)
        }
        else {
            console.log("Error Code is : " + xhr.status)
        }
    }

}

function printCard(input){
    
    input = JSON.parse(input)

    var container  = document.getElementById('container')

    container.innerHTML = ""

    var cont0  = document.createElement('div')
    cont0.setAttribute('id','cont0')

    var cont1  = document.createElement('div')
    cont1.setAttribute('id', 'cont1')

    var divName = document.createElement('div')
    var h3 = document.createElement('h3')   
    h3.innerText = "Name of the Meal Recipe : " + input.meals[0].strMeal
    cont0.append(h3)
    var img = document.createElement('img')
    img.src = input.meals[0].strMealThumb
    img.style.width = "250px"
    divName.append(img) 

    cont1.append(divName)

    var cont2  = document.createElement('div')
    cont2.setAttribute('id','cont2')
    var objIngred = {}
    var objMeasure = {}
    var i = 0
    var j = 0
    var objFinal = {}

    for( key in input.meals[0] ) {
        if( key.slice(0,13) === "strIngredient"  &&  input.meals[0][key] !== "" && input.meals[0][key] !== null ) {
            objIngred[i] = input.meals[0][key]
            i++
        }
    }

    for( key in input.meals[0] ) {
        if( key.slice(0,10) === "strMeasure" && input.meals[0][key] !== "" && input.meals[0][key] !== null ) {
            objMeasure[j] = input.meals[0][key];
            j++;
        }
    }

    var len = Object.keys(objIngred).length;
    
    for( var k = 0; k < len; k++ ) {
        objFinal[objIngred[k]] = objMeasure[k];
    }
    
    var hIngred = document.createElement('h3')
    hIngred.innerText = "The Ingredients : "
    cont2.append(hIngred)

    for( key in objFinal ) {

        var para = document.createElement('p')
        para.innerText = key + " : " + objFinal[key]
        cont2.append(para)
    }

    cont0.append(cont1,cont2)

    var cont3 = document.createElement('div')
    cont3.setAttribute('id','cont3')

    var hRecipe = document.createElement('h3')
    hRecipe.innerText = "The Recipe : "
    var paraRecipe = document.createElement('p')
    paraRecipe.innerText = input.meals[0].strInstructions

    cont3.append(hRecipe,paraRecipe)

    var cont4 = document.createElement('div')
    cont4.setAttribute('id','cont4')

    var ytube = document.createElement('h3')
    ytube.innerText = "Wanna see the Recipe in Youtube???"
    var video = document.createElement('video')
    video.controls = true
    video.width = "700"
    video.height = "350"
    var source = document.createElement('source')
    source.src = input.meals[0].strYoutube + ".mp4"
    source.type = "video/mp4"
    video.append(source)

    cont4.append(ytube,video)
    
    container.append(cont0,cont3,cont4)

}

var btn = document.getElementById('submit')
btn.addEventListener('click', function(){
    var letter = document.getElementById('giveName').value
    getData(printData, letter)
})


var select = document.querySelector('#dropDown')

select.addEventListener('change', function(){
    var selectedMeal = select.value
    createCard(printCard, selectedMeal);
}) 

