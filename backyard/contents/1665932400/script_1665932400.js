function _1665932400_CSSset(id1,id2){
  const input = id2.value;
  try{
    for(let i=0; i <input.split(';').length; i++){
        const property = input[i].split(':')[0];
        id1.style.cssText = input;
    }
  }catch(e){
    alert('*Error*\nInvalid string');
  }
}
function _1665932400_CSSreset(id1){
  id1.style.cssText = '';
}
