const barkAudio = document.querySelector('audio');
const btn = document.querySelector('button');
const getValue = document.getElementById('breeds');
const img = document.querySelectorAll('img')


//Blinking eyes 
let blinking = gsap.timeline({repeatDelay:.3, repeat:-1, yoyo:true});
blinking.to("#eyes", {delay:3, opacity:0, duration:.1}).to("#closedEyes", {opacity:1, duration:.2});

//Dog's head movement
let head = gsap.timeline({repeatDelay:1.5, repeat:-1, yoyo:true, duration:2.5});
head.fromTo("#head", {rotation:-10, transformOrigin:"50% 50%", duration:1}, {rotation:10, transformOrigin:"50% 50%", duration:1.5});

//Dog barking
let mouth = gsap.timeline({delay:1, repeat:1, onComplete: quiet}).pause();
mouth.to("#mouth",{y:12, duration:.8})
function quiet(){
    mouth.reverse(1)
}

//Getting values and Fetch
getValue.addEventListener('change', function(){
   let breed = getValue.value.toLowerCase().replace(' ', '/')
   let breeds = breed.split('/').reverse().join('/') 
   fetch(`https://dog.ceo/api/breed/${breeds}/images`)
    .then(response => response.json())
    .then(data =>{
        img.forEach((dog, i)=>{
            dog.src = data.message[i]
            if(!data.message[i]){
               return dog.src = 'img/blueBone.png'
            }
        })
    })
   mouth.play()
   barkAudio.play()    
})



