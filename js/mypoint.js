var cleararray = "";
var GroupNews = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbNews = firebase.firestore().collection("ttbnews");
  dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  MyPoint();
  NewsLog();
  OpenPopMenu();
});

function CheckGroupNews() {
  var str = "";
  var xCountNews = 0;
  dbGroupNews.where('GroupType','==',1)
  .where('NewsStatus','==',1)
  .orderBy('NewsGroup','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<a href="#ttbNews"><div class="box-menu-group" onclick="CheckNews('+ doc.data().NewsGroup +')">';
      str += '<div><img src="'+ doc.data().NewsIcon +'" class="box-menu-img-group"></div>';
      str += '<div class="box-menu-text-group">'+ doc.data().NewsNameWeb +'</div>';
      str += '<div class="box-menu-count">'+ doc.data().TotalNews +' ข่าว</div></div></a>';
      xCountNews = xCountNews + doc.data().TotalNews;
    });
    str += '<a href="#ttbNews"><div class="box-menu-group" onclick="CheckNews(0)">';
    str += '<div><img src="./img/news-00.png" class="box-menu-img-group"></div>';
    str += '<div class="box-menu-text-group">ดูข่าวสาร<br>ทั้งหมด</div>';
    str += '<div class="box-menu-count">'+ xCountNews +' ข่าว</div></div></a>';
    $("#DisplayGroupNews").html(str);
  });
}


function NewsLog() {
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbttbnewsLog.where('LineID','==',sessionStorage.getItem("LineID"))
  .orderBy('LogTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      var xNews = '<b>' + doc.data().SubNews + '</b><br>'+ doc.data().HeadNews + ' | ' + doc.data().LogDate;

      dataSet = [i, xNews, doc.data().GetPoint, doc.data().LogTimeStamp, doc.data().RefID, doc.data().NewsGroup];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "No", className: "txt-center" },
        { title: "News" },
        { title: "Point", className: "txt-center" },
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
      //if(dTable.row( this ).data()[5]==1) {
        $('#ex-table tbody').on( 'click', 'tr', function () {
          var data = dTable.row( $(this).parents('tr') ).data();
          if(count!=0) {
            console.log(dTable.row( this ).data()[5]);
            if(dTable.row( this ).data()[5]!=0) {
              ReadNews(dTable.row( this ).data()[4],dTable.row( this ).data()[5]);
            }
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


