var EidNews = "";
var ReadID = "";
var ReadGroup = "";
var ClickRead = 0;
var ClickView = 0;
var ClickMemo = 0;
var ClickLike = 0;
var xRecordNews = 0;
var ReadNewsPoint = 1;
var xHeadNews = "";
var xNewsGroup = 0;

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  if(sessionStorage.getItem("RefID_Member")==null) { location.href = "index.html"; }
  ReadID = getParameterByName('gid');
  ReadGroup = getParameterByName('groupid');
  Connect_DB();
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbttbnews = firebase.firestore().collection("ttbnews");
  dbttbnewsMemo = firebase.firestore().collection("ttbnewsMemo");
  dbttbnewsLike = firebase.firestore().collection("ttbnewsLike");
  dbttbnewsRead = firebase.firestore().collection("ttbnewsRead");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  GetAllRead();
  ShowView();
  NewsUpdate();
  OpenPopMenu();
});

/*
function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);

}
*/

function getParameterByName(name, url) {
  str = '';
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


var ReadUserArr = [];
function GetAllRead() {
  var i = 0;
  var str = "";
  ReadMemberArr = [];
  ReadUserArr = [];
  dbttbnewsRead.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //ReadMemberArr.push(doc.data().RefID);
      ReadUserArr.push({ RefID: doc.data().RefID, ReadDate: doc.data().ReadDate, ID: doc.id });
    });    
    console.log(ReadUserArr);
  });
}


//const results = [];
var xResults = "";
function ShowView() {
  var str = "";
  var str1 = "";
  var str2 = "";
  dbttbnews.where(firebase.firestore.FieldPath.documentId(), "==", ReadID)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      const results = ReadUserArr.filter(obj => {return obj.RefID === doc.id;});
      if(results[0]!=undefined) { 
        xResults = results[0].ReadDate;
      }
      EidNews = doc.id;
      xNewsGroup = doc.data().NewsGroup;
      xHeadNews = doc.data().NewsHeader;
      ReadNewsPoint = doc.data().NewsPoint;
      ClickRead = doc.data().NewsRead;
      ClickView = (doc.data().NewsView+1);
      ClickLike = doc.data().NewsLike;
      ClickMemo = doc.data().NewsMemo;
      xRecordNews = doc.data().RecordNews;
      CheckUserRead();
      str2 += '<div id="DisplayShowLike"></div>';
      $("#DisplayVote").html(str2);
      str += '<div class="entry-img"><div style="position: relative;">';
      if(doc.data().NewsImg!="") {
        str += '<center><img src="'+doc.data().NewsImg+'" style="width:100%; max-width: 500px;"></center>';
      } else {
        str += '<center><img src="https://firebasestorage.googleapis.com/v0/b/retailproject-6f4fc.appspot.com/o/News%2Fnewspaper1.jpg?alt=media&token=077d12b5-9137-4cd7-9354-2248ce76074a" onerror="javascript:imgError(this)" style="width:100%; max-width: 500px;"></center>';
      }
      str += '<div id="ShowClickLike"></div>';
      str += '</div></div>';
      str += '<h2 class="entry-title">'+ doc.data().NewsHeader +'</h2>'
      if(doc.data().NewsVDO!="") {
        str += '<div style="margin:0px auto 10px auto;">'+ doc.data().NewsVDO +'</div>'
      }
      str += '<div class="entry-meta"><ul>';
      str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i> '+ doc.data().NewsDate +'</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-file-spreadsheet"></i> '+ doc.data().NewsView +' อ่าน</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i> '+ doc.data().NewsMemo +' ความเห็น</li>';
      str += '</ul></div>';
      str += '<div class="entry-content"><p>'+ doc.data().NewsDetail +'</p></div>';
      if(doc.data().NewsLink!="") { 
        str += '<div class="clr">[ <a href="'+doc.data().NewsLink+'" target="_blank" class="text-link">คลิกดูรายละเอียดเพิ่มเติม</a> ]</div>';
        str += '<div class="clr" style="height:12px;"></div>';
      }
      $("#DisplayIMG").html(str);
      str1 += '<div class="boxvdo-line2" style="margin:20px auto 10px auto;">';
      if(doc.data().NewsDetail!="") {
        str1 += '<div class="text-memo">'+doc.data().NewsDetail+'</div><div class="clr" style="height:8px;"></div>';
        if(doc.data().NewsLink!="") { 
          str1 += '<div class="clr"><div><a href="'+doc.data().NewsLink+'" target="_blank" class="text-link">คลิกดูรายละเอียดเพิ่มเติม</a></div></div>';
          str1 += '<div class="clr" style="height:12px;"></div>';
        }
      }
      str1 += '<div class="boxvdo-icon1" style="font-size:10px;"><img src="./img/reading.png" class="boxvdoimg"> <span>'+doc.data().NewsRead+'</span> </div>';
      str1 += '<div class="boxvdo-icon1" style="font-size:10px;"><img src="./img/view.png" class="boxvdoimg"> <span>'+ClickView+'</span> </div>';
      str1 += '<div class="boxvdo-icon1" style="font-size:10px;"><img src="./img/like.png" class="boxvdoimg"> <span id="GetClickLike">'+doc.data().NewsLike+'</span> </div>';
      str1 += '<div class="boxvdo-icon1" style="font-size:10px;"><img src="./img/memo.png" class="boxvdoimg"> <span>'+doc.data().NewsMemo+'</span> </div>';
      str1 += '<div class="boxvdo-icon1" style="font-size:10px;"><img src="./img/news.png" class="boxvdoimg"> <span>'+ doc.data().NewsDate +'</span></div>';
      str1 += '</div></div>';
      $("#DisplayDetail").html(str1);
    });
    dbttbnews.doc(EidNews).update({
      NewsView : ClickView
    });
    CheckUserLike();
    ShowLike();
    ShowMemo();
  });
}


function ShowLike() {
  var xCheck = "";
  var xxx = "";
  var str = "";
  var i = 0;
  dbttbnewsLike.where('LikeID','==',EidNews)
  .orderBy('LikeTimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<img src="'+ doc.data().LinePicture +'" onerror="javascript:imgError(this)" class="chart-profilt" title="'+ doc.data().LineName +'">';
      i++;
    });
    if(i==0) {
      str = '<div style="border:1px solid #ccc; background-color: #f1f1f1; border-radius: 10px;padding:20px;text-align: center;">ยังไม่มีกำลังใจจากเพื่อนของเรา</div>';
    }
    $("#DisplayShowLike").html(str);
  });
}


function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    return true;
}


var sClickLike_user = 0;
function CheckUserLike() {
  CheckCountLike();
  var str = "";
  dbttbnewsLike.where('LineID','==',sessionStorage.getItem("LineID"))
  .where('LikeID','==',EidNews)
  //.orderBy('LikeTimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      sClickLike_user  = 1;
    });
    if(sClickLike_user==0) {
      str +='<img src="./img/like1.png" class="chart-like" id="ShowClickLike" onclick="SaveClickLike()">';
    } else {
      str +='<img src="./img/like2.png" class="chart-dislike" id="ShowClickLike">';
    }
    $("#ShowClickLike").html(str);
  });
}


var sClickRead_user = 0;
function CheckUserRead() {
  var str = "";
  var ReadTime = "";
  dbttbnewsRead.where('LineID','==',sessionStorage.getItem("LineID"))
  .where('LikeID','==',EidNews)
  .orderBy('LikeTimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      sClickRead_user = 1;
      ReadTime = doc.data().LikeDate;
    });
  });
}


function SaveClickRead() {
  //CheckCountRead();
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbttbnewsRead.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    LikeID : EidNews,
    LikeDate : dateString,
    LikeTimeStamp : TimeStampDate
  });
  dbttbnews.doc(EidNews).update({
    NewsRead : ClickRead+1
  });
  CheckUserLike();
  CheckCountLike();
  CheckUserRead();
  ShowLike();
}


var sClickLike = 0;
function CheckCountLike() {
  dbttbnews.where(firebase.firestore.FieldPath.documentId(), "==", EidNews)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      sClickLike = doc.data().NewsLike+1;
      $("#GetClickLike").html(doc.data().NewsLike);
    });
  });
}


function SaveClickLike() {
  CheckCountLike();
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbttbnewsLike.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    LikeID : EidNews,
    LikeDate : dateString,
    LikeTimeStamp : TimeStampDate
  });
  dbttbnews.doc(EidNews).update({
    NewsLike : parseInt(ClickLike)+1
  });
  CheckUserLike();
  CheckCountLike();
  ShowLike();
  document.getElementById('id03').style.display='block';
}

function GotoGroupNews() {
  location.href = "groupnews.html";
}


function GotoHome() {
  location.href = "home.html";
}


var timeLeft = 60;
var elem = document.getElementById('CountReadNews');
var timerId = setInterval(countdown, 1000); 
function countdown() {
  if(xResults!="") { 
    clearTimeout(timerId);
    $("#CountReadNews").html("<font color='#777'>ระบบบันทึกการอ่านของคุณเรียบร้อยแล้ว<br>เมื่อวันที่ "+xResults+"<br>มีพนักงานอ่านแล้ว "+ xRecordNews+" คน</font>");
  } else {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      CallReadNews();
    } else {
      elem.innerHTML = 'เหลือเวลาอีก ' +timeLeft + ' วินาที<br>(ระบบจะบันทึกการอ่านอัตโนมัติเมื่อสิ้นสุดเวลาที่กำหนด)<br>คุณจะได้ '+ ReadNewsPoint +' Point เมื่อสิ้นสุดเวลาที่กำหนด';
      timeLeft--;
    }    
  }
}


function CallReadNews() {
  clearTimeout(timerId);
  if(xResults=="") { 
    dbttbnews.where(firebase.firestore.FieldPath.documentId(), "==", EidNews)
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
        xRecordNews = parseFloat(doc.data().RecordNews)+1;
      });
      dbttbnews.doc(EidNews).update({
        RecordNews : parseFloat(xRecordNews)
      });
      RecordNews();
    });
  } else {
    alert("ระบบเคยทำการบันทึกรายการอ่านของคุณไว้แล้ว");
  } 
}


function RecordNews() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbttbnewsRead.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    RefID : EidNews,
    ReadDate : dateString,
    ReadTimeStamp : TimeStampDate
  });
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(ReadNewsPoint));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(ReadNewsPoint));
  dbttbMember.doc(sessionStorage.getItem("RefID_Member")).update({
    XP_Point : sessionStorage.getItem("XP_Point"),
    RP_Point : sessionStorage.getItem("RP_Point")
  });
  dbttbnewsLog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    RefID : EidNews,
    NewsGroup : xNewsGroup,
    HeadNews : "ข่าวสารองค์กร",
    SubNews : xHeadNews,
    GetPoint : parseFloat(ReadNewsPoint),
    LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });

  var str = "";
  str += '<div class="btn-t3"><b>คุณได้รับ '+ ReadNewsPoint +' Point</b></div>';
  str += '<div style="margin-top:15px;font-size:13px;">จากการอ่านข่าวสารเรื่อง<br><b>'+xHeadNews+'</b><br><br><img src="./img/reading.gif" style="width:100%; max-width: 250px;"></div>';
  str += '<div class="clr"></div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</b></div>';
  str += '<div class="clr" style="height:40px;"></div>';
  $("#DisplayGetPoint").html(str);  
  document.getElementById('id01').style.display='block';
  $("#CountReadNews").html("<font color='#777'>ระบบบันทึกการอ่านของคุณเรียบร้อยแล้ว<br>เมื่อวันที่ "+dateString+"<br>มีพนักงานอ่านแล้ว "+ xRecordNews+" คน</font>");
  GetAllRead();
}



function ClickSendQ() {
  var sMemo = document.getElementById("txtDetail").value;
  ClickMemo = (parseInt(ClickMemo)+1);
  //ClickView = ClickView-1;
  if(sMemo!="") {
    NewDate();
    var TimeStampDate = Math.round(Date.now() / 1000);
    //sClickView = sClickView+1;
    dbttbnewsMemo.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      RefID : EidNews,
      WriteMemo : sMemo,
      WriteDate : dateString,
      WriteTimeStamp : TimeStampDate
    });
    dbttbnews.doc(EidNews).update({
      NewsMemo : ClickMemo
    });
    ShowView();
    //ShowMemo();
    document.getElementById("txtDetail").value = "";
    document.getElementById('id02').style.display='block';
  } else {
    document.getElementById('id02').style.display='block';
  }
}


function ShowMemo() {
  var i = 0;
  var str = "";
  dbttbnewsMemo.where('RefID','==',EidNews)
  .orderBy('WriteTimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str +='<div class="chart-box">';
      str +='<div class="chart-img"><img src="'+ doc.data().LinePicture +'" onerror="javascript:imgError(this)" class="chart-profilt" title="'+ doc.data().LineName +'"></div>';
      str +='<div class="chart-text">'+doc.data().WriteMemo+'<div class="chart-date"><b><font color="#f68b1f">'+ doc.data().LineName +'</font></b> | โพส : '+doc.data().WriteDate+'</div></div></div>';
      str +='<div class="clr"></div>';
      i++;
    });
    if(i==0) {
      str = '<div class="no-message-box">ยังไม่มีข้อความจากเพื่อน</div>';
    }
    $("#DisplayQuestion").html(str);
  });
}

function NewsUpdate() {
  var str = "";
  dbttbnews.where("NewsStatus", "==", 0)
  .orderBy('NewsTimeStamp','desc')
  .limit(6)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      if(EidNews!=doc.id) {
        str += '<div class="post-box" onclick="ReadNews(\''+ doc.id +'\',\''+ doc.data().NewsGroup +'\')">';
        str += '<div class="post-headnews">'+ doc.data().NewsHeader +'</div>';
        str += '<div class="post-news">'+ doc.data().ShortNews +'</div><div class="clr"></div>';
        str += '<div style="margin-top:5px;text-align: left;"><i>';
        str += '<div class="d-flex post-text"><i class="icofont-wall-clock"></i>&nbsp;'+ doc.data().NewsDate +'</div>';
        str += '<div class="d-flex post-text"><i class="icofont-file-spreadsheet"></i>&nbsp;'+ doc.data().NewsView +' อ่าน</div>';
        str += '<div class="d-flex post-text"><i class="icofont-comment"></i>&nbsp;'+ doc.data().NewsMemo +' ความเห็น</div></i>';
        str += '</div></div>';
      }
    });
    $("#DisplayNewsUpdate").html(str);
  });
}


function ReadNews(id,xGroup) {
  location.href = "readnews.html?gid="+id+"&groupid="+xGroup+"";
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


function ConvrtDate(str) {
  var date = new Date(str),
  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()+543].join("/");
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
}
