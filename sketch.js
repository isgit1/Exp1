let startTime;
let showTimer = false;
let colorChanged = false;
let tempoLimite;
let changeMoment = null;
let ready = false;
let frameSaved = false;
let splashDuration = 2000;
let splashStart;
let resetButton;

function setup() {
  pixelDensity(1); // evita bugs visuais em telas retina
  createCanvas(500, 400);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  noStroke();

  splashStart = millis();

  // Botão de reset
  resetButton = createButton('Resetar');
  resetButton.position(20, 20);
  resetButton.mousePressed(resetSketch);
  resetButton.style('padding', '8px 16px');
  resetButton.style('font-size', '16px');
  resetButton.style('border-radius', '8px');
  resetButton.style('border', 'none');
  resetButton.style('background-color', '#888');
  resetButton.style('color', '#fff');
}

function draw() {
  drawGradientBackground();

  if (!ready) {
    if (millis() - splashStart < splashDuration) {
      drawText("Carregando...", 28, width / 2, height / 2);
      return;
    } else {
      ready = true;
    }
  }

  if (showTimer) {
    let elapsed = (millis() - startTime) / 1000;
    drawText(`Tempo: ${elapsed.toFixed(3)} s`, 36, width / 2, 60);

    if (!colorChanged && millis() - startTime >= tempoLimite) {
      colorChanged = true;
      changeMoment = elapsed;
      console.log(`Cor mudou em: ${changeMoment.toFixed(3)} s`);
    }

    if (changeMoment !== null) {
      drawText(`Cor mudou em: ${changeMoment.toFixed(3)} s`, 20, width / 2, height - 30);

      // marcador visual para destacar a mudança
      if (frameCount % 60 < 30) {
        fill('#ff3b30');
        ellipse(width - 40, 40, 20);
      }

      // salva uma imagem do frame
      if (!frameSaved) {
        saveCanvas('mudanca_de_cor', 'png');
        frameSaved = true;
      }
    }

  } else {
    drawText("Clique para iniciar", 32, width / 2, 60);
  }

  drawCentralBox();
}

function mousePressed() {
  if (!showTimer && ready) {
    startTime = millis();
    showTimer = true;
    colorChanged = false;
    changeMoment = null;
    frameSaved = false;
    tempoLimite = random(2000, 5000);
  }
}

function resetSketch() {
  showTimer = false;
  colorChanged = false;
  changeMoment = null;
  frameSaved = false;
  splashStart = millis();
  ready = false;
}

function drawText(txt, size, x, y) {
  textSize(size);
  fill(51);
  text(txt, x, y);
}

function drawCentralBox() {
  push();
  rectMode(CENTER);
  fill(colorChanged ? color('#34c759') : color('#d1d1d1'));

  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.15)';

  rect(width / 2, height / 2 + 40, 120, 120, 24);
  pop();
}

function drawGradientBackground() {
  for (let i = 0; i <= height; i++) {
    let inter = i / height;
    let c = lerpColor(color('#ffffff'), color('#dcdcdc'), inter);
    stroke(c);
    line(0, i, width, i);
  }
}
