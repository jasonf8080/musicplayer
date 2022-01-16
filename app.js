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

const playPauseButton = document.querySelector('.play-pause-btn');

//get songs data from json
fetch('songs.json')
    .then(res => res.json())
    .then(data => {
        //dynamically add songs to list
        const songs = data;
        //console.log(songs);

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


        //select a song, make song active;
        const songItems = document.querySelectorAll('.song-list-item');

        songItems.forEach(function(songItem){
            songItem.addEventListener('click', function(e){
               if(e.currentTarget = songItem || songItem.children){//event listener (event bubbled);
                    activeSongItem = e.currentTarget;
                   
                   //change color on active song, while keeping others the same
                   songItems.forEach(function(songItem){
                        songItem.classList.remove('active');
                        activeSongItem.classList.add('active');
                   })

                   
                   //when a song is selected from list, update song in player;
                   const activeSongTitle = activeSongItem.children[1].children[0].textContent;
    
                   for(let i = 0; i < songs.length; i++){
                       if(activeSongTitle === songs[i].title){

                            console.log(songs[i]);
                            let counter = i;
                        
                            playSelectedSong(songs[counter]);


                            //shift to next song
                            const nextBtn = document.querySelector('.next-btn');
                            nextBtn.addEventListener('click', function(){

                                counter++;
                               
                                if(counter > songs.length - 1){
                                    counter = 0;
                                }

                                playSelectedSong(songs[counter]);
                                updateActiveSongInList(songItems, songItems[counter]);
                            });



                            //shift to previous song
                            const prevBtn = document.querySelector('.prev-btn');
                            prevBtn.addEventListener('click', function(){

                                counter--;
                               
                                if(counter < 0){
                                    counter = songs.length - 1;
                                }

                                playSelectedSong(songs[counter]);
                                updateActiveSongInList(songItems, songItems[counter]);
                            });

                       }
                   }  
               } 
            })
        })
    })


    

 function playSelectedSong(item){

     imageElement.src = item.image;
     titleElement.textContent = item.title;
     artistElement.textContent = item.artist; 

     audio.src = `${item.title}.mp4`;
     audio.play();
     playPauseButton.innerHTML = '<i class="fas fa-pause">';
     playPauseButton.classList.remove('paused');

     setTimeout(function(){
        songListPage.classList.remove('active');
     }, 600)
 };




playPauseButton.addEventListener('click', function(){
    playPauseButton.classList.toggle('paused');

    if(playPauseButton.classList.contains('paused')){
        playPauseButton.innerHTML = '<i class="fas fa-play">';
        audio.pause();
    } else {
        playPauseButton.innerHTML = '<i class="fas fa-pause">';
        audio.play();
    }
})


function updateActiveSongInList(songItems, item){
    songItems.forEach(function(songItem){
        songItem.classList.remove('active');
        item.classList.add('active');
    })
}

