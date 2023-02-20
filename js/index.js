var i = 0;
var EidProfile = "";
var dateString = "";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
var xToday = dd + '/' + mm + '/' + yyyy;


$(document).ready(function () {

/*
  var isMobile = window.orientation > -1;
  sessionStorage.clear(); 
  var str = "";
  //var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  //var sLineName = "Website";
  //var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  //var sLineID = "Ub07e3fd6941babf0c4cd6cabfb51d728";
  //var sLineName = "ตุ๊กตุ๊ก";
  //var sLinePicture = "https://profile.line-scdn.net/0m01f9abbb7251d2d7e727969708486b63a926a2de5046";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
*/  
  main();
});



async function main() {
  await liff.init({ liffId: "1657509542-KGPDLak7" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  //var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  //str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  //str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  //$("#MyProfile").html(str);  
  Connect_DB();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  dbttblog = firebase.firestore().collection("ttblog");
  CheckData();
}


var CheckFoundData = 0;
function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = 1;
      if(doc.data().statusconfirm==1) {
        EidProfile = doc.id;
        sessionStorage.setItem("EmpID_Society", doc.data().empID);
        sessionStorage.setItem("EmpName_Society", doc.data().empName);
        sessionStorage.setItem("EmpPhone_Society", doc.data().empPhone);
        sessionStorage.setItem("EmpAddress_Society", doc.data().empAddress);
        CheckMember();
      } else if(doc.data().statusconfirm==2) { 
        location.href = "waitingpage.html";
        //location.href = "https://liff.line.me/1655966947-KxrAqdyp";
      } else {
        location.href = "cancelpage.html";
      }
    });
    if(CheckFoundData==0) {
      location.href = "registerpage.html";
      //location.href = "https://liff.line.me/1655966947-KxrAqdyp"; 
    }
  });
}

var EidMember = "";
var EidUpdateLogin = "";
var CountLogin = 0;
var CheckFound = 0;
var xLevel = 0;
function CheckMember() {
  dbttbMember.where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFound = 1;
      EidMember = doc.id;
      sessionStorage.setItem("RefID_Member", doc.id);
      sessionStorage.setItem("Level_Point", doc.data().Level_Point);
      sessionStorage.setItem("XP_Point", doc.data().XP_Point);
      sessionStorage.setItem("RP_Point", doc.data().RP_Point);
      sessionStorage.setItem("LastUpdate", doc.data().LogDateTime);
      UpdatePorfile();
      if(doc.data().Level_Point==1 && doc.data().XP_Point >= 100) {
        NextLevel(2);
      } else if(doc.data().Level_Point==2 && doc.data().XP_Point >= 300) { 
        NextLevel(3);
      } else if(doc.data().Level_Point==3 && doc.data().XP_Point >= 600) { 
        NextLevel(4);
      } else if(doc.data().Level_Point==4 && doc.data().XP_Point >= 1000) { 
        NextLevel(5);
      }
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='block';
      MyPointMenu();
      CheckAid();
    });

    if(CheckFound==0) {
      AddNewMember();
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='block';
    }
  });
}


function NextLevel(x) {
  str = "";
  xLevel = x;
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  console.log("Next Level = " +x);
  var xPoint = 5;
  var xHeader = "Level Up "+ x +"";
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(xPoint));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(xPoint));
  dbttbMember.doc(sessionStorage.getItem("RefID_Member")).update({
    XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
    RP_Point : parseFloat(sessionStorage.getItem("RP_Point")),
    Level_Point : x
  });
  sessionStorage.setItem("Level_Point", x);
  dbttbnewsLog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    RefID : EidMember,
    NewsGroup : 0,
    HeadNews : "Level Up",
    SubNews : xHeader,
    GetPoint : parseFloat(xPoint),
    LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
  str += '<div class="btn-t3" style="margin-top:10px; min-width:220px; background:#fff;">คุณได้รับการปรับระดับผู้เล่น</div>';
  str += '<div><img src="./img/levelup.gif" style="padding-top:8px;width:100%;"></div>';
  str += '<div style="margin-top:15px;">';
  str += '<div class="font13" style="padding-top:5px;text-align:center;">คุณได้รับเหรียญเพิ่ม '+ xPoint +' เหรียญรางวัล<br>จากการปรับระดับของผู้เล่นเป็น Level '+ x +'</div>';
  str += '<div class="clr"></div>';
  str += '<div class="btn-t2" onclick="GotoProfile()" style="margin-top:20px;">ดูคะแนนของคุณ</div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
  str += '<div style="height: 15px;"></div>';
  MyPointMenu();
  $("#UserLevelUp").html(str);      
  document.getElementById('id05').style.display='block';
}




