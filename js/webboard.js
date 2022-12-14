var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbWebboard = firebase.firestore().collection("ttbWebboard");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  //dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  //MyPoint();
  CheckWebboard();
  OpenPopMenu();
});


function CheckWebboard() {
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbttbWebboard.where('StatusBoard','==',0)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      var xPicture = '<div style="width:100%; text-align:center;"><img src="' + doc.data().LinePicture + '" class="profile-team" onerror="javascript:imgError(this)" style="width:35px;height:35px;"></div>';
      var xPost = '<div><b>'+doc.data().QWebboard+'</b></div><div style="font-size:12px;">Date '+ doc.data().SendDate +' | Read '+doc.data().ReadWebboard +' | Post ' + doc.data().AnsWebboard +'</div>';

      dataSet = [xPicture, xPost, doc.data().TimeStamp, doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [ 
        { title: "img", className: "txt-center" },
        { title: "คำถาม" },
        { title: "Time", className: "txt-none" }
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],
        columnDefs: [ { type: 'num-fmt', 'targets': [1] } ],
        order: [[ 2, 'desc']]
      });   

        $('#ex-table tbody').on( 'click', 'tr', function () {
          var data = dTable.row( $(this).parents('tr') ).data();
          if(count!=0) {
            console.log(dTable.row( this ).data()[5]);
            if(dTable.row( this ).data()[5]!=0) {
              //ReadWebboard(dTable.row( this ).data()[3],dTable.row( this ).data()[4]);
              WebboardChat(dTable.row( this ).data()[3]);
            }
          }
        });        

  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}


function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    return true;
}



function WebboardChat(id) {
  //alert(id+"==="+i);
  location.href = "webboard-chat.html?gid="+id+"";
}



/*
function GotoHome() {
  location.href = "home.html";
}

function GotoGroupNews() {
  location.href = "groupnews.html";
}

function CloseAll() {
  document.getElementById('menu').style.display='none';
}
*/

