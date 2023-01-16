var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbRedeemRewards = firebase.firestore().collection("ttbRedeemRewards");
  dbttbGiftRewards = firebase.firestore().collection("ttbGiftRewards");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  MyPoint();
  RedeemRewards();
  GiftRewards();
  OpenPopMenu();
});


function RedeemRewards() {
  var str = "";
  var i = 1;
  var xStatus = "";
  str += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str += '<th scope="col">No.</th><th scope="col">รางวัล</th><th scope="col">ใช้เหรียญ</th></tr></thead><tbody>';
  dbttbRedeemRewards.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .orderBy('LogTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().SubNews!='วงล้อมหาสนุก') {
        if(doc.data().Status_Start==0) {
          xStatus = "<font color='#999999'>รอการจัดส่ง</font>";
        } else if(doc.data().Status_Start==1) {
          xStatus = "<font color='#f68b1f'>อยู่ระหว่างการจัดส่ง</font>";
        } else if(doc.data().Status_Start==2) {
          xStatus = "<font color='#07bb12'>จัดส่งเรียบร้อยแล้ว</font>";
        }
        str += '<tr><th scope="row" style="text-align: center;">'+ i +'</th>';
        str += '<td style="text-align: left; line-height: 1.2;"><font color="#0056ff">'+ doc.data().SubNews +'</font>';
        str += '<br>แลกเมื่อ : '+ doc.data().LogDate +'<br>สถานะ : '+ xStatus +'</td>';
        str += '<td style="text-align: center;">'+ (doc.data().GetPoint)*-1 +' เหรียญ</td></tr>';
        i++;
      }
    });
    str += '</tbody></table></div>';
    str += '<div class="clr"></div>';
    $("#DisplayRedeem").html(str);
  });
}


function GiftRewards() {
  var str = "";
  var i = 1;
  var xStatus = "";
  str += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str += '<th scope="col">No.</th><th scope="col">รางวัล</th><th scope="col">ใช้เหรียญ</th></tr></thead><tbody>';
  dbttbGiftRewards.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .orderBy('DateRegister','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().giftname!='เสียใจด้วยน้า') {
        if(doc.data().StatusSend==0) {
          xStatus = "<font color='#999999'>รอการจัดส่ง</font>";
        } else if(doc.data().StatusSend==1) {
          xStatus = "<font color='#f68b1f'>อยู่ระหว่างการจัดส่ง</font>";
        } else if(doc.data().StatusSend==2) {
          xStatus = "<font color='#07bb12'>จัดส่งเรียบร้อยแล้ว</font>";
        }
        str += '<tr><th scope="row" style="text-align: center;">'+ i +'</th>';
        str += '<td style="text-align: left; line-height: 1.2;"><font color="#0056ff">'+ doc.data().giftname +'</font>';
        str += '<br>แลกเมื่อ : '+ doc.data().DateRegister +'<br>สถานะ : '+ xStatus +'</td>';
        str += '<td style="text-align: center;">5 เหรียญ</td></tr>';
        i++;
      }
    });
    str += '</tbody></table></div>';
    str += '<div class="clr"></div>';
    $("#DisplayGiftRandom").html(str);
  });
}


/*
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
*/


