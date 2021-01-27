let song, analyzer, fft;
let button;

function preload() {
  song = loadSound("song.mp3");
}

function setup() {
  createCanvas(710, 200);

  fft = new p5.FFT();
  fft.setInput(song);

  button = createButton(`<i class="fas fa-play"></i>`);
  button.mousePressed(togglePlaying);
  button.addClass("btn");
}

function togglePlaying() {
  if (song.isPlaying()) {
    button.html(`play`);
    song.stop();
  } else {
    button.html("stop");
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

  const bassHeight = map(bass, 0, 255, 0, 200);
  const lowMidHeight = map(lowMid, 0, 255, 0, 200);
  const midHeight = map(mid, 0, 255, 0, 200);
  const highMidHeight = map(highMid, 0, 255, 0, 200);
  const trebleHeight = map(treble, 0, 255, 0, 200);

  const bassRectangle = () => {
    rect(100, height - bassHeight, 30, bassHeight, 5);
  };
  const lowMidRectangle = () => {
    rect(150, height - lowMidHeight, 30, lowMidHeight, 5);
  };
  const midRectangle = () => {
    rect(200, height - midHeight, 30, midHeight, 5);
  };
  const highMidRectangle = () => {
    rect(250, height - highMidHeight, 30, highMidHeight, 5);
  };
  const trebleRectangle = () => {
    rect(300, height - trebleHeight, 30, trebleHeight, 5);
  };

  bassRectangle();
  lowMidRectangle();
  midRectangle();
  highMidRectangle();
  trebleRectangle();
}
