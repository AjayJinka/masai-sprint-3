
function getData(displayFunction, firstLetter){
    
    var xhr = new XMLHttpRequest();
    var url = "https://www.themealdb.com/api/json/v1/1/search.php"
    console.log(url + "?f=" + firstLetter)
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

    console.log(input)

    var body = document.querySelector('body')
    var div = document.getElementById('display')
    div.innerHTML = ""

    var h3 = document.createElement('h3')
    h3.innerText = "Choose the recipe of your choice"

    div.append(h3)

    for( var i = 0; i < input.meals.length; i++ ) {

        if( i === 0 ) {
            var select = document.createElement('select')
        }
        var option = document.createElement('option')
        option.innerText = input.meals[i].strMeal
        //console.log(option)
        //console.log(input.meals[i].strMeal)
        select.append(option)
    }
    div.append(select)
    body.append(div)
}

var btn = document.getElementById('submit')
btn.addEventListener('click', function(){
    var letter = document.getElementById('giveName').value
    getData(printData, letter)
})