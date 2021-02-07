
window.addEventListener('load', function () {
    //alert("It's loaded!")

    txtfield = document.getElementById("txtfield")


    //https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
    txtfield.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      clickbtn();
    }
  });
  })



function clickbtn() {
    var x  = document.getElementById("txtfield").value;
    
    if (x.length > 0) {
        make_request(x)
    }
}

function make_request(x){
    const url  = "https://api.themoviedb.org/3/search/person?api_key=0786e239a118f91a65306daa6567c1fd&query=" + x
    
    //Send request
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    //Forward response handling
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {    
            
            ans = JSON.parse(Http.responseText)
            
            if (ans.results.length == 0){
                console.log(x)
                n = x.length
                if ( x.search(" ") != -1 ){
                    n = x.lastIndexOf(" ")
                }
                else {
                    console.log(n)
                    n = Math.floor(x.length / 2) + 1
                }
                
                modValue = x.slice(0, n)
                console.log(modValue)
                document.getElementById("txtfield").value = modValue
            
                make_request(modValue)

            }
            else {
                console.log(ans)
                process(ans.results)
            }
        }

    }    

}

function checker(txt){
    for (var i; i < txt.length; i++){
        dept = txt[i].known_for_department
        if ("Production Acting Writing Sound".search(dept) == -1) {
            console.log("T", dept)
        }
        
    }
}

function process(txt){
    
    checker(txt)

    pickPerson = Math.floor(Math.random() * (txt.length) )
    person = txt[pickPerson]
    //console.log(txt.length, pickPerson, person)

    //Their name
    fname = person.name

    //A work they were involved with
    pickWork = Math.floor(Math.random() * (person.known_for.length) )
    var work
    try {
        work = person.known_for[pickWork].title
    } catch (error) {}
    if (work == undefined){
        work = person.known_for[pickWork].name  
    }
    else {
        console.log(person, person.known_for[pickWork])
    }
    //Formatting
    switch (person.known_for[pickWork].media_type){
        case "tv":
            work = "the tv show \"" + work
            break
        case "movie":
            work = "the movie \"" + work
            break
    }
    //console.log(person.known_for.length, pickWork, work, person.known_for.media_type)


    //What kind of work
    role = person.known_for_department 
    info = ""
    //Formatting
    switch (role){
        case "Production":
            info = "worked in production for" 
            break
        case "Acting":
            info = "acted in"
            break
        case "Writing":
            info = "was a writer for"
            break
        case "Sound":
            info = "worked in sound design for"
            break
        case "Editing":
            info = "worked in editing for"
            break
    }
    //console.log(info)


    //combine information
    full_ans  = `${fname} ${info} ${work}".`
    console.log("response: ", full_ans)
    display(fname, full_ans)
}


function display(name, txt){
    txtfield = document.getElementById("txtfield")
    ansfield = document.getElementById("ansfield");

    if ("undefined".search(txt) == -1 ){
        txtfield.value = "Team #15"
        ansfield.value = "The person who made this put way too much effort into it, for something that's just utterly useless";
        return
    }
    ansfield.value = txt
    
    if (name.search(txtfield.value) == -1 ){
        txtfield.value = name
    }

}


//////////////////////////////Notes


/*
const url  = "https://api.themoviedb.org/3/search/person?api_key=0786e239a118f91a65306daa6567c1fd&query=" + x

const Http = new XMLHttpRequest();
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {

    console.log(Http.responseText.results)
}
*/






/*
console.log("H")
console.log(txt.results.length)

pickPerson = Math.floor(Math.random() * (txt.results.length) )
person = txt.results[pickPerson]
console.log(txt.results.length, pickPerson, person)

//Their name
fname = person.name

//A work they were involved with
pickWork = Math.floor(Math.random() * (person.known_for.length) )
var work = person.known_for[pickWork].title
console.log(person.known_for[pickWork])
if (work == undefined) {
    work = person.known_for[pickWork].name
}
var tmp = ""
//Formatting
switch (person.known_for[pickWork].media_type){
    case "tv":
        work = "the tv show \"" + work
        break
    case "movie":
        work = "the movie \"" + work
}
console.log(person.known_for.length, pickWork, work, person.known_for.media_type)

//What kind of work
role = person.known_for_department 
info = ""
//Formatting
switch (role){
    case "Production":
        info = "worked in production for" 
        break
    case "Acting":
        info = "acted in"
        break
    case "Writing":
        info = "was a writer for"
}
console.log(info)


//combine information
x  = `${fname} ${info} ${work}"`
console.log(x)


/*
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b}.`);

for (var i = 0; i < person.known_for.length; i++) {
    console.log(person.known_for[i].title);
    //

}*/


