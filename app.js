const modeShiftBtn = document.querySelector('.icon-container.night-mode-icon');
const songListPage = document.querySelector('.song-list-page');

modeShiftBtn.addEventListener('click', function(e){
   songListPage.classList.toggle('night-mode');

   let nightMode = songListPage.classList.contains('night-mode');
   if(nightMode){
       modeShiftBtn.innerHTML = '<i class="lni lni-sun"></i>';
   } else {
       modeShiftBtn.innerHTML = '<i class="lni lni-night"></i>';
   }
});

const audio = document.getElementById('audio');
const image =  document.querySelector('.img-container img');
const artist = document.querySelector('.song-artist');
const title = document.querySelector('.song-title');
const songsListElement = document.querySelector('.song-list-content');

let song = 0;

//get songs data from json
fetch('songs.json')
    .then(res => res.json())
    .then(data => {
        const songs = data;
        console.log(songs);

        let songsList = songs.map(song => 
            `<div class="song-list-item">
            <div class="img-container">
                <img src="https://i1.sndcdn.com/artworks-000114148617-7bjinf-t500x500.jpg">
            </div>

            <div class="song-list-info">
                <h3 class="song-list-title">${song.title}</h3>
                <p class="song-list-artist">${song.artist}</p>
            </div>
        </div>`).join('');


        songsListElement.innerHTML = songsList;

        function uploadSongInfo(){
            const item = songs[song];
            
            audio.src = `${item.title}.mp4`;
            image.src = `${item.title}.jpg`;
            artist.textContent = item.artist;
            title.textContent = item.title;
        }

        uploadSongInfo();
    })


const prevBtn = document.querySelector('.prev-btn');
const playPauseButton = document.querySelector('.play-pause-btn');
const nextBtn = document.querySelector('.next-btn');

playPauseButton.addEventListener('click',  playPauseSong)

function playPauseSong(){
    let playing = playPauseButton.classList.toggle('play');
    if(playing){
       audio.play();
       playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
       audio.pause();
       playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function shiftSong(){
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

nextBtn.addEventListener('click', function(){
    song++;

    if(song > songs.length - 1){
        song = 0;
    }

    uploadSongInfo();
    shiftSong();
})


prevBtn.addEventListener('click', function(){
    song--;

    if(song < 0){
        song = songs.length - 1
    }

    uploadSongInfo();
})