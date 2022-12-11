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
  //CheckGroupNews();
  //CheckNews(GroupNews);
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

/*
function CheckNews(NewsGroup) {
  if(NewsGroup==0) {
    ListAllNews();
  } else {
    ListGroupNews(NewsGroup);
  }
}
*/


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
      dataSet = [i, xNews, doc.data().GetPoint, doc.data().LogTimeStamp, doc.id];
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


