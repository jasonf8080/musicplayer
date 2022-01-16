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


//open and close songs list
const closeListBtn = document.querySelector('.icon-container.close-btn');
const openListBtn = document.querySelector('.mp-top i');

closeListBtn.addEventListener('click', function(){
    songListPage.classList.remove('active');
})

openListBtn.addEventListener('click', function(){
    songListPage.classList.add('active');
})




const audio = document.getElementById('audio');
const imageElement =  document.querySelector('.img-container img');
const artistElement = document.querySelector('.song-artist');
const titleElement = document.querySelector('.song-title');

const songsListElement = document.querySelector('.song-list-content');

let song = 2;

//get songs data from json
fetch('songs.json')
    .then(res => res.json())
    .then(data => {
        //dynamically add songs to list
        const songs = data;
        console.log(songs);

        let songsList = songs.map(song => 
            `<div class="song-list-item">
            <div class="img-container">
                <img src="${song.image}">
            </div>

            <div class="song-list-info">
                <h3 class="song-list-title">${song.title}</h3>
                <p class="song-list-artist">${song.artist}</p>
            </div>
        </div>`).join('');

        songsListElement.innerHTML = songsList;

        //add song info to player
        /*function uploadSongInfo(){
            const item = songs[song];
            
            audio.src = `${item.title}.mp4`;
            image.src = `${item.image}`;
            artist.textContent = item.artist;
            title.textContent = item.title;
        }

        uploadSongInfo();*/

        //select a song, make song active;
        const songItems = document.querySelectorAll('.song-list-item');

        songItems.forEach(function(songItem){
            songItem.addEventListener('click', function(e){
               if(e.currentTarget = songItem || songItem.children){
                    activeSongItem = e.currentTarget;
                   
                   //change color on active song
                   songItems.forEach(function(songItem){
                        songItem.classList.remove('active');

                        activeSongItem.classList.add('active');
                   })

                   
                   //when a song is selected from list, update song in player;
                   const activeSongImg = activeSongItem.children[0].children[0].src;

                   const activeSongTitle = activeSongItem.children[1].children[0].textContent;
                   const activeSongArtist = activeSongItem.children[1].children[1].textContent;

                   playSelectedSong(activeSongImg, activeSongTitle, activeSongArtist);
                   audio.src = `${activeSongTitle}.mp4`;
                   audio.play();
               } 
            })
        })


    })

 function playSelectedSong(img, title, artist){

     imageElement.src = img;
     titleElement.textContent = title;
     artistElement.textContent = artist; 
 };


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