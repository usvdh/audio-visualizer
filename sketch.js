let song, analyzer, fft;
let playButton, uploadButton, uploadedSong, selectedSong;

function preload() {
  song = loadSound("song.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight / 2);

  fft = new p5.FFT();

  playButton = createButton(`<i class="fas fa-play"></i>`);
  playButton.mousePressed(togglePlaying);
  playButton.addClass("btn");
  uploadButton = createFileInput(upload);
}

function upload(data) {
  uploadedSong = loadSound(data.data);
}

function togglePlaying() {
  if (uploadedSong) selectedSong = uploadedSong;
  else selectedSong = song;

  if (selectedSong.isPlaying()) {
    playButton.html(`<i class="fas fa-play"></i>`);
    selectedSong.stop();
  } else {
    playButton.html(`<i class="fas fa-stop"></i>`);
    selectedSong.play();
  }
}

function setFftInput() {
  if (uploadedSong) fft.setInput(uploadedSong);
  else fft.setInput(song);
}

function draw() {
  background(0);

  fft.analyze();
  const bass = fft.getEnergy("bass");
  const lowMid = fft.getEnergy("lowMid");
  const mid = fft.getEnergy("mid");
  const highMid = fft.getEnergy("highMid");
  const treble = fft.getEnergy("treble");

  const bassHeight = map(bass, 0, 255, 10, height);
  const lowMidHeight = map(lowMid, 0, 255, 10, height);
  const midHeight = map(mid, 0, 255, 10, height);
  const highMidHeight = map(highMid, 0, 255, 10, height);
  const trebleHeight = map(treble, 0, 255, 10, height);

  const bassRectangle = () => {
    fill(bass, 0, 155);
    rect(width / 2 - 115, height - bassHeight, 30, bassHeight, 5);
  };
  const lowMidRectangle = () => {
    fill(lowMid, 0, 155);
    rect(width / 2 - 65, height - lowMidHeight, 30, lowMidHeight, 5);
  };
  const midRectangle = () => {
    fill(mid, 0, 155);
    rect(width / 2 - 15, height - midHeight, 30, midHeight, 5);
  };
  const highMidRectangle = () => {
    fill(highMid, 0, 155);
    rect(width / 2 + 35, height - highMidHeight, 30, highMidHeight, 5);
  };
  const trebleRectangle = () => {
    fill(treble, 0, 155);
    rect(width / 2 + 85, height - trebleHeight, 30, trebleHeight, 5);
  };

  bassRectangle();
  lowMidRectangle();
  midRectangle();
  highMidRectangle();
  trebleRectangle();
}
