(function(){
  fetch("works/1669302000/data1.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    addressList_16 = data['addressList_16'];
    addressList_18 = data['addressList_18'];
    exceptionList = data['exceptionList'];
    x0_16 = data['x0_16'];
    y0_16 = data['y0_16'];
    x0_18 = data['x0_18'];
    y0_18 = data['y0_18'];
  })
})();

function _1669302000_colorchange(){
  document.getElementById('colorDisplay').textContent = document.getElementById('textColor').value;
}

function _1669302000_run(){
  let typeface_height = 16;
  let typeface_width = 16;
  let errorText = '以下の文字を変換できませんでした(16dot):<br>';
  let imageElement = document.getElementById('sourceImage_16');
  let addressList = addressList_16;
  let x0 = x0_16;
  let y0 = y0_16;
  if(document.getElementById('typeface').value === '18dot'){
    typeface_height = 18;
    typeface_width = 18;
    errorText = '以下の文字を変換できませんでした(18dot):<br>';
    imageElement = document.getElementById('sourceImage_18');
    addressList = addressList_18;
    x0 = x0_18;
    y0 = y0_18;
  }
  document.getElementById('errorInfo').classList.add('hidden');
  document.getElementById('errorInfo').innerHTML = '';
  const inputStr = document.getElementById('textInput').value;
  textColor = document.getElementById('textColor').value;
  let isError = false;
  let canvasElement = document.getElementById('imageOutput');
  let canvasContext = canvasElement.getContext('2d');
  canvasContext.clearRect(0,0,canvasElement.width,canvasElement.height);
  const splitText = inputStr.split('');
  let sWidth = 0;
  let dx = 0;
  let maxWidth = 0;
  let maxHeight = typeface_height;
  for(let i=0;i<splitText.length;i++){
    if(addressList[splitText[i].codePointAt(0).toString(16)] !== undefined && splitText[i].codePointAt(0).toString(10) !== '10'){
      if(splitText[i].codePointAt(0).toString(10) < 128 || splitText[i].codePointAt(0).toString(10) > 65377 || exceptionList.indexOf(splitText[i].codePointAt(0).toString(16)) !== -1){
        sWidth = typeface_width / 2;
      }else{
        sWidth = typeface_width;
      }
      dx = dx + sWidth;
      if(dx > maxWidth){
        maxWidth = dx;
      }
    }else if(splitText[i].codePointAt(0).toString(10) === '10'){
      dx = 0;
      maxHeight = maxHeight + typeface_height;
    }else{
      dx = dx + typeface_width;
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
  let sHeight = typeface_height;
  dx = 0;
  let dy = 0;
  for(let i=0;i<splitText.length;i++){
    if(addressList[splitText[i].codePointAt(0).toString(16)] !== undefined && splitText[i].codePointAt(0).toString(10) !== '10'){
      sx = x0 + addressList[splitText[i].codePointAt(0).toString(16)][0];
      sy = y0 + addressList[splitText[i].codePointAt(0).toString(16)][1];
      if(splitText[i].codePointAt(0).toString(10) < 128 || splitText[i].codePointAt(0).toString(10) > 65377 || exceptionList.indexOf(splitText[i].codePointAt(0).toString(16)) !== -1){
        sWidth = typeface_width / 2;
      }else{
        sWidth = typeface_width;
      }
      canvasContext.fillStyle = textColor;
      canvasContext.fillRect(dx,dy,sWidth,sHeight);
      canvasContext.drawImage(imageElement,sx,sy,sWidth,sHeight,dx,dy,sWidth,sHeight);
      dx = dx + sWidth;
    }else if(splitText[i].codePointAt(0).toString(10) === '10'){
      dx = 0;
      dy = dy + typeface_height;
    }else{
      canvasContext.fillStyle = textColor;
      canvasContext.fillRect(dx,dy,typeface_width,typeface_height);
      canvasContext.drawImage(imageElement,x0 + addressList['ffff'][0],y0 + addressList['ffff'][1],typeface_width,typeface_height,dx,dy,typeface_width,typeface_height);
      isError = true;
      errorText += splitText[i] + ' (U+' + splitText[i].codePointAt(0).toString(16).toUpperCase() + ')<br>';
      dx = dx + typeface_width;
    }
  }
  if(isError === true){
    document.getElementById('errorInfo').classList.remove('hidden');
    document.getElementById('errorInfo').innerHTML = errorText;
  }
}
