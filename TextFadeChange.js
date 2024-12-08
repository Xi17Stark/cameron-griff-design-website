var text = ["Architect", "Engineer", "Iterator", "Developer", "Planner"];
var counter = 0;
//var elem = document.getElementById("changeText");
var para = document.getElementById("profession");
setInterval(change, 4300);
setInterval(changer, 1800);

function change() {
    
    //elem = $("#profession");
    
    para = document.getElementById("profession");
    
    //para.classList.add('hide');
    setTimeout(function () {
        
       //para.innerHTML = text[counter];
        
        counter++;
        if (counter >= text.length) {
            counter = 0;
        }
        
       $(para)
        .fadeOut(400)
        .delay(500);
        
        //para.classList.remove('hide');
        
        
        console.log(counter);
        console.log(text[counter]);
        
        
        $(para)
         .delay(200)
         .delay(400)
         .fadeIn(400);
         //.html(text[counter]);
        
        //$("#profession").text(text[counter]);
        
    }, 0);
    
    
    
    
}

function changer() {

    $("#profession").text(text[counter]);
    
}