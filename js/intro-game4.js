var cleararray = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  $("#ToDayDate").html("<div style='margin:0px auto 25px auto; font-size:13px; color:#ff0000;'>กิจกรรมประจำวันที่ "+today);  
  Connect_DB();
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbAuction = firebase.firestore().collection("ttbAuction");
  MyPoint();
  CalPoint();
  OpenPopMenu();
  AuctionStock();
});


function AuctionStock() {
  str = "";
  var i = 0
  var EndGame = 0;
 dbttbAuction.where('AuctionStatus','==',1)
  .orderBy('AuctionType','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EndGame = 1;
      if(doc.data().AuctionType==0) {
        //ระบบจะเริ่มประมูล
        TimeCheckStart(doc.data().AuctionDateStart,i,doc.id);
        str += '<div class="auction-box" id="'+i+'"><div style="width:25%; float: left; margin-right: 5px;">';
        str += '<img src="'+ doc.data().AuctionImg +'" style="width:90%; text-align: center;"></div><div style="width:73%; float: left;">';
        str += '<div class="font13black" style="padding:6px 6px 0px 0px;font-weight: 600;">'+ doc.data().AuctionName +'</div>';
        str += '<div class="font12black" style="padding-top:3px; overflow: hidden;">'+ doc.data().AuctionDetail +'</div></div>';
        str += '<div class="clr"></div><div style="width:100%; max-width: 350px;margin:3px 0;">';
/*
        str += '<div class="auction-subbox" style="background-color:#002d63;">';
        str += '<div class="auction-number" style="color:#fff;">+'+ doc.data().AuctionCoin +'<img src="./icon/coin.png" class="coin-img"></div><div class="font11center" style="color:#fff;">เพิ่มครั้งละ</div></div>';
        str += '<div class="auction-subbox" style="background-color:#002d63;">';
        str += '<div class="auction-number" style="color:#fff;">'+ (parseFloat(doc.data().AuctionPrice) + parseFloat(doc.data().AuctionCoin)) +'<img src="./icon/coin.png" class="coin-img"></div><div class="font11center" style="color:#fff;">ราคาประมูล</div></div>';
        if(doc.data().EmpName!="") {
          str += '<div class="clr" style="height:7px;"></div>';
          str += '<div class="auction-subbox" style="background-color:#feddc1;width:95%;">';
          str += '<div style="width:100%;"><div style="width:20%;float: left; text-align: center;margin-right:5px;"><img src="'+ doc.data().LinePicture +'" class="Profile-img" style="width:45px; height:45px;"></div>';
          str += '<div class="Profile-title" style="font-size:12px;color:#111;">ประมูลล่าสุด : <b>'+ doc.data().EmpName +'</b><br>ราคาประมูล : '+ doc.data().AuctionPrice +' เหรียญรางวัล<br>วันที่ประมูล : '+ doc.data().LastDateAuction +'</div>';
          str += '</div></div>';
          str += '<div class="clr" style="height:5px;"></div>';
        }
*/
        str += '<div class="auction-subbox" style="width:100%; background-color: #6c757d;margin-left:0px;">';
        str += '<div class="font11" style="color:#fff;padding-top:7px;font-size: 10px;">จะเริ่มประมูลในเวลา</div>';
        str += '<div id="A'+i+'" class="font12" style="color:#ffff00;padding:0;font-size: 14px; font-weight: 600;"></div>';
        str += '</div></div></div>';
      } else if(doc.data().AuctionType==1) { 
        //ระบบจะปิดประมูล
        TimeCheckEnd(doc.data().AuctionDateStop,i,doc.id);
        str += '<div class="auction-box" id="'+i+'"><div style="width:25%; float: left; margin-right: 5px;">';
        str += '<img src="'+ doc.data().AuctionImg +'" style="width:90%; text-align: center;"></div><div style="width:73%; float: left;">';
        str += '<div class="font13black" style="padding:6px 6px 0px 0px;font-weight: 600;">'+ doc.data().AuctionName +'</div>';
        str += '<div class="font12black" style="padding-top:3px; overflow: hidden;">'+ doc.data().AuctionDetail +'</div></div>';
        str += '<div class="clr"></div>';
        if(doc.data().EmpName!="") { 
          str += '<div class="clr" style="height:7px;"></div>';
          str += '<div class="auction-subbox" style="background-color:#feddc1;width:100%; margin-left:0px;">';
          str += '<div style="width:100%;"><div style="width:20%;float: left; text-align: center;margin-right:5px;"><img src="'+ doc.data().LinePicture +'" class="Profile-img" style="width:45px; height:45px;"></div>';
          str += '<div class="Profile-title" style="font-size:12px;color:#111;">ประมูลล่าสุด : <b>'+ doc.data().EmpName +'</b><br>ราคาประมูล : '+ doc.data().AuctionPrice +' เหรียญรางวัล<br>วันที่ประมูล : '+ doc.data().LastDateAuction +'</div>';
          str += '</div></div>';
          str += '<div class="clr" style="height:5px;"></div>';
        }

        str += '<div style="width:100%; max-width: 350px;margin:3px auto;">';
        str += '<div class="auction-subbox" style="background-color:#002d63;">';
        str += '<div class="auction-number" style="color:#fff;">+'+ doc.data().AuctionCoin +'<img src="./icon/coin.png" class="coin-img"></div><div class="font11center" style="color:#fff;">เพิ่มครั้งละ</div></div>';
        str += '<div class="auction-subbox" style="background-color:#002d63;">';
        str += '<div class="auction-number" style="color:#fff;">'+ (parseFloat(doc.data().AuctionPrice) + parseFloat(doc.data().AuctionCoin)) +'<img src="./icon/coin.png" class="coin-img"></div><div class="font11center" style="color:#fff;">ราคาประมูล</div></div>';
//      str += '</div>';  

        str += '<div class="auction-subbox" style="width:47%; background-color: #fd7e14; cursor: pointer;">';
        str += '<div class="font11" style="color:#444;padding:0;font-size: 10px;">เหลือเวลาประมูลอีก</div>';
        str += '<div id="A'+i+'" class="font12" style="color:#fff;padding:0;font-size: 14px; font-weight: 600;"></div>';
        str += '<div onclick="gotoAuction(\''+ doc.id +'\')" class="auction-number" style="font-size: 13px;font-weight: 600; color:#111111;">คลิกเพื่อเข้าร่วมประมูล</div></div></div></div>';

      }
      i++;
    });
    if(EndGame==0) {
      str = "";
      str = '<div style="font-size:13px; margin:0px auto 20px auto; background-color:#cdd4da;height:80px;padding-top:30px;border-radius: 10px;"><b>ขณะนี้ยังไม่มีรายการประมูล</b></div>';
      //console.log("ไม่มีรายการประมูลในขณะนี้");
    } else {
      MyPoint();
      CalPoint();
    }
      $("#LoadStock").html(str);  


  });
}


function TimeCheckStart(x,n,id) {
  var countDownDate = new Date(x).getTime();
  //console.log(x+"==="+countDownDate+"==="+id);
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("A"+n).innerHTML = + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("A"+n).innerHTML = "เริ่มต้นการประมูล";
      UpdateAuctionStart(x,n,id);
      //console.log("เริ่มเข้าสู่การประมูล"+ " A"+n+"==="+id);
    }
  }, 1000);
}


var xxx = 0;
function TimeCheckEnd(x,n,id) {
  var countDownDate = new Date(x).getTime();
  //console.log(x+"==="+countDownDate+"==="+id);
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("A"+n).innerHTML = + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("A"+n).innerHTML = "หมดเวลาการประมูล";
      if(xxx==0) {
        UpdateAuctionStop(x,n,id);
      }
     // console.log("หมดเวลา"+ " A"+n+"==="+id);
    }
  }, 1000);
}


function UpdateAuctionStart(x,n,id) {
  var str = "";
  dbttbAuction.doc(id).update({
    AuctionClose : 0,
    AuctionType : 1 //เริ่มต้นการประมูล
  });
  dbttbAuction.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      TimeCheckEnd(doc.data().AuctionDateStop,n,doc.id);
      str += '<div id="'+n+'"><div style="width:25%; float: left; margin-right: 5px; max-width:450px;">';
      str += '<img src="'+ doc.data().AuctionImg +'" style="width:90%; text-align: center;"></div><div style="width:73%; float: left;">';
      str += '<div class="font13black" style="padding:6px 6px 0px 0px;font-weight: 600;">'+ doc.data().AuctionName +'</div>';
      str += '<div class="font12black" style="padding-top:3px; overflow: hidden;">'+ doc.data().AuctionDetail +'</div></div>';
      str += '<div class="clr"></div><div style="width:100%; max-width: 350px;margin:3px auto;">';
      str += '<div class="auction-subbox">';
      str += '<div class="auction-number">'+ doc.data().AuctionTime +'</div><div class="font11center">ครั้งที่ประมูล</div></div>';
      str += '<div class="auction-subbox">';
      str += '<div class="auction-number">'+ doc.data().AuctionPrice +'<img src="./icon/coin.png" class="coin-img"></div><div class="font11center">ราคาล่าสุด</div></div>';
      str += '<div class="auction-subbox" style="width:46%; background-color: #aacdfb; cursor: pointer;">';
      str += '<div class="font11" style="color:#444;padding:0;font-size: 10px;">เหลือเวลาประมูลอีก</div>';
      str += '<div id="A'+n+'" class="font13black" style="color:#ea0218;padding:0; font-weight: 600;"></div>';
      str += '<div class="font12black" style="font-weight: 600; color:#111111;">คลิกเพื่อเข้าร่วมประมูล</div></div></div></div>';
    });
    $("#"+n).html(str);  
  });
}


