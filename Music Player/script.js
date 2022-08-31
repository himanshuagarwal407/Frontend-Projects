var elements = document.querySelectorAll('.song');

var s1 = new Audio();
s1.src = "music/m1.mp3";

var s2 = new Audio();
s2.src = "music/m2.mp3";

var s3 = new Audio();
s3.src = "music/m3.mp3";

var s4 = new Audio();
s4.src = "music/m4.mp3";

var s5 = new Audio();
s5.src = "music/m5.mp3";

var s6 = new Audio();
s6.src = "music/m6.mp3";

var s7 = new Audio();
s7.src = "music/m7.mp3";

var s8 = new Audio();
s8.src = "music/m8.mp3";

var s9 = new Audio();
s9.src = "music/m9.mp3";

var arr= [s1,s2,s3,s4,s5,s6,s7,s8,s9];

function playsong(index){
    arr[index].play();
}

var g=-1
elements.forEach((element,index) => {
    element.addEventListener('click',()=>{
        if(g!=-1)
            arr[g].pause();
        g=index;
        arr[index].play()
    })

    element.addEventListener('dblclick',()=>{
        arr[index].pause()
        g=-1;
    })
 });