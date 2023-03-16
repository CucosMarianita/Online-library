function Element(parametru){
    window.location.href="http://localhost:3000/"+parametru;
}

function Elimina(){
    let index=document.getElementById("index")
    let obj3={'index2':index.value}
    obj3=JSON.stringify(obj3)
    let settings={method:"DELETE",headers:{"Content-Type":"application/json"},body:obj3}
    fetch("http://localhost:3000/delete",settings)
}


let array
function Afisare(){
    fetch("http://localhost:3000/sendObject")
    .then((response)=>response.json())
    .then(function(response){
        let elem=document.getElementById("afisare1")
        let array=response
        console.log(array)
        let varrr=JSON.stringify(array).split("}").length-1
        elem.innerHTML="<h2>Conturile mele:</h2>\n"
        console.log(varrr)
        // elem.innerHTML="<h3>Tickets:</h3>\n"
        for(let i=0; i<varrr; i++){
            let p=document.createElement("p")  
            p.innerHTML="<h4>Username "+(i+1)+" :</h4>"
            p.append(JSON.stringify(array[i].username))
            elem.append(p)
            let p1=document.createElement("p")  
            p1.innerHTML="<h4>Email "+(i+1)+" :</h4>"
            elem.append(p1)
            elem.append(JSON.stringify(array[i].email))
                    
            elem.append(document.createElement('br'))
            elem.append(document.createElement('br'))
            elem.append(document.createElement('br'))

        }
    })
}


function Informatii(){
    let input=document.getElementById("username")
    let index=document.getElementById("index")
    // for(let i=0; i<input.length; i++){
    //     let string=input[i].getAttribute("name")
    //     if(string!="index")
    //     objbaza[string]=input[i].value
    // }
    let obj3={'index':index.value,"obiect111":input.value}
    obj3=JSON.stringify(obj3)
    let settings={method:"PATCH",headers:{"Content-Type":"application/json"},body:obj3}
    fetch("http://localhost:3000/update",settings)
    // .then(response=>response.json())
    // .then(function(response))
    console.log(input.value,index.value)
}




