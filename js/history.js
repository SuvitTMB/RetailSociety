var cleararray = "";
var GroupNews = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbBootCamp = firebase.firestore().collection("BootCamp");
  dbBootRegister = firebase.firestore().collection("BootRegister");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  GetAllCampaigns();
  HistoryLog();
  OpenPopMenu();
});



var ArrBootCamp = new Array();
var json = "";
function GetAllCampaigns() {
  var i = 0;
  dbBootCamp.get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ArrBootCamp.push([doc.data().CampRound, doc.data().CampName, doc.data().Hotel, doc.data().TrainingDays, doc.data().CampStatus]);
      i = i+1;
    });
    json = ArrBootCamp.map(function (value, key) {
      return {
          "CampRound": value[0],
          "CampName": value[1],
          "Hotel": value[2],
          "TrainingDays": value[3],
          "CampStatus": value[4]
      }
    });
    console.log(json);
  });
}


function HistoryLog() {
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbBootRegister.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      filterJob = json.filter(item => item.CampRound.indexOf(doc.data().CampRound) > -1);
      i = (i+1);
      //var xNews = '<b>' + doc.data().SubNews + '</b><br>'+ doc.data().HeadNews + ' | ' + doc.data().LogDate;
      var xPlace = '<b>'+ filterJob[0].CampName + '</b><br>'+ filterJob[0].Hotel +'<br>วันที่ '+ filterJob[0].TrainingDays +'<br>ลงทะเบียน <font color="#f68b1f">'+ doc.data().DateTime +'</font> ('+ doc.data().ATK +')';
      dataSet = [i, xPlace, doc.data().DateTime.substring(10, 0) , doc.data().TimeStamp, doc.id];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "No", className: "txt-center" },
        { title: "กิจกรรม / ลงทะเบียน" },
        { title: "Date", className: "txt-none" },
        { title: "Time", className: "txt-none" }
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],
        columnDefs: [ { type: 'num-fmt', 'targets': [1] } ],
        order: [[ 3, 'desc']]
      });   
    /*
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
            ReadNews(dTable.row( this ).data()[4],dTable.row( this ).data()[1]);
        }
      });
      */
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}



function ListGroupNews(NewsGroup) {
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  //.where('EmpGroup','==', sessionStorage.getItem("EmpGroup_BA"))
  dbttbNews
  //.where('GroupType','==',1)
  .where('NewsGroup','==', NewsGroup)
  .where('NewsStatus','==',0)
  .orderBy('NewsTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //if(doc.data().NewsStatus==1) {
        i = (i+1);
        dataSet = [doc.data().NewsDate, doc.data().NewsHeader, doc.data().NewsView, doc.data().NewsTimeStamp, doc.id, i];
        dataSrc.push(dataSet);
        count++;        
      //}

    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "Date", className: "txt-center" },
        { title: "News" },
        { title: "View", className: "txt-center" },
        { title: "Time", className: "txt-none" }
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],
        columnDefs: [ { type: 'num-fmt', 'targets': [1] } ],
        order: [[ 3, 'desc']]
      });   
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
            ReadNews(dTable.row( this ).data()[4],dTable.row( this ).data()[ NewsGroup ]);
        }
      });
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}


function ReadNews(id,xGroup) {
  location.href = "readnews.html?gid="+id+"&groupid="+xGroup+"";
}

function GotoHome() {
  location.href = "home.html";
}

function GotoGroupNews() {
  location.href = "groupnews.html";
}

function CloseAll() {
  document.getElementById('menu').style.display='none';
}


