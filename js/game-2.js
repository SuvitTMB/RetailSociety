var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var cards = document.querySelectorAll('.card');
var CheckClick = 0;
var xHeader = "Game Zone";
var sTypeSelect = "เกมส์เปิดภาพลุ้นเหรียญ";
var intwarning = '<div class="font12" style="line-height:1.2;color:#fff;"><b>คำเตือน</b><br>หากคุณออกจากหน้านี้ก่อนการแข่งขันจะสิ้นสุด<br>คุณจะไม่ได้รับเหรียญรางวัล และไม่สามารถเข่งขันเกมส์นี้ในวันนี้ได้อีก</div>';
var Eid = "";
var CheckAddEdit = 0;


[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbGamePicture = firebase.firestore().collection("ttbGameImage");
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
      sPictureTime = doc.data().PictureTime;
      sPictureWin = doc.data().PictureWin;
      sPictureLost = doc.data().PictureLost;
      sPictureCoin = doc.data().PictureCoin;
    });
  });
}


function CheckUserQuiz() {
  var str = "";
  dbttbGamePicture.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      location.href = "intro-game2.html";
    });
    if(Eid=="") {
      CheckAddEdit = 1;
      $("#ToDayDate").html("<div class='font12' style='margin:0px auto 25px auto; color:#ffffff; font-weight:600;'>กิจกรรมประจำวันที่ "+today);  
      $("#Displayintromessage").html(intwarning);
      //$("#DisplayWarning").html(intwarning);
      //BoxNumber();
      //StartNumber();
      AddNewUser();
    }
  });
}



function AddNewUser() {
  if(CheckAddEdit==1) {
    var TimeStampDate = "";
    dbttbGamePicture.add({
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


function CheckEid() {
  dbttbGamePicture.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      console.log(Eid);
    });
  });
}

function OpenCard(x) {
  if(x!="") {
    document.getElementById('Display-1').style.display='none';
    document.getElementById('Display-2').style.display='block';
    //console.log(x);
    if(x==1 && CheckClick==0) {
      document.getElementById('Card1').classList.remove('card__noselected');    
      document.getElementById('Card1').classList.add('card__selected');    
    }
    if(x==2 && CheckClick==0) {
      document.getElementById('Card2').classList.remove('card__noselected');    
      document.getElementById('Card2').classList.add('card__selected');    
    }
    if(x==3 && CheckClick==0) {
      document.getElementById('Card3').classList.remove('card__noselected');    
      document.getElementById('Card3').classList.add('card__selected');    
    }
    if(x==4 && CheckClick==0) {
      document.getElementById('Card4').classList.remove('card__noselected');    
      document.getElementById('Card4').classList.add('card__selected');    
    }
    CheckClick = 1;
    document.getElementById('id01').style.display='block';
    RandomCard(x);
  }
}



