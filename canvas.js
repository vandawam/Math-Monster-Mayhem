const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.height = innerHeight
canvas.width = innerWidth

const cols = 6
const row = 3
const columWidth = canvas.width / 10

const width = canvas.width
const height = canvas.height
let sum = 0;
let lvl = 0
let currentlvl = lvl
let turn = 0

const background = new Image()
const house = new Image()
const sideBar = new Image()
const blankCard = new Image()
const chara1 = new Image()
const chara2 = new Image()
const chara3 = new Image()
const chara4 = new Image()

background.src = './Background/Background Game Play.jpg'
house.src = './Background/house.png'
sideBar.src = './Asset Lainya/Bar Kartu.png'
blankCard.src = './Asset Lainya/Asset Card Back.png'
chara1.src = './Character/Chara1.png'
chara2.src = './Character/Chara2.png'
chara3.src = './Character/Chara3.png'
chara4.src = './Character/Chara4.png'

const randChar = [
    [chara1, 'blue'],
    [chara2, 'red'],
    [chara3, 'green'],
    [chara4, 'orange'],
]

const level = [
    {},
    {
        pola: [
            [0],
            [1],
            [2],
            [0, 1],
            [1, 2],
        ],
        turn: 5,
        chara: 3,
        min: 1,
        card: 3
    },
    {
        pola: [
            [0],
            [1],
            [2],
            [0, 1],
            [1, 2],
            [0, 2],
        ],
        turn: 8,
        chara: 4,
        min: 2,
        card: 5
    },
    {
        pola: [
            [0],
            [2],
            [0, 1],
            [1, 2],
            [0, 2],
            [0, 1],
            [1, 2],
            [0, 2],
        ],
        turn: 11,
        chara: 4,
        min: 2,
        card: 6
    },
    {
        pola: [
            [2],
            [0, 1],
            [0, 1],
            [0, 1],
            [1, 2],
            [1, 2],
            [0, 1],
            [1, 2],
            [0, 2],
            [0,1,2]
        ],
        turn: 11,
        chara: 4,
        min: 2,
        card: 6
    },
    {
        pola: [
            [0, 1],
            [0, 1],
            [0, 1],
            [1, 2],
            [1, 2],
            [0, 1],
            [1, 2],
            [0, 2],
            [0,1,2],
            [0,1,2],
            [0,1,2],
        ],
        turn: 15,
        chara: 5,
        min: 3,
        card: 9
    },
]

// const polaChara = [
//     [0],
//     [1],
//     [2],
//     [0, 1],
//     [1, 2],
//     [0, 2],
//     [0,1,2]
// ]

let Cards = []
let Charas = []

class Card {
    constructor(pos, size, num) {
        this.pos = pos
        this.size = size
        this.num = num
        this.select = false
    }

    draw() {
        ctx.font = "35px serif";
        ctx.fillStyle = 'blue'
        ctx.drawImage(blankCard, this.pos.x, this.pos.y, this.size.w, this.size.h)
        ctx.fillText(this.num, this.pos.x + 25, this.pos.y + 55)
    }
}

class Board {
    constructor(x, y, dx, dy) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
    }

    movement(lvl){
        this.x += this.dx * lvl
        this.y += this.dy * lvl
    }
}

class Chara {
    constructor(pos, size, num, r) {
        this.pos = pos
        this.size = size
        this.num = num
        this.r = r
        this.select = false
    }

    draw() {
        if (this.select) {
            ctx.beginPath()
            ctx.fillStyle = 'blue'
            ctx.ellipse(this.pos.x + this.size.w / 2, this.pos.y + this.size.h - this.size.h / 5 , 60, 25, 0, 0, 2 * Math.PI);
            ctx.fill()
            ctx.closePath()
        }
        ctx.font = "20px serif";
        ctx.drawImage(randChar[this.r][0], this.pos.x , this.pos.y , this.size.w, this.size.h)
        ctx.beginPath()
        ctx.arc(this.pos.x + this.size.w / 2, this.pos.y + 30, 15, 0, 2 * Math.PI)
        ctx.fillStyle = randChar[this.r][1]
        ctx.fill()
        ctx.fillStyle = 'white'
        ctx.fillText(this.num, this.pos.x + this.size.w / 2 -5, this.pos.y + 35)
        ctx.closePath()
    }
}

function addCard(y, num) {
    const Cart = new Card({
        x: width - 130,
        y: 100 * y + 50
    }, {
        w: 70,
        h: 90
    }, num);
    Cards.push(Cart);
}

