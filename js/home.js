var cleararray = "";


$(document).ready(function () {
    if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
    //sessionStorage.clear(); 
    //var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
    //var sLineName = "Website";
    //var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
    //sessionStorage.setItem("LineID", sLineID);
    //sessionStorage.setItem("LineName", sLineName);
    //sessionStorage.setItem("LinePicture", sLinePicture);
    //str += '<div style="width:95px;float: left;text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
    //str += '<div class="Profile-title"><b>'+ sessionStorage.getItem("LineName")+'</b><br>LineName : '+ sessionStorage.getItem("LineName")+'<br>Phone : 0837850099</div>';
    //$("#MyProfile").html(str);  
    var str = "";
    var xtr = '<img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img">';
    str += '<div style="width:95px;float: left;text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
    str += '<div class="Profile-title"><b>'+ sessionStorage.getItem("EmpName_Society")+'</b><br>LineName : '+ sessionStorage.getItem("EmpName_Society")+'<br>Phone : '+ sessionStorage.getItem("EmpPhone_Society")+'</div>';
    //str += '<div class="Profile-title"><b>'+ sessionStorage.getItem("EmpName_Society")+'</b><br>LineName : '+ sessionStorage.getItem("EmpName_Society")+'<br>Phone : '+ sessionStorage.getItem("EmpPhone_Society")+'</div>';
    $("#MyUser1").html(str);  
    //$("#ProfileUser").html('<img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img">');  
    //$("#ProfileUser").html(str);  
    //var Xnumber=document.getElementById("XPoint");
    ///Xnumber = "6";
    //console.log(Xnumber);
    //document.getElementById("XPoint").value = "Johnny Bravo";
    //document.getElementById("XPoint").value = 8;
    //$("#XPoint").innerHTML(Xnumber);
    //document.getElementById('XPoint').HTML('6');
    //$("#XPoint").innerHTML('6');  
    //alert(xtr);
//alert(sessionStorage.getItem("LinePicture"));
    Connect_DB();
    MenuSlide();
});


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
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbSocietyMenu = firebase.firestore().collection("SocietyMenu");
  dbttbNews = firebase.firestore().collection("ttbnews");
  CheckData();
}

function CheckData() {
  $("#ProfileUser").html('<img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img">');  
  $("#ProfileUser1").html('<img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img">');  
  var str = "";
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = doc.data().statusconfirm;
      EidProfile = doc.id;
      sDateRegister = doc.data().DateRegister;
      //sessionStorage.setItem("EmpID", doc.data().empID);
      //sessionStorage.setItem("EmpName", doc.data().empName);
      //str += '<div style="width:95px;float: left;text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
      //str += '<div class="Profile-title"><b>'+ sessionStorage.getItem("LineName")+'</b><br>LineName : '+ sessionStorage.getItem("EmpName")+'<br>Phone : 0837850099</div>';
      //$("#MyProfile").html(str);  

      ListWebPage();
      /*
      if(doc.data().statusconfirm==1) {
        ListWebPage();
      } else if(doc.data().statusconfirm==2) {
        location.href = "waittingpage.html";
      } else {
        location.href = "cancelpage.html";
      }
      */
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

