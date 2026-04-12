let train_data = {};

function __getTimetableDatafromWebSite(stationName){
    /* 参照するインデックス
     * JJ06:松戸発、上野着、上野到着番線
     * JY05:上野発、秋葉原発
     * JK30:上野発、秋葉原発
     * JB19:秋葉原発、飯田橋発、市ケ谷発、信濃町発
     */
    const index_database = {
        "JJ06":[10,15,16],
        "JY05":[22,24],
        "JK30":[22,24],
        "JB19":[25,28,29,31]
    }
    let timetable_data = [];
    const total_train_count = document.getElementsByClassName('paper_table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length - 1;
    for(let i=1; i<total_train_count + 1; i++){
        let is_valid = true;
        let indivisial_train_data;
        const train_number = document.getElementsByClassName('paper_table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[i].textContent;
        const dep_time = document.getElementsByClassName('paper_table')[0].getElementsByTagName('tr')[index_database[stationName][0]].getElementsByTagName('td')[i].textContent;
        const arr_time = document.getElementsByClassName('paper_table')[0].getElementsByTagName('tr')[index_database[stationName][1]].getElementsByTagName('td')[i].textContent;
        if(stationName === 'JJ06'){
            const JJ01_track = document.getElementsByClassName('paper_table')[0].getElementsByTagName('tr')[index_database[stationName][2]].getElementsByTagName('td')[i].textContent;
            indivisial_train_data = [train_number,dep_time,arr_time,JJ01_track];
        }else if(stationName === 'JB19'){
            const arr_time_JB15 = document.getElementsByClassName('paper_table')[0].getElementsByTagName('tr')[index_database[stationName][2]].getElementsByTagName('td')[i].textContent;
            const arr_time_JB13 = document.getElementsByClassName('paper_table')[0].getElementsByTagName('tr')[index_database[stationName][3]].getElementsByTagName('td')[i].textContent;
            indivisial_train_data = [train_number,dep_time,arr_time,arr_time_JB15,arr_time_JB13];
        }else{
            indivisial_train_data = [train_number,dep_time,arr_time];
        }
        if(arr_time === '' || arr_time === '||' || arr_time === '・'){
                is_valid = false;
            }
        if(is_valid === true){
            timetable_data.push(indivisial_train_data);
        }
    }
    console.log(timetable_data);
}

(function(){
    fetch("works/1771254000/data1.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    train_data = data;
    const current_dateObj = new Date();
    let diagram_mode = 'weekdays';
    if(current_dateObj.getDay() === 0 || current_dateObj.getDay() === 6){
        diagram_mode = 'holidays';
        console.log('holidays');
    }
    _1771254000_run(diagram_mode);
    document.querySelectorAll('input[name=modeSelect]').forEach(function (element) { element.addEventListener('change', _1771254000_changeDiagramMode) });
  })
})();

function _1771254000_run(diagram_mode){
    let tableHTML_JJ = '<tr><th colspan="3" style="border-bottom:2px solid #08b263;position:sticky;top:0;">常磐快</th></tr><tr><td style="position:sticky;top:26px;">列番</td><td style="position:sticky;top:26px;">松戸</td><td style="position:sticky;top:26px;">上野着</td></tr>';
    let tableHTML_JYJK = '<tr><th colspan="3" style="border-bottom:2px solid #00b2e7;position:sticky;top:0;">山手京浜</th></tr><tr><td style="position:sticky;top:26px;">列番</td><td style="position:sticky;top:26px;">上野</td><td style="position:sticky;top:26px;">秋葉原</td></tr>';
    let tableHTML_JB = '<tr><th colspan="5" style="border-bottom:2px solid #ffd403;position:sticky;top:0;">中・総緩</th></tr><tr><td style="position:sticky;top:26px;">列番</td><td style="position:sticky;top:26px;">秋葉原</td><td style="position:sticky;top:26px;">飯田橋</td><td style="position:sticky;top:26px;">市ケ谷</td><td style="position:sticky;top:26px;">信濃町</td></tr>';
    //まず山手・京浜の時刻情報を時刻潤に混ぜる
    train_data_JY05JK30 = train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JY05'];
    for(let i=0; i<train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JK30'].length; i++){
        for(let j=0; j<train_data_JY05JK30.length; j++){
            if(train_data_JY05JK30[j][1] > train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JK30'][i][1]){
                train_data_JY05JK30.splice(j,0,train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JK30'][i]);
                break;
            }
        }
    }
    train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JY05JK30'] = train_data_JY05JK30;

    for(let i=0; i<train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JJ06'].length; i++){
     tableHTML_JJ += '<tr><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JJ06'][i][0] + '</td><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JJ06'][i][1] + '</td><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JJ06'][i][2] + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JJ06'][i][3] + '</td></tr>';
    }
    for(let i=0; i<train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JY05JK30'].length; i++){
     tableHTML_JYJK += '<tr><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JY05JK30'][i][0] + '</td><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JY05JK30'][i][1] + '</td><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JY05JK30'][i][2] + '</td></tr>';
    }
    for(let i=0; i<train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JB19'].length; i++){
     tableHTML_JB += '<tr><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JB19'][i][0] + '</td><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JB19'][i][1] + '</td><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JB19'][i][2] + '</td><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JB19'][i][3] + '</td><td>' + train_data['diagrams'][train_data['current_diagram_version']][diagram_mode]['JB19'][i][4] + '</td></tr>';
    }
    document.getElementById('timetable_JJ').innerHTML = tableHTML_JJ;
    document.getElementById('timetable_JYJK').innerHTML = tableHTML_JYJK;
    document.getElementById('timetable_JB').innerHTML = tableHTML_JB;
}

function _1771254000_changeDiagramMode(){
    let modeSelect_value;
    for (let i = 0; i < document.getElementsByName('modeSelect').length; i++) {
      if (document.getElementsByName('modeSelect')[i].checked === true) {
        modeSelect_value = document.getElementsByName('modeSelect')[i].id;
      }
    }
    if(modeSelect_value === 'modeSelect_weekdays'){
        _1771254000_run('weekdays');
    }else{
        _1771254000_run('holidays');
    }
}