var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var sTimeGame1 = 0;
var sTimeGame2 = 0;
var sTimeGame3 = 0;
var sTimeGame4 = 0;
var xToday = "";
var sTarget = 0;
var sCountTimeJoin = 0;
var sPoint = 0;

//var xIDmember = "";

$(document).ready(function () {
  if(sessionStorage.getItem("RefID_Member")==null) { location.href = "index.html"; }
/*
  if(sessionStorage.getItem("Level_Point")==1 && sessionStorage.getItem("XP_Point") >= 100) {
    NextLevel(2);
  } else if(sessionStorage.getItem("Level_Point")==2 && sessionStorage.getItem("XP_Point") >= 300) { 
    NextLevel(3);
  } else if(sessionStorage.getItem("Level_Point")==3 && sessionStorage.getItem("XP_Point") >= 600) { 
    NextLevel(4);
  } else if(sessionStorage.getItem("Level_Point")==4 && sessionStorage.getItem("XP_Point") >= 1000) { 
    NextLevel(5);
  }
*/
  //if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbSocietyMenu = firebase.firestore().collection("SocietyMenu");
  dbttbNews = firebase.firestore().collection("ttbnews");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbttbQuiz = firebase.firestore().collection("ttbQuizoftheday");
  dbttbWebboard = firebase.firestore().collection("ttbWebboard");
  dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  MenuSlide();
  CheckData();
  CheckUserQuiz();
  CheckBarChart();
  WebboardUpdate();
  OpenPopMenu();
});


function CheckData() {
  var str = "";
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = doc.data().statusconfirm;
      EidProfile = doc.id;
      sDateRegister = doc.data().DateRegister;
      CheckDateIn();
      ListWebPage();
    });
  });
}

//var xJoinTime = 0;
var sCountTimeJoin = 0;
var sGetRewards = 0;
var xCheckDate = 0;
var EidMember = "";
function CheckDateIn() {
  var str = "";
  dbttbMember.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //xJoinTime = doc.data().JoinTime;
      EidMember = doc.id;
      sessionStorage.setItem("XP_Point", doc.data().XP_Point);
      sessionStorage.setItem("RP_Point", doc.data().RP_Point);

      if(today!=doc.data().DateToDay) {
        xCheckDate = 1;
        sCountTimeJoin = parseFloat(doc.data().JoinTime)+1;
        if(sCountTimeJoin<=5) { sTarget = 5; sPoint = 5; }
        else if(sCountTimeJoin<=30) { sTarget = 30; sPoint = 10; }
        else if(sCountTimeJoin<=60) { sTarget = 60; sPoint = 15; }
        else if(sCountTimeJoin<=90) { sTarget = 90; sPoint = 20; }
        else if(sCountTimeJoin<=120) { sTarget = 120; sPoint = 30; }
        else if(sCountTimeJoin<=150) { sTarget = 150; sPoint = 40; }
        else if(sCountTimeJoin<=180) { sTarget = 180; sPoint = 50; }
        else if(sCountTimeJoin<=360) { sTarget = 360; sPoint = 100; }
        else sPoint = 0;

        if(sCountTimeJoin==5) {
          sGetRewards = 5;
          GetJoinPoint(5,5);
        } else if(sCountTimeJoin==30) {
          sGetRewards = 10;
          GetJoinPoint(30,10);
        } else if(sCountTimeJoin==60) {
          sGetRewards = 15;
          GetJoinPoint(60,15);
        } else if(sCountTimeJoin==90) {
          sGetRewards = 20;
          GetJoinPoint(90,20);
        } else if(sCountTimeJoin==120) {
          sGetRewards = 30;
          GetJoinPoint(120,30);
        } else if(sCountTimeJoin==150) {
          sGetRewards = 40;
          GetJoinPoint(150,40);
        } else if(sCountTimeJoin==180) {
          sGetRewards = 50;
          GetJoinPoint(180,50);
        } else if(sCountTimeJoin==360) {
          sGetRewards = 100;
          GetJoinPoint(360,100);
        } else {
          str+='<div style="margin-top:15px;">';
          str+='<div class="box-target">เข้าเว็บแล้ว<div class="box-target-number">'+ sCountTimeJoin +'</div>วัน</div>';
          str+='<div class="box-target">เหลืออีก<div class="box-target-number">'+(sTarget-sCountTimeJoin)+'</div>วัน</div>';
          str+='<div class="box-target">เพื่อรับ<div class="box-target-number">'+sPoint+'</div>เหรียญรางวัล</div>';
          str+='</div>';
          $("#BoxTimeLine").html(str);      
          document.getElementById("id02").style.display = "block";
        }
        dbttbMember.doc(EidMember).update({
          DateToDay : today,
          JoinTime : sCountTimeJoin
        });
      }
    });
    //if(sGetRewards==0) {
    //  document.getElementById("id02").style.display = "block";
    //}
  });
}


function GetJoinPoint(d,x) {
  var str = "";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(sGetRewards));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(sGetRewards));
  if(xCheckDate==1) {
    var xHeader = "ได้รับเหรียญ "+ sGetRewards +" เหรียญรางวัล";
    dbttbnewsLog.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      RefID : EidMember,
      NewsGroup : 0,
      HeadNews : "Join Website",
      SubNews : xHeader,
      GetPoint : parseFloat(sGetRewards),
      LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
      LogDate : dateString,
      LogTimeStamp : TimeStampDate
    });
    dbttbMember.doc(EidMember).update({
      XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
      RP_Point : parseFloat(sessionStorage.getItem("RP_Point")),
      DateToDay : today,
      JoinTime : sCountTimeJoin
    });
    OpenPopMenu(); 
  }         
  str+='<div style="margin-top:15px;">';
  str+='<div class="font13" style="text-align:center; padding:5px;">ยินดีด้วยคุณได้รับเหรียญรางวัล</div>';
  str+='<div class="font13" style="text-align:center; font-weight: 600; color:#0056ff;">'+ x +' เหรียญรางวัล</div>';
  str+='<div class="font13" style="text-align:center; padding:5px;">จากการเข้าชมเว็บไซต์มาแล้ว <b>'+ d +'</b> วัน</div>';
  str+='</div>';
  $("#BoxTimeGetPoint").html(str);      
  document.getElementById("id03").style.display = "block";

  //alert(x);
}


function ListWebPage() {
  var str = "";
  str += '<div class="grid">';
  dbSocietyMenu.where('GroupStatus','==',0)
  .orderBy('GroupID','asc')
  .orderBy('GroupRank','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="box-menu" onclick="ClickCheckView(\''+ doc.data().GroupLink +'\',\''+ doc.id +'\')">';
      str += '<div><img src="'+ doc.data().GroupImg +'" class="box-menu-img"></div>';
      str += '<div class="box-menu-text">'+ doc.data().GroupNameWeb +'</div></div>';
    });
    str += '</div>';
    $("#DisplayListWebPage").html(str);
    //$("#yyy").html(str);
  });
}


var sCheckQ = 0;
function CheckUserQuiz() {
  var str4 = "";
  var sCheckQ = 0;
  dbttbQuiz.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
      //console.log(sCheckQ);
    });
    if(sCheckQ==1) {
      str4 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      str4 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame4").html(str4);  
  });
}

function ClickCheckView(link,id) {
  var sLinktoWeb = "";
  var str = "";
  dbSocietyMenu.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidSocietyMenu = doc.id;
      sCountView = parseInt(doc.data().CountView) + 1;
      sLinktoWeb = doc.data().GroupLink;
      sGroupName = doc.data().GroupName;
      str += '<div style="max-width:450px;width:100%;margin:auto;">';
      str += '<div class="btn-t3" style="cursor: default;margin-top:10px;"><b>'+doc.data().GroupName+'</b></div>';
      str += '<div style="margin-top:15px"><img src="'+doc.data().GroupImg+'" style="width:120px;"></div>';
      str += '<div style="text-align:left; color:#0056ff; padding-top:25px;font-size:13px;"><b>ข้อมูลระบบงาน</b></div>';
      str += '<div class="LDP-detail">'+doc.data().GroupDetail+'</div>';
      str += '</div>';
      str += '<div style="max-width:450px;width:100%;margin-top:25px; margin-bottom: 20px;">';
      str += '<div class="btn-t2" onclick="CheckCountView(\''+ doc.data().GroupLink +'\')">เข้าสู่เว็บไซต์</div>';
      str += '<div class="btn-t2" onclick="CloseAll()">Close</div>';
      str += '</div>';
      $("#DisplayProject").html(str);
    });
    dbSocietyMenu.doc(id).update({
        CountView : sCountView
    });
    document.getElementById('id01').style.display='block';
  });

}


function CheckCountView(link) {
  location.href = ""+link+"";
}


function MenuSlide() {
  var i = 0;
  var str = "";
  var xLDP = "";
  dbttbNews.where('NewsStatus','==',0)
  .where('LDP','==',1)
  .orderBy('LDPRank','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
        if(doc.data().LDPimg=="") { xLDP = "assets/img/slide/slide-0.jpg"; } else { xLDP = doc.data().LDPimg; }
        if(i==0) {
          str += '<div class="carousel-inner" role="listbox">';
          str += '<div class="carousel-item active" style="background-image: url('+ xLDP +');">';
          str += '<div class="carousel-container"><div class="carousel-content animate__animated animate__fadeInUp">';
          str += '<h2>'+ doc.data().NewsHeader +'</span></h2>';
          str += '<p>'+ doc.data().ShortNews +'</p>';
          str += '<center><div class="btn-get-started" onclick="ReadNews(\''+ doc.id +'\',\''+ doc.data().NewsGroup +'\')">อ่านข่าวนี้</div></center>';
          str += '</div></div></div>';
        } else {
          str += '<div class="carousel-item" style="background-image: url('+ xLDP +')">';
          str += '<div class="carousel-container"><div class="carousel-content animate__animated animate__fadeInUp">';
          str += '<h2>'+ doc.data().NewsHeader +'</span></h2>';
          str += '<p>'+ doc.data().ShortNews +'</p>';
          str += '<center><div class="btn-get-started"  onclick="ReadNews(\''+ doc.id +'\',\''+ doc.data().NewsGroup +'\')">อ่านข่าวนี้</div></center>';
          str += '</div></div></div>';
        }
        //console.log(doc.data().NewsHeader);NewsGroup
        i++;
      });
  $("#DisplaySlide").html(str);
  $("#GGG").html(str);
  });
}


function WebboardUpdate() {
  var str = "";
  dbttbWebboard.where("StatusBoard", "==", 0)
  .orderBy('TimeStamp','desc')
  .limit(3)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div class="webboard-box" onclick="ReadWebboard(\''+ doc.id +'\')">';
      //str += '<div class="post-headnews">'+ doc.data().QWebboard +'</div>';
      str += '<div class="webboard-news">'+ doc.data().QWebboard +'</div><div class="clr"></div>';
      str += '<div style="margin-top:5px;text-align: left;"><i>';
      str += '<div class="d-flex post-text"><i class="icofont-wall-clock"></i>&nbsp;'+ doc.data().SendDate +'</div>';
      str += '<div class="d-flex post-text"><i class="icofont-file-spreadsheet"></i>&nbsp;'+ doc.data().ReadWebboard +' อ่าน</div>';
      str += '<div class="d-flex post-text"><i class="icofont-comment"></i>&nbsp;'+ doc.data().AnsWebboard +' ความเห็น</div></i>';
      str += '</div></div>';
    });
    $("#DisplayWebboardUpdate").html(str);
  });
}

function ReadWebboard(id,xGroup) {
  location.href = "webboard-chat.html?gid="+id+"";
}


function ReadNews(id,xGroup) {
  location.href = "readnews.html?gid="+id+"&groupid="+xGroup+"";
}


function CheckBarChart() {
  var str = "";
  var str2 = "";
  var str3 = "";
  var str4 = "";
  dbttbMember.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //xIDmember = doc.id;
      var CalAllTime = doc.data().TimeGame1 + doc.data().TimeGame2 + doc.data().TimeGame3 + doc.data().TimeGame4;
      var UserTrue = parseFloat(doc.data().UserSumTrue);
      var UserFalse = parseFloat(doc.data().UserSumFalse);
      var UserAll = UserTrue + UserFalse;

      var CalRatio = ((doc.data().TimeGame4/6)*100);
      if(isNaN(UserTrue)) {
        var CalTrue = 0;
      } else {
        var CalTrue = ((UserTrue/UserAll)*100);
      }
      if(isNaN(UserFalse)) {
        var CalFalse = 0;
      } else {
        var CalFalse = ((UserFalse/UserAll)*100);
      }
      if(Number.isNaN(CalTrue)) { CalTrue = 0; }
      if(Number.isNaN(CalFalse)) { CalFalse = 0; }

      $("#ShowUserSumTime1").html("<div class='font15number' style='color:#f68b1f;'>"+CalAllTime+'</div><div class="ScoreGame4-text">จำนวน<br>แข่งสะสม</div>');
      $("#ShowUserSumTime2").html("<div class='font15number' style='color:#2dcc02'>"+CalTrue.toFixed(2) +'%</div><div class="ScoreGame4-text">%การตอบ<br>คำถามถูก</div>');
      $("#ShowUserSumTime3").html("<div class='font15number' style='color:#ff0000'>"+CalFalse.toFixed(2) +'%</div><div class="ScoreGame4-text">%การตอบ<br>คำถามผิด</div>');
      $("#ShowUserSumTime4").html("<div class='font15number' style='color:#0056ff'>"+doc.data().TotalScore.toFixed(2) +'</div><div class="ScoreGame4-text">คะแนนสะสม<br>ล่าสุด</div>');
      sTimeGame1 = (doc.data().TimeGame1/6)*100;
      if(sTimeGame1>=100) {
        str += '<div class="progress"><div class="bar" style="width:'+sTimeGame1.toFixed(2)+'%"></div></div>';
      } else {
        str += '<div class="progress"><div class="bar1" style="width:'+sTimeGame1.toFixed(2)+'%"></div></div>';
      }
      $("#RatioGame1").html(str);  

      sTimeGame2 = (doc.data().TimeGame2/9)*100;
      if(sTimeGame2>=100) {
        str2 += '<div class="progress"><div class="bar" style="width:'+sTimeGame2.toFixed(2)+'%"></div></div>';
      } else {
        str2 += '<div class="progress"><div class="bar1" style="width:'+sTimeGame2.toFixed(2)+'%"></div></div>';
      }
      $("#RatioGame2").html(str2);  

      sTimeGame3 = (doc.data().TimeGame3/15)*100;
      if(sTimeGame3>=100) {
        str3 += '<div class="progress"><div class="bar" style="width:'+sTimeGame3.toFixed(2)+'%"></div></div>';
      } else {
        str3 += '<div class="progress"><div class="bar1" style="width:'+sTimeGame3.toFixed(2)+'%"></div></div>';
      }
      $("#RatioGame3").html(str3);  
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


function NextLevel(x) {
  //dbttbMember.doc(sessionStorage.getItem("RefID_Member")).update({
    //Level_Point : x
  //});
  //sessionStorage.setItem("Level_Point", x);
  //if(sessionStorage.getItem("XP_Point")>1) {
  //alert(x+"==="+sessionStorage.getItem("RefID_Member"));
}


function GotoGame(gotopage) {
  if(gotopage==1) {
    location.href = 'quizgame1.html';
  } else if(gotopage==2) { 
    location.href = 'quizgame2.html';
  } else if(gotopage==3) { 
    location.href = 'quizgame3.html';
  } else if(gotopage==4) { 
    location.href = 'quizgame4.html';
  }
}


function CloseAll() {
  document.getElementById('menu').style.display='none';
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
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
