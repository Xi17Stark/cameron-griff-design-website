var texts = ["Architect", "Engineer", "Itterator", "Developer", "Planner"];
var count = 0;

//var x = document.getElementById('#profession');
//x.style.color = '#00FF00';




function changeText() {
    const para = document.getElementById("profession");
    const compStyles = window.getComputedStyle(para);
    //para.textContent = 'my yes' + 'my no'
    
    $("#profession").text(texts[count]);
    count < 3 ? count : count = 0;
    //console.log($("#profession").style.opacity);
    //$("#profession").setPropertyValue( 'opacity', 0.7 );
    //var x = document.getElementById('#profession');
    //x.style.color = '#00FF00';
    //console.log($("#profession").getComputedStyle(em).getPropertyValue("opacity"));
    //console.log(${compStyles.getPropertyValue("font-size")})
    
    //$("#profession").style.opacity = "0.2";
    
    //window.getComputedStyle("#profession").style.opacity = 0.7;
    
    //fadeOut();
    
    //console.log(para.style.opacity);
    
    //var temp = para.style.opacity;
    var temp = para.style.getPropertyValue("opacity");
    
    para.style.opacity = 0.6;
    
     //console.log(temp);
    
    //if(0.5 = 0.5)
    //    {
    //        count == count+1;
    //    }
    
    //setTimeout(function() {
    //    para.style.opacity = 0.7;
    //    
    //}, 100);

}
//var temp = $("#profession").getPropertyValue("opacity");
//console.log($("#profession").getPropertyValue("opacity"));

function fadeOut() {
    
    para.style.opacity = 0.7;
    
}







setInterval(changeText, 1000);