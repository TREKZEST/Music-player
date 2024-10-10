const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEL = document.getElementById('current-time');
const durationEL = document.getElementById('duration');

// use of querySelector to select anythings like element, id, classes
// here we are targeting to select audio !! element with query selector
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music playlist load
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Calm Down',
        artist: 'Song by Rema',
    },
    {
        name: 'jacinto-2',
        displayName: 'Dreamers',
        artist: 'Jungkook song',
    },
    {
        name: 'jacinto-3',
        displayName: 'Sky Above the Cloud',
        artist: 'Steve Carlos',
    },
    {
        name: 'metric-1',
        displayName: 'The metric',
        artist: 'William Santo',
    },
];


// Check if playing 
let isPlaying = false;


//Play
function playSong() {
    isPlaying = true;
    // .play() and pause() are methods DOM methods
    playBtn.classList.replace('fa-play', 'fa-pause');
    // toggles the title of icon form title to Pause
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or Pause Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `Music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    console.log(songIndex);
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Next Song
function nextSong() {
    console.log(songIndex);
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// ON Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        // console.log(e);
        // object destructing
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        // Update Progress Bar width
        const progressPercent = (currentTime / duration) * 100;
        // console.log(progressPercent);
        // this line changes css prop
        progress.style.width = `${progressPercent}%`;
        // Calculate display for total duration in minutes
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        console.log('minutes :', durationMinutes);
        console.log('Seconds', durationSeconds);
        //displays the total music time  
        // durationEL.textContent = `${durationMinutes} : ${durationSeconds}`

        if (durationSeconds) {
            durationEL.textContent = `${durationMinutes} : ${durationSeconds}`;
        }
        // ******************************************************************
        // Calculate display for total running time 
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }

        //displays the total music time  
        // durationEL.textContent = `${durationMinutes} : ${durationSeconds}`
        if (currentSeconds) {
            currentTimeEL.textContent = `${currentMinutes} : ${currentSeconds}`;
        }

    }
}
// Set Progress Bar
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    console.log('Width', width);
    // there is srcElement , and inside there is a clientWidth: 360 
    const clickX = e.offsetX;
    console.log('ClickX', clickX);
    console.log(music);
    // duration is property of audio/video. returns the value in second. 
    const { duration } = music;
    console.log(music);
    console.log(clickX / width);
    console.log((clickX / width) * duration);
    // jump aroundonto music progress
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);