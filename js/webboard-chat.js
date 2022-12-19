var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var cleararray = "";
var idRoomWebboard = "";
var xidRoomWebboard = "";
var MaxTime = 0;
var qInterval;
var i = 0;
var str = '';

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  idRoomWebboard = getParameterByName('gid');
  if(idRoomWebboard==null) { location.href = "webboard.html"; }
  Connect_DB();
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbWebboard = firebase.firestore().collection("ttbWebboard");
  dbttbWebChat = firebase.firestore().collection("ttbWebChat");
  CheckBoardID();
  GroupChat();
  OpenPopMenu();
});



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


var xNameWebboard = "";
var xRead = 0;
//var xOwnerUser = "";
function CheckBoardID() {
  var str = "";
  dbttbWebboard.where(firebase.firestore.FieldPath.documentId(), "==", idRoomWebboard)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      xNameWebboard = '<u>คำถาม</u> ' +doc.data().QWebboard;
      xRead = parseFloat(doc.data().ReadWebboard)+1;
      str += '<div style="width:90%;margin:auto;">'
      str += '<div class="webboard1" style="padding-top:15px;"><img src="' + doc.data().LinePicture + '" class="profile-team" onerror="javascript:imgError(this)" style="width:40px;"></div>';
      str += '<div class="webboard2"><div style="font-size:12px;"><i>ตั้งคำถามโดย</i><br><b>' + doc.data().EmpName + '</b></div>';
      str += '<div class="webboard3">Date : '+ doc.data().SendDate +' | Read '+ xRead +' | Post ' + doc.data().AnsWebboard +'</div></div>';
      str += '</div>';
      $("#DisplayNameWebboard").html(doc.data().QWebboard);
      $("#DisplayOwner").html(str);
    });
  if(xidRoomWebboard != idRoomWebboard) {
    UpdateRead();
    xidRoomWebboard = idRoomWebboard;
  }
    document.getElementById('loading').style.display='none';
    document.getElementById('ShowContent').style.display='block';
  });
}


function GroupChat() {
  //if(idRoomWebboard=="") { sGroupChart = "ChatAll"; } else { sGroupChart = xGroup; }
  DisplayChat();
  //console.log(sGroupChart);
}

function DisplayLog() {
  timecountdown();
  console.log(arrayIN.length);
  $("#DisplayMemo").html(str);    
}


var arrayIN = [];
var CountIN = 0;
var CheckLastTime = "";
function DisplayChat() {
  var xCheckChat = 0;
  str1 = "";
  document.getElementById("TextMamo").innerHTML = "";   
  document.getElementById("DisplayMemo").innerHTML = "";   
  dbttbWebChat.where("GroupChart",'==',idRoomWebboard)
  .orderBy('PostTimeStamp','desc')
  .limit(100).get().then( snapshot => {
    snapshot.forEach(doc=> {
      xCheckChat++;
      ShowChat(doc);
    });
    if(xCheckChat==0) {
      str1+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
      str1+='<img src="./img/box.jpg" class="img-avatar"><div class="msb-font11">Admin</div></div>';
      str1+='<div class="media-body"><div class="mf-content" style="background:#fbe6a5;">เพื่อน ๆ สามารถที่จะเขียนข้อความตอบกลับเพื่อนของเราได้ที่กล่องข้อความด้านล่างได้เลยน้า ...';
      str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ dateString +'</small></div></div></div></div>';
      $("#DisplayMemo").html(str1); 
    }
  })
  DisplayLog();
}


function ShowChat(doc) {
  i = i+1;
  arrayIN.push(doc.id);
  if(CheckLastTime=="") { CheckLastTime = doc.data().PostTimeStamp; }
  if(sessionStorage.getItem("LineID")==doc.data().LineID) {
    str+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="mf-content" style="background:#fff;">'+ doc.data().PostMemo +'';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  } else {
    str+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="mf-content" style="background:#fff;">'+ doc.data().PostMemo +'';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  }
/*
  str+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
  str+='<img src="./img/box.jpg" class="img-avatar"><div class="msb-font11">Admin</div></div>';
  str+='<div class="media-body"><div class="mf-content" style="background:#fbe6a5;">เพื่อน ๆ สามารถที่จะเขียนข้อความตอบกลับเพื่อนของเราได้ที่กล่องข้อความด้านล่างได้เลยน้า ...';
  str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ dateString +'</small></div></div></div></div>';
*/
  $("#DisplayMemo").html(str); 
}


function NewChat(doc) {
  var str1 = "";
  if(CheckLastTimeUpdate=="") { 
    CheckLastTimeUpdate = "1";
    CheckLastTime = doc.data().PostTimeStamp; 
  }
  if(sessionStorage.getItem("LineID")==doc.data().LineID) {
    str1+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
    str1+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str1+='<div class="media-body"><div class="mf-content" style="background:#fff;">'+ doc.data().PostMemo +'';
    str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  } else {
    str1+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str1+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str1+='<div class="media-body"><div class="mf-content" style="background:#fff;">'+ doc.data().PostMemo +'';
    str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  }
  str = str1+str;
  $("#DisplayMemo").html(str); 
}


var xAnsWebboard = 0;
function MemoCount() {
  xAnsWebboard = 0;
  //dbttbWebChat.where(firebase.firestore.FieldPath.documentId(), "==", idRoomWebboard)
  dbttbWebChat.where("GroupChart",'==',idRoomWebboard)
  .get().then( snapshot => {
    snapshot.forEach(doc=> {
      xAnsWebboard = xAnsWebboard+1;
    });
    //xAnsWebboard = xAnsWebboard+1;
    dbttbWebboard.doc(idRoomWebboard).update({
      AnsWebboard : parseInt(xAnsWebboard)
    });
    CheckBoardID();
    //alert(idRoomWebboard+"==="+xAnsWebboard);
  })
}


function CheckMemo() {
  MemoCount();
  var TimeStampDate = Math.round(Date.now() / 1000);
  if(document.getElementById("TextMamo").value=="") {
    alert("กรุณาใส่พิมพ์ข้อความก่อนกดส่งข้อมูล");
    return
  }
  dbttbWebChat.add({
    GroupChart : idRoomWebboard,
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    PostMemo : document.getElementById("TextMamo").value,
    PostDate : dateString,
    PostTimeStamp : TimeStampDate
  });  

  i = i+1;
  var str1 = "";  
  str1+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
  str1+='<img src="'+ sessionStorage.getItem("LinePicture") +'" class="img-avatar"></div>';
  str1+='<div class="media-body"><div class="mf-content" style="background:#fff;">'+ document.getElementById("TextMamo").value +'';
  str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ dateString +'</small></div></div></div></div>';
  str = str1+str;
  $("#DisplayMemo").html(str); 
  $("#TextMamo").val('');
}


function CheckUpdate() {
  CheckLastTimeUpdate = "";
  console.log(CheckLastTime);
  dbttbWebChat.where("GroupChart",'==',idRoomWebboard)
  .where('PostTimeStamp','>',CheckLastTime).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().LineID!=sessionStorage.getItem("LineID")) {
        NewChat(doc);
      }
    });
  });
  timecountdown();
}


function timecountdown() {
  var timeleft = MaxTime;
    qInterval = setInterval(function(){
    if(timeleft <= 0) {
      stopcountdown();
      CheckUpdate();
    }
    },10000);
}



function stopcountdown() { 
    clearInterval(qInterval);
}


function UpdateRead() {
  dbttbWebboard.doc(idRoomWebboard).update({
    ReadWebboard : parseInt(xRead)
  });
}


function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    return true;
}


const loadmore = document.querySelector('#loadmore');
let currentItems = 8;
loadmore.addEventListener('click', (e) => {
    const elementList = [...document.querySelectorAll('.list .list-element')];
    for (let i = currentItems; i < currentItems + 8; i++) {
        if (elementList[i]) {
            elementList[i].style.display = 'block';
        }
    }
    currentItems += 8;
    // Load more button will be hidden after list fully loaded
    if (currentItems >= elementList.length) {
        event.target.style.display = 'none';
    }
})

/*



function GroupChat(xGroup) {
  if(sGroupChart=="") { sGroupChart = "ChatAll"; } else { sGroupChart = xGroup; }
  DisplayChat();
  //console.log(sGroupChart);
}



function DisplayLog() {
  timecountdown();
  console.log(arrayIN.length);
  $("#DisplayMemo").html(str);    
}


var arrayIN = [];
var CountIN = 0;
var CheckLastTime = "";
function DisplayChat() {
  str = "";
  document.getElementById("TextMamo").innerHTML = "";   
  document.getElementById("DisplayMemo").innerHTML = "";   
  dbSocial.where("GroupChart",'==',sGroupChart)
  .orderBy('PostTimeStamp','desc')
  .limit(100).get().then( snapshot => {
    snapshot.forEach(doc=> {
      //doc.data().orderBy('PostTimeStamp','asc');
      ShowChat(doc);
    });
  })
  DisplayLog();
}


var str = "";
function NewChat(doc) {
  var str1 = "";
  if(CheckLastTimeUpdate=="") { 
    CheckLastTimeUpdate = "1";
    CheckLastTime = doc.data().PostTimeStamp; 
  }
  if(sessionStorage.getItem("LineID")==doc.data().LineID) {
    str1+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
    str1+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str1+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'';
    str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  } else {
    str1+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str1+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str1+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'';
    str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  }
  str = str1+str;
  $("#DisplayMemo").html(str); 
}


var str = "";
function ShowChat(doc) {
  i = i+1;
  arrayIN.push(doc.id);
  if(CheckLastTime=="") { CheckLastTime = doc.data().PostTimeStamp; }
  if(sessionStorage.getItem("LineID")==doc.data().LineID) {
    str+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  } else {
    str+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  }
  $("#DisplayMemo").html(str); 
}


function CheckMemo() {
  var TimeStampDate = Math.round(Date.now() / 1000);
  if(document.getElementById("TextMamo").value=="") {
    alert("กรุณาใส่ข้อความก่อนกดส่งกำลังใจ");
    return
  }
  dbSocial.add({
    GroupChart : sGroupChart,
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    PostMemo : document.getElementById("TextMamo").value,
    PostDate : dateString,
    PostTimeStamp : TimeStampDate
  });  
  i = i+1;
  var str1 = "";  
  str1+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
  str1+='<img src="'+ sessionStorage.getItem("LinePicture") +'" class="img-avatar"></div>';
  str1+='<div class="media-body"><div class="mf-content">'+ document.getElementById("TextMamo").value +'';
  str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ dateString +'</small></div></div></div></div>';
  str = str1+str;
  $("#DisplayMemo").html(str); 
  $("#TextMamo").val('');
}


function CheckUpdate() {
  CheckLastTimeUpdate = "";
  console.log(CheckLastTime);
  dbSocial.where("GroupChart",'==',sGroupChart)
  .where('PostTimeStamp','>',CheckLastTime).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().LineID!=sessionStorage.getItem("LineID")) {
        NewChat(doc);
      }
    });
  });
  timecountdown();
}


function timecountdown() {
  var timeleft = MaxTime;
    qInterval = setInterval(function(){
    if(timeleft <= 0) {
      stopcountdown();
      CheckUpdate();
    }
    },10000);
}



function stopcountdown() { 
    clearInterval(qInterval);
}


const loadmore = document.querySelector('#loadmore');
let currentItems = 8;
loadmore.addEventListener('click', (e) => {
    const elementList = [...document.querySelectorAll('.list .list-element')];
    for (let i = currentItems; i < currentItems + 8; i++) {
        if (elementList[i]) {
            elementList[i].style.display = 'block';
        }
    }
    currentItems += 8;
    // Load more button will be hidden after list fully loaded
    if (currentItems >= elementList.length) {
        event.target.style.display = 'none';
    }
})
*/
/*
function CheckGroupNews() {
  var str = "";
  var xCountNews = 0;
  dbGroupNews.where('GroupType','==',1)
  .where('NewsStatus','==',1)
  .orderBy('NewsGroup','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<a href="#ttbNews"><div class="box-menu-group" onclick="CheckNews('+ doc.data().NewsGroup +')">';
      str += '<div><img src="'+ doc.data().NewsIcon +'" class="box-menu-img-group"></div>';
      str += '<div class="box-menu-text-group">'+ doc.data().NewsNameWeb +'</div>';
      str += '<div class="box-menu-count">'+ doc.data().TotalNews +' ข่าว</div></div></a>';
      xCountNews = xCountNews + doc.data().TotalNews;
    });
    str += '<a href="#ttbNews"><div class="box-menu-group" onclick="CheckNews(0)">';
    str += '<div><img src="./img/news-00.png" class="box-menu-img-group"></div>';
    str += '<div class="box-menu-text-group">ดูข่าวสาร<br>ทั้งหมด</div>';
    str += '<div class="box-menu-count">'+ xCountNews +' ข่าว</div></div></a>';
    $("#DisplayGroupNews").html(str);
  });
}
*/

/*
function ReadNews(id,xGroup) {
  location.href = "readnews.html?gid="+id+"&groupid="+xGroup+"";
}



function GotoHome() {
  location.href = "home.html";
}

function GotoGroupNews() {
  location.href = "groupnews.html";
}

function CloseAll() {
  document.getElementById('menu').style.display='none';
}

*/

