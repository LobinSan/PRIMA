"use strict";
var FlappyBox;
(function (FlappyBox) {
    FlappyBox.ƒ = FudgeCore;
    FlappyBox.ƒAid = FudgeAid;
    window.addEventListener("load", init);
    let game;
    let floor;
    let score = -2;
    let musicOn = true;
    let gameOver = false;
    let jumpAudio;
    let gameOverAudio;
    let viewport = new FlappyBox.ƒ.Viewport();
    let wallSpawnTimer;
    let autoJumpTimer = new FlappyBox.ƒ.Timer(FlappyBox.ƒ.Time.game, 700, 4, countdownAutoJump);
    let soundVolume;
    async function init() {
        loadSounds();
        let canvas = document.querySelector("canvas");
        document.getElementById("SoundButton").addEventListener("click", changeSoundButton);
        FlappyBox.data = await FlappyBox.loadJSON();
        game = new FlappyBox.ƒ.Node("Game");
        FlappyBox.player = new FlappyBox.Player("Player");
        FlappyBox.level = new FlappyBox.ƒ.Node("Level");
        floor = new FlappyBox.Floor();
        game.appendChild(floor);
        game.appendChild(FlappyBox.level);
        game.appendChild(FlappyBox.player);
        wallSpawnTimer = new FlappyBox.ƒ.Timer(FlappyBox.ƒ.Time.game, FlappyBox.data.wallSpawnTime, 0, spawnWall);
        countdownAutoJump();
        startCountDown();
        let cmpCamera = new FlappyBox.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(FlappyBox.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = FlappyBox.ƒ.Color.CSS("rgb(166, 232, 255)");
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        viewport.draw();
        viewport.addEventListener("\u0192keydown" /* DOWN */, handleKeyboard);
        viewport.activateKeyboardEvent("\u0192keydown" /* DOWN */, true);
        viewport.setFocus(true);
        FlappyBox.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        FlappyBox.ƒ.Loop.start(FlappyBox.ƒ.LOOP_MODE.TIME_GAME, 60);
        function update(_event) {
            checkForGameOver();
            updateSoundVolume();
            viewport.draw();
        }
    }
    function loadSounds() {
        jumpAudio = new Audio();
        jumpAudio.src = "Sounds/Jump.mp3";
        jumpAudio.load();
        gameOverAudio = new Audio();
        gameOverAudio.src = "Sounds/GameOver.mp3";
        gameOverAudio.load();
    }
    function changeSoundButton() {
        let soundButton = document.getElementById("SoundButton");
        let volumeSlider = document.getElementById("volumeSlider");
        let volumeText = document.getElementById("volumeValue");
        if (!musicOn) {
            soundButton.src = "Images/VolumeOn.png";
            musicOn = true;
            //Set volume slider to initial value
            volumeSlider.value = soundVolume.toString();
            volumeText.textContent = soundVolume.toString();
        }
        else if (musicOn) {
            soundButton.src = "Images/VolumeOff.png";
            musicOn = false;
            //Save current value of the volume slider and set it to 0 afterwards
            soundVolume = parseInt(volumeSlider.value);
            volumeSlider.value = "0";
            volumeText.textContent = "0";
        }
    }
    function countdownAutoJump() {
        FlappyBox.player.jump();
    }
    function handleKeyboard(_event) {
        if (_event.code == FlappyBox.ƒ.KEYBOARD_CODE.SPACE || _event.code == FlappyBox.ƒ.KEYBOARD_CODE.ARROW_UP || _event.code == FlappyBox.ƒ.KEYBOARD_CODE.W) {
            FlappyBox.player.jump();
            autoJumpTimer.clear();
            if (musicOn && FlappyBox.player.dead == false)
                jumpAudio.play();
        }
    }
    function endGame() {
        if (musicOn) {
            gameOverAudio.play();
        }
        wallSpawnTimer.clear();
        //Stop Wall Movement
        for (let wall of FlappyBox.level.getChildren()) {
            wall.stopMovement = true;
        }
        //Game Over Screen Transitions
        document.getElementById("Score").style.fontSize = "200px";
        document.getElementById("Score").style.top = "30%";
        document.getElementById("EndScreenBrightness").style.opacity = "70%";
        document.getElementById("YourScore").style.opacity = "100%";
        document.getElementById("YourScore").style.left = "50%";
        document.getElementById("PlayAgain").style.opacity = "100%";
        document.getElementById("PlayAgain").style.left = "50%";
        document.getElementById("PlayAgain").addEventListener("click", restartGame);
    }
    function updateSoundVolume() {
        let soundButton = document.getElementById("SoundButton");
        let volumeSlider = document.getElementById("volumeSlider");
        let volume = parseInt(volumeSlider.value) / 100;
        gameOverAudio.volume = volume;
        jumpAudio.volume = volume;
        if (parseInt(volumeSlider.value) == 0) {
            soundButton.src = "Images/VolumeOff.png";
            musicOn = false;
        }
        else {
            soundButton.src = "Images/VolumeOn.png";
            musicOn = true;
        }
    }
    function restartGame() {
        location.reload();
    }
    function checkForGameOver() {
        if (FlappyBox.player.dead == true && gameOver == false) {
            endGame();
            gameOver = true;
        }
    }
    function spawnWall() {
        let wall = new FlappyBox.Wall();
        FlappyBox.level.addChild(wall);
        //Wall counting --> Score
        score++;
        let scoreElem = document.querySelector("h1#Score");
        if (score >= 0)
            scoreElem.textContent = score.toString();
    }
    function startCountDown() {
        let countDown = new FlappyBox.ƒ.Time();
        countDown.setTimer(800, 0, showCountDown);
        function showCountDown(_event) {
            let time = 3000 - countDown.get();
            displaySeconds(time);
            if (time < 1000) {
                countDown.clearAllTimers();
                displaySeconds(0);
                document.getElementById("Countdown").style.visibility = "hidden";
                document.getElementById("Score").style.visibility = "visible";
            }
        }
    }
    function displaySeconds(_time) {
        let units = FlappyBox.ƒ.Time.getUnits(_time);
        let domTime = document.querySelector("h1#Countdown");
        domTime.textContent = units.seconds.toString().padStart(1, "0");
    }
})(FlappyBox || (FlappyBox = {}));
//# sourceMappingURL=Main.js.map