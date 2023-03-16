
// UN OBIECT JSON CU UN ARRAY

// let json = '{ "carti" : [' +
// '{ "nume_autor":"Charlotte Brontë" , "nume_carte":"Jane Eyre", "nr_pagini":"300", "categorii":["romantic", "viata", "roman"], "citita":"true" }, ' +
// '{ "nume_autor":"Affinity Konar" , "nume_carte":"Gemenele de la Auschwitz", "nr_pagini":"400", "categorii":["razboi", "familie"], "citita":"true" } ]}';

var Carti = [ { "nume_autor":"Charlotte Brontë" , 
            "nume_carte":"Jane Eyre", 
            "nr_pagini":"300",
            "categorii":["romantic", "viata", "roman"], 
            "citita":"true"
          },
        {   "nume_autor":"Affinity Konar" , 
            "nume_carte":"Gemenele de la Auschwitz", 
            "nr_pagini":"400", 
            "categorii":["razboi", "familie"], 
            "citita":"true"
        } ]



// efect background

const elements = Array.from(document.querySelectorAll('.fill'));

function fill(item, index) {
  
  const bgColor = getComputedStyle(item).backgroundColor;
  fillLayer = document.createElement('div');
  fillLayer.classList.add('fill-layer');
  item.style.backgroundColor = 'transparent';
  item.style.position = 'relative';
  item.style.overflow = 'hidden';
  setTimeout(function() {
    fillLayer.style.backgroundColor = bgColor;
    item.appendChild(fillLayer);
  }, 500);
  
  
}
elements.forEach(fill);



// CREARE ELEMENT

