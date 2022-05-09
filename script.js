let songName = document.querySelector(".songName");
let selectSong = document.querySelector(".selectSong");
let musicPlayer = document.querySelector(".musicPlayer");
let songsCont = document.querySelector(".songsCont");
let thumbnail = document.querySelector(".pic");
let progress = document.querySelector(".progress");
let playBtn = document.querySelector(".playBtn");
let prevBtn = document.querySelector(".prevBtn");
let nextBtn = document.querySelector(".nextBtn");
let songDuration = document.querySelector(".songDuration");
let currDuration = document.querySelector(".currDuration");
let audioFlag = false;
let audioElem = new Audio("songs/1.mp3");
let cSongIdx = 0;
songName.innerHTML = songs[0].songName;
thumbnail.setAttribute("src",songs[0].coverPath)
const handleSelectedSong = (i)=>{
    if(i==songs.length) i = 0;
    audioElem.pause();
    audioElem = new Audio(songs[i].filePath);
    audioElem.play();
    audioFlag = true;
    playBtn.innerHTML = "pause";
    cSongIdx = i;
    thumbnail.setAttribute("src",songs[i].coverPath);
    songName.innerHTML = songs[i].songName;
     
    audioElem.addEventListener('timeupdate',()=>{
        let progressVal = (audioElem.currentTime/audioElem.duration)*100;
        progress.value = progressVal;
        if(audioElem.currentTime == audioElem.duration){
            handleSelectedSong(cSongIdx+1);
        }
        let min = Math.floor(parseInt(audioElem.duration)/60);
        let sec = Math.floor(parseInt(audioElem.duration)%60);
        let cmin = Math.floor(parseInt(audioElem.currentTime)/60);
        let csec = Math.floor(parseInt(audioElem.currentTime)%60);
        if(min<=9) min ="0"+min
        if(cmin<=9) cmin = "0"+cmin;
        if(csec<=9) csec = "0"+csec;
        if(sec<=9) sec = "0"+sec;
        currDuration.innerHTML = cmin+":"+csec;
        songDuration.innerHTML = min+":"+sec;
    })

    selectSong.classList.add("hidden");
    musicPlayer.classList.remove("hidden");
}
progress.addEventListener("change",()=>{
    audioElem.currentTime = (progress.value * audioElem.duration)/100;
})
prevBtn.addEventListener("click",()=>{
    cSongIdx = cSongIdx-1;
    if(cSongIdx==-1) cSongIdx=songs.length-1;
    handleSelectedSong(cSongIdx);
    
})
nextBtn.addEventListener("click",()=>{
    cSongIdx = cSongIdx+1;
    if(cSongIdx==songs.length) cSongIdx=0;
    handleSelectedSong(cSongIdx);
    
})


playBtn.addEventListener("click",()=>{
if(!audioFlag){
     audioElem.play();
     audioFlag = !audioFlag;
     playBtn.innerHTML = "pause"; 
    }else{
        audioElem.pause();
        audioFlag = !audioFlag;
        playBtn.innerHTML = "play_arrow"; 
} 
})
songs.map((m,i)=>{
    let songCover = document.createElement('div');
    songCover.innerHTML = `<div class="relative border-2 border-black-900 bg-cover rounded md:w-[180px] w-[150px] hover:scale-110  ease-in-out duration-300 bg-full h-[25vh] m-2 bg-[url(${m.coverPath})] text-white flex items-end justify-center">
    <Button class="material-icons absolute top-7 opacity-1 text-3xl p-2  mx-1 my-6 rounded-xl bg-black text-white hover:bg-green-500 hover:text-black hover:scale-110  ease-in-out duration-300" >play_arrow</Button>
    <div class="text-sm text-center bg-black w-full py-1">${m.songName.slice(0,21)}</div></div>`
    songsCont.append(songCover);
    songCover.addEventListener("click",()=>handleSelectedSong(i));
})


const handlePrev = (m,i)=>{
    audioElem.pause();
    audioElem = new Audio(songs[i-1].filePath);
    audioElem.play();
    audioFlag = true;
    playBtn.innerHTML = "pause";
}


