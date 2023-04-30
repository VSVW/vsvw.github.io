(function(){
  fetch("works/1669302000/data1.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    addressList = data['addressList'];
    exceptionList = data['exceptionList'];
    x0 = data['x0'];
    y0 = data['y0'];
  })
})();

function _1669302000_colorchange(){
  document.getElementById('colorDisplay').textContent = document.getElementById('textColor').value;
}

function _1669302000_run(){
  document.getElementById('errorInfo').classList.add('hidden');
  document.getElementById('errorInfo').innerHTML = '';
  const inputStr = document.getElementById('textInput').value;
  textColor = document.getElementById('textColor').value;
  let errorText = '以下の文字を変換できませんでした:<br>';
  let isError = false;
  let canvasElement = document.getElementById('imageOutput');
  let canvasContext = canvasElement.getContext('2d');
  let imageElement = document.getElementById('sourceImage');
  canvasContext.clearRect(0,0,canvasElement.width,canvasElement.height);
  const splitText = inputStr.split('');
  let sWidth = 0;
  let dx = 0;
  let maxWidth = 0;
  let maxHeight = 16;
  for(let i=0;i<splitText.length;i++){
    if(addressList[splitText[i].codePointAt(0).toString(16)] !== undefined && splitText[i].codePointAt(0).toString(10) !== '10'){
      if(splitText[i].codePointAt(0).toString(10) < 128 || splitText[i].codePointAt(0).toString(10) > 65377 || exceptionList.indexOf(splitText[i].codePointAt(0).toString(16)) !== -1){
        sWidth = 8;
      }else{
        sWidth = 16;
      }
      dx = dx + sWidth;
      if(dx > maxWidth){
        maxWidth = dx;
      }
    }else if(splitText[i].codePointAt(0).toString(10) === '10'){
      dx = 0;
      maxHeight = maxHeight + 16;
    }else{
      dx = dx + 16;
    }
  }
  if(dx > maxWidth){
    maxWidth = dx;
  }
  canvasElement.width = maxWidth;
  canvasElement.height = maxHeight;
  canvasContext.fillStyle = 'rgb(0,0,0)';
  canvasContext.fillRect(0,0,maxWidth,maxHeight);
  let sx = x0;
  let sy = y0;
  sWidth = 0;
  let sHeight = 16;
  dx = 0;
  let dy = 0;
  for(let i=0;i<splitText.length;i++){
    if(addressList[splitText[i].codePointAt(0).toString(16)] !== undefined && splitText[i].codePointAt(0).toString(10) !== '10'){
      sx = x0 + addressList[splitText[i].codePointAt(0).toString(16)][0];
      sy = y0 + addressList[splitText[i].codePointAt(0).toString(16)][1];
      if(splitText[i].codePointAt(0).toString(10) < 128 || splitText[i].codePointAt(0).toString(10) > 65377 || exceptionList.indexOf(splitText[i].codePointAt(0).toString(16)) !== -1){
        sWidth = 8;
      }else{
        sWidth = 16;
      }
      canvasContext.fillStyle = textColor;
      canvasContext.fillRect(dx,dy,sWidth,sHeight);
      canvasContext.drawImage(imageElement,sx,sy,sWidth,sHeight,dx,dy,sWidth,sHeight);
      dx = dx + sWidth;
    }else if(splitText[i].codePointAt(0).toString(10) === '10'){
      dx = 0;
      dy = dy + 16;
    }else{
      canvasContext.fillStyle = textColor;
      canvasContext.fillRect(dx,dy,16,16);
      canvasContext.drawImage(imageElement,x0 + addressList['ffff'][0],y0 + addressList['ffff'][1],16,16,dx,dy,16,16);
      isError = true;
      errorText += splitText[i] + ' (U+' + splitText[i].codePointAt(0).toString(16) + ')<br>';
      dx = dx + 16;
    }
  }
  if(isError === true){
    document.getElementById('errorInfo').classList.remove('hidden');
    document.getElementById('errorInfo').innerHTML = errorText;
  }
}