function creare_elemente(){
    document.body.onclick = function(event){
    // if(event.target==event.currentTarget){

        const elements = Array.from(document.querySelectorAll('.fill'));
    
        function fill(item, index) {
        
            // const bgColor = getComputedStyle(item).backgroundColor,
            fillLayer = document.createElement('div');
            fillLayer.classList.add('fill-layer');
            item.style.backgroundColor = 'transparent';
            item.style.position = 'relative';
            item.style.overflow = 'hidden';
            setTimeout(function() {
                fillLayer.style.backgroundColor = "lightblue";  
                item.appendChild(fillLayer);
            }, index * 1000);
        
        }
        elements.forEach(fill);
        // }

    };

    
    // clear local storage
    // buton->afiseaza lista
    const body=document.getElementById("body");
    const button2 = document.createElement("button");
    var t = document.createTextNode("Lista mea de carti");
    button2.appendChild(t);
    button2.id="button";
    button2.style.margin= 15+"px";
    // culoare random

    setInterval(function () {
        let r,g,b; //intre 0 si 255
        r=Math.random() * 255;
        g=Math.random() * 255;
        b=Math.random() * 255;
        let color="rgb("+r+","+g+","+b+")"; 
        button2.style.backgroundColor=color;
    }, 60000);


    body.appendChild(button2);

    // afisare lista carti
    button2.onclick = function (event) {
        const body=document.getElementById("body");

        const div=document.createElement("div");
        div.style.display="flex";
        div.style.flexDirection="column";

        const p=document.createElement("p");

        // if(window.localStorage.getItem("lista_json"))
        let Carti_afisare=window.localStorage.getItem("lista_json");

        // console. log('retrievedObject: ', JSON.parse(Carti_afisare));

        let obj= JSON.parse(Carti_afisare);
        console.log("carti-parse",obj);
        if(window.localStorage.getItem("dimensiune"))
            var N=window.localStorage.getItem("dimensiune");
        else N=2;
        
        const h4=document.createElement("h4");
        h4.innerText="Lista are "+N+" elemente:";
        div.appendChild(h4);

        if(window.localStorage.getItem("lista_json")){
            for(let i=0; i<N; i++){
                if(obj[i]){
                    p.appendChild(document.createElement("br"));
                    p.innerHTML+=obj[i].nume_autor+", "+obj[i].nume_carte+", pagini: "+obj[i].nr_pagini+", categorii("+obj[i].categorii+"), citita: "+obj[i].citita ;
                    p.appendChild(document.createElement("br"));
                }
                }
        }
        else{
            for(let i=0; i<2; i++){
                p.appendChild(document.createElement("br"));
                p.innerHTML+=Carti[i].nume_autor+", "+Carti[i].nume_carte+", pagini: "+Carti[i].nr_pagini+", categorii("+Carti[i].categorii+"), citita: "+Carti[i].citita ;
                p.appendChild(document.createElement("br"));}
        }
        

        p.style.margin= 5+"px";
        div.appendChild(p);

        // button close
        const p2=document.createElement("p");
        p2.innerHTML="CLOSE";
        p2.style.margin= 5+"px";
        p2.style.backgroundColor="beige";
        p2.style.marginTop="auto";
        p2.onclick = function () {
            // div.style.visibility="hidden";
            location.href = "/home.html";
        };
        div.appendChild(p2);


        div.style.backgroundColor="lightpink";
        div.style.height= "full";
        div.style.width= 500+"px";
        div.style.position="absolute";
        div.style.top=800+"px";
        div.style.textAlign="center";
        
        document.body.appendChild(div);

        event.stopPropagation();
    };
// =====================================

    // buton->ordoneaza lista
    const body2=document.getElementById("body");
    const button = document.createElement("button");
    var t = document.createTextNode("Ordoneaza alfabetic");
    button.appendChild(t);
    button.id="button";
    button.style.marginBottom= 10+"px";
    
    body2.appendChild(button);

    // afisare lista carti
    button.onclick = function (event) {
        const body=document.getElementById("body");

        const div=document.createElement("div");
        div.style.display="flex";
        div.style.flexDirection="column";

        const p=document.createElement("p");

        let Carti_afisare=window.localStorage.getItem("lista_json");

        let obj= JSON.parse(Carti_afisare);
        console.log("carti-parse",obj);
        if(window.localStorage.getItem("dimensiune"))
            var N=window.localStorage.getItem("dimensiune");
        else N=2;
        
        const h4=document.createElement("h4");
        h4.innerText="Lista are "+ N +" elemente:";
        div.appendChild(h4);

        // ordonare
        //Comparer Function    
        function GetSortOrder(prop) {    
            return function(a, b) {    
                if (a[prop] > b[prop]) {    
                    return 1;    
                } else if (a[prop] < b[prop]) {    
                    return -1;    
                }    
                return 0;    
            }    
        }    
    
        obj.sort(GetSortOrder("nume_autor"));    
        // document.write("Sorted Author Names : ");    
        for (var i in obj) {    
            // document.write("<br>" + obj[item].nume_autor); 
            if(obj[i]){
                p.appendChild(document.createElement("br"));
                p.innerHTML+=obj[i].nume_autor+", "+obj[i].nume_carte+", pagini: "+obj[i].nr_pagini+", categorii("+obj[i].categorii+"), citita: "+obj[i].citita ;                
                p.appendChild(document.createElement("br"));
            }   
        } 

        p.style.margin= 5+"px";
        div.appendChild(p);

        // button close
        const p2=document.createElement("p");
        p2.innerHTML="CLOSE";
        p2.style.margin= 5+"px";
        p2.style.backgroundColor="beige";
        p2.style.marginTop="auto";
        p2.onclick = function () {
            // div.style.visibility="hidden";
            location.href = "/home.html";
        };
        div.appendChild(p2);


        div.style.backgroundColor="lightpink";
        div.style.height= "full";
        div.style.width= 500+"px";
        div.style.position="absolute";
        div.style.top=800+"px";
        div.style.textAlign="center";
        
        document.body.appendChild(div);

        event.stopPropagation();
    };

// ======================================

    // buton
    const body3=document.getElementById("body");
    const button3 = document.createElement("button");
    var t = document.createTextNode("Carti citite");
    button3.appendChild(t);
    button3.id="button";
    button3.style.marginBottom= 10+"px";
    
    body3.appendChild(button3);

    // afisare lista carti
    button3.onclick = function (event) {
        const body=document.getElementById("body");

        const div=document.createElement("div");
        div.style.display="flex";
        div.style.flexDirection="column";

        const p=document.createElement("p");

        let Carti_afisare=window.localStorage.getItem("lista_json");

        let obj= JSON.parse(Carti_afisare);
        
        const h4=document.createElement("h4");
        h4.innerText="Cartile citite sunt:";
        div.appendChild(h4);

        var filtered = obj.filter(a => a.citita.toUpperCase() == "TRUE");
        for (var i in filtered) {    
            if(filtered[i]){
                p.appendChild(document.createElement("br"));
                p.innerHTML+=filtered[i].nume_autor+", "+obj[i].nume_carte;                
                p.appendChild(document.createElement("br"));
            }   
        } 
        
        p.style.margin= 5+"px";
        div.appendChild(p);

        // button close
        const p2=document.createElement("p");
        p2.innerHTML="CLOSE";
        p2.style.margin= 5+"px";
        p2.style.backgroundColor="beige";
        p2.style.marginTop="auto";
        p2.onclick = function () {
            // div.style.visibility="hidden";
            location.href = "/home.html";
        };
        div.appendChild(p2);


        div.style.backgroundColor="lightpink";
        div.style.height= "full";
        div.style.width= 500+"px";
        div.style.position="absolute";
        div.style.top=800+"px";
        div.style.textAlign="center";
        
        document.body.appendChild(div);

        event.stopPropagation();
    };

// ======================================


    const delete_button=document.getElementById("delete_all");
    delete_button.addEventListener("click",delete_storage);

    document.addEventListener("keydown", elimina_carte);

}
creare_elemente();

