var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  //dbttbRedeemRewards = firebase.firestore().collection("ttbRedeemRewards");
  //dbttbGiftRewards = firebase.firestore().collection("ttbGiftRewards");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbGameRock = firebase.firestore().collection("ttbGameRock");
  dbttbGameLucky = firebase.firestore().collection("ttbGameLucky");
  //MyPoint();
  //OpenGameZone();
  //RedeemRewards();
  //GiftRewards();
  CheckGameLucky();
  CheckGameRock();
  OpenPopMenu();
});


function GotoGame(x) {
  if(x==1) {
    location.href = "intro-game1.html";
  } else if(x==2) { 
    location.href = "intro-game2.html";
  } else if(x==3) { 
    location.href = "intro-game3.html";
  } else if(x==4) { 
    location.href = "intro-game4.html";
  } else if(x==5) { 
    location.href = "intro-game5.html";
  }
}


function CheckGameLucky() {
  var game1 = "";
  var sCheckQ = 0;
  dbttbGameLucky.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game1 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game1 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame1").html(game1);  
  });
}


function CheckGameRock() {
  var game5 = "";
  var sCheckQ = 0;
  dbttbGameRock.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game5 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game5 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame5").html(game5);  
  });
}


/*
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
*/