const music = document.querySelector("audio");
const play = document.getElementById("play");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const back = document.getElementById("back");
const fro = document.getElementById("for");

let progress = document.getElementById("meter");
let curr = document.getElementById("current");
let durr = document.getElementById("duration");
const bar = document.getElementById("bar");

const songs = [{
    name: "m1",
    img: "img",
    title: "Pallu Latke",
    artist: "Kriti",
},
{
    name: "m2",
    img: "img1",
    title: "Pallu",
    artist: "Kriti",
},
{
    name: "m3",
    img: "img2",
    title: "Latke",
    artist: "Kriti",
}
]

let isPlaying = false;

const startMusic = ()=>{
    isPlaying=true;
    music.play();
    image.classList.add('anime'); 
    play.classList.replace('fa-play', 'fa-pause');
};

const stopMusic = ()=>{
    isPlaying=false;
    music.pause();
    image.classList.remove('anime');
    play.classList.replace('fa-pause', 'fa-play');
};

play.addEventListener("click", ()=>{
    if(isPlaying){
        stopMusic();}
    else{
        startMusic();}
})

const loadSong = (songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;

    music.src = "music/"+songs.name+".mp3";
    image.src = "images/"+songs.img+".jpg";

    startMusic();
}

music.addEventListener('timeupdate',(event)=>{
    const {currentTime, duration} = event.srcElement;

    let percnt = (currentTime/duration)*100;
    progress.style.width=`${percnt}%`;

    let dMin=Math.floor(duration/60);
    let dSec=Math.floor((duration%60));

    let cMin=Math.floor(currentTime/60);
    let cSec=Math.floor((currentTime%60));

    if(dSec<10)
        dSec=`0${dSec}`;
    if(cSec<10)
        cSec=`0${cSec}`;

    let Fduration = `${dMin}:${dSec}`;
    let FcurrentTime = `${cMin}:${cSec}`;

    if(duration)
        durr.textContent = `${Fduration}`;
    
    curr.textContent = `${FcurrentTime}`;

})

bar.addEventListener('click', (event)=>{
    console.log(event);
    const {duration} = music;
    let move=(event.offsetX/bar.clientWidth)*duration;
    music.currentTime=move;

    console.log(move);
}, true)


let sID=0;
const nextSong = ()=>{
    sID=(sID+1)%songs.length;
    loadSong(songs[sID]);
}
const prevSong = ()=>{
    sID=(sID-1+songs.length)%songs.length;
    loadSong(songs[sID]);
}


music.addEventListener('ended', ()=>{
    nextSong();
});

fro.addEventListener("click", ()=>{
    nextSong()
    
})
back.addEventListener("click", ()=>{
    prevSong();
})