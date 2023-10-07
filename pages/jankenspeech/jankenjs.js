var startButton = document.getElementById('startButton')
var isOnRound = false;
var gameEnded = false;

var lose = document.getElementById('lose');
var win = document.getElementById('win');

lose.style.display = "none";
win.style.display = "none";

startButton.addEventListener("click", () => {
    if (gameEnded == false) {
    startRound();
    isOnRound = true;
    }
})
document.addEventListener("keydown", (event) => {
    if (event.key == "s" && isOnRound == false && gameEnded) {
    startRound();
    isOnRound =true;
    }
})

// game proper

// initialize voice recog from mozilla(?) and chrome
if ('webkitSpeechRecognition' in window) {
    listener = new webkitSpeechRecognition()
} else if ('SpeechRecognition' in window) {
    listener = new SpeechRecognition()
}

listener.continuous = true;
listener.interimResults = true;
//recognize speech to sentence

var timerDisplay = document.getElementById('timecount');

timerDisplay.innerHTML = "";

let finalTranscript = "";
var timee;

function startRound() {
    listener.start();
    isOnRound = true;
    console.log('haha');
    var displayTimer = 5;
    timerDisplay.innerHTML = displayTimer;
    countdown = setInterval(() => {
        if (displayTimer >= 1) {
            
            displayTimer = displayTimer - 1;
            timerDisplay.innerHTML = displayTimer;
        }
    }, 1000)


    //start display

    startButton.style.display = "none";
    
    //listening

    listener.onresult = (event) => {
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            }
            
        console.log(finalTranscript);
        }
        
    }

    time = setInterval(() => {
        listener.stop();
        startButton.style.display = "block";
        
        clearInterval(time);
        comparePicks();
        finalTranscript = "";

        
    }, 5000);
};

// get player input, sentence to latest word that matches
// rock paper scissors

var pick = ["rock", "paper", "scissors"]
var playerPick = "";
var compPick = "";

var compDisplay = document.getElementById('compDisplay');
var playerDisplay = document.getElementById('playerDisplay')


function checkUserInput() {
    var listWords = finalTranscript.split(' ');
    console.log(listWords)
    for (let i = listWords.length - 1; i >= 0; i--){
        var wordchecking = listWords[i];
        console.log(i);
        console.log(wordchecking)
        if (pick.includes(wordchecking)) {
            playerPick = wordchecking;
            break
        } else {
            playerPick = "none"
        }
    };
    console.log("Player: " + playerPick)
    
}

function computerInput() {
    compPick = pick[Math.floor(Math.random() * 3)];

}

//check + displays

function comparePicks() {
    checkUserInput()
    computerInput()

    playerDisplay.src = `./jKspeechfiles/${playerPick}.png`;
    compDisplay.src =`./jKspeechfiles/${compPick}.png`
    
    console.log("Computer: " + compPick, "Player: " + playerPick)

    if (compPick == playerPick) {
        Tie();
    } else {
        const conditions = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        };
        if (conditions[playerPick] == compPick) {
            Win();
        } else {
            Lose()
        }
    }

    if (CompHealth < 1 || PlayerHealth < 1) {
        endGame()
    };

    if (PlayerHealth == 0) {
        lose.style.display = "block";
    } else {
        win.style.display = "block"
    };
}

var CompHealth = 1;
var PlayerHealth = 5;

// health system
var playerHealthDisplay = document.getElementById('playerHealthdisp');
var compHealthDisplay = document.getElementById('compHealthdisp');

playerHealthDisplay.innerHTML = PlayerHealth;
compHealthDisplay.innerHTML = CompHealth;

function Tie() {
    console.log("Tied")

}

function Win() {
    CompHealth -= 1;
    console.log("Win");
    compHealthDisplay.innerHTML = CompHealth;
}

function Lose() {
    PlayerHealth -= 1;
    console.log("Lose");
    playerHealthDisplay.innerHTML = PlayerHealth;
}

function endGame() {
    
    gameEnded = true;
    console.log("Game ended");
    
}