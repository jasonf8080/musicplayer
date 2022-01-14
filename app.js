const songs = [
    {
        title: 'Selfish',
        artist: 'BLXST FT. Bino Readeaux',
    },

    {
        title: 'First Time',
        artist: 'ILLENIUM, iann dior',
    },

    {
        title: 'Phone Numbers',
        artist: 'Dominic Fike, Kenny Beats',
    },
];
const audio = document.getElementById('audio');
const imgContainer = document.querySelector('.img-container');
const image =  document.querySelector('.img-container img');
const artist = document.querySelector('.song-artist');
const title = document.querySelector('.song-title');

imgContainer.addEventListener('click', function(){
    audio.play();
})


let song = 0;

function uploadSongInfo(){
    const item = songs[song];
    
    audio.src = `${item.title}.mp4`;
    image.src = `${item.title}.jpg`;
    artist.textContent = item.artist;
    title.textContent = item.title;
}

uploadSongInfo();

const prevBtn = document.querySelector('.prev-btn');
const playPauseButton = document.querySelector('.play-pause-btn');
const nextBtn = document.querySelector('.next-btn');

playPauseButton.addEventListener('click', function(){
    let playing = playPauseButton.classList.toggle('play');

    if(playing){
       audio.play();
       playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
       audio.pause();
       playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }

})

nextBtn.addEventListener('click', function(){
    song++;

    if(song > songs.length - 1){
        song = 0;
    }

    uploadSongInfo();

})


prevBtn.addEventListener('click', function(){
    song--;

    if(song < 0){
        song = songs.length - 1
    }

    uploadSongInfo();
})