function dispUpdate(mode){
  fetch('library/list.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    res = data
    let docsHTML = '';
    let worksHTML = '';
    if(mode === undefined || mode === 1){
      for(let i=0; i<data['docs_update'].length; i++) {
        const hyperlink = 'document.html?c=' + data['docs_update'][i][1];
        docsHTML += '<div class="index_update_tr"><a href="' + hyperlink + '"><span class="index_update_td0">' + data['docs_update'][i][0] + '</span><span class="index_update_td1">' + data['docs'][data['docs_update'][i][1]]['date'] + '</span><span class="index_update_td2">' + data['docs'][data['docs_update'][i][1]].title + '</span><a class="index_update_td3" href="document_index.html?tag=' + data['docs'][data['docs_update'][i][1]].category[0] + '">' + data['tags'][data['docs'][data['docs_update'][i][1]].category[0]]['disp'] + '</a></a></div>';
      }
      document.getElementById('index_update_docs').innerHTML = docsHTML;
    }
    if(mode === 1 || mode === 2){
      if(location.href.indexOf('#') === -1){
        const tagstr = getparam('tag');
        if(tagstr !== null){
          location.href = location.href.split('?')[0] + '#' + tagstr;
        }
      }
    }
    if(mode === 1){
      for(let i=0; i<Object.keys(data['tags']).length; i++){
        let tagsHTML = '';
        if(data['tags'][Object.keys(data['tags'])[i]]['docs'] !== undefined){
          tagsHTML += '<h4>' + data['tags'][Object.keys(data['tags'])[i]]['disp'] + '</h4><div id="' + Object.keys(data['tags'])[i] + '">';
          for(let j=0; j<data['tags'][Object.keys(data['tags'])[i]]['docs'].length; j++){
            tagsHTML += '<div class="index_update_tr"><a href="document.html?c=' + data['tags'][Object.keys(data['tags'])[i]]['docs'][j] + '"><span class="index_update_td9"></span><span class="index_update_td1">' + data['docs'][data['tags'][Object.keys(data['tags'])[i]]['docs'][j]]['date'] + '</span><span class="index_update_td2">' + data['docs'][data['tags'][Object.keys(data['tags'])[i]]['docs'][j]]['title'] + '</span><span class="index_update_td3"></span></a></div>';
          }
          tagsHTML += '</div>';
        }
        document.getElementById('index_update_tags').innerHTML += tagsHTML;
      }
    }
    if(mode === 2){
      for(let i=0; i<Object.keys(data['tags']).length; i++){
        let tagsHTML = '';
        if(data['tags'][Object.keys(data['tags'])[i]]['works'] !== undefined){
          tagsHTML += '<h4>' + data['tags'][Object.keys(data['tags'])[i]]['disp'] + '</h4><div id="' + Object.keys(data['tags'])[i] + '">';
          for(let j=0; j<data['tags'][Object.keys(data['tags'])[i]]['works'].length; j++){
            tagsHTML += '<div class="index_update_tr"><a href="works.html?c=' + data['tags'][Object.keys(data['tags'])[i]]['works'][j] + '"><span class="index_update_td9"></span><span class="index_update_td1">' + data['works'][data['tags'][Object.keys(data['tags'])[i]]['works'][j]]['date'] + '</span><span class="index_update_td2">' + data['works'][data['tags'][Object.keys(data['tags'])[i]]['works'][j]]['title'] + '</span><span class="index_update_td3"></span></a></div>';
          }
          tagsHTML += '</div>';
        }
        document.getElementById('index_update_tags').innerHTML += tagsHTML;
      }
    }
    if(mode === undefined || mode === 2){
      for(let i=0; i<data['works_update'].length; i++) {
        const hyperlink = 'works.html?c=' + data['works_update'][i][1];
        worksHTML += '<div class="index_update_tr"><a href="' + hyperlink + '"><span class="index_update_td0">' + data['works_update'][i][0] + '</span><span class="index_update_td1">' + data['works'][data['works_update'][i][1]]['date'] + '</span><span class="index_update_td2">' + data['works'][data['works_update'][i][1]].title + '</span><a class="index_update_td3" href="works_index.html?tag=' + data['works'][data['works_update'][i][1]].category[0] + '">' + data['tags'][data['works'][data['works_update'][i][1]].category[0]]['disp'] + '</a></a></div>';
      }
      document.getElementById('index_update_works').innerHTML = worksHTML;
    }
  });
}
