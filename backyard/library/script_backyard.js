function disp(){
  if(getparam('c') === null || getparam('c') == '?404'){
    location.href = 'backyard_index.html';
  }else{
    const param = getparam('c')
    fetch('library/list.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      if(Object.keys(data['backyard']).indexOf(param) == -1){
        load_document('404');
      }else{
        load_document(param)
      }
    });
  }
}
function dispUpdate(mode){
  fetch('library/list.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    res = data;
    let contentsHTML = '';
    if(mode === undefined || mode === 9){
      for(let i=0; i<data['contents_update'].length; i++) {
        const hyperlink = 'backyard.html?c=' + data['contents_update'][i][1];
        contentsHTML += '<div class="index_update_tr"><a href="' + hyperlink + '"><span class="index_update_td0">' + data['contents_update'][i][0] + '</span><span class="index_update_td1">' + data['backyard'][data['contents_update'][i][1]]['date'] + '</span><span class="index_update_td2">' + data['backyard'][data['contents_update'][i][1]].title + '</span><a class="index_update_td3" href="backyard_index.html?tag=' + data['backyard'][data['contents_update'][i][1]].category[0] + '">' + data['tags'][data['backyard'][data['contents_update'][i][1]].category[0]]['disp'] + '</a></a></div>';
      }
      document.getElementById('index_update_contents').innerHTML = contentsHTML;
    }
    if(mode === 9){
      for(let i=0; i<Object.keys(data['backyard']).length; i++){
        let tagsHTML = '';
        if(data['tags'][Object.keys(data['tags'])[i]]['backyard'] !== undefined){
          tagsHTML += '<h4>' + data['tags'][Object.keys(data['tags'])[i]]['disp'] + '</h4><div id="' + Object.keys(data['tags'])[i] + '">';
          for(let j=0; j<data['tags'][Object.keys(data['tags'])[i]]['works'].length; j++){
            tagsHTML += '<div class="index_update_tr"><a href="backyard.html?c=' + data['tags'][Object.keys(data['tags'])[i]]['backyard'][j] + '"><span class="index_update_td9"></span><span class="index_update_td1">' + data['backyard'][data['tags'][Object.keys(data['tags'])[i]]['backyard'][j]]['date'] + '</span><span class="index_update_td2">' + data['backyard'][data['tags'][Object.keys(data['tags'])[i]]['backyard'][j]]['title'] + '</span><span class="index_update_td3"></span></a></div>';
          }
          tagsHTML += '</div>';
        }
        document.getElementById('index_update_tags').innerHTML += tagsHTML;
      }
    }
  });
}
function getClientInfo(){
  let outputHTML = '-Info-\n Platform: ' + navigator.platform + '\nUserAgent: ' + navigator.userAgent + '\n Language: ' + window.navigator.language +'\n Viewport: ' + window.innerWidth + '×' + window.innerHeight + '\n Referrer: ' + document.referrer;
  document.getElementById('index_dev_client').textContent = outputHTML;
}
function load_document(val){
  fetch('contents/' + val +'.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    document.title = data['title'];
    document.getElementById('chead_title').textContent = data['title'];
    if(data['description'] !== undefined){
      document.getElementById('chead_description').textContent = data['description'];
    }else{
      document.getElementById('chead_description').classList.add('hidden');
    }
    if(data['date'] !== undefined){
      document.getElementById('ahead_updated').textContent = data['date'];
    }
    const paragraph_info = data['paragraph'];
    for(let i=0; i<paragraph_info.length; i++) {
      const info = paragraph_info[i].split('$');
      let option = '';
      if(info[2] !== undefined && info[2] !== ''){
        option += ' class=' + info[2];
      }
      if(info[3] !== undefined && info[3] !== ''){
        option += ' style=' + info[3];
      }
      if(info[4] !== undefined){
        option += ' id=' + info[4];
      }
      if(info[1] == 'h4' || info[1] == 'h3' || info[1] == 'p' || info[1] == 'pre' || info[1] == 'div'){
        document.getElementById('cmain').innerHTML += '<' + info[1] + option + '>' + data[paragraph_info[i]] + '</' + info[1] + '>';
      }else if(info[1] == 'img'){
        let htmlText = '';
        htmlText += '<div class="dmain_img"><img src="docs/' + data[paragraph_info[i]] + '"' + option + '>';
        const alttag = paragraph_info[i] + 'alt';
        if(data[alttag] !== undefined){
          htmlText += '<br><sup>' + data[alttag] + '</sup></div><br>';
        }
        htmlText += '</div><br>';
        document.getElementById('cmain').innerHTML += htmlText;
      }else if(info[1] == 'table'){
        let htmlText = '<div class="dmain_table"><table>';
        for(let j=0; j<data[paragraph_info[i]].length; j++){
          htmlText += '<tr>';
          for(let k=0; k<data[paragraph_info[i]][j].length; k++) {
            const tagName = data[paragraph_info[i]][j][k].split('$')[0];
            let option = '';
            if(j%2 == 1){
              option += ' class="td_light"';
            }
            if(data[paragraph_info[i]][j][k].split('$')[2] !== undefined){
              option += ' style=' + data[paragraph_info[i]][j][k].split('$')[2];
            }
            htmlText += '<' + tagName + option + '>' + data[paragraph_info[i]][j][k].split('$')[1] + '</' + tagName + '>';
          }
          htmlText += '</tr>'
        }
        htmlText += '</table></div>';
        document.getElementById('cmain').innerHTML += htmlText;
      }else if(info[1] == 'iframe'){
        document.getElementById('cmain').innerHTML += '<iframe src="' + data[paragraph_info[i]] + '"></iframe>';
      }else if(info[1] == 'script'){
        let htmlText = document.createElement('script');
        htmlText.type = 'text/javascript';
        htmlText.src = data[paragraph_info[i]];
        const position = document.getElementsByTagName('script')[0];
        position.parentNode.insertBefore(htmlText,position);
      }
    }
  });
}