function addChara(e) {
    if (turn >= level[lvl].turn && Charas.length === 0) {
        bukaLevelSelanjutnya();
      
        console.log("Level yang sudah terbuka:", dapatkanLevelTerbuka());
        showWin()
        return;
    }

    if (turn === level[lvl].turn) {
        for (let i = 0; i < Charas.length; i++) {
            Charas[i].pos.x -= columWidth;
        }
        if (e != 1 ) {
            Cards.slice(0, Cards.length)
                Cards = []
            for (let i = 1; i < 4; i++) {
                addCard(i, Math.floor(Math.random() * (level[lvl].card - level[lvl].min +1) + level[lvl].min +1))
            }
        }
        return
    }
    const rand = Math.floor(Math.random() * level[lvl].pola.length);

    for (let i = 0; i < level[lvl].pola[rand].length; i++) {
        const num = Math.floor(Math.random() * (level[lvl].chara - level[lvl].min) + level[lvl].min);
        const r = Math.floor(Math.random() * 4);
        const newX = columWidth * 8.3;
        const newY = columWidth * level[lvl].pola[rand][i] + columWidth * 2.2;
        const Cart = new Chara({ x: newX, y: newY }, { w: columWidth * 1.5, h: columWidth * 1.5}, num, r);
        Charas.push(Cart);
        console.log('blog');
    }
    if (e != 1 ) {
        Cards.slice(0, Cards.length)
            Cards = []
            for (let i = 1; i < 4; i++) {
                addCard(i, Math.floor(Math.random() * (level[lvl].card - level[lvl].min +1) + level[lvl].min +1))
            }
    }
    if (Cards.length < 1) {
        Cards = []
        for (let i = 1; i < 4; i++) {
                addCard(i, Math.floor(Math.random() * (level[lvl].card - level[lvl].min +1) + level[lvl].min +1))
            }
    }

    for (let i = 0; i < Charas.length; i++) {
        Charas[i].pos.x -= columWidth;
    }

    turn += 1
}



function drawBoard() {
    ctx.drawImage(background, 0, 0, width, height)
    ctx.drawImage(house, -150, columWidth *1.5, columWidth *3, columWidth *3)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < row; j++) {
            ctx.strokeStyle = '#BE5813'
            ctx.strokeRect(columWidth * i + (canvas.width - columWidth * 7)-columWidth / 2, columWidth * j + (canvas.height - columWidth * 3) - 20, columWidth, columWidth)
        }
    }
    ctx.drawImage(sideBar, width - 200, 0, 200, height)
}


let animationFrameId;

function draw() {
    document.getElementById('lvl').textContent = lvl
    ctx.clearRect(0, 0, width, height);
    drawBoard();

    for (let i = 0; i < Cards.length; i++) {
        Cards[i].draw();
    }

    for (let i = 0; i < Charas.length; i++) {
        Charas[i].draw();

        if (Charas[i].pos.x < 270) {
            showLose()
            cancelAnimationFrame(animationFrameId);
            return
        }
    }

    animationFrameId = requestAnimationFrame(draw);
}

function restartGame() {
    Cards = [];
    Charas = [];

    sum = 0;
    turn = 0;

    for (let i = 1; i < 4; i++) {
        addCard(i, Math.floor(Math.random() * (level[lvl].card - level[lvl].min +1) + level[lvl].min +1))
    }

    cancelAnimationFrame(animationFrameId);
    draw();
    addChara()
}

function continueGame(){
    Cards = [];
    Charas = [];

    sum = 0;
    lvl += 1
    currentlvl += 1
    turn = 0;

    for (let i = 1; i < 4; i++) {
        addCard(i, Math.floor(Math.random() * (level[lvl].card - level[lvl].min +1) + level[lvl].min +1))
    }

    cancelAnimationFrame(animationFrameId);
    draw();
    addChara()
}

function simpanLevelTerbuka(level) {
    localStorage.setItem('levelTerbuka', level);
  }
  
  function dapatkanLevelTerbuka() {
    return localStorage.getItem('levelTerbuka') || 1;
  }
  
  function bukaLevelSelanjutnya() {
    let levelSekarang = parseInt(dapatkanLevelTerbuka());
    if (levelSekarang > lvl) {
        return
    }
    let levelSelanjutnya = levelSekarang + 1;
    simpanLevelTerbuka(levelSelanjutnya);
  }


canvas.addEventListener('click', function (event) {
    const mousePos = {
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top
    };

    Charas.forEach((chara, index) => {
        if (
            mousePos.x >= chara.pos.x &&
            mousePos.x <= chara.pos.x + chara.size.w &&
            mousePos.y >= chara.pos.y &&
            mousePos.y <= chara.pos.y + chara.size.h
        ) {
            console.log('oke');
            if (chara.select) {
                chara.select = false;
                console.log('1');
                sum -= chara.num;
            } else if (!chara.select) {
                chara.select = true;
                console.log('2');
                sum += chara.num;
                console.log('sip');
            }
        }
    });

    Cards.forEach((card, index) => {
        if (
            mousePos.x >= card.pos.x &&
            mousePos.x <= card.pos.x + card.size.w &&
            mousePos.y >= card.pos.y &&
            mousePos.y <= card.pos.y + card.size.h
        ) {
            let number = card.num
            if (sum === number) {
                setInterval(() => {
                    if (sum === number) {
                        Charas.forEach((chara, index) => {
                            if (chara.select) {
                                Charas.splice(index, 1);
                                console.log('okeh' + card.num);
                            }
                        })
                    }
                }, 100);
                setTimeout(() => {
                    Cards.splice(index, 1)
                    number = 0
                    sum = 0
                    addChara(1)
                }, 300);
            }
        }
    });
});
