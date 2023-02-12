var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbAuction = firebase.firestore().collection("ttbAuction");
  //dbttbWebboard = firebase.firestore().collection("ttbWebboard");
  //MyPoint();
  CheckEndAuction();
  OpenPopMenu();
});


function CheckEndAuction() {
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbttbAuction.where('AuctionStatus','==',2)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      var xStatusSend = 0;
      var xStatusSendtext = "";
      if(doc.data().StatusSend==0) {
        xStatusSendtext = "รอการจัดส่ง";
      } else if(doc.data().StatusSend==1) {
        xStatusSendtext = "จัดส่งเรียบร้อยแล้ว"; 
      }
      if(doc.data().Pin==1) {
        var xPicture = '<div style="width:100%; text-align:center;"><img src="' + doc.data().LinePicture + '" class="profile-team" onerror="javascript:imgError(this)" style="width:35px;height:35px;"></div>';
      } else {
        var xPicture = '<div style="width:100%; text-align:center;"><img src="' + doc.data().LinePicture + '" class="profile-team" onerror="javascript:imgError(this)" style="width:35px;height:35px;"></div>';
      }
      var xPost = '<div style="font-size:13px;"><b>'+doc.data().AuctionName+'</b></div><div style="font-size:12px;"><b>'+doc.data().EmpName+'</b></div><div style="font-size:12px;">Date '+ doc.data().LastDateAuction +'<br>สถานะ : '+xStatusSendtext+'</div>';
      dataSet = [xPicture, xPost, doc.data().AuctionPrice + "<img src='./icon/coin.png' class='coin-img'>'", doc.data().TimeStamp, doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [ 
        { title: "img", className: "txt-center" },
        { title: "รายชื่อผู้ชนะประมูล" },
        { title: "เหรียญ", className: "txt-center" },
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
          //console.log(dTable.row( this ).data()[5]);
          if(dTable.row( this ).data()[5]!=0) {
            //ReadWebboard(dTable.row( this ).data()[3],dTable.row( this ).data()[4]);
            WebboardChat(dTable.row( this ).data()[4]);
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


function NewDate() {
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var today = new Date();
  var day = today.getDate() + "";
  var monthEN = (today.getMonth()) + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
  xdateCheck = months[monthEN] + " " + day + ", " + year + " " + hour + ":" + minutes + ":" + seconds ;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}

