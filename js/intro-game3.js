var cleararray = "";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var sGroupQuiz = "Newyear";
var EidQuestion = "";
var EQuizForm = "";
var EidQuestion = "";


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  $("#ToDayDate").html("<div style='margin:0px auto 25px auto; font-size:13px; color:#ff0000;'>กิจกรรมประจำวันที่ "+today);  
  Connect_DB();
  db = firebase.firestore().collection("QuizoftheDay");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbttbQuiz = firebase.firestore().collection("ttbGameQuestion");
  SelectBoxGroup('A');
  CheckUserScore();
  CheckUserQuiz();
  UserBoard('A');
  OpenPopMenu();
});


function OpenQuiz() {
  str = "";
  str+='<center><div style="width:100%;"><div class="btn-t3" style="margin-top:20px">ตอบคำถามประจำวัน</div>';
  str+='<div style="margin-left:10px;text-align: center;">';
  str+='<div style="padding:10px 0 10px 0;"><img src="./img/timer.gif" width="230px;"></div>';
  str+='<div class="font12" style="color:#ff0000;font-weight:600;">โปรดอยู่ในการแข่งขันจนกว่าเกมส์จะจบน้า<br>ถ้าพร้อมแล้ว คลิกตอบคำถามประจำวันกันเลย</div>';
  str+='<br><div class="btn-t1" onclick="RandomQuestion()" style="margin-top:12px;">ไปตอบคำถามประจำวัน</div></div></center><br>';
  $("#ShowStory").html(str);
  document.getElementById('id01').style.display='block';
}


var i = 0;
var ArrQuestion = [];
var NewQuestion = "";

function RandomQuestion() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='block';
  db.where('GroupQuiz','==',sGroupQuiz)
  .where('QuizStatus','==',1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
      ArrQuestion.push([doc.id]);
    });
    //console.log(ArrQuestion);
    //alert("จำนวนข้อมูลรวม = "+i+" รายการ");
    NewQuestion = random_item(ArrQuestion);
    EidQuestion = NewQuestion[0];
    //alert("Question ID: "+NewQuestion);
    GetQuestion();
  }); 
}



function GetQuestion() {
  $("#ShowStory").html(cleararray);

  $("#DisplayDay").val(cleararray);
  $("#DisplayQuestion").val(cleararray);
  $("#DisplayChoice").val(cleararray);
  $("#DisplayTimer").val(cleararray);
  db.where(firebase.firestore.FieldPath.documentId(), "==", EidQuestion)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //alert("พบคำถาม = "+EidQuestion);
      //QuizNotOpen = 1;
      //EidQuestion = doc.id;
      EQuizDate = doc.data().QuizDate;
      EQuizQuizTimer = Number(doc.data().QuizTimer);
      now = new Date();
      timeup = now.setSeconds(now.getSeconds() + Number(doc.data().QuizTimer));
      counter = setInterval(timer, 1000);
      timer();
      //console.log(doc.data().QuizDate+"==="+doc.data().QuizQuestion);
      CheckType = doc.data().QuizTypeQuestion;
      CheckQuizQuestion = doc.data().QuizQuestion;
      CheckQuizAnswer = doc.data().QuizAnswer;
      CheckQuizAnswerText = doc.data().QuizAnswerText;
      CheckPoint = doc.data().QuizPoint;
      SumQuiz = doc.data().SumQuiz;
      SumChoice1 = doc.data().SumChoice1;
      SumChoice2 = doc.data().SumChoice2;
      SumChoice3 = doc.data().SumChoice3;
      SumChoice4 = doc.data().SumChoice4;
      SumQuizTrue = doc.data().SumQuizTrue;
      SumQuizFalse = doc.data().SumQuizFalse;
      if(doc.data().QuizTypeQuestion=="1") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ today +"</i></div>");
        $("#DisplayQuestion").html("<div class='txt-qq'>"+ doc.data().QuizQuestion +" | "+doc.data().QuizAnswer+"</div>");
        EQuizForm += "<div style='margin-top:20px;'></div><center>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(1,\""+ doc.data().QuizChoice1 +"\")' id='answer1'><input type='radio'>"+ doc.data().QuizChoice1 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(2,\""+ doc.data().QuizChoice2 +"\")' id='answer2'><input type='radio'>"+ doc.data().QuizChoice2 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(3,\""+ doc.data().QuizChoice3 +"\")' id='answer3'><input type='radio'>"+ doc.data().QuizChoice3 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(4,\""+ doc.data().QuizChoice4 +"\")' id='answer4'><input type='radio'>"+ doc.data().QuizChoice4 +"</div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ</div><br><br><br>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="2") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizQuestion!=null) {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'><div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'></div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType2' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:25px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ</div><div id='chars' style='color:#0016ed;'></div><br><br>";
      } else if(doc.data().QuizTypeQuestion=="3") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div style='margin-top:20px;'></div><center>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(1,\""+ doc.data().QuizChoice1 +"\")' id='answer1'><input type='radio'>"+ doc.data().QuizChoice1 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(2,\""+ doc.data().QuizChoice2 +"\")' id='answer2'><input type='radio'>"+ doc.data().QuizChoice2 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(3,\""+ doc.data().QuizChoice3 +"\")' id='answer3'><input type='radio'>"+ doc.data().QuizChoice3 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(4,\""+ doc.data().QuizChoice4 +"\")' id='answer4'><input type='radio'>"+ doc.data().QuizChoice4 +"</div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ</div><br><br>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="4") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType4' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:10px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText4()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ </div><br><br><div id='chars4' style='color:#ffffff;'><div>";
        EQuizForm += "<div style='height:20px;'></div>";
      }
      $("#DisplayTimer").html("<center><div id='timer' class='timer'></div></center>");
    });
    $("#DisplayChoice").html(EQuizForm);
  });
}

function timer() {
  now = new Date();
  count = Math.round((timeup - now)/1000);
  if (now > timeup) {
      window.location = "#"; //or somethin'
      $("#timer").html("<font color='#ffff00'>หมดเวลาตอบคำถาม</font>");
      document.getElementById("SubmitAns").style.display = "none";
      //alert("หมดเวลา");
      clearInterval(counter);
      SaveData();
      return;
  }
  var seconds = Math.floor((count%60));
  var minutes = Math.floor((count/60) % 60);
  if(seconds<10) { seconds="0"+seconds } 
  $("#timer").html("เหลือเวลาอีก <font color='#ffff00'>" + minutes + " นาที " + seconds  + " วินาที</font>");
  //document.getElementById("timer").innerHTML = minutes + ":" + seconds;
}

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}




var CheckPass = 0;
function CheckUserScore() {
  dbttbMember.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //var CalRatio = ((doc.data().QuizTime/6)*100);
      var UserAll = parseFloat(doc.data().QuizWin) + parseFloat(doc.data().QuizLost);
      var CalTrue = ((parseFloat(doc.data().QuizWin)/UserAll)*100);
      var CalFalse = ((parseFloat(doc.data().QuizLost)/UserAll)*100);
      if(Number.isNaN(CalTrue)) { CalTrue = 0; }
      if(Number.isNaN(CalFalse)) { CalFalse = 0; }
      document.getElementById('Loading').style.display='none';
      document.getElementById('NoQuiz').style.display='block';
      document.getElementById('LoadQuiz').style.display='none';
      $("#ShowUserSumTime1").html("<div class='font15number' style='color:#f68b1f;'>"+doc.data().QuizTime+'</div><div class="ScoreGame4-text">จำนวน<br>แข่งสะสม</div>');
      $("#ShowUserSumTime2").html("<div class='font15number' style='color:#2dcc02'>"+CalTrue.toFixed(2) +'%</div><div class="ScoreGame4-text">%<br>ตอบถูก</div>');
      $("#ShowUserSumTime3").html("<div class='font15number' style='color:#ff0000'>"+CalFalse.toFixed(2) +'%</div><div class="ScoreGame4-text">%<br>ตอบผิด</div>');
      $("#ShowUserSumTime4").html("<div class='font15number' style='color:#0056ff'>"+doc.data().QuizCoin.toFixed(2) +'</div><div class="ScoreGame4-text">เหรียญ<br>รางวัล</div>');
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

function LeaderBoard(x) {
  SelectBoxGroup(x);
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  var i = 0;
  var str = "";
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbttbMember.orderBy('QuizCoin','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = i+1;
      //str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:15%;text-align:center;">'+i+'</td>';
      str += '<td class="td-padding" style="width:70%;"><font color="#0056ff">'+doc.data().EmpName+'</font> <font color="#000">(แข่ง '+doc.data().QuizTime+' ครั้ง)</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+(doc.data().QuizCoin).toFixed(2)+'</b></font></td>';
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


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
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


