function getparam(name) {
   /*
    *  original sourcecode by:
    *  https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    *  https://www-creators.com/archives/4463#URL
    */
  url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
gnav_menu_sp_visible = false;
function common(){
  document.getElementById('gnav_menu_input_sp').addEventListener('change',gnav_menu_sp,false);
  document.getElementById('gnav_menu_sp_wrapper').addEventListener('change',gnav_menu_sp,false);
  try{
    const origin = parent.location.href;
    console.log(origin)
  }catch(e){
    if(calcCharCode(location.href.slice(0,7)) !== 14967811650960){
      location.href = 'blocked.html?path=' + location.href;
    }
  }
  if(calcCharCode(document.referrer) === 6.364447999357805e+24 && getparam('r') !== null && calcCharCode(getparam('r')) === 69376258000){
    cookieStr = 'sT=' + getparam('r') + ';max-age=31536000';
    document.cookie = cookieStr;
  }else if(calcCharCode(document.referrer) === 5.51265348804166e+46 && getparam('r') !== null && calcCharCode(getparam('r')) === 380270300390323200){
    const cookieStr = 'sI=' + getparam('r') + ';max-age=31536000';
    document.cookie = cookieStr;
  }
}
function blocked(){
  if(getparam('path') !== null){
    document.getElementById('src').href = getparam('path');
  }else{
    document.getElementById('src').href = "https://vsvw.github.io";
  }
}
function gnav_menu_sp(){
  if(gnav_menu_sp_visible === false){
    gnav_menu_sp_visible = true;
    document.getElementsByClassName('gnav_menu_label_sp')[0].style.backgroundImage = 'url(library/images/nav_sp2.png)';
    document.getElementById('gnav_menu_sp').classList.add('gnav_menu_sp_visible');
    document.getElementById('gnav_menu_sp_wrapper').classList.add('gnav_menu_sp_wrapper_visible');
    document.getElementsByTagName('body')[0].classList.add('no_scroll');
  }else{
    gnav_menu_sp_visible = false;
    document.getElementsByClassName('gnav_menu_label_sp')[0].style.backgroundImage = 'url(library/images/nav_sp.png)';
    document.getElementById('gnav_menu_sp').classList.remove('gnav_menu_sp_visible');
    document.getElementById('gnav_menu_sp_wrapper').classList.remove('gnav_menu_sp_wrapper_visible');
    document.getElementsByTagName('body')[0].classList.remove('no_scroll');
  }
}
function calcCharCode(str){
  let calcresult = 1;
  for(let i=0;i<str.split('').length;i++){
    calcresult = calcresult * Number(str.split('')[i].codePointAt(0).toString(10));
  }
  return calcresult;
}
