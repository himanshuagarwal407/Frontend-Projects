var heading = document.getElementById("colourValue");

function setButtonColour(button, red, green, blue){
    button.setAttribute('style',
    'background-color: rgb('+red+','+green+','+blue+');'
    );
}


function main(){

    var buttons = document.getElementsByClassName('colourButton');
    var ansButton = Math.round(Math.random()* (buttons.length-1));
    var ansMessage = document.getElementById('answer');
    ansMessage.innerHTML = " ";
    document.body.style.backgroundColor = 'white';

    for (var i=0; i<buttons.length; i++){
        var r=Math.floor(Math.random()*255);
        var g=Math.floor(Math.random()*255);
        var b=Math.floor(Math.random()*255);
        
        setButtonColour(buttons[i],r,g,b);
        
        if(i===ansButton){
            heading.innerHTML = `RGB value: (${r}, ${g}, ${b})`;
            var x=r;
            var y=g;
            var z=b;
        }
        
        buttons[i].addEventListener('click',function(){
            if(this === buttons[ansButton]){
                ansMessage.innerHTML="Correct!";
                document.body.style.backgroundColor = 'rgb('+x+','+y+','+z+')' ;
                
            }else{
                ansMessage.innerHTML="Wrong answer! Guess Again";
                document.body.style.backgroundColor = 'white';
            }
        });
    }
}

main();
    
var Reset = document.getElementById('resetButton');
Reset.addEventListener("click",main);