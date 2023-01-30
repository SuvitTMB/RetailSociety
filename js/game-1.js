var cleararray = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var getNumberStart = 0;
var getNumber1 = 0;
var getNumber2 = 0;
var getNumber3 = 0;
var ScorePoint = 0;
var ScoreExtraGame = 2;
var EndGame = 0;
var RoundNumber = 0;
var RoundNumber1 = 0;
var RoundNumber2 = 0;
var RoundNumber3 = 0;
var textmessage = "";
//var textDisplayPoint = "";
var CheckPoint = 0;
var intromessage = '<div class="font12" style="color:#fff;">เลือกตัวเลข 1-10 ตัวต่อไปว่าจะ น้อยกว่า | เท่ากับ | มากกว่า</div>';
var intwarning = '<div class="font12" style="line-height:1.2;color:#fff;"><b>คำเตือน</b><br>หากคุณออกจากหน้านี้ก่อนการแข่งขันจะสิ้นสุด<br>คุณจะไม่ได้รับเหรียญรางวัล และไม่สามารถเข่งขันเกมส์นี้ในวันนี้ได้อีก</div>';
var endscore = 3;
var xCoin = 1;
var CheckAddEdit = 0;
var Eid = "";
var EidScorePoint = "";
var xHeader = "Game Zone";
var sTypeSelect = "เกมส์วัดดวง";
var xWin = 0;
var xLost = 0;
var sLuckyTime = 0;
var sLuckyWin = 0;
var sLuckyLost = 0;
var sLuckyCoin = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbGameLucky = firebase.firestore().collection("ttbGameLucky");
  dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  CheckUserScore();
  CheckUserQuiz();
  OpenPopMenu();
});


function CheckUserScore() {
  //dbttbMember.where('lineID','==',sessionStorage.getItem("LineID"))
  dbttbMember.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidScorePoint = doc.id;
      //console.log(EidScorePoint);
      sLuckyTime = doc.data().LuckyTime;
      sLuckyWin = doc.data().LuckyWin;
      sLuckyLost = doc.data().LuckyLost;
      sLuckyCoin = doc.data().LuckyCoin;
    });
      //alert(EidScorePoint+"==="+sessionStorage.getItem("EmpID_Society"));
  });
}


function CheckUserQuiz() {
  //CheckUserScore();
  var str = "";
  dbttbGameLucky.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //Eid = doc.id;
      location.href = "intro-game1.html";
    });
    if(Eid=="") {
      CheckAddEdit = 1;
      document.getElementById("id04").style.display = "block";
      $("#ToDayDate").html("<div style='margin:0px auto 25px auto; font-size:13px; color:#ffffff;'>กิจกรรมประจำวันที่ "+today);  
      $("#Displayintromessage").html(intromessage);
      $("#DisplayWarning").html(intwarning);
      BoxNumber();
      StartNumber();
      AddNewUser();
    }
  });
}


function AddNewUser() {
  if(CheckAddEdit==1) {
    //YourScore = 0;
    var TimeStampDate = "";
    dbttbGameLucky.add({
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
      ChangePoint : 0,
      PointIN : 0,
      PointOUT : 0,
      LastScore : parseFloat(sessionStorage.getItem("XP_Point")),
      Rewards : 0,
      DateRewards : "",
      DateRegister : dateString,
      TypeSelect : sTypeSelect,
      TimeStamp : 0
    });
    CheckEid();
  }
}



function BoxNumber() {
  var str="";
  str+='<div class="col-sm-3 game2-boxs"><div class="game-a5">?</div>';
  $("#DisplayScore").html(ScorePoint+" | "+endscore);
  $("#DisplayNumber1").html(str);
  $("#DisplayNumber2").html(str);
  $("#DisplayNumber3").html(str);
}


function StartNumber() {
  RoundNumber = RoundNumber+1;
  getNumberStart = Math.floor((Math.random() * 10) + 1);
  //console.log("RoundNumber="+getNumberStart);
  textmessage = "<b>เริ่มการแข่งขันของคุณ</b>";
  var str = "";
  var str0 = "";
  $("#DisplayNumber").val(cleararray);
  str+='<div class="gameNumber">'+getNumberStart+'</div>';
  $("#DisplayNumber").html(str);
  str0+='<div class="col-sm-3 game2-box"><div class="game-a1">'+ getNumberStart +'</div><div class="game-a2">Start</div></div>';
  $("#DisplayNumber0").html(str0);
  $("#DisplayMessage").html(textmessage);
  DisplayRound();
}


function DisplayRound() {
  $("#DisplayRound").val(cleararray);
  var str = "";
  if(EndGame==0) {
    str+='<div style="width:250px;margin:auto;">';
    str+='<div class="col-sm-4 game2-box1" onclick="SendNumber('+RoundNumber+','+ getNumberStart +',1)"><div class="game-a3"><</div><div class="game-a4">น้อยกว่า</div></div>';
    str+='<div class="col-sm-4 game2-box1" onclick="SendNumber('+RoundNumber+','+ getNumberStart +',2)"><div class="game-a3">=</div><div class="game-a4">เท่ากับ</div></div>';
    str+='<div class="col-sm-4 game2-box1" onclick="SendNumber('+RoundNumber+','+ getNumberStart +',3)"><div class="game-a3">></div><div class="game-a4">มากกว่า</div></div>';
    str+='</div>';
  } else {
    str+='<center><div class="btn-t1" style="margin-top:25px;border:1px #ffffff solid;" onclick="LinkGameZone()">ดูผลการแข่งขันของคุณ</div></center>';
  }
  $("#DisplayRound").html(str);
}



function SendNumber(r,s,n) {
  //console.log(r+"==="+s+"==="+n);
  var str = "";
  var str0 = "";
  var ntext = "";
  $("#DisplayScore").val(cleararray);
  $("#DisplayMessage").val(cleararray);
  RandomNumber();
  //alert(r+"==="+s+"==="+n)
  if(n==1) { ntext = "น้อยกว่า"; } else
  if(n==2) { ntext = "เท่ากับ"; } else
  if(n==3) { ntext = "มากกว่า"; } 
  if(RoundNumber==1) {
    if(n==1) { 
      if(RoundNumber1<getNumberStart) { textmessage="คุณเลือกได้ถูกต้อง" ; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; }
      else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
    }
    if(n==2) { 
      if(RoundNumber1==getNumberStart) { textmessage="คุณเลือกได้ถูกต้อง" ; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; } 
      else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
    } 
    if(n==3) { 
      if(RoundNumber1>getNumberStart) { textmessage="คุณเลือกได้ถูกต้อง" ; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; } 
      else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
    } 
    $("#DisplayNumber").val(cleararray);
    str+='<div class="gameNumber">'+RoundNumber1+'</div>';
    $("#DisplayNumber").html(str);
    str0+='<div class="col-sm-3 game2-box"><div class="game-a1">'+ RoundNumber1 +'</div><div class="game-a2">'+ ntext +'</div></div>';
    $("#DisplayNumber1").html(str0);
    $("#DisplayMessage").html(textmessage);
  } else if(RoundNumber==2) {
    if(n==1) { 
      if(RoundNumber2<RoundNumber1) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; }
      else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
    }
    if(n==2) { 
      if(RoundNumber2==RoundNumber1) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; } 
      else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
    } 
    if(n==3) { 
      if(RoundNumber2>RoundNumber1) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; } 
      else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
    } 
    $("#DisplayNumber").val(cleararray);
    str+='<div class="gameNumber">'+RoundNumber2+'</div>';
    $("#DisplayNumber").html(str);
    str0+='<div class="col-sm-3 game2-box"><div class="game-a1">'+ RoundNumber2 +'</div><div class="game-a2">'+ ntext +'</div></div>';
    $("#DisplayNumber2").html(str0);
  } else if(RoundNumber==3) {
    if(n==1) { 
      if(RoundNumber3<RoundNumber2) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; TrueGame();}
      else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
    }
    if(n==2) { 
      if(RoundNumber3==RoundNumber2) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; TrueGame();} 
      else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
    } 
    if(n==3) { 
      if(RoundNumber3>RoundNumber2) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; TrueGame();} 
      else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
    } 
    $("#DisplayNumber").val(cleararray);
    str+='<div class="gameNumber">'+RoundNumber3+'</div>';
    $("#DisplayNumber").html(str);
    str0+='<div class="col-sm-3 game2-box"><div class="game-a1">'+ RoundNumber3 +'</div><div class="game-a2">'+ ntext +'</div></div>';
    $("#DisplayNumber3").html(str0);
  }
  //console.log("RoundNumber= "+RoundNumber+" | Point= "+ScorePoint);
  //if(RoundNumber>=3) { TrueGame(); }
  RoundNumber = RoundNumber+1;
  $("#DisplayScore").html(ScorePoint+" | "+endscore);
  DisplayRound();
}


function RandomNumber() {
  if(RoundNumber==1) {
    RoundNumber1 = Math.floor((Math.random() * 10) + 1);    
  } else if(RoundNumber==2) {
    RoundNumber2 = Math.floor((Math.random() * 10) + 1);    
  } else if(RoundNumber==3) {
    RoundNumber3 = Math.floor((Math.random() * 10) + 1);    
  }
  //console.log("Point->"+getNumberStart+"==="+RoundNumber1+"==="+RoundNumber2+"==="+RoundNumber3);
}



function CheckEid() {
  dbttbGameLucky.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      //console.log("Check 1="+Eid);
    });
  });
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
    SaveDate();
  //}
}

function TrueGame() {
    EndGame = 1;
    xWin = 1;
    var textDisplayPoint = "";
    $("#DisplayWarning").html(cleararray);
    $("#Displayintromessage").val(cleararray);
    $("#Displayintromessage").html(cleararray);
    DisplayRound();
    if(ScorePoint<3) { FalseGame(); }
    textmessage="ยินดีด้วยคุณเป็นผู้ชนะในวันนี้";
    $("#DisplayMessage").val(cleararray);
    $("#DisplayMessage").html(textmessage);
    $("#DisplayEndScore").val(cleararray);
    textDisplayPoint += "<div class='btn-t3' style='margin-top:20px;'><b>คุณได้รับเหรียญรางวัล</b></div>";
    textDisplayPoint += "<div><img src='./img/coin-"+ xCoin +".png' style='max-width: 100%; margin-bottom: 10px;background:#e6ecfa; border-radius:10px;'></div>";
    textDisplayPoint += "<div class='text-false'>คุณชนะการแข่งขันในรอบนนี้</div>";
    textDisplayPoint += "<div style='line-height:1.2;'>วันนี้คุณได้รับ <b>"+ xCoin +" เหรียญรางวัล</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า</div>";
    $("#DisplayEndScore").html(textDisplayPoint);
    document.getElementById("id02").style.display = "block";
    SaveDate();
}


function SaveDate() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  if(CheckAddEdit==1) {
    dbttbGameLucky.doc(Eid).update({
      PointOUT : parseFloat(xWin),
      LastScore : parseFloat(sessionStorage.getItem("XP_Point")),
      DateRegister : dateString,
      TimeStamp : TimeStampDate
    });
    sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(xWin));
    sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(xWin));
    console.log("xWin="+xWin);
    if(xWin==0) {
      dbttbMember.doc(EidScorePoint).update({
        LuckyTime : parseFloat(sLuckyTime)+1,
        //LuckyWin : parseFloat(sLuckyWin)+parseFloat(xWin),
        LuckyLost : parseFloat(sLuckyLost)+parseFloat(xLost),
        //LuckyCoin : parseFloat(sLuckyCoin)+parseFloat(xCoin),
        //XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
        //RP_Point : parseFloat(sessionStorage.getItem("RP_Point")),
        LastUpdate : dateString
      });
    } else {
      dbttbMember.doc(EidScorePoint).update({
        LuckyTime : parseFloat(sLuckyTime)+1,
        LuckyWin : parseFloat(sLuckyWin)+1,
        //LuckyLost : parseFloat(sLuckyLost)+parseFloat(xLost),
        LuckyCoin : parseFloat(sLuckyCoin)+parseFloat(xCoin),
        XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
        RP_Point : parseFloat(sessionStorage.getItem("RP_Point")),
        LastUpdate : dateString
      });
    }
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

    //console.log("xWin="+xWin+" === xLost="+xLost);

    document.getElementById("Loading1").style.display = "none";
    document.getElementById("Show1").style.display = "block";
    OpenPopMenu();
  }
/*
      GroupQuiz : xHeader,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      QuizDate : today,
      RefID : "", //add
      QuizType : CheckType,
      Quetion :  "",
      Answer : 0,
      AnswerTxt : "", //add
      ResultQuiz : typeResult,
      PointIN : 0 ,
      ChangePoint : 0,
      Rewards : 0,
      DateRewards : "",
*/




/*
      GroupQuiz : xHeader,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      TypeSelect : sTypeSelect,
      LastScore : YourScore,
      PointIN : YourScore,
      PointOUT : YourScore,
      Rewards : 0,
      TimeStamp : 0,
      DateRewards : "",
      QuizDate : today
    dbttbQuiz.add({
      GroupQuiz : "Extra Point Touch : "+today,
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
      ChangePoint : 0,
      PointIN : parseFloat(NewRandom),
      PointOUT : parseFloat(NewRandom),
      LastScore : 0,
      Rewards : 0,
      DateRewards : "",
      DateRegister : dateString,
      TimeStamp : TimeStampDate
    });
    sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(NewRandom));
    sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(NewRandom));
    dbttbMember.doc(EidScorePoint).update({
      TimeGame4 : parseFloat(sUserSumTime)+1,
      UserSumTime : parseFloat(sUserSumTime)+1,
      UserSumFree : sUserSumFree + 1,
      //UserSumTrue : sUserSumTrue + 1,
      TotalGame4 : parseFloat(sTotalGame4) + parseFloat(NewRandom),
      TotalScore : parseFloat(sTotalScore) + parseFloat(NewRandom),
      LastUpdate : dateString,
      XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
      RP_Point : parseFloat(sessionStorage.getItem("RP_Point"))
    });
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
      GetPoint : parseFloat(NewRandom),
      LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
      LogDate : dateString,
      LogTimeStamp : TimeStampDate
    });
    OpenPopMenu();
    var str1 = "";
    str1 += '<div class="text-team">ดีใจด้วยน้า<br>วันนี้คุณไม่ต้องตอบคำถาม<div>';
    str1 += '<div><img src="./img/congratulations@.gif" style="margin-top:25px;width:100%;border-radius: 12px;"></div>';
    str1 += '<div class="text-team" style="padding-top:15px;font-weight:600;">วันนี้คุณได้รับ '+parseFloat(NewRandom).toFixed(2)+' คะแนน</div>';
    $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(NewRandom).toFixed(2) +" คะแนน</div>");
    $("#ShowEndPoint").html(str1);
    //var str = "";
    //str += 'คุณตอบคำถามประจำวันนี้ไปเรียบร้อยแล้ว<br>';
    //str += 'วันนี้คุณทำคะแนนได้ <font color="#0056ff"><b>'+parseFloat(NewRandom).toFixed(2)+'</b></font> คะแนน';
    //$("#ShowPointToDay").html(str);  

    document.getElementById("QuizComplete").style.display = "block";
    document.getElementById("DiaplayBox").style.display = "none";
    document.getElementById("id04").style.display = "block";
  }
*/

}




function ExtraGame() {
/*
  var textDisplayPoint = "";
  $("#Displayintromessage").val(cleararray);
  $("#Displayintromessage").html(cleararray);
  ScorePoint = ScorePoint + ScoreExtraGame;
  $("#DisplayExtraPoint").val(cleararray);
  textExtraPoint = "<img src='./img/true.jpg' style='max-width: 120px; margin-bottom: 20px;'>";
  textExtraPoint += "<div class='text-false'>คุณทายผลตัวเลขเหมือนกันได้ถูกต้อง</div>ยินดีด้วย คุณทำ Extra Point สำเร็จ<br>คุณได้รับคะแนนพิเศษเพิ่ม 3 คะแนน<br>และสามารถเก็บคะแนนได้<br>จนกว่าเกมส์จะจบ";
  $("#DisplayExtraPoint").html(textExtraPoint);
    document.getElementById("id03").style.display = "block";
*/
}


function LinkGameZone() {
  window.location.href='intro-game1.html';
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
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
}
