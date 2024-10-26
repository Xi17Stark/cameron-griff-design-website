//const dynamicText = document.querySelector("h1_5 span");
//const dynamicText2 = document.getElementById("changeWord");



const words = ["Architect","Designer","Engineer","itterator" ];

let wordIndex = 0;
let charIndex = 1;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    console.log(currentChar);
    //dynamicText.textContent = currentChar;
    //document.getElementById("changeWord").textContent="newText";
    
    const el = document.querySelector('changeWord');
    console.log(el.textContent);
    
    console.log(currentChar);
    
    
    //const span = document.getElementById("changeWord");
    //const txt = document.createTextNode("test");
    //span.appendChild(txt);
    
    $("changeWord").text("new_value");
};

typeEffect();
