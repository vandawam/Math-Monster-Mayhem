const home = document.getElementById('home')
const mapLevel = document.getElementById('map-level')
const game = document.getElementById('game')
const profile = document.getElementById('profile')
const win = document.getElementById('win')
const lose = document.getElementById('lose')
const pengaturan = document.getElementById('pengaturan')
const imgLvl1 = document.getElementById('level-1')
const imgLvl2 = document.getElementById('level-2')
const imgLvl3 = document.getElementById('level-3')
const imgLvl4 = document.getElementById('level-4')
const imgLvl5 = document.getElementById('level-5')

setInterval(() => {
    const x = dapatkanLevelTerbuka();

    for (let i = 1; i <= 5; i++) {
        const imgElement = document.getElementById('level-' + i);
        if (i <= x) {
            imgElement.classList.remove('inactive');
        } else {
            imgElement.classList.add('inactive');
        }
    }
}, 1000);


const musics = document.querySelectorAll('.music')
let audio = new Audio('./homeSound.mp3')
musics.forEach((music)=>{
    music.addEventListener('click', () => {
        music.classList.toggle('active')
        if(music.classList.contains('active')){
            audio.pause()
        }else{
            loopAudio()
        }
    })
})

function loopAudio(){
    audio.play()
    audio.addEventListener('ended',()=>{
        audio.play()
    })
}

document.addEventListener('click', () => {
    loopAudio();
}, { once: true });

function Play() {
    home.style.display = 'none'
    mapLevel.style.display = 'flex'
}

function BackLvl() {
    home.style.display = 'flex'
    mapLevel.style.display = 'none'
}

function Gameplay(l) {
    lvl = l
    game.style.display = 'flex'
    mapLevel.style.display = 'none'
    requestAnimationFrame(draw);
    document.getElementById('lvl').textContent = l
    document.getElementById('lvl-parrent').style.display = 'flex'
    addChara()
}

function settingGame() {
    console.log('kontol');
}

function skipTurn() {
    addChara(3)
    console.log('mbut');
}

function quitWindow() {
    window.close()
}

function openProfile() {
    profile.style.display = 'flex'
}

function closeProfile() {
    profile.style.display = 'none'
}

function showWin() {
    win.style.display = 'flex'
}

function showLose() {
    lose.style.display = 'flex'
}

function showPengaturan() {
    pengaturan.style.display = 'flex'
}

function gameResume() {
    pengaturan.style.display = 'none'
}

function gameQuit() {
    pengaturan.style.display = 'none'
    win.style.display = 'none'
    lose.style.display = 'none'
    mapLevel.style.display = 'flex'
    document.getElementById('lvl-parrent').style.display = 'none'

    lvl = 0
    restartGame()
}

function gameRestart() {
    win.style.display = 'none'
    lose.style.display = 'none'

    restartGame()
}
function gameContinue() {
    win.style.display = 'none'
    lose.style.display = 'none'

    continueGame()
}