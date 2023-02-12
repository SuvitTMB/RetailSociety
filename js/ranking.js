var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbNews = firebase.firestore().collection("ttbnews");
  //dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  MyPoint();
  RankingMember();
  OpenPopMenu();
});


function RankingMember() {
  var i = 1;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbttbMember
  //.where('LineID','==',sessionStorage.getItem("LineID"))
  .orderBy('XP_Point','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      var xPicture = '<center><img src="'+ doc.data().LinePicture +'" class="img-ranking"></center>';
      var xProfile = '<div><b>'+ doc.data().EmpName +'</b> ( Level : <b>'+ doc.data().Level_Point +'</b> )<br>Date : '+doc.data().LastUpdate+'</div>';
      dataSet = [xPicture, xProfile, '<b>'+ parseFloat(doc.data().XP_Point).toFixed(2) +'</b>', i ];
      //dataSet = [i, xNews, doc.data().GetPoint, doc.data().LogTimeStamp, doc.data().RefID, doc.data().NewsGroup];
      dataSrc.push(dataSet);
      i++;
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "รูป", className: "txt-center" },
        { title: "ผู้เข้าแข่งขัน" },
        { title: "Point", className: "txt-center" },
        { title: "อันดับ", className: "txt-center" }
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],
        columnDefs: [ { type: 'num-fmt', 'targets': [2] } ],
        order: [[ 2, 'desc']]
      });   
      //if(dTable.row( this ).data()[5]==1) {
        /*
        $('#ex-table tbody').on( 'click', 'tr', function () {
          var data = dTable.row( $(this).parents('tr') ).data();
          if(count!=0) {
            console.log(dTable.row( this ).data()[5]);
            if(dTable.row( this ).data()[5]!=0) {
              ReadNews(dTable.row( this ).data()[4],dTable.row( this ).data()[5]);
            }
          }
        });        
        */
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}

/*
function ReadNews(id,xGroup) {
  location.href = "readnews.html?gid="+id+"&groupid="+xGroup+"";
}



function GotoHome() {
  location.href = "home.html";
}

function GotoGroupNews() {
  location.href = "groupnews.html";
}
*/

function CloseAll() {
  document.getElementById('menu').style.display='none';
}


