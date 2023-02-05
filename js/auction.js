var cleararray = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var ReadID = "";
var CoinID = "";
var LastPrice = 0;
var LastPoint = 0;
var xAuctionImg = "";
var xAuctionName = "";
var xAuctionTime = 0;
var xAuctionPrice = 0;
var xAuctionCoin = 0;
var xAuctionClose = 0;
var OldCoinIN = 0;
var qInterval;
var MaxTime = 0;
var gAuctionTime = 0;
var gAuctionPrice = 0;
var mAuctionTime = 0;
var mAuctionPrice = 0;
var OldCoinINuser = 0;

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  ReadID = getParameterByName('gid');
  Connect_DB();
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbAuction = firebase.firestore().collection("ttbAuction");
  dbttbAuctionCoin = firebase.firestore().collection("ttbAuctionCoin");
  dbttbAuctionlog = firebase.firestore().collection("ttbAuctionlog");
  OpenPopMenu();
  ListUserAuction();
  CalPoint();
  MyPoint();
  GetOldCoin();
  ListItem();
});


function getParameterByName(name, url) {
  str = '';
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function CheckUpdate() {
  dbttbAuction.where(firebase.firestore.FieldPath.documentId(), "==", ReadID)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gAuctionTime = doc.data().AuctionTime;
      gAuctionPrice = doc.data().AuctionPrice;
    });
    if(gAuctionPrice==LastPrice) {
      LastPrice = gAuctionPrice;
      ListItem();
      //$('#ex-table').DataTable().destroy();
      //$("#ex-table tbody").remove();
      //ListUserAuction();
    }
  });
  timecountdown();
}


function CheckLastPrice() {
  dbttbAuction.where(firebase.firestore.FieldPath.documentId(), "==", ReadID)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //mAuctionTime = doc.data().AuctionTime;
      mAuctionPrice = parseFloat(doc.data().AuctionPrice) + parseFloat(xAuctionCoin);
    });
    if(parseFloat(mAuctionPrice)!=parseFloat(LastPrice)) {
      document.getElementById('id01').style.display='none';
      document.getElementById('id02').style.display='block';
      //alert("ราคามีการเปลี่ยนแปลงใหม่");     
      //ListItem();
      //ListUserAuction();
    }
    //alert(parseFloat(mAuctionPrice)+"==="+parseFloat(LastPrice));
  });
}


function timecountdown() {
    var timeleft = MaxTime;
    //console.log("Time Left = "+timeleft);
    qInterval = setInterval(function(){
    if(timeleft <= 0) {
      stopcountdown();
      MyPoint();
      CheckUpdate();
    }
    },10000);
}


function stopcountdown() { 
  clearInterval(qInterval);
}


function ListItem() {
  CalPoint();
  console.log("point-in = "+sessionStorage.getItem("RP_Point"));
  //MyPoint();
  var str = "";
  var str1 = "";
  var EndGame = 0;
  $("#LoadItem").html(str);
  dbttbAuction.where(firebase.firestore.FieldPath.documentId(), "==", ReadID)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      LastPrice = 0;
      //EndGame = 1;
      //LastPrice = parseFloat(doc.data().AuctionPrice) + parseFloat(doc.data().AuctionCoin) ;
      LastPoint = parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) - parseFloat(LastPrice);
      xAuctionImg = doc.data().AuctionImg;
      xAuctionName = doc.data().AuctionName;
      xAuctionTime = doc.data().AuctionTime;
      xAuctionPrice = doc.data().AuctionPrice;
      xAuctionCoin = doc.data().AuctionCoin;
      xAuctionClose = doc.data().AuctionClose;
      LastPrice = parseFloat(xAuctionPrice) + parseFloat(xAuctionCoin) ;
      console.log("CoinCheck="+CoinCheck);
      //console.log(LastPrice+"==="+sessionStorage.getItem("RP_Point")+"==="+doc.data().AuctionClose);
      if(doc.data().AuctionType==0) {
        alert("ระบบยังไม่เปิดการประมูล");
      } else if(doc.data().AuctionType==1) { 
        TimeCheckEnd(doc.data().AuctionDateStop,doc.id);
        str += '<div style="width:25%; float: left; margin-right: 5px;">';
        str += '<img src="'+ doc.data().AuctionImg +'" style="width:90%; text-align: center;"></div><div style="width:73%; float: left;">';
        str += '<div class="font13black" style="padding:6px 6px 0px 0px;"><b>'+ doc.data().AuctionName +'</b></div>';
        str += '<div class="font12black" style="padding-top:3px; overflow: hidden;">'+ doc.data().AuctionDetail +'</div></div>';
        str1 += '<div class="clr"></div><div style="width:100%; max-width: 350px;margin:3px auto;">';
        str1 += '<div class="auction-subbox">';
        str1 += '<div class="auction-number">'+ doc.data().AuctionTime +'</div><div class="font11center">ครั้งที่ประมูล</div></div>';
        str1 += '<div class="auction-subbox">';
        str1 += '<div class="auction-number">'+ doc.data().AuctionPrice +'<img src="./icon/coin.png" class="coin-img"></div><div class="font11center">ราคาตอนนี้</div></div>';

        str1 += '<div class="auction-subbox" style="background-color:#002d63;">';
        str1 += '<div class="auction-number" style="color:#fff;">+'+ doc.data().AuctionCoin +'<img src="./icon/coin.png" class="coin-img"></div><div class="font11center" style="color:#fff;">เพิ่มครั้งละ</div></div>';
        str1 += '<div class="auction-subbox" style="background-color:#002d63;">';
        str1 += '<div class="auction-number" style="color:#fff;">'+ LastPrice +'<img src="./icon/coin.png" class="coin-img"></div><div class="font11center" style=" color:#fff;">ราคาประมูล</div></div>';
        str1 += '<div class="clr"></div>';
        str1 += '<center><div class="font11" style="color:#444; padding-top:20px; font-size: 10px;">เหลือเวลาประมูลอีก</div>';
        str1 += '<div id="A0" class="font12black" style="color:#ea0218;padding:0;font-size: 14px; font-weight: 600;"></div></center>';
        //str1 += '<div class="auction-subbox" style="width:46%; background-color: #aacdfb; cursor: pointer;">';
        //str1 += '<div class="font11" style="color:#444; padding-top:7px; font-size: 10px;">เหลือเวลาประมูลอีก</div>';
        //str1 += '<div id="A0" class="font12" style="color:#ea0218;padding:0;font-size: 14px; font-weight: 600;"></div></div>';CoinOld
        str1 += '</div>';
        //str += '</div>';
        str1 += '<div class="clr"></div>';
        str1 += '<center>';
        console.log("session point = "+sessionStorage.getItem("RP_Point")+OldCoinINuser);
        if(doc.data().AuctionClose==0) {
          //if(parseFloat(sessionStorage.getItem("RP_Point"))>=parseFloat(LastPrice)) {
          if(parseFloat(CoinCheck)>=parseFloat(LastPrice)) {
            //console.log("1==="+LastPoint+">"+sessionStorage.getItem("RP_Point")+"==="+doc.data().AuctionClose+"==="+doc.data().AuctionClose);
            str1 += '<div id="CloseAuction" onclick="ClickAuction()" class="btn-t1a" style="margin-top:15px;text-align:center;background-color:#20b52d;padding:7px 40px;border-radius:10px;">คุณต้องใช้เหรียญรางวัล<br><font color="#ffff00">'+ parseFloat(LastPrice) +'<img src="./icon/coin.png" class="coin-img"> เหรียญรางวัล</font><br>คลิกเพื่อเข้าร่วมประมูล</div>';
          //} else if(parseFloat(sessionStorage.getItem("RP_Point"))<parseFloat(LastPrice)) {
          } else if(parseFloat(CoinCheck)<parseFloat(LastPrice)) {
            //console.log("2==="+LastPoint+"<"+sessionStorage.getItem("RP_Point")+"==="+doc.data().AuctionClose+"==="+doc.data().AuctionClose);
            str1 += '<div id="CloseAuction1" class="btn-t1a" style="margin-top:15px;text-align:center;background-color:#555;padding:7px 40px;border-radius:10px;">คุณเหลือเหรียญรางวัลอีก<br><font color="#ffff00">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'<img src="./icon/coin.png" class="coin-img"> เหรียญรางวัล</font><br>เหรียญไม่พอที่จะเข้าร่วมประมูล</div>';
          }
        } else if(doc.data().AuctionClose==1) { 
          str1 += '<div class="btn-t1a" onclick="location.href=\'endauction.html\'" style="margin-top:15px;text-align:center;background-color:#555;padding:15px 40px;border-radius:10px;">ขณะนี้การประมูลสินค้า<br>รายการนี้สิ้นสุดลงแล้ว</div>';
        }
        str1 += '</center>';
      }
    });
    MyPoint();
    OpenPopMenu();
    $("#LoadStock").html(str);  
    $("#LoadItem").html(str1);  
    timecountdown();
  });
}