var ScorePoint = 0;
function RandomCard(x) {
  var newCard = [0, 1, 0, 0, 2, 0, 1, 0, 1, 0];
  console.log(newCard);
  NewRandom1 = random_item(newCard);
  NewRandom2 = random_item(newCard);
  NewRandom3 = random_item(newCard);
  NewRandom4 = random_item(newCard);
  if(NewRandom1!=0) {
    var xNewRandom1 = "<div class='card-text'>ยินดีด้วยวันนี้<br>คุณได้รับ<br>"+NewRandom1+" เหรียญรางวัล</div>";
  } else {
    var xNewRandom1 = "<div class='card-textno'>เสียใจด้วย<br>วันนี้คุณไม่ได้<br>เหรียญรางวัล</div>";
  }
  if(NewRandom2!=0) {
    var xNewRandom2 = "<div class='card-text'>ยินดีด้วยวันนี้<br>คุณได้รับ<br>"+NewRandom2+" เหรียญรางวัล</div>";
  } else {
    var xNewRandom2 = "<div class='card-textno'>เสียใจด้วย<br>วันนี้คุณไม่ได้<br>เหรียญรางวัล</div>";
  }
  if(NewRandom3!=0) {
    var xNewRandom3 = "<div class='card-text'>ยินดีด้วยวันนี้<br>คุณได้รับ<br>"+NewRandom3+" เหรียญรางวัล</div>";
  } else {
    var xNewRandom3 = "<div class='card-textno'>เสียใจด้วย<br>วันนี้คุณไม่ได้<br>เหรียญรางวัล</div>";
  }
  if(NewRandom4!=0) {
    var xNewRandom4 = "<div class='card-text'>ยินดีด้วยวันนี้<br>คุณได้รับ<br>"+NewRandom4+" เหรียญรางวัล</div>";
  } else {
    var xNewRandom4 = "<div class='card-textno'>เสียใจด้วย<br>วันนี้คุณไม่ได้<br>เหรียญรางวัล</div>";
  }
  $("#Show-1").html(xNewRandom1);
  $("#Show-2").html(xNewRandom2);
  $("#Show-3").html(xNewRandom3);
  $("#Show-4").html(xNewRandom4);
  if(x==1) { if(xNewRandom1!=0) { ScorePoint=NewRandom1 } 
  } else if(x==2) { if(xNewRandom2!=0) { ScorePoint=NewRandom2 } 
  } else if(x==3) { if(xNewRandom3!=0) { ScorePoint=NewRandom3 } 
  } else if(x==4) { if(xNewRandom4!=0) { ScorePoint=NewRandom4 } 
  }
  console.log(ScorePoint);

  var textDisplayPoint = "";
  if(ScorePoint!=0) {
    textDisplayPoint += "<div class='btn-t3' style='margin-top:20px;'><b>คุณได้รับเหรียญรางวัล</b></div>";
    textDisplayPoint += "<div><img src='./img/coin-"+ ScorePoint +".png' style='max-width: 100%; margin-bottom: 10px;background:#e6ecfa; border-radius:10px;'></div>";
    textDisplayPoint += "<div class='text-false'>คุณชนะการแข่งขันในรอบนนี้</div>";
    textDisplayPoint += "<div class='font12black' style='text-align:center;'>วันนี้คุณได้รับ <b>"+ ScorePoint +" เหรียญรางวัล</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า</div>";
    $("#DisplayMessage").html("<div class='font12black' style='text-align:center;color:#ffffff;'><b>คุณได้รับ "+ ScorePoint +" เหรียญรางวัล</b></div>");
    $("#DisplayLastScore").html(textDisplayPoint);
  } else {
    $("#DisplayLastScore").val(cleararray);
    textDisplayPoint += "<div class='btn-t3' style='margin-top:20px;'><b>เสียใจด้วยน้า</b></div>";
    textDisplayPoint += "<div><img src='./img/false.jpg' style='max-width: 100%; margin-top: 10px;border-radius:10px;'></div>";
    textDisplayPoint += "<div class='text-false'><br>คุณแพ้การแข่งขันในรอบนี้</div>";
    textDisplayPoint += "<div style='line-height:1.2;'>เราเสียใจที่ไม่สามารถให้เหรียญรางวัลกับคุณได้</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า</div>";
    //textmessage="เสียใจด้วยน้า พรุ่งนี้มาเล่นกันใหม่";
    $("#DisplayMessage").html("<div class='font12black' style='text-align:center;color:#ffff00;'><b>เสียใจด้วยน้า พรุ่งนี้มาเล่นกันใหม่</b></div>");
    $("#DisplayLastScore").html(textDisplayPoint);
  }
  //document.getElementById("id01").style.display = "block";
  SaveData();
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function SaveData() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  console.log("CheckAddEdit="+CheckAddEdit);
  if(CheckAddEdit==1) {
    dbttbGamePicture.doc(Eid).update({
      PointOUT : parseFloat(ScorePoint),
      LastScore : parseFloat(sessionStorage.getItem("XP_Point")),
      DateRegister : dateString,
      TimeStamp : TimeStampDate
    });
    sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(ScorePoint));
    sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(ScorePoint));
    console.log("ScorePoint="+ScorePoint);
    if(ScorePoint==0) {
      dbttbMember.doc(EidScorePoint).update({
        PictureTime : parseFloat(sPictureTime)+1,
        PictureLost : parseFloat(sPictureLost)+1,
        LastUpdate : dateString
      });
    } else {
      dbttbMember.doc(EidScorePoint).update({
        PictureTime : parseFloat(sPictureTime)+1,
        PictureWin : parseFloat(sPictureWin)+1,
        PictureCoin : parseFloat(sPictureCoin)+parseFloat(ScorePoint),
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
      GetPoint : parseFloat(ScorePoint),
      LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
      LogDate : dateString,
      LogTimeStamp : TimeStampDate
    });
    document.getElementById("id01").style.display = "block";
    OpenPopMenu();
    console.log("Save Data");
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
}

