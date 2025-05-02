let capture;
let overlayGraphics;

function setup() {
  // 設定畫布大小為視窗大小
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色為 #0b132b
  background('#0b132b');
  
  // 初始化攝影機擷取，解析度為預設大小
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的攝影機畫面

  // 建立與攝影機畫面相同大小的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  overlayGraphics.rect(0, 0, overlayGraphics.width, overlayGraphics.height); // 填滿背景
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
  image(capture, -x - displayWidth, y, displayWidth, displayHeight);
  pop();

  // 繪製 overlayGraphics 到畫布上，顯示在攝影機畫面上方
  image(overlayGraphics, x, y, displayWidth, displayHeight);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
}