// butonul de delete
function delete_storage(event){
    window.localStorage.clear();
    event.stopPropagation();
}

// butonul de pop()
function pop(){
    let Carti_afisare=window.localStorage.getItem("lista_json");
    let obj= JSON.parse(Carti_afisare);
    console.log("init",obj);
    obj.pop();
    console.log("init2",obj);
    let N=window.localStorage.getItem("dimensiune");
    N--;
    window.localStorage.setItem("dimensiune",N);
    window.localStorage.setItem("lista_json", JSON.stringify(obj));
}


//preluare text din text-box
function elimina_carte(e){
    if(e.key=="Enter"){
        const input=document.getElementById("delete_elem");
        const valoare=input.value;
        let N=window.localStorage.getItem("dimensiune");
        if(/^([0-9]+)$/.test(input.value)===true){
            if(valoare<=N){
                let Carti_afisare=window.localStorage.getItem("lista_json");
                let obj= JSON.parse(Carti_afisare);
                // console.log("init",obj);
                obj.splice(valoare,1);
                // delete obj[valoare];
                // console.log(obj);
                let N=window.localStorage.getItem("dimensiune");
                N--;
                window.localStorage.setItem("dimensiune",N);
                window.localStorage.setItem("lista_json", JSON.stringify(obj));

            }
            else alert("valoare prea mare");}
        else alert("nu ati introdus un numar");
    }
    // e.stopPropagation();
}

function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());

    // console.log(value);
    if(window.localStorage.getItem("lista_json")){
        let lista=window.localStorage.getItem("lista_json");
        var dimensiune=JSON.parse(lista).length;
        // console.log(dimensiune);
        Carti=JSON.parse(lista)
        Carti.push(value);
        dimensiune++;
        // console.log(dimensiune);
        // console.log(JSON.parse(lista));
    }
    else{
        Carti.push(value);
        dimensiune=3;
    }
    
    // dimensiune lista
    window.localStorage.setItem("dimensiune", dimensiune);

    // pun in local storage
    window.localStorage.setItem("lista_json", JSON.stringify(Carti));


    // const div=document.createElement("div");
    // div.innerText={value};
    
    // var obj= JSON.stringify(value);
    // console.log(obj);
        // var lenght=Object.keys(obj).length;
        // for(let i=0; i<2; i++){
        //     div.appendChild(document.createElement("br"));
        //     div.innerText+=value[i];
        //     // div.innerHTML+=Carti[i].nume_carte+", de "+Carti[i].nume_autor+", pagini: "+Carti[i].nr_pagini+", categorii("+Carti[i].categorii+"), citita: "+Carti[i].citita ;
        //     div.appendChild(document.createElement("br"));
        // }
    
        // document.body.appendChild(div);
}

  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
//   form.addEventListener('click', event => event.preventDefault());