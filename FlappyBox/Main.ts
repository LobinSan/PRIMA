namespace FlappyBox {
  export import ƒ = FudgeCore;
  export import ƒAid = FudgeAid;

  window.addEventListener("load", init);

  export let data: ExternalData;
  export let level: ƒ.Node;
  export let player: Player;
  let game: ƒ.Node;
  let floor: Floor;
  let score: number = -2;
  let musicOn: boolean = true;
  let gameOver: boolean = false;
  let jumpAudio: HTMLAudioElement;
  let gameOverAudio: HTMLAudioElement;
  let viewport: ƒ.Viewport = new ƒ.Viewport();
  let wallSpawnTimer: ƒ.Timer;
  let autoJumpTimer: ƒ.Timer = new ƒ.Timer(ƒ.Time.game, 700, 4, countdownAutoJump);
  let soundVolume: number;


  async function init(): Promise<void> {
    loadSounds();
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    document.getElementById("SoundButton").addEventListener("click", changeSoundButton);

    data = await loadJSON();

    game = new ƒ.Node("Game");
    player = new Player("Player");
    level = new ƒ.Node("Level");
    floor = new Floor();
    game.appendChild(floor);
    game.appendChild(level);
    game.appendChild(player);

    wallSpawnTimer = new ƒ.Timer(ƒ.Time.game, data.wallSpawnTime, 0, spawnWall);

    countdownAutoJump();
    startCountDown();

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("rgb(166, 232, 255)");

    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    viewport.addEventListener(ƒ.EVENT_KEYBOARD.DOWN, handleKeyboard);
    viewport.activateKeyboardEvent(ƒ.EVENT_KEYBOARD.DOWN, true);
    viewport.setFocus(true);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);

    function update(_event: ƒ.Eventƒ): void {
      checkForGameOver();
      updateSoundVolume();
      viewport.draw();
    }
  }

  function loadSounds(): void {
    jumpAudio = new Audio();
    jumpAudio.src = "Sounds/Jump.mp3";
    jumpAudio.load();

    gameOverAudio = new Audio();
    gameOverAudio.src = "Sounds/GameOver.mp3";
    gameOverAudio.load();
  }

  function changeSoundButton(): void {
    let soundButton = document.getElementById("SoundButton") as HTMLImageElement;
    let volumeSlider = (<HTMLInputElement>document.getElementById("volumeSlider"));
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

  function countdownAutoJump(): void {
    player.jump();
  }

  function handleKeyboard(_event: ƒ.EventKeyboard): void {
    if (_event.code == ƒ.KEYBOARD_CODE.SPACE || _event.code == ƒ.KEYBOARD_CODE.ARROW_UP || _event.code == ƒ.KEYBOARD_CODE.W) {
      player.jump();
      autoJumpTimer.clear();
      if (musicOn && player.dead == false)
        jumpAudio.play();
    }
  }

  function endGame(): void {
    if (musicOn) {
      gameOverAudio.play();
    }

    wallSpawnTimer.clear();
    //Stop Wall Movement
    for (let wall of level.getChildren()) {
      (<Wall>wall).stopMovement = true;
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
    let volumeSlider = (<HTMLInputElement>document.getElementById("volumeSlider"));
    let volume: number = parseInt(volumeSlider.value) / 100;

    gameOverAudio.volume = volume;
    jumpAudio.volume = volume;
  }

  function restartGame(): void {
    location.reload();
  }

  function checkForGameOver(): void {
    if (player.dead == true && gameOver == false) {
      endGame();
      gameOver = true;
    }
  }

  function spawnWall(): void {
    let wall: Wall = new Wall();
    level.addChild(wall);


    //Wall counting --> Score
    score++;
    let scoreElem: HTMLElement = document.querySelector("h1#Score");
    if (score >= 0)
      scoreElem.textContent = score.toString();
  }

  function startCountDown(): void {
    let countDown: ƒ.Time = new ƒ.Time();
    countDown.setTimer(800, 0, showCountDown);
    function showCountDown(_event: ƒ.EventTimer): void {
      let time: number = 3000 - countDown.get();
      displaySeconds(time);
      if (time < 1000) {
        countDown.clearAllTimers();
        displaySeconds(0);
        document.getElementById("Countdown").style.visibility = "hidden";
        document.getElementById("Score").style.visibility = "visible";
      }
    }
  }

  function displaySeconds(_time: number): void {
    let units: ƒ.TimeUnits = ƒ.Time.getUnits(_time);
    let domTime: HTMLElement = document.querySelector("h1#Countdown");
    domTime.textContent = units.seconds.toString().padStart(1, "0");
  }
}