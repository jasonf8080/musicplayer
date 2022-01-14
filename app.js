const audio = document.getElementById('audio');
const imgContainer = document.querySelector('.img-container');

imgContainer.addEventListener('click', function(){
    audio.play();
})