function _1660248000_run(){
  const input = document.getElementById('input').value;
  let output = document.getElementById('output');
  if(input !== ''){
    try{
      const parser = new window.DOMParser();
      var xmlData = parser.parseFromString(document.getElementById('input').value,'text/xml');
    }catch(e){
      output.innerHTML = '<div class="info_warn2">エラー:XMLデータのパースに失敗しました。</div>';
    }
    try{
      const limit = Number(xmlData.getElementsByTagName('TrainingSet')[0].getElementsByTagName('TrainingInfo')[0].getElementsByTagName('TrainingLimitTime')[0].textContent);
      const count = Number(xmlData.getElementsByTagName('TrainingSet')[0].getElementsByTagName('TrainingInfo')[0].getElementsByTagName('QuestionCount')[0].textContent);
      if(limit/count === 15){
        _1660248000_tango(xmlData);
      }else if(limit/count === 60){
        _1660248000_jukugo(xmlData);
      }else if(limit/count === 90){
        _1660248000_reibun(xmlData);
      }else{
        output.innerHTML = '<div class="info_warn2">エラー:講座判定に失敗しました。</div>';
      }
    }catch(e){
      output.innerHTML = '<div class="info_warn2">エラー:講座判定に失敗しました。</div>';
    }
  }else{
    output.innerHTML = '<div class="info_warn2">エラー:入力データが空です。</div>';
  }
}
function _1660248000_tango(xmlData){
  let output = document.getElementById('output');
  try{
    const elem = xmlData.getElementsByTagName('TrainingSet')[0].getElementsByTagName('TrainingInfo')[0].getElementsByTagName('QuestionList')[0].getElementsByTagName('Question');
    var tableHTML = '<table><tr><th>問題No.</th><th>英</th><th>解答No.</th><th>日</th></tr>';
    for(let i=0; i<elem.length; i++){
      if(i % 2 === 1){
        tableHTML += '<tr class="td_light">';
      }else{
        tableHTML += '<tr>';
      }
      tableHTML += '<td>' + (i+1) + '</td><td>';
      tableHTML += elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[0].getElementsByTagName('QuestionText')[0].textContent + '</td><td>';
      const answer = elem[i].getElementsByTagName('CorrectList')[0].getElementsByTagName('CorrectListItem')[0].getElementsByTagName('CorrectData')[0].textContent;
      tableHTML += answer + '</td><td>';
      for(let j=0; j<elem[i].getElementsByTagName('ChoiceList')[0].getElementsByTagName('ChoiceListItem').length; j++){
        if(elem[i].getElementsByTagName('ChoiceList')[0].getElementsByTagName('ChoiceListItem')[j].getElementsByTagName('ChoiceNumber')[0].textContent == answer){
          tableHTML += elem[i].getElementsByTagName('ChoiceList')[0].getElementsByTagName('ChoiceListItem')[j].getElementsByTagName('ChoiceText')[0].textContent + '</td><tr>';
          break;
        }
      }
    }
    output.innerHTML = tableHTML;
  }catch(e){
    output.innerHTML = '<div class="info_warn2">エラー:XMLデータの解析に失敗しました。</div>';
  }
}
function _1660248000_jukugo(xmlData){
  let output = document.getElementById('output');
  try{
    const elem = xmlData.getElementsByTagName('TrainingSet')[0].getElementsByTagName('TrainingInfo')[0].getElementsByTagName('QuestionList')[0].getElementsByTagName('Question');
    var tableHTML = '<table><tr><th>No.</th><th>日</th><th>英</th></tr>';
    for(let i=0; i<elem.length; i++){
      if(i % 2 === 1){
        tableHTML += '<tr class="td_light">';
      }else{
        tableHTML += '<tr>';
      }
      if(elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[0].getElementsByTagName('QuestionText')[0].textContent.split('<br/>').length !== 1){
        var splitstr = '<br/>';
      }else{
        var splitstr = '<br>';
      }
      tableHTML += '<td>' + (i+1) + '</td><td>' + elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[0].getElementsByTagName('QuestionText')[0].textContent.split(splitstr)[1] + '</td><td>';
      if(elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[0].getElementsByTagName('QuestionText')[0].textContent.split(splitstr)[2] !== undefined){
        tableHTML += elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[0].getElementsByTagName('QuestionText')[0].textContent.split(splitstr)[2];
      }
      let answer_preset = [...Array(elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem').length)]
      for(let j=1;j<elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem').length; j++){
        answer_preset[j] = elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[j].getElementsByTagName('QuestionText')[0].textContent;
      }
      const answer_order = elem[i].getElementsByTagName('CorrectList')[0].getElementsByTagName('CorrectListItem')[0].getElementsByTagName('CorrectData')[0].textContent.split('@');
      let answer = [...Array(answer_order.length)]
      for(let j=0; j<answer_order.length; j++){
        const order = Number(elem[i].getElementsByTagName('ChoiceList')[0].getElementsByTagName('ChoiceListItem')[j].getElementsByTagName('ChoiceNumber')[0].textContent);
        answer[order] = elem[i].getElementsByTagName('ChoiceList')[0].getElementsByTagName('ChoiceListItem')[j].getElementsByTagName('ChoiceText')[0].textContent;
      }
      for(let j=1; j<answer_preset.length; j++){
        if(answer[j-1] !== undefined){
          tableHTML += answer[j-1];
        }
        if(answer_preset[j] !== undefined && answer_preset[j] !== ''){
          tableHTML += '&nbsp;' + answer_preset[j];
        }else{
          tableHTML += '&nbsp;';
        }
      }
      tableHTML += '</td></tr>';
    }
    output.innerHTML = tableHTML;
  }catch(e){
    output.innerHTML = '<div class="info_warn2">エラー:XMLデータの解析に失敗しました。</div>';
  }
}
function _1660248000_reibun(xmlData){
  let output = document.getElementById('output');
  try{
    const elem = xmlData.getElementsByTagName('TrainingSet')[0].getElementsByTagName('TrainingInfo')[0].getElementsByTagName('QuestionList')[0].getElementsByTagName('Question');
    var tableHTML = '<table><tr><th>No.</th><th>日</th><th>英</th></tr>';
    for(let i=0; i<elem.length; i++){
      if(i % 2 === 1){
        tableHTML += '<tr class="td_light">';
      }else{
        tableHTML += '<tr>';
      }
      if(elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[0].getElementsByTagName('QuestionText')[0].textContent.split('<br/>').length !== 1){
        var splitstr = '<br/>';
      }else{
        var splitstr = '<br>';
      }
      tableHTML += '<td>' + (i+1) + '</td><td>' + elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[0].getElementsByTagName('QuestionText')[0].textContent.split(splitstr)[0] + '</td><td>';
      if(elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[0].getElementsByTagName('QuestionText')[0].textContent.split(splitstr)[1] !== undefined){
        tableHTML += elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[0].getElementsByTagName('QuestionText')[0].textContent.split(splitstr)[1];
      }
      let answer_preset = [...Array(elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem').length)]
      for(let j=1;j<elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem').length; j++){
        answer_preset[j] = elem[i].getElementsByTagName('QuestionTextList')[0].getElementsByTagName('QuestionTextListItem')[j].getElementsByTagName('QuestionText')[0].textContent;
      }
      const answer_order = elem[i].getElementsByTagName('CorrectList')[0].getElementsByTagName('CorrectListItem')[0].getElementsByTagName('CorrectData')[0].textContent.split('@');
      let answer = [...Array(answer_order.length)]
      for(let j=0; j<answer_order.length; j++){
        const order = Number(elem[i].getElementsByTagName('ChoiceList')[0].getElementsByTagName('ChoiceListItem')[j].getElementsByTagName('ChoiceNumber')[0].textContent);
        answer[order] = elem[i].getElementsByTagName('ChoiceList')[0].getElementsByTagName('ChoiceListItem')[j].getElementsByTagName('ChoiceText')[0].textContent;
      }
      for(let j=1; j<answer_preset.length; j++){
        if(answer[j-1] !== undefined){
          tableHTML += answer[j-1];
        }
        if(answer_preset[j] !== undefined && answer_preset[j] !== ''){
          tableHTML += '&nbsp;' + answer_preset[j];
        }else{
          tableHTML += '&nbsp;';
        }
      }
      tableHTML += '</td></tr>';
    }
    output.innerHTML = tableHTML;
  }catch(e){
    output.innerHTML = '<div class="info_warn2">エラー:XMLデータの解析に失敗しました。</div>';
  }
}
