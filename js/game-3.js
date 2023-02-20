var cleararray = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var endscore = 3;
var xCoin = 1;
var CheckAddEdit = 0;
var Eid = "";
var EidScorePoint = "";
var sGroupQuiz = "Newyear";
var xHeader = "Game Zone";
var sTypeSelect = "คำถามประจำวัน";
var xWin = 0;
var xLost = 0;
var sQuizTime = 0;
var sQuizWin = 0;
var sQuizLost = 0;
var sQuizCoin = 0;
var EQuizForm = "";
var sUserSumTime = 0; 
var sUserSumTrue = 0;
var sUserSumFalse = 0;
var sUserSumFree = 0;
var ChoiceSelect = "";
var newScore = 0;
var YourScore = 0;
var typeResult = "";
var xPointIN = 0;
var xPointOUT = 0;
var TextSelectChoice = "";
var ArrQuestion = [];
var NewQuestion = "";
var EidQuestion = "";


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  db = firebase.firestore().collection("QuizoftheDay");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbGameQuestion = firebase.firestore().collection("ttbGameQuestion");
  dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  CheckUserScore();
  CheckUserQuiz();
  OpenPopMenu();
});


function CheckUserScore() {
  dbttbMember.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidScorePoint = doc.id;
      sQuizTime = doc.data().QuizTime;
      sQuizWin = doc.data().QuizWin;
      sQuizLost = doc.data().QuizLost;
      sQuizCoin = doc.data().QuizCoin;
    });
  });
}


function CheckUserQuiz() {
  var str = "";
  dbttbGameQuestion.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      location.href = "intro-game3.html";
    });
    if(Eid=="") {
      CheckAddEdit = 1;
      AddNewUser();
      var timeleft = 5;
      var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("QuizZone").style.display = "none";
        RandomQuestion();
      }
      document.getElementById("progressBar").value = 6 - timeleft;
      timeleft -= 1;
      }, 500);
      $("#ToDayDate").html("<div class='font13black' style='margin:0px auto 25px auto; color:#ffffff; font-weight:600;'>กิจกรรมประจำวันที่ "+today);  
    }
  });
}



function RandomQuestion() {
  var i = 0;
  db.where('GroupQuiz','==',sGroupQuiz)
  .where('QuizStatus','==',1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
      ArrQuestion.push([doc.id]);
    });
    NewQuestion = random_item(ArrQuestion);
    EidQuestion = NewQuestion[0];
    console.log(NewQuestion[0]);
    GetQuestion();
  }); 
}



function AddNewUser() {
  if(CheckAddEdit==1) {
    var TimeStampDate = "";
    dbttbGameQuestion.add({
      GroupQuiz : xHeader,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      QuizDate : today,
      RefID : "", //add
      QuizType : 0,
      Quetion :  "",
      Answer : "",
      AnswerTxt : "", //add
      ResultQuiz : "",
      //ChangePoint : 0,
      PointIN : 0,
      PointOUT : 0,
      LastScore : parseFloat(sessionStorage.getItem("XP_Point")),
      //Rewards : 0,
      DateRewards : "",
      DateRegister : dateString,
      TypeSelect : sTypeSelect,
      TimeStamp : 0
    });
    CheckEid();
  }
}


function CheckEid() {
  dbttbGameQuestion.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      //console.log("Check 1="+Eid);
    });
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
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ</div><br><br><br>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="2") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizQuestion!=null) {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'><div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'></div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType2' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:25px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ</div><div id='chars' style='color:#0016ed;'></div><br><br>";
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
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ</div><br><br>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="4") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType4' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:10px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText4()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ </div><br><br><div id='chars4' style='color:#ffffff;'><div>";
        EQuizForm += "<div style='height:20px;'></div>";
      }
      $("#DisplayTimer").html("<center><div id='timer' class='timer'></div></center>");
    });
    $("#DisplayChoice").html(EQuizForm);
    document.getElementById("ShowQuiz").style.display = "block";
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
}

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function ClickChoice(x) {
  ChoiceSelect = x;
  if(x==1) {
    document.getElementById("answer1").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t2-no SelectA'; 
  } else if(x==2) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t2-no SelectA'; 
  } else if(x==3) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t2-no SelectA'; 
  } else if(x==4) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice SelectQ'; 
    document.getElementById("SubmitAns").className = 'btn-t2-no SelectA'; 
  }
}


function SendAnswer() {
  if(CheckType==1) {
      if(ChoiceSelect==CheckQuizAnswer) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
        TrueGame();
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
        FalseGame();
      }
  } else if(CheckType==2) {
      ChoiceSelect = 0;
      TextSelectChoice = document.getElementById('SendCheckType2').value;
      if(TextSelectChoice==CheckQuizAnswerText) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
        TrueGame();
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
        FalseGame();
      }
  } else if(CheckType==3) {
      if(ChoiceSelect==CheckQuizAnswer) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
        TrueGame();
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
        TrueGame();
      }
  } else if(CheckType==4) {
      ChoiceSelect = 0;
      TextSelectChoice = document.getElementById('SendCheckType4').value;
      if(TextSelectChoice==CheckQuizAnswerText) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
        TrueGame();
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
        TrueGame();
      }
  }
  //alert(YourScore);
  SaveData();
}


function SaveData() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var typeResult = "";
  if(YourScore==1) {
    typeResult = "True";
    xPointIN = 1;
    xPointOUT = 1;
  } else {
    typeResult = "False";
    xPointIN = 0;
    xPointOUT = 0;
  }
  if(CheckAddEdit==1) { 
    sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(xPointIN));
    sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(xPointIN));

    if(xPointIN==0) {
      dbttbMember.doc(EidScorePoint).update({
        QuizTime : parseFloat(sQuizTime)+1,
        QuizLost : parseFloat(sQuizLost)+parseFloat(xLost),
        LastUpdate : dateString
      });
    } else {
      dbttbMember.doc(EidScorePoint).update({
        QuizTime : parseFloat(sQuizTime)+1,
        QuizWin : parseFloat(sQuizWin)+1,
        QuizCoin : parseFloat(sQuizCoin)+parseFloat(xCoin),
        XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
        RP_Point : parseFloat(sessionStorage.getItem("RP_Point")),
        LastUpdate : dateString
      });
    }

    dbttbGameQuestion.doc(Eid).update({
      GroupQuiz : xHeader,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      QuizDate : today,
      RefID : EidQuestion, //add
      QuizType : CheckType,
      Quetion :  CheckQuizQuestion,
      Answer : ChoiceSelect,
      AnswerTxt : TextSelectChoice, //add
      ResultQuiz : typeResult,
      PointIN : parseFloat(xPointIN) ,
      PointOUT : parseFloat(xPointIN),
      //PointOUT : parseFloat(xPointOUT),
      //ChangePoint : ChangePoint,
      //LastScore : YourScore,
      //Rewards : 0,
      DateRewards : "",
      DateRegister : dateString,
      TimeStamp : TimeStampDate
    });

    dbttbnewsLog.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      RefID : EidScorePoint,
      NewsGroup : 0,
      HeadNews : xHeader,
      SubNews : sTypeSelect,
      GetPoint : parseFloat(xWin),
      LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
      LogDate : dateString,
      LogTimeStamp : TimeStampDate
    });
    OpenPopMenu();
  }
  //console.log("2-PointIN--"+xPointIN);
  //console.log("2-PointOUT--"+xPointOUT);
  if(CheckAddEdit==1) {
    //SaveMyScorePoint();
    SaveQuestion();
    ClearQuiz();
  } else {
    document.getElementById('id03').style.display='none';
  }
}



function FalseGame() {
    xLost = 1;
    //if(RoundNumber!=3) {
    var textDisplayPoint = "";
    $("#DisplayWarning").html(cleararray);
    $("#DisplayMessage").val(cleararray);
    $("#DisplayMessage").html(cleararray);
    $("#Displayintromessage").val(cleararray);
    $("#Displayintromessage").html(cleararray);
    $("#DisplayLastScore").val(cleararray);
    textDisplayPoint += "<div class='btn-t3' style='margin-top:20px;'><b>เสียใจด้วยน้า</b></div>";
    textDisplayPoint += "<div><img src='./img/false.jpg' style='max-width: 100%; margin-top: 10px;border-radius:10px;'></div>";
    textDisplayPoint += "<div class='text-false'><br>คุณแพ้การแข่งขันในรอบนี้</div>";
    textDisplayPoint += "<div style='line-height:1.2;'>เราเสียใจที่ไม่สามารถให้เหรียญรางวัลกับคุณได้</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า</div>";
    textmessage="เสียใจด้วยน้า พรุ่งนี้มาเล่นกันใหม่";
    $("#DisplayMessage").html(textmessage);
    $("#DisplayLastScore").html(textDisplayPoint);
    document.getElementById("id01").style.display = "block";
    //SaveData();
  //}
}

function TrueGame() {
    EndGame = 1;
    xWin = 1;
    var textDisplayPoint = "";
    $("#DisplayWarning").html(cleararray);
    $("#Displayintromessage").val(cleararray);
    $("#Displayintromessage").html(cleararray);
    //DisplayRound();
    //if(ScorePoint<3) { FalseGame(); }
    textmessage="ยินดีด้วยคุณตอบคำถามได้ถูกต้อง";
    $("#DisplayMessage").val(cleararray);
    $("#DisplayMessage").html(textmessage);
    $("#DisplayEndScore").val(cleararray);
    textDisplayPoint += "<div class='btn-t3' style='margin-top:20px;'><b>คุณได้รับเหรียญรางวัล</b></div>";
    textDisplayPoint += "<div><img src='./img/coin-"+ xCoin +".png' style='max-width: 100%; margin-bottom: 10px;background:#e6ecfa; border-radius:10px;'></div>";
    textDisplayPoint += "<div class='text-false'>คุณตอบคำถามถูกในรอบนนี้</div>";
    textDisplayPoint += "<div class='font12black' style='text-align:center;'>วันนี้คุณได้รับ <b>"+ xCoin +" เหรียญรางวัล</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า</div>";
    $("#DisplayEndScore").html(textDisplayPoint);
    document.getElementById("id02").style.display = "block";
    //SaveData();
}



function SaveQuestion() { 
  SumQuiz = SumQuiz + 1; 
  if(YourScore==0) {
    SumQuizFalse = SumQuizFalse + 1;
  } else if(YourScore!=0) {
    SumQuizTrue = SumQuizTrue + 1;
  }
  if(ChoiceSelect==1) { SumChoice1 = SumChoice1+1; } else
  if(ChoiceSelect==2) { SumChoice2 = SumChoice2+1; } else
  if(ChoiceSelect==3) { SumChoice3 = SumChoice3+1; } else
  if(ChoiceSelect==4) { SumChoice4 = SumChoice4+1; } 
  db.doc(EidQuestion).update({
    SumQuiz : SumQuiz,
    SumQuizTrue : SumQuizTrue,
    SumQuizFalse : SumQuizFalse,
    SumChoice1 : SumChoice1,
    SumChoice2 : SumChoice2,
    SumChoice3 : SumChoice3,
    SumChoice4 : SumChoice4
  });
}




function ClearQuiz() {
  var a = "";
  clearInterval(counter);
  //document.getElementById("timer").innerHTML = ""; 
  document.getElementById("DisplayTimer").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  document.getElementById("DisplayQuestion").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  //alert(YourScore);
  if(YourScore!=0) {
    var str1 = "";
    var str2 = "";
    LastScore = YourScore;
    $("#DisplayQuestion").html("<div class='txt-qq'>ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>คุณทำคะแนนได้ "+ LastScore +" คะแนน</div>");
    str2 += '<div><br><br><img src="./img/true.png" width="70px;"></div>';
    //str2 += '<div class="txt-qq" style="color:#ffffff;"><b>ยินดีด้วยคุณตอบคำถามได้ถูกต้อง</b></div>';
    //str2 += '<div style="padding:10px 0;color:#f68b1f;font-size:13px; font-weight:600;">คุณสามารถเปลี่ยนคะแนนที่ได้รับได้ใหม่<br>โดยคุณอาจจะได้รับคะแนนที่ <b>เพิ่มขึ้น</b> หรือ <b>ลดลง</b> ก็ได้</div>';
    //str2 += '<div class="btn-t2-no" onclick="ChangeNow()">เลือกลุ้นคะแนน</div><div class="btn-t2-ok" onclick="NoChangeNow()">เลือกรับ 1 คะแนน</div>';
    //str2 += '<div style="padding:15px 10px;font-weight:600;">ช่วงคะแนนใหม่ที่จะได้<br>อยู่ระหว่าง 0.3 - 1.70 คะแนน<br>คุณต้องรู้จักการบริหารความเสี่ยงด้วยน้า</div><br><br>';
    $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(LastScore).toFixed(2) +" คะแนน</div>");
    $("#DisplayChoice").html(str2);
  } else {
    LastScore = 0;
    var str2 = "";
    $("#DisplayQuestion").html("<div class='txt-qq'>วันนี้คุณตอบคำถามไม่ถูกต้อง<div class='font13black' style='color:#fff;'>คุณไม่ได้รับเหรียญรางวัล</div></div>");
    str2 += '<center><div><br><img src="./img/false.png" width="100px;"></div>';
    str2 += '<div class="txt-qq" style="color:#fff;margin-top:8px;">เสียใจด้วยน้า<div></center>';
    //str2 += '<div class="font13black" style="padding:10px 0;color:#fff; text-align:center;">วันนี้คุณตอบคำถามไม่ถูกต้อง</div>';
    //str2 += '<div class="btn-t0" onclick="CloseAll()" style="margin-top;10px;"">พรุ่งนี้กลับมาเล่นกันใหม่น้า</div><br><br>';
    $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(LastScore).toFixed(2) +" คะแนน</div>");
    $("#DisplayChoice").html(str2);
/*
    var TimeStampDate = Math.round(Date.now() / 1000);
    dbttbnewsLog.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      RefID : EidScorePoint,
      NewsGroup : 0,
      HeadNews : "QuizGame-4",
      SubNews : xHeader,
      GetPoint : 0,
      LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
      LogDate : dateString,
      LogTimeStamp : TimeStampDate
    });
    OpenPopMenu();
*/
  }  
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

function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  //document.getElementById('id03').style.display='none';
  //document.getElementById('id04').style.display='none';
}
