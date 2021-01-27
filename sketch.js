let song, analyzer, fft;
let button;

function preload() {
  song = loadSound("song.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight / 2);

  fft = new p5.FFT();
  fft.setInput(song);

  button = createButton(`<i class="fas fa-play"></i>`);
  button.mousePressed(togglePlaying);
  button.addClass("btn");
}

function togglePlaying() {
  if (song.isPlaying()) {
    button.html(`<i class="fas fa-play"></i>`);
    song.stop();
  } else {
    button.html(`<i class="fas fa-stop"></i>`);
    song.play();
  }
}

function draw() {
  background(0);

  fft.analyze();
  const bass = fft.getEnergy("bass");
  const lowMid = fft.getEnergy("lowMid");
  const mid = fft.getEnergy("mid");
  const highMid = fft.getEnergy("highMid");
  const treble = fft.getEnergy("treble");

  const bassHeight = map(bass, 0, 255, 0, height);
  const lowMidHeight = map(lowMid, 0, 255, 0, height);
  const midHeight = map(mid, 0, 255, 0, height);
  const highMidHeight = map(highMid, 0, 255, 0, height);
  const trebleHeight = map(treble, 0, 255, 0, height);

  const bassRectangle = () => {
    rect((width / 2) - 115, height - bassHeight, 30, bassHeight, 5);
  };
  const lowMidRectangle = () => {
    rect((width / 2) - 65, height - lowMidHeight, 30, lowMidHeight, 5);
  };
  const midRectangle = () => {
    rect((width / 2) - 15, height - midHeight, 30, midHeight, 5);
  };
  const highMidRectangle = () => {
    rect((width / 2) + 35, height - highMidHeight, 30, highMidHeight, 5);
  };
  const trebleRectangle = () => {
    rect((width / 2) + 85, height - trebleHeight, 30, trebleHeight, 5);
  };

  bassRectangle();
  lowMidRectangle();
  midRectangle();
  highMidRectangle();
  trebleRectangle();
}
