let colorTable = ['#000000','#ff0000','#00ff00','#ff8000'];
fileSelector = document.getElementById('input');
function _1663945200_preview(){
  var file = document.getElementById('input').files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = function(){
    document.getElementById('FileNamePreview').textContent = file.name;
    document.getElementById('ImagePreview').src = reader.result;
    document.getElementById('runbutton').removeAttribute('disabled');
  }
}
function _1663945200_colorchange(id,id2){
  id2.textContent = id.value;
}
function _1663945200_dispLoading(){
  document.getElementById('ProgressArea').classList.remove('hidden');
}
function _1663945200_run(){
  _1663945200_dispLoading();
  setTimeout(function(){
    let error_list = [];
    let done = 0;
    document.getElementById('error').innerHTML = '';
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('copybutton').removeAttribute('disabled');
    let convertResult = document.getElementById('output');
    convertResult.value = '';
    colorTable = [document.getElementById('ColorSelect0').value,document.getElementById('ColorSelect1').value,document.getElementById('ColorSelect2').value,document.getElementById('ColorSelect3').value]
    let canvasElement = document.getElementById('canvasElement');
    let canvasContext = canvasElement.getContext('2d');
    let imageElement = document.getElementById('ImagePreview');
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasContext.drawImage(imageElement,0,0);
    if(document.getElementById('ImagePreview').width * document.getElementById('ImagePreview').height > 65536){
      _1663945200_error2();
    }else{
      for(let i=0;i<imageElement.height;i++){
        convertResult.value += '{'
        for(let j=0;j<imageElement.width;j++){
          done++;
          let dot = canvasContext.getImageData(j, i, 1, 1);
          let dotText = '#' + dot.data[0].toString(16).padStart(2,'0') + dot.data[1].toString(16).padStart(2,'0') + dot.data[2].toString(16).padStart(2,'0');
          if(colorTable.indexOf(dotText) !== -1){
            convertResult.value += colorTable.indexOf(dotText);
          }else{
            convertResult.value += '?';
            if(error_list.indexOf(dotText) === -1){
              error_list.push(dotText);
            }
          }
          convertResult.value += ','
        }
        if(i === imageElement.height - 1){
          convertResult.value += '}';
        }else{
          convertResult.value += '},\n';
        }
      }
      if(error_list.length !== 0){
        _1663945200_error(error_list);
      }
    }
    document.getElementById('ProgressArea').classList.add('hidden')
  },100);
}
function _1663945200_error(array){
  let errorText = 'エラー:変換処理を完了出来ませんでした。<br><br>以下の色に対応する値が設定されていません。変換設定を確認して下さい。<br>';
  for(let i=0;i<array.length;i++){
    errorText += '<span style="color:' + array[i] + '; font-size:24px;">■</span> ' + array[i] + ' (R:' + parseInt(array[i].slice(1,3),16) + ' G:' + parseInt(array[i].slice(3,5),16) + ' B:' + parseInt(array[i].slice(5,7),16) + ')<br>'
  }
  document.getElementById('result').classList.add('hidden');
  document.getElementById('copybutton').setAttribute('disabled','true');
  document.getElementById('error').innerHTML = '<div class="info_warn2">' + errorText + '</div>';
}
function _1663945200_error2(){
  document.getElementById('result').classList.add('hidden');
  document.getElementById('copybutton').setAttribute('disabled','true');
  document.getElementById('error').innerHTML = '<div class="info_warn2">エラー:幅×高さが65536pxを超えるサイズの画像は変換できません。</div>';
}
function _1663945200_copytoclipboad(){
  let target = document.getElementById('output');
  target.select();
  document.execCommand('Copy');
  alert('コピーしました。');
}
