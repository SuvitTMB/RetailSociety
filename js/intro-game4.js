var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  $("#ToDayDate").html("<div style='margin:0px auto 25px auto; font-size:13px; color:#ff0000;'>กิจกรรมประจำวันที่ "+today);  
  Connect_DB();
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  OpenPopMenu();
  TimeOnline();
/*
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbttbQuiz = firebase.firestore().collection("ttbGameLucky");
  SelectBoxGroup('A');
  CheckUserScore();
  CheckUserQuiz();
  UserBoard('A');
*/
});



function TimeOnline() {
var countDownDate = new Date("Jan 30, 2023 15:37:25").getTime();
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);}





/*
var CheckPass = 0;
function CheckUserScore() {
  dbttbMember.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //var CalRatio = ((doc.data().PictureTime/6)*100);
      var UserAll = parseFloat(doc.data().PictureWin) + parseFloat(doc.data().PictureLost);
      var CalTrue = ((parseFloat(doc.data().PictureWin)/UserAll)*100);
      var CalFalse = ((parseFloat(doc.data().PictureLost)/UserAll)*100);
      if(Number.isNaN(CalTrue)) { CalTrue = 0; }
      if(Number.isNaN(CalFalse)) { CalFalse = 0; }
      document.getElementById('Loading').style.display='none';
      document.getElementById('NoQuiz').style.display='block';
      document.getElementById('LoadQuiz').style.display='none';
      $("#ShowUserSumTime1").html("<div class='font15number' style='color:#f68b1f;'>"+doc.data().PictureTime+'</div><div class="ScoreGame4-text">จำนวน<br>แข่งสะสม</div>');
      $("#ShowUserSumTime2").html("<div class='font15number' style='color:#2dcc02'>"+CalTrue.toFixed(2) +'%</div><div class="ScoreGame4-text">%<br>ตอบถูก</div>');
      $("#ShowUserSumTime3").html("<div class='font15number' style='color:#ff0000'>"+CalFalse.toFixed(2) +'%</div><div class="ScoreGame4-text">%<br>ตอบผิด</div>');
      $("#ShowUserSumTime4").html("<div class='font15number' style='color:#0056ff'>"+doc.data().PictureCoin.toFixed(2) +'</div><div class="ScoreGame4-text">เหรียญ<br>รางวัล</div>');
    });
    document.getElementById('Loading1').style.display='none';
    document.getElementById('Show1').style.display='block';
    document.getElementById('Loading2').style.display='none';
    document.getElementById('Show2').style.display='block';
    document.getElementById('Loading3').style.display='none';
    document.getElementById('Show3').style.display='block';
    document.getElementById('Loading4').style.display='none';
    document.getElementById('Show4').style.display='block';
  });
}


function CheckUserQuiz() {
  var str0 = 0;
  dbttbQuiz.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckPass = 1;
      if(doc.data().PointOUT==0) {
        $("#PointToday").html("<div class='font13' style='color:#f68b1f;text-align:center; font-weight: 600;margin-top:-10px;'>เสียใจด้วยน้า คุณไม่ได้รับเหรียญรางวัล</div>");        
      } else {
        $("#PointToday").html("<div class='font13' style='color:#f68b1f;text-align:center; font-weight: 600;margin-top:-10px;'>ยินดีด้วยคุณได้รับ "+doc.data().PointOUT+" เหรียญรางวัล</div>");        
      }
    });
    if(CheckPass==0) {
      document.getElementById('Loading').style.display='none';
      document.getElementById('NoQuiz').style.display='none';
      document.getElementById('LoadQuiz').style.display='block';
      str0 = '<div class="progress"><div class="bar0" style="width:0%;"></div></div>'
    } else {
      str0 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
    }
    //alert(str0);
    $("#Bar0").html(str0);  
  });
}


function UserBoard(x) {
  SelectBoxGroup(x);
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  var i = 0;
  var str = "";
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbttbQuiz.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i++;
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:10%;text-align:center;">'+i+'</td>';
      str += '<td class="td-padding" style="width:75%;"><font color="#0056ff">'+doc.data().TypeSelect+' - '+doc.data().QuizDate+'</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+doc.data().PointOUT+'</b></font></td>';
      str += '</tr>';
    }); 
    str += '</tbody></table>';
    $("#UserScore").html(str);  
    document.getElementById('LoadingScore').style.display='none';
    document.getElementById('UserScore').style.display='block';
  });
}

/*
function TopDayBoard(x) {
  SelectBoxGroup(x);
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  var i = 0;
  var str = "";
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbttbQuiz.where('QuizDate','==',today)
  .orderBy('PointOUT','desc')
  .orderBy('TimeStamp','desc')
  .limit(30)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:40%;text-align:left;font-size:11px;">'+doc.data().DateRegister+'</td>';
      str += '<td class="td-padding" style="width:45%;"><font color="#0056ff">'+doc.data().EmpName+'</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+doc.data().PointOUT+'</b></font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#UserScore").html(str);  
    document.getElementById('LoadingScore').style.display='none';
    document.getElementById('UserScore').style.display='block';
  });
}
*/
/*
function LeaderBoard(x) {
  SelectBoxGroup(x);
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  var i = 0;
  var str = "";
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbttbMember.orderBy('PictureCoin','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = i+1;
      //str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:15%;text-align:center;">'+i+'</td>';
      str += '<td class="td-padding" style="width:70%;"><font color="#0056ff">'+doc.data().EmpName+'</font> <font color="#000">(แข่ง '+doc.data().PictureTime+' ครั้ง)</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+(doc.data().PictureCoin).toFixed(2)+'</b></font></td>';
      str += '</tr>';
      //i++;
    }); 
    str += '</tbody></table>';
    $("#UserScore").html(str);  
    document.getElementById('LoadingScore').style.display='none';
    document.getElementById('UserScore').style.display='block';
  });
}


function ShowIntro() {
  var str = "";
  str += '<div class="btn-t33">แนะนำ ภารกิจที่ 1</div>';
  str += '<div><img src="./img/cognition-online-final.gif" style="width:100%;"></div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
  str += '<div class="clr" style="height:30px;"></div>';
  $("#DisplayIntro").html(str);  
  document.getElementById('id03').style.display='block';
}


function SelectBoxGroup(x) {
  var xx = "";
  if(x=="A") {
    xx = 'a1';
  } else if(x=="B") { 
    xx = 'a2';
  //} else if(x=="C") { 
  //  xx = 'a3';
  }
  var i = 1;
  for (i = 1; i < 3; i++) {
    document.getElementById('a'+i).classList.remove('btn-t22a');
  }   
  if(x!="") {
    xClickMenu = x;
    document.getElementById(xx).classList.add('btn-t22a');
  }
}
*/

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