function ListUserAuction() {
  var i = 1;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbttbAuctionlog
  .where('RefID','==',ReadID)
  .orderBy('LogTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      var xPicture = '<center><img src="'+ doc.data().LinePicture +'" class="img-ranking"></center>';
      var xProfile = '<div style="font-size:12px;"><b>'+ doc.data().EmpName +'</b><br>Date : '+doc.data().LogDate+'</div>';
      var xCoin = '<div style="padding-left:4px;"><div class="auction-number" style="float:left;">'+ parseFloat(doc.data().UserCoinAuction) +'</div><img src="./icon/coin.png" style="width:20px; height:20px;"></div></div>';
      //<div>'+ parseFloat(doc.data().UserCoinAuction).toFixed(0) +'<img src="./icon/coin.png" class="coin-img"></div>';
      dataSet = [xPicture, xProfile, xCoin, i ];
      dataSrc.push(dataSet);
      i++;
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "รูป", className: "txt-center" },
        { title: "ข้อมูลผู้เข้าร่วมประมูล" },
        { title: "เหรียญ", className: "txt-center" }
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],
        columnDefs: [ { type: 'num-fmt', 'targets': [2] } ],
        order: [[ 2, 'desc']]
      });   
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}


var xxx = 0;
function TimeCheckEnd(x,id) {
  var countDownDate = new Date(x).getTime();
  //console.log(x+"==="+countDownDate+"==="+id);
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    $("#A0").html(days + "d " + hours + "h " + minutes + "m " + seconds + "s");  

    //document.getElementById("A0").innerHTML = + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    if (distance < 0) {
      clearInterval(x);
      $("#A0").html("หมดเวลาการประมูล");  
      //document.getElementById("A0").innerHTML = "หมดเวลาการประมูล";
      //$("#CloseAuction1").html('<div class="btn-t1a" style="margin-top:30px;text-align:center;background-color:#555;padding:15px 40px;">ขณะนี้การประมูลสินค้า<br>รายการนี้สิ้นสุดลงแล้ว</div>');  
      if(xxx==0) {
        xxx = 1;
        dbttbAuction.doc(id).update({
          AuctionClose : 1, //ปิดการประมูล
          AuctionStatus : 2 //สิ้นสุดการประมูล
        });
        ListItem();
      }
    }
  }, 1000);
}


function GetOldCoin() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var CheckOld = 0;
  dbttbAuctionCoin
  .where('RefID','==',ReadID)
  .orderBy('LogTimeStamp','desc')
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckOld = 1;
      CoinID = doc.id;
      if(sessionStorage.getItem("EmpName_Society")==doc.data().EmpID) {
        OldCoinINuser = doc.data().CoinIN;
      } else {
        OldCoinIN = doc.data().CoinIN;
      }
    });
    MyPoint();
    OpenPopMenu();
  });
}



function ClickAuction() {
  var i = 1;
  var str = "";
  str += '<div class="btn-t3" style="margin-top:45px;">ยืนยันการประมูล</div>';
  str += '<center><div style="margin:15px auto;"><img src="'+ xAuctionImg +'" style="width:150px; text-align: center;"></div>';
  str += '<div class="font13black" style="text-align:center;font-weight: 600;">'+ xAuctionName +'</div></cener>';
  str += '<div class="clr" style="height:20px;"></div>';
  str += '<table class="table table-bordered" style="background-color: #fff; width:90%; margin:auto;">';
  str += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str += '<th scope="col">รายการ</th><th scope="col">จำนวน</th></tr></thead><tbody>';
  str += '<tr><th scope="row" style="text-align: left;">ประมูลครั้งละ</th>';
  str += '<td style="text-align: center; line-height: 1.2;"><font color="#0056ff">'+ xAuctionCoin +' เหรียญ</font></td></tr>';
  str += '<tr><th scope="row" style="text-align: left;">ครั้งที่ประมูล</th>';
  str += '<td style="text-align: center; line-height: 1.2;"><font color="#0056ff">'+ xAuctionTime +' ครั้ง</font></td></tr>';
  str += '<tr><th scope="row" style="text-align: left;">ราคาล่าสุด</th>';
  str += '<td style="text-align: center; line-height: 1.2;"><font color="#0056ff">'+ xAuctionPrice +' เหรียญ</font></td></tr>';
  str += '<tr><th scope="row" style="text-align: left;">ราคาประมูลตอนนี้</th>';
  str += '<td style="text-align: center; line-height: 1.2;"><font color="#0056ff">'+ LastPrice +' เหรียญ</font></td></tr>';
  str += '</tbody></table></div>';
  str += '<div class="clr"></div>';

  str += '<div class="clr" style="height:20px;"></div>';
  str += '<div id="ConfirmItem">'
  str += '<div class="btn-t2-no" onclick="BeForConfirm()" style="margin-top:10px;">ยืนยันประมูล</div>';
  str += '<div class="btn-t2-ok" onclick="CloseAll()" style="margin-top:10px;">ยังไม่ประมูล</div>';
  str += '<div class="clr" style="height:20px;"></div>';
  str += '</div>'
  $("#BeforeAuction").html(str);  
  document.getElementById('id01').style.display='block';
}


function BeForConfirm() {
  CheckLastPrice();
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  $("#ConfirmItem").html('<img src="./img/loading1.gif" style="padding-top:10px;width:25px;margin-bottom: 30px;">');  
  var iCheck = 0;
  dbttbAuctionCoin
  .where('RefID','==',ReadID)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      iCheck = 1;
      SendCoinBack(doc.id,doc.data().EmpID,doc.data().CoinIN);
    });
    SaveNewData();
    //CalPoint();
    //MyPoint();
  });

}


function SendCoinBack(eid,empid,coin) {
  //CalPoint();
  dbttbMember.where('EmpID','==',empid)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      AddCoinBack(eid,doc.id,coin);
    });
    //CalPoint();
    //MyPoint();
  });
}

var xCoinOld = 0;
function AddCoinBack(eid,id,coin) {
  xCoinOld = 0;
  dbttbMember.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      console.log("โอนคะแนนไปที่ -->"+doc.data().EmpID);
      xCoinOld = parseFloat(doc.data().RP_Point) + parseFloat(coin);
      dbttbMember.doc(id).update({
        RP_Point : parseFloat(xCoinOld)
      });
    });
    console.log("CoinOld="+xCoinOld);
    sessionStorage.setItem("RP_Point", xCoinOld);
    dbttbAuctionCoin.doc(eid).delete();
    MyPoint();
    OpenPopMenu();
    //CalPoint();
    //CalPoint();
    //console.log("Delete");
  });
}


function SaveNewData() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var xHeader = xAuctionName;
  console.log(parseFloat(sessionStorage.getItem("RP_Point"))+"==="+parseFloat(LastPrice));
  dbttbMember.doc(sessionStorage.getItem("RefID_Member")).update({
    RP_Point : parseFloat(sessionStorage.getItem("RP_Point")) - parseFloat(LastPrice)
  });
  dbttbAuctionCoin.add({
    RefID : ReadID,
    EmpID : sessionStorage.getItem("EmpID_Society"),
    CoinIN : parseFloat(LastPrice),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });    
  dbttbAuction.doc(ReadID).update({
    AuctionTime : parseFloat(xAuctionTime) + 1, 
    AuctionPrice : parseFloat(LastPrice), 
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    LastDateAuction : dateString,
    TimeStamp : TimeStampDate
  });    
  dbttbAuctionlog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    RefID : ReadID,
    HeadNews : "Auction",
    SubNews : xHeader,
    AuctionTime : parseFloat(xAuctionTime),
    AuctionPrice : parseFloat(xAuctionPrice),
    AuctionCoin : parseFloat(xAuctionCoin),
    AuctionImg : xAuctionImg,
    AuctionCoin : parseFloat(xAuctionCoin),
    UserCoinAuction : parseFloat(LastPrice),
    LastPoint : parseFloat(sessionStorage.getItem("RP_Point")),
    LogDate : dateString,
    Status_Confirm : 0,
    LogTimeStamp : TimeStampDate
  })
  //sessionStorage.setItem("RP_Point", CoinOld);
  //CalPoint();
  MyPoint();
  OpenPopMenu();
  ListItem();
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
  ListUserAuction();
  $("#ConfirmItem").html('<div class="btn-t2-ok" onclick="CloseAll()" style="margin-top:10px;">บันทึกการประมูลเรียบร้อยแล้ว</div>');  
}


function CheckCoinID() {
  dbttbAuctionCoin
  .where('RefID','==',ReadID)
  .orderBy('LogTimeStamp','desc')
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CoinID = doc.id;
      //console.log("New CoinID="+CoinID);
    });
  });
}



function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  //document.getElementById('menu').style.display='none';
  //ListRewards();
  //GetAllRewards();

}

function gotoAuction() {
  location.href = 'auction.html?gid='+ReadID;
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

function ConvrtDate(str) {
  var date = new Date(str),
  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()+543].join("/");
}

function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
