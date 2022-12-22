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


$(document).ready(function () {
  if(sessionStorage.getItem("RefID_Member")==null) { location.href = "index.html"; }
  //if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbSocietyMenu = firebase.firestore().collection("SocietyMenu");
  dbttbNews = firebase.firestore().collection("ttbnews");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbttbQuiz = firebase.firestore().collection("ttbQuizoftheday");
  MenuSlide();
  CheckData();
  CheckUserQuiz();
  CheckBarChart();
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
      ListWebPage();
    });
  });
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
      //var CalAllTime = doc.data().TimeGame1 + doc.data().TimeGame2 + doc.data().TimeGame3 + doc.data().TimeGame4;
      //var UserTrue = parseFloat(doc.data().UserSumTrue) + parseFloat(doc.data().Game3SumTrue);
      //var UserFalse = doc.data().UserSumFalse + doc.data().Game3SumFalse;
      //var UserAll = UserTrue + UserFalse;

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

      sTimeGame3 = (doc.data().TimeGame3/9)*100;
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
}



