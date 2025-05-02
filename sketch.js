let capture;
let graphics;

function setup() {
  // 設定畫布大小為視窗大小
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色為 #0b132b
  background('#0b132b');
  
  // 初始化攝影機擷取，解析度為預設大小
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的攝影機畫面

  // 使用 createGraphics 產生與攝影機畫面相同大小的圖形緩衝區
  graphics = createGraphics(capture.width, capture.height);
  graphics.background(255, 0, 0); // 設定緩衝區背景為紅色（可自行修改）
  graphics.fill(255);
  graphics.textSize(32);
  graphics.textAlign(CENTER, CENTER);
  graphics.text('Overlay Text', graphics.width / 2, graphics.height / 2); // 在緩衝區中繪製文字
}

function draw() {
  // 設定背景顏色
  background('#0b132b');
  
  // 計算影像顯示的起始位置，讓影像置中
  let aspectRatio = capture.width / capture.height;
  let displayWidth = windowWidth * 0.8;
  let displayHeight = displayWidth / aspectRatio;

  if (displayHeight > windowHeight * 0.8) {
    displayHeight = windowHeight * 0.8;
    displayWidth = displayHeight * aspectRatio;
  }

  let x = (width - displayWidth) / 2;
  let y = (height - displayHeight) / 2;

  // 翻轉畫布以修正左右顛倒
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, displayWidth, displayHeight);
  pop();

  // 在攝影機畫面上方繪製 createGraphics 的內容
  image(graphics, x, y, displayWidth, displayHeight);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
}
