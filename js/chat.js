var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var cleararray = "";
var sGroupChart ="";
var MaxTime = 0;
var qInterval;
var i = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbNews = firebase.firestore().collection("ttbnews");
  //dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbSocial = firebase.firestore().collection("WorldMemberChat");
  GroupChat(sGroupChart);
  OpenPopMenu();
});


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
    str1+='<div class="media-body" style="margin-top:10px;"><div class="mf-content">'+ doc.data().PostMemo +'';
    str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  } else {
    str1+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str1+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str1+='<div class="media-body" style="margin-top:10px;"><div class="mf-content">'+ doc.data().PostMemo +'';
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
    str+='<div class="media-body" style="margin-top:10px;"><div class="mf-content">'+ doc.data().PostMemo +'';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div></div>';
  } else {
    str+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body" style="margin-top:10px;"><div class="mf-content">'+ doc.data().PostMemo +'';
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

