var cleararray = "";


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbSocietyMenu = firebase.firestore().collection("SocietyMenu");
  dbttbNews = firebase.firestore().collection("ttbnews");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  MenuSlide();
  CheckData();
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

function CheckData() {
  //$("#ProfileUser").html('<img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img">');  
  //$("#ProfileUser1").html('<img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img">');  
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
    $("#yyy").html(str);
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
      str += '<div style="text-align:left; color:#0056ff; padding-top:12px;font-size:13px;">ข้อมูลระบบงาน</div>';
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


function CloseAll() {
  document.getElementById('menu').style.display='none';
  document.getElementById('id01').style.display='none';
}

