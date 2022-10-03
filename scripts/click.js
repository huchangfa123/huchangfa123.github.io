function onFirstClick() {
  const element = document.getElementById('info');
  element.style.display = 'none';
  const buttons = document.getElementById('buttons');
  buttons.style.display = 'flex';
  const audio = document.getElementById('bgMusic');
  audio.play();
}

function onlineClick() {
  const buttons = document.getElementById('buttons');
  buttons.style.display = 'none';
  const info2 = document.getElementById('info2');
  info2.style.display = 'flex';
}

function info2Click() {
  const info2 = document.getElementById('info2');
  info2.style.display = 'none';
  const canvas = document.getElementById('canvas');
  canvas.style.display = 'block';
}

function offlineClick() {
  const buttons = document.getElementById('buttons');
  buttons.style.display = 'none';
  const element = document.getElementById('offlineText');
  element.style.display = 'flex';
}