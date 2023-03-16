
// MODIFICARE STYLE:

// window.onload(schimbare_fundal);
function schimbare_fundal(){
    // document.body.style.backgroundColor="bisque";
    document.getElementById("recomandari").style.border="5px dotted pink";
}
schimbare_fundal();

// DARK MODE
function darkmode(){
    var element = document.body;
    element.classList.toggle("dark_mode");
}

//STERGERE ELEMENT 

let carti = document.getElementById('carti');
carti.removeChild(carti.lastElementChild);


// event click
function catre_carti(){
    carte1=document.getElementById("carte1");
    carte1.addEventListener("click", function() {
        location.href = "./carte1.html";
    });
    carte2=document.getElementById("carte2");
    carte2.onclick = function () {
        location.href = "./carte2.html";
    }; 
    carte3=document.getElementById("carte3");
    carte3.onclick = function () {
        location.href = "./carte3.html";
    }; 
    carte4=document.getElementById("carte4");
    carte4.onclick = function () {
        location.href = "./carte4.html";
    };
}

catre_carti();