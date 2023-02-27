var cleararray = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var xHeader = "Game Zone";
var sTypeSelect = "เกมส์ เปา ยิง ชุบ";
var EidGame = "";
var EidMember = "";
var sRockTime = 0;
var sRockWin = 0;
var sRockLost = 0;
var sRockCoin = 0;
var xWin = 0;
var xCoin = 1;
var xLost = 0;
var CheckAddEdit = 0;
$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbGameRock = firebase.firestore().collection("ttbGameRock");
  dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  CalPoint();
  CheckUserScore();
  CheckUserQuiz();
  OpenPopMenu();
  $("#computer").html('<div style="width:50%;float: left;"><div class="font13N">คอมพิวเตอร์</div><div class="hand gray" style="width:100%;"><img src="./icon/com-rock.png" style="width:100%;"></div></div>');
  $("#user").html('<div style="width:50%;float: left;"><div class="font13N">ตัวคุณ</div><div class="hand1 gray" style="width:100%;"><img src="./icon/user-rock.png" style="width:100%;"></div></div>');
});


function CheckUserScore() {
  dbttbMember.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidMember = doc.id;
      sRockTime = doc.data().RockTime;
      sRockWin = doc.data().RockWin;
      sRockLost = doc.data().RockLost;
      sRockCoin = doc.data().RockCoin;
    });
  });
}


function CheckUserQuiz() {
  var str = "";
  dbttbGameRock.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      location.href = "intro-game5.html";
    });
    if(EidGame=="") {
      CheckAddEdit = 1;
      AddNewUser();
    }
  });
}



function AddNewUser() {
  if(CheckAddEdit==1) {
    var TimeStampDate = "";
    dbttbGameRock.add({
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
    //console.log("เพิ่มข้อมูลใหม่");
    CheckEid();
  }
}


function CheckEid() {
  dbttbGameRock.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidGame = doc.id;
      //console.log("เช็ค id ="+EidGame);result
      document.getElementById('Loading2').style.display='none';
      document.getElementById('result').style.display='block';
      document.getElementById('icons').style.display='block';
    });
  });
}



var xResult = 0;
var xScorePoint = 0;
var drinks = [ "rock","paper","scissors"];
function CheckClick(userChoice) {
  if(EidGame=="") { CheckEid(); }
  //alert(EidGame);
  var result = "";
  var compChoice= "";
  document.getElementById('icons').style.display='none';
  document.getElementById('Loading1').style.display='block';
  const RandomNumber = drinks[Math.floor(Math.random() * drinks.length)];
  compChoice = RandomNumber;
  $("#computer").html('<div style="width:50%;float: left;"><div class="font13N">คอมพิวเตอร์</div><div class="hand gray" style="width:100%;"><img src="./icon/com-rock.png" style="width:100%;"></div></div>');
  if(compChoice=="rock") {
    $("#computer").html('<div style="width:50%;float: left;"><div class="font13N">คอมพิวเตอร์</div><div class="hand" style="float: left;width:100%;"><img src="./icon/com-rock.png" style="width:100%;"></div></div>');
    //console.log("ฆ้อน");
  } else if(compChoice=="paper") { 
    $("#computer").html('<div style="width:50%;float: left;"><div class="font13N">คอมพิวเตอร์</div><div class="hand" style="float: left;width:100%;"><img src="./icon/com-paper.png" style="width:100%;"></div></div>');
    //console.log("กระดาษ");
  } else if(compChoice=="scissors") { 
    $("#computer").html('<div style="width:50%;float: left;"><div class="font13N">คอมพิวเตอร์</div><div class="hand" style="float: left;width:100%;"><img src="./icon/com-scissors.png" style="width:100%;"></div></div>');
    //console.log("กรรไกร");
  }
  if(userChoice=="rock") {
    $("#user").html('<div style="width:50%;float: left;"><div class="font13N">ตัวคุณ</div><div class="hand1" style="float: left;width:100%;"><img src="./icon/user-rock.png" style="width:100%;"></div></div>');
    //console.log("ฆ้อน");
  } else if(userChoice=="paper") { 
    $("#user").html('<div style="width:50%;float: left;"><div class="font13N">ตัวคุณ</div><div class="hand1" style="float: left;width:100%;"><img src="./icon/user-paper.png" style="width:100%;"></div></div>');
    //console.log("กระดาษ");
  } else if(userChoice=="scissors") { 
    $("#user").html('<div style="width:50%;float: left;"><div class="font13N">ตัวคุณ</div><div class="hand1" style="float: left;width:100%;"><img src="./icon/user-scissors.png" style="width:100%;"></div></div>');
    //console.log("กรรไกร");
  }
  if (userChoice === compChoice) {
    result = 'เสมอกัน<br>คลิกเลือกใหม่อีกครั้ง';
    xResult = 2;
    NewGame();
  }
  if (userChoice === 'rock' && compChoice === 'paper') {
    result = 'กระดาษ ชนะ ฆ้อน<br>เสียใจด้วยคุณแพ้';
    xResult = 3;
  }
  if (userChoice === 'rock' && compChoice === 'scissors') {
    result = 'กรรไกร แพ้ ฆ้อน<br>ยินดีด้วยคุณชนะ';
    xResult = 1;
    xWin = xCoin;
  }
  if (userChoice === 'paper' && compChoice === 'rock') {
    result = 'ฆ้อน แพ้ กระดาษ<br>ยินดีด้วยคุณชนะ';
    xResult = 1;
    xWin = xCoin;
  }
  if (userChoice === 'paper' && compChoice === 'scissors') {
    result = 'กรรไกร ชนะ กระดาษ<br>เสียใจด้วยคุณแพ้';
    xResult = 3;
  }
  if (userChoice === 'scissors' && compChoice === 'rock') {
    result = 'ฆ้อน ชนะ กรรไกร<br>เสียใจด้วยคุณแพ้';
    xResult = 3;
  }
  if (userChoice === 'scissors' && compChoice === 'paper') {
    result = 'กระดาษ แพ้ กรรไกร<br>ยินดีด้วยคุณชนะ';
    xResult = 1;
    xWin = xCoin;
  }
  //console.log("xResult = "+xResult);
  if(xResult==1) {
    var str = "";
    str += "<div class='btn-t3' style='margin-top:20px;'><b>คุณได้รับเหรียญรางวัล</b></div>";
    str += "<div><img src='./img/coin-"+ xCoin +".png' style='max-width: 100%; margin-bottom: 10px;background:#e6ecfa; border-radius:10px;'></div>";
    str += "<div class='text-false'>คุณชนะการแข่งขันในรอบนนี้</div>";
    str += "<div style='line-height:1.2;'>วันนี้คุณได้รับ <b>"+ xCoin +" เหรียญรางวัล</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า</div>";
    $("#DisplayWinner").html(str);
    document.getElementById('id01').style.display='block';
    SaveDate();
  } else if(xResult==3) {
    var str = "";
    str += "<div class='btn-t3' style='margin-top:20px;'><b>เสียใจด้วยน้า</b></div>";
    str += "<div><img src='./img/false.jpg' style='max-width: 100%; margin-top: 10px;border-radius:10px;'></div>";
    str += "<div class='text-false'><br>คุณแพ้การแข่งขันในรอบนี้</div>";
    str += "<div style='line-height:1.2;'>เราเสียใจที่ไม่สามารถให้เหรียญรางวัลกับคุณได้</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า</div>";
    $("#DisplayWinner").html(str);
    document.getElementById('id01').style.display='block';
    SaveDate();
  }
  $("#result").html(result);
}



function SaveDate() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  if(CheckAddEdit==1) {
    dbttbGameRock.doc(EidGame).update({
      PointOUT : parseFloat(xWin),
      LastScore : parseFloat(sessionStorage.getItem("XP_Point")),
      DateRegister : dateString,
      TimeStamp : TimeStampDate
    });
    sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(xWin));
    sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(xWin));
    //console.log("xWin="+xWin);
    if(xWin==0) {
      dbttbMember.doc(EidMember).update({
        RockTime : parseFloat(sRockTime)+1,
        RockLost : parseFloat(sRockLost)+1,
        LastUpdate : dateString
      });
    } else {
      dbttbMember.doc(EidMember).update({
        RockTime : parseFloat(sRockTime)+1,
        RockWin : parseFloat(sRockWin)+1,
        //RockLost : parseFloat(sRockLost)+parseFloat(xLost),
        RockCoin : parseFloat(sRockCoin)+parseFloat(xCoin),
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
      RefID : EidMember,
      NewsGroup : 0,
      HeadNews : xHeader,
      SubNews : sTypeSelect,
      GetPoint : parseFloat(xWin),
      LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
      LogDate : dateString,
      LogTimeStamp : TimeStampDate
    });
    document.getElementById("id01").style.display = "block";
    document.getElementById("Loading1").style.display = "none";
    document.getElementById("EndGame").style.display = "block";
    OpenPopMenu();
  }
}


function NewGame() {
  xResult = 0;
  //$("#computer").html('<div class="hand" style="float: left;width:50%;"><img src="./icon/com-rock.png" style="width:100%;"></div>');
  //$("#user").html('<div class="hand1" style="float: left;width:50%;"><img src="./icon/user-rock.png" style="width:100%;"></div>');
  document.getElementById('icons').style.display='block';
  document.getElementById('Loading1').style.display='none';
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
}
