MenuFooter();
var xCal = 0;

//sessionStorage.setItem("XP_Point", 299);
if(sessionStorage.getItem("XP_Point") > 0 && sessionStorage.getItem("XP_Point") < 100) {
  xCal = 100;
} else if(sessionStorage.getItem("XP_Point") > 100 && sessionStorage.getItem("XP_Point") < 300) {
  xCal = 300;
} else if(sessionStorage.getItem("XP_Point") > 300 && sessionStorage.getItem("XP_Point") < 600) {
  xCal = 600;
} else if(sessionStorage.getItem("XP_Point") > 600 && sessionStorage.getItem("XP_Point") < 1000) {
  xCal = 1000;
}



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
    xLine += '<div class="box-reward"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0) +'</div>ระดับ<br>ผู้แข่งขัน</div>';
    xLine += '<div class="box-reward"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(2) +'</div>คะแนน<br>ประสบการณ์</div>';
    xLine += '<div class="box-reward"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'</div>เหรียญ<br>แลกรางวัล</div>';
    xLine += '<div class="clr" style="height:3px;"></div>'
    var xRatio = (parseFloat(sessionStorage.getItem("XP_Point"))/parseFloat(xCal))*100;
    xLine += '<div class="progress2" style="width:'+ xRatio +'%;"></div>';
    xLine += '<div class="clr"style="height:20px;"></div>';
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
  var xLine = "";
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
  zLine += '<div class="box-reward"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0) +'</div>ระดับ<br>ผู้แข่งขัน</div>';
  zLine += '<div class="box-reward"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(2) +'</div>คะแนน<br>ประสบการณ์</div>';
  zLine += '<div class="box-reward"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'</div>เหรียญ<br>แลกรางวัล</div>';
  zLine += '<div class="clr" style="height:3px;"></div>'
  var xRatio = (parseFloat(sessionStorage.getItem("XP_Point"))/parseFloat(xCal))*100;
  zLine += '<div class="progress2" style="width:'+ xRatio +'%;"></div>';
  zLine += '<div class="clr"style="height:30px;"></div>';
  zLine += '<div class="clr" style="height:40px;"></div></div>';
  $("#DisplayMyPoint").html(zLine);  


  xLine += '<div style="margin: -25px auto 20px auto; width: 100%; min-height:50px; max-width: 450px;">';
  xLine += '<div style="width:73%; float: left;">';
  xLine += '<div style="width:100%;"><div style="width:32%;float: left; text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
  xLine += '<div class="Profile-title" style="padding-top:5px;"><b>'+ sessionStorage.getItem("EmpName_Society") +'</b><br>LineName : '+ sessionStorage.getItem("LineName") +'<br>Phone : '+ sessionStorage.getItem("EmpPhone_Society") +'</div>';
  xLine += '</div></div>';
  xLine += '<div style="width:24%; float: left; background-color :#c0d8fc; height:50px; text-align: center; border-radius: 8px;">';
  xLine += '<div class="box-reward" style="width:100%; padding-top:4px; font-size: 10px;"><div class="XPpoint">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'</div>เหรียญรางวัล</div>';

  //xLine += '</div>';
  xLine += '</div>';
  xLine += '';
  xLine += '';
  xLine += '';
  $("#DisplayRPPoint").html(xLine);  



}



function MenuFooter() {
  var str = "";
  str += '<div class="footer-top"><div class="container">';
  str += '<div class="row"><div class="col-lg-4 col-md-6 footer-newsletter">';
  str += '<h4>พูดคุยกับทีมผู้บริหาร</h4><p>ไม่ว่าจะเป็นเรื่องที่ต้องการความช่วยเหลือ หรือการสนับสนุนจากผู้บริหาร คุณสามารถส่งเรื่องราวของคุณที่นี่</p>';
  str += '<form action="" method="post"><input type="email" name="email"><input type="submit" value="ส่งเรื่องราว">';
  str += '</form></div></div></div></div>';
  str += '<div class="container d-md-flex py-4"><div class="mr-md-auto text-center text-md-left">';
  str += '<div class="copyright">@<span>LINE Retail Society</span></div></div></div>';
  $("#DisplayFooter").html(str);  
}











function CloseMenu() {
  document.getElementById('menu').style.display='none';
}

