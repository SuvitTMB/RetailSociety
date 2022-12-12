var i = 0;
var EidProfile = "";
var dateString = "";


$(document).ready(function () {
/*
  sessionStorage.clear(); 
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
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
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
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


var EidUpdateLogin = "";
var CountLogin = 0;
var CheckFound = 0;
function CheckMember() {
  dbttbMember.where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFound = 1;
      UpdatePorfile();
      sessionStorage.setItem("RefID_Member", doc.id);
      sessionStorage.setItem("Level_Point", doc.data().Level_Point);
      sessionStorage.setItem("XP_Point", doc.data().XP_Point);
      sessionStorage.setItem("RP_Point", doc.data().RP_Point);
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='block';
    });

    if(CheckFound==0) {
      AddNewMember();
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='block';
      //document.getElementById('NoService').style.display='block';
    }
  });
}


function UpdatePorfile() {
    dbProfile.doc(EidProfile).update({
      empPicture : sessionStorage.getItem("LinePicture"),
      linename : sessionStorage.getItem("LineName")
    });
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
    XP_Point : parseFloat(NewScore),
    RP_Point : parseFloat(NewScore),
    LogDateTime : dateString,
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
  document.getElementById('id01').style.display='block';
}


function WelcomePoint() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='block';
  var str = "";
      str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img" style="margin-top:35px;width:120px;height:120px;"></div>';
      str += '<div class="Profile-title" style="color:#f68b1f; font-weight:600;text-align:center;">'+ sessionStorage.getItem("LineName")+'</div>';
      str += '<div class="btn-t3" style="margin:15px auto;">คุณได้รับ <b>Welcome Point</b></div><div class="XPpoint" style="margin-top:-10px;">'+ sessionStorage.getItem("XP_Point")+' Point</div>';
      str += '<div style="margin-top:15px;"><img src="./img/welcome.gif" style="width:100%; max-width: 200px;"></div>';
      str += '<div class="clr"></div>';
      str += '<div class="btn-t2" onclick="GotoWeb()" style="margin-top:15px;">เข้าสู่ <b>LINE Retail Society</b></div>';
      str += '<div class="clr" style="height:40px;"></div>';
    $("#DisplayWelcomePoint").html(str);  
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


function GotoWeb() {
  window.location.href = 'home.html';
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}