function UpdateAuctionStop(x,n,id) {
  xxx = 1;
  var str = "";
  dbttbAuction.doc(id).update({
    AuctionClose : 1,
    AuctionStatus : 2 //ปิดการประมูล
  });
  dbttbAuction.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      TimeCheckEnd(doc.data().AuctionDateStop,n,doc.id);
      str += '<div id="'+n+'"><div style="width:25%; float: left; margin-right: 5px;">';
      str += '<img src="'+ doc.data().AuctionImg +'" style="width:90%; text-align: center;"></div><div style="width:73%; float: left;">';
      str += '<div class="font13black" style="padding:6px 6px 0px 0px;font-weight: 600;">'+ doc.data().AuctionName +'</div>';
      str += '<div class="font12black" style="padding-top:3px; overflow: hidden;">'+ doc.data().AuctionDetail +'</div></div>';
      str += '<div class="clr"></div><div style="width:100%; max-width: 350px;margin:3px auto;">';
      str += '<div class="auction-subbox">';
      str += '<div class="auction-number">'+ doc.data().AuctionTime +'</div><div class="font11center">ครั้งที่ประมูล</div></div>';
      str += '<div class="auction-subbox">';
      str += '<div class="auction-number">'+ doc.data().AuctionPrice +'<img src="./icon/coin.png" class="coin-img"></div><div class="font11center">ราคาล่าสุด</div></div>';
      str += '<div class="auction-subbox" style="width:46%; background-color: #7489a5; cursor: pointer;">';
      str += '<div class="font11" style="color:#fff;padding:0;font-size: 10px;">ปิดการประมูล</div>';
      str += '<div id="A'+n+'" class="font13black" style="color:#ffff00;padding:0;font-size: 14px; font-weight: 600;"></div>';
      str += '<div onclick="gotoAuction(\''+ doc.id +'\')" class="auction-number" style="font-size: 13px;font-weight: 600; color:#fff;">คลิกเพื่อดูผลการประมูล</div></div></div></div>';
    });
    $("#"+n).html(str);  
  });
}


function gotoAuction(id) {
  location.href = "auction.html?gid="+ id;  
}

function CloseAll() {
  document.getElementById('id03').style.display='none';
}


function NewDate() {
 var today = new Date();
 var day = today.getDate() + "";
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
}


function checkZero(data){
 if(data.length == 1){
   data = "0" + data;
 }
 return data;
}