function UpdatePorfile() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbProfile.doc(EidProfile).update({
    empPicture : sessionStorage.getItem("LinePicture"),
    linename : sessionStorage.getItem("LineName")
  });
  dbttbMember.doc(EidMember).update({
    LinePicture : sessionStorage.getItem("LinePicture"),
    LineName : sessionStorage.getItem("LineName")
  });
  dbttblog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
  console.log("Update");
}


function AddNewMember() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var newPoint = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  var NewScore = random_item(newPoint);
  dbttbMember.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    Level_Point : 1,
    JoinTime : 1,
    XP_Point : parseFloat(NewScore),
    RP_Point : parseFloat(NewScore),
    TimeGame1 : 0,
    TimeGame2 : 0,
    TimeGame3 : 0,
    TimeGame4 : 0,
    TotalGame1 : 0,
    TotalGame2 : 0,
    TotalGame3 : 0,
    TotalGame4 : 0,
    SubGame11 : 0,
    SubGame12 : 0,
    SubGame13 : 0,
    SubGame14 : 0,
    SubGame15 : 0,
    SubGame16 : 0,
    SubGame21 : 0,
    SubGame22 : 0,
    SubGame23 : 0,
    SubGame24 : 0,
    SubGame25 : 0,
    SubGame26 : 0,
    SubGame27 : 0,
    SubGame28 : 0,
    SubGame29 : 0,
    SubGame31 : 0,
    SubGame32 : 0,
    SubGame33 : 0,
    SubGame34 : 0,
    SubGame35 : 0,
    SubGame36 : 0,
    SubGame37 : 0,
    SubGame38 : 0,
    SubGame39 : 0,
    WBGame01 : 0,
    WBGame02 : 0,
    WBGame03 : 0,
    WBGame04: 0,
    WBGame05 : 0,
    WBGame06 : 0,
    WBGame07 : 0,
    WBGame08 : 0,
    WBGame09 : 0,
    WBGame10 : 0,
    WBGame11 : 0,
    WBGame12 : 0,
    WBGame13 : 0,
    WBGame14 : 0,
    WBGame15 : 0,
    SumAll : 0,
    SumFalse : 0,
    SumTrue : 0,
    TotalScore : 0,
    UserSumFalse : 0,
    UserSumTrue : 0,
    UserSumFree : 0,
    UserSumTime : 0,

    LuckyTime : 0,
    LuckyWin : 0,
    LuckyLost : 0,
    LuckyCoin : 0,

    QuizTime : 0,
    QuizWin : 0,
    QuizLost : 0,
    QuizCoin : 0,

    PictureTime : 0,
    PictureWin : 0,
    PictureLost : 0,
    PictureCoin : 0,

    RockTime : 0,
    RockWin : 0,
    RockLost : 0,
    RockCoin : 0,


    Game5Time : 0,
    Game5Win : 0,
    Game5Lost : 0,
    Game5Coin : 0,

    Game6Time : 0,
    Game6Win : 0,
    Game6Lost : 0,
    Game6Coin : 0,


    LogDateTime : dateString,
    LastUpdate : dateString,
    DateToDay : xToday,
    LogTimeStamp : TimeStampDate
  });
  sessionStorage.setItem("Level_Point", 1);
  sessionStorage.setItem("XP_Point", parseFloat(NewScore));
  sessionStorage.setItem("RP_Point", parseFloat(NewScore));
  dbttbnewsLog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    RefID : "",
    NewsGroup : 0,
    HeadNews : "ลงทะเบียน",
    SubNews : "เข้าใช้ระบบงานครั้งแรก",
    GetPoint : parseFloat(NewScore),
    LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
  dbttblog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
  document.getElementById('id01').style.display='block';
}


function WelcomePoint() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='block';
  var str = "";
  /*
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img" style="margin-top:35px;width:120px;height:120px;"></div>';
  str += '<div class="Profile-title" style="color:#f68b1f; font-weight:600;text-align:center;">'+ sessionStorage.getItem("LineName")+'</div>';
  str += '<div class="btn-t3" style="margin:15px auto;">คุณได้รับ <b>Welcome Point</b></div>';
  str += '<div class="XPpoint" style="margin-top:-10px;">'+ sessionStorage.getItem("XP_Point")+' เหรียญรางวัล</div>';
  str += '<div style="margin-top:15px;"><img src="./img/welcome.gif" style="width:100%; max-width: 200px;"></div>';
  str += '<div class="clr"></div>';
  str += '<div class="btn-t2" onclick="GotoWeb()" style="margin-top:15px;">เข้าสู่ <b>LINE Retail Society</b></div>';
  str += '<div class="clr" style="height:40px;"></div>';
  */
  //$("#DisplayWelcomePoint").html(str);  
  str += '<div class="font13" style="margin-top:10px; text-align:center; padding:5px;">ยินดีด้วยคุณได้รับเหรียญรางวัลครั้งแรก<br>จากการเข้าร่วมกิจกรรม LINE Retail Society</div>';
  str += '<div class="clr"></div>';
  str += '<div><img src="./img/coin-'+ sessionStorage.getItem("XP_Point") +'.png" style="margin-top:10px;width:100%;border-radius: 15px; background:#fff;"></div>';
  str += '<div class="btn-t2" onclick="GotoWeb()" style="margin-top:30px;">คลิกเพื่อเริ่มต้นการใช้งาน</div>';
  str += '<div style="height: 15px;"></div>';
  $("#BoxTimeGetPoint").html(str);      
}


