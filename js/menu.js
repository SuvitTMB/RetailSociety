function OpenPopMenu() {
  var xLine = "";
  var str = "";
  var xCountNews = 0;
  dbGroupNews.where('GroupType','==',2)
  .where('NewsStatus','==',1)
  .orderBy('NewsGroup','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> { 
      str += '<div class="menu-box" onclick="window.location.href=\''+ doc.data().NewsLink +'\';">';
      str += '<div class="menu-box-img"><img src="'+ doc.data().NewsIcon +'" style="width:35px;"></div>';
      str += '<div class="menu-box-text">'+ doc.data().NewsNameWeb +'</div></div>';
    });
    xLine += '<div style="margin:20px 0 20px 0;">';
    xLine += '<div class="container" style="width:100%;padding:5px;">';
    xLine += '<div style="width:95px;float: left;text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
    xLine += '<div class="Profile-title"><b>'+ sessionStorage.getItem("EmpName_Society") +'</b><br>LineName : '+ sessionStorage.getItem("LineName") +'<br>Phone : '+ sessionStorage.getItem("EmpPhone_Society") +'</div>';
    xLine += '</div></div><div class="clr"></div>';
    xLine += '<div style="height: 70px;background-color: #fff;">';
    xLine += '<div class="box-reward1"> </div>';
    xLine += '<div class="box-reward"><div class="XPpoint">'+ sessionStorage.getItem("Level_Point") +'</div>ระดับ<br>ผู้แข่งขัน</div>';
    xLine += '<div class="box-reward"><div class="XPpoint">'+ sessionStorage.getItem("XP_Point") +'</div>คะแนน<br>ประสบการณ์</div>';
    xLine += '<div class="box-reward"><div class="XPpoint">'+ sessionStorage.getItem("RP_Point") +'</div>คะแนน<br>แลกรางวัล</div>';
    xLine += '<div class="clr"style="height:30px;"></div>';
    xLine += '<div style="font-size:13px;">เมนูสำหรับเลือกใช้งาน</div>';
    xLine += '<div style="margin: 10px auto; width:280px; text-align: center;">'+ str +'</div><div class="clr"></div>';
    xLine += '<div class="clr" style="height:20px;"></div>';
    xLine += '<center><div class="btn-t2" onclick="CloseMenu()">Close Menu</div></center>';
    xLine += '<div class="clr" style="height:40px;"> </div>';
    $("#MenuSociety").html(xLine);  
    //document.getElementById('menu').style.display='block';
  });
}

function OpenMenu() {
/*
  var xLine = "";
  var str = "";
  var xCountNews = 0;
  dbGroupNews.where('GroupType','==',2)
  .where('NewsStatus','==',1)
  .orderBy('NewsGroup','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> { 
      str += '<div class="menu-box" onclick="window.location.href=\''+ doc.data().NewsLink +'\';">';
      str += '<div class="menu-box-img"><img src="'+ doc.data().NewsIcon +'" style="width:35px;"></div>';
      str += '<div class="menu-box-text">'+ doc.data().NewsNameWeb +'</div></div>';
    });
    xLine += '<div style="margin:20px 0 20px 0;">';
    xLine += '<div class="container" style="width:100%;padding:5px;">';
    xLine += '<div style="width:95px;float: left;text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
    xLine += '<div class="Profile-title"><b>'+ sessionStorage.getItem("EmpName_Society") +'</b><br>LineName : '+ sessionStorage.getItem("LineName") +'<br>Phone : '+ sessionStorage.getItem("EmpPhone_Society") +'</div>';
    xLine += '</div></div><div class="clr"></div>';
    xLine += '<div style="height: 70px;background-color: #fff;">';
    xLine += '<div class="box-reward1"> </div>';
    xLine += '<div class="box-reward"><div class="XPpoint">'+ sessionStorage.getItem("Level_Point") +'</div>ระดับ<br>ผู้แข่งขัน</div>';
    xLine += '<div class="box-reward"><div class="XPpoint">'+ sessionStorage.getItem("XP_Point") +'</div>คะแนน<br>ประสบการณ์</div>';
    xLine += '<div class="box-reward"><div class="XPpoint">'+ sessionStorage.getItem("RP_Point") +'</div>คะแนน<br>แลกรางวัล</div>';
    xLine += '<div class="clr"style="height:30px;"></div>';
    xLine += '<div style="font-size:13px;">เมนูสำหรับเลือกใช้งาน</div>';
    xLine += '<div style="margin: 10px auto; width:280px; text-align: center;">'+ str +'</div><div class="clr"></div>';
    xLine += '<div class="clr" style="height:20px;"></div>';
    xLine += '<center><div class="btn-t2" onclick="CloseMenu()">Close Menu</div></center>';
    xLine += '<div class="clr" style="height:40px;"> </div>';
    $("#MenuSociety").html(xLine);  
    document.getElementById('menu').style.display='block';
  });
*/
    document.getElementById('menu').style.display='block';
}

function MyPoint() {
  var yLine = "";
  var zLine = "";
  yLine += '<div style="margin:10px 0 20px 0;">';
  yLine += '<div class="container" style="width:90%;padding:5px; max-width:450px;">';
  yLine += '<div style="width:95px;float: left;text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
  yLine += '<div class="Profile-title"><b>'+ sessionStorage.getItem("EmpName_Society") +'</b><br>LineName : '+ sessionStorage.getItem("LineName") +'<br>Phone : '+ sessionStorage.getItem("EmpPhone_Society") +'</div>';
  yLine += '</div></div><div class="clr"></div>';
  $("#DisplayMember").html(yLine);  

  zLine += '<div style="height: 70px;background-color: #c2dfef; width:100%; max-width:450px; margin:auto;">';
  zLine += '<div class="box-reward1"> </div>';
  zLine += '<div class="box-reward"><div class="XPpoint">'+ sessionStorage.getItem("Level_Point") +'</div>ระดับ<br>ผู้แข่งขัน</div>';
  zLine += '<div class="box-reward"><div class="XPpoint">'+ sessionStorage.getItem("XP_Point") +'</div>คะแนน<br>ประสบการณ์</div>';
  zLine += '<div class="box-reward"><div class="XPpoint">'+ sessionStorage.getItem("RP_Point") +'</div>คะแนน<br>แลกรางวัล</div>';
  zLine += '<div class="clr"style="height:30px;"></div>';
  zLine += '<div class="clr" style="height:40px;"></div></div>';
  $("#DisplayMyPoint").html(zLine);  

}


function CloseMenu() {
  document.getElementById('menu').style.display='none';
}