function CheckAid() {
  var str = "";
  //if(CheckFoundData==1 && sessionStorage.getItem("Aid")==null) {
  if(CheckFoundData==1) {
    var RandomAid = [4, 3, 2, 1, 5, 6, 7];
    var NewAid = random_item(RandomAid);
    console.log("Display Aid = "+NewAid);
    if(NewAid==1 && xLevel==0) {
      str += '<div class="btn-t3" style="margin-top:10px; min-width:220px; background:#fff;">เมนูแนะนำ<br>ข่าวสารธนาคาร</div>';
      str += '<div><img src="./ad/ad-01.jpg" style="padding-top:8px;width:100%;"></div>';
      str += '<div style="margin-top:15px;">';
      str += '<div class="font13black" style="padding-top:5px;">เราได้เตรียมข่าวสารและความเคลื่อนไหวภายในองค์กร ให้คุณได้รับรู้ถึงที่ตลอดเวลา และทุก ๅ การอ่านของคุณจะได้รับเหรียญรางวัล สำหรับการสะสมไว้เล่นกิจกรรมกับเรา LINE Retail Society</div>';
      str += '<div class="clr"></div>';
      str += '<div class="btn-t2" onclick="GotoNews()" style="margin-top:20px;">ไปดูข่าวองค์กร</div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      str += '<div style="height: 15px;"></div>';
    } else if(NewAid==2 && xLevel==0) { 
      str += '<div class="btn-t3" style="margin-top:10px; min-width:220px; background:#fff;">เมนูแนะนำ<br>ระบบงาน LINE Retail Society</div>';
      str += '<div><img src="./ad/ad-03.jpg" style="padding-top:8px;width:100%;"></div>';
      str += '<div style="margin-top:15px;">';
      str += '<div class="font13black" style="padding-top:5px;">เราได้จัดหมวดหมู่ของระบบงานทั้งหมดของ LINE Retail Socitey มาไว้ที่เว็บไซต์นี้ทั้งหมดแล้ว คุณสามารถเข้าสู่ระบบงานได้จากเว็บไซต์นี้</div>';
      str += '<div class="clr"></div>';
      str += '<div class="btn-t2" onclick="GotoSystem()" style="margin-top:20px;">ไปดูระบบงาน</div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      str += '<div style="height: 15px;"></div>';
    } else if(NewAid==3 && xLevel==0) { 
      str += '<div class="btn-t3" style="margin-top:10px; min-width:220px; background:#fff;">เมนูแนะนำ<br>ภารกิจเก็บสะสมเหรียญรางวัล</div>';
      str += '<div><img src="./ad/ad-05.jpg" style="padding-top:8px;width:100%;"></div>';
      str += '<div style="margin-top:15px;">';
      str += '<div class="font13black" style="padding-top:5px;">นอกจากการเก็บเหรียญจากการอ่านข่าวสารองค์กรแล้ว เราได้จัดเตรียมกิจกรรมให้เพื่อน ๆ เข้ามาเก็บสะสมเหรียญได้ทุก ๆ วันเลย และให้เพื่อน ๆ ได้ทบทวนความรู้ของตัวเองอยู่ตลอดเวลาด้วยนะ</div>';
      str += '<div class="clr"></div>';
      str += '<div class="btn-t2" onclick="GotoCoin()" style="margin-top:20px;">ไปสะสมเหรียญ</div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      str += '<div style="height: 15px;"></div>';
    } else if(NewAid==4 && xLevel==0) { 
      str += '<div class="btn-t3" style="margin-top:10px; min-width:220px; background:#fff;">เมนูแนะนำ<br>ห้องคำถาม-คำตอบ</div>';
      str += '<div><img src="./ad/ad-04.jpg" style="padding-top:8px;width:100%;"></div>';
      str += '<div style="margin-top:15px;">';
      str += '<div class="font13black" style="padding-top:5px;">หากคุณมีคำถาม หรือข้อสงสัย คุณสามารถที่จะเข้ามาตั้งคำถามในห้องคำถาม-คำตอบได้ และหรือคุณเป็นผู้ที่เกี่ยวข้องกับคำถามเหล่านั้นก็สามารถเข้ามาตอบให้เพื่อน ๆ ได้รับทราบก็ได้เช่นกันน้า</div>';
      str += '<div class="clr"></div>';
      str += '<div class="btn-t2" onclick="GotoChat()" style="margin-top:20px;">ไปห้องถาม-ตอบ</div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      str += '<div style="height: 15px;"></div>';
    } else if(NewAid==5 && xLevel==0) { 
      str += '<div class="btn-t3" style="margin-top:10px; min-width:220px; background:#fff;">เมนูแนะนำ<br>แลกของรางวัล</div>';
      str += '<div><img src="./ad/ad-02.jpg" style="padding-top:8px;width:100%;"></div>';
      str += '<div style="margin-top:15px;">';
      str += '<div class="font13black" style="padding-top:5px;">ไม่ว่าคุณได้มีเหรียญรางวัลมากหรือน้อย คุณก็สามารถเลือกความต้องการของคุณเองได้ เพียง 5 เหรียญรางวัล คุณอาจจะได้รับรางวัลใหญ่ ๆ หรือเพื่อให้มั่นใจก็เก็บเหรียญรางวัลให้พอกับจำนวนที่จะใช้แลกก็ได้นะ</div>';
      str += '<div class="clr"></div>';
      str += '<div class="btn-t2" onclick="GotoRewards()" style="margin-top:20px;">ไปแลกของรางวัล</div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      str += '<div style="height: 15px;"></div>';
    } else if(NewAid==6 && xLevel==0) { 
      str += '<div class="btn-t3" style="margin-top:10px; min-width:220px; background:#fff;">เมนูแนะนำ<br>ประมูลสินค้า</div>';
      str += '<div><img src="./ad/ad-02.jpg" style="padding-top:8px;width:100%;"></div>';
      str += '<div style="margin-top:15px;">';
      str += '<div class="font13black" style="padding-top:5px;">เมื่อคุณได้สะสมเหรียญรางวัลได้มากพอแล้ว อีกหนึ่งวิธีที่คุณจะได้รับของรางวัลจากเราไปก็คือการเข้าร่วมกิจกรรมการประมูลของรางวัล หากคุณเป็นผู้ประมูลสูงสุดก็รับของรางวัลชิ้นนั้นไปเลย</div>';
      str += '<div class="clr"></div>';
      str += '<div class="btn-t2" onclick="GotoAuction()" style="margin-top:20px;">ไปประมูลสินค้ากัน</div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      str += '<div style="height: 15px;"></div>';
    } else if(NewAid==7 && xLevel==0) { 
      str += '<div class="btn-t3" style="margin-top:10px; min-width:220px; background:#fff;">เมนูแนะนำ<br>Game Zone</div>';
      str += '<div><img src="./ad/ad-07.jpg" style="padding-top:8px;width:100%;"></div>';
      str += '<div style="margin-top:15px;">';
      str += '<div class="font13black" style="padding-top:5px;">ในทุก ๆ วันการเก็บคะแนนเป็นสิ่งสำคัญที่เราจะนำมาเล่นในกิจกรรมต่าง ๆ ของเรา เราขอแนะนำให้เข้าร่วมเก็บเหรียญรางวัลจาก Game Zone ที่นี่ได้ในทุก ๆ วันเลย</div>';
      str += '<div class="clr"></div>';
      str += '<div class="btn-t2" onclick="GotoAuction()" style="margin-top:20px;">ไปประมูลสินค้ากัน</div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      str += '<div style="height: 15px;"></div>';
    }
    $("#RandomNewsAid").html(str);      
    document.getElementById('id04').style.display='block';
      str += '';
  }
}


function DisplayQRCode() {
  document.getElementById('id03').style.display='block';
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
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

function GotoAuction() {
  window.location.href = 'intro-game4.html';
}

function GotoWeb() {
  window.location.href = 'intro.html';
}

function GotoNews() {
  window.location.href = 'groupnews.html#ttbNews';
}

function GotoSystem() {
  window.location.href = 'home.html#menusystem';
}

function GotoCoin() {
  window.location.href = 'home.html#menugame';
}

function GotoChat() {
  window.location.href = 'webboard.html#Question';
}

function GotoRewards() {
  window.location.href = 'catalog.html';
}

function GotoProfile() {
  window.location.href = 'profile.html';
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
  document.getElementById('id05').style.display='none';
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
