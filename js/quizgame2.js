var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var dateString = "";
var NewPoint = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
var sMyPoint = 0;
var sGame1 = 0;
var sGame2 = 0;
var sGame3 = 0;
var sGame4 = 0;
var SelectChoice = 0;
var EidMember = "";
var TimeCount = 0;
var SumPoint = 0;
var SumScore = 0;
var xCheck1 = 0;
var xCheck2 = 0;
var xCheck3 = 0;
var xCheck4 = 0;
var xCheck5 = 0;
var xCheck6 = 0;
var xCheck7 = 0;
var xCheck8 = 0;
var xCheck9 = 0;
var now = "";
var VDOtimer = 0;
var counter = 0;
var sVDOnumber = 0;
var timeup = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  //dbttbMember = firebase.firestore().collection("touch_member");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  SelectBoxGroup('A');
  CheckScore();
  OpenPopMenu();
});

/*
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
}
*/

function CheckScore() {
  document.getElementById('DisplayPage').style.display='block';
  document.getElementById('UserScore').style.display='none';
  var str0 = "";
  var str = "";
  var str2 = "";
  var str3 = "";
  var str4 = "";
  var str5 = "";
  var str6 = "";
  var str7 = "";
  var str8 = "";
  var str9 = "";
  dbttbMember.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidMember = doc.id;
      TimeCount = doc.data().TimeGame2;
      SumPoint = doc.data().TotalGame2;
      SumScore = doc.data().TotalScore;
      xCheck1 = parseFloat(doc.data().SubGame21);
      xCheck2 = parseFloat(doc.data().SubGame22);
      xCheck3 = parseFloat(doc.data().SubGame23);
      xCheck4 = parseFloat(doc.data().SubGame24);
      xCheck5 = parseFloat(doc.data().SubGame25);
      xCheck6 = parseFloat(doc.data().SubGame26);
      xCheck7 = parseFloat(doc.data().SubGame27);
      xCheck8 = parseFloat(doc.data().SubGame28);
      xCheck9 = parseFloat(doc.data().SubGame29);
      if(doc.data().TimeGame2==0) {
        ShowIntro();
        document.getElementById('id03').style.display='block';
      }
      var CalRatio = ((doc.data().TimeGame2/9)*100);
      $("#ShowUserSumTime1").html("<div class='font15number' style='color:#f68b1f;'>"+doc.data().TimeGame2+'</div><div class="ScoreGame4-text">จำนวนครั้ง<br>ที่ดูวิดีโอ</div>');
      $("#ShowUserSumTime2").html("<div class='font15number' style='color:#2dcc02;'>"+CalRatio.toFixed(2) +'%</div><div class="ScoreGame4-text">เปอร์เซ็นต์<br>การดูวิดีโอ</div>');
      $("#ShowUserSumTime3").html("<div class='font15number' style='color:#0056ff;'>"+doc.data().TotalGame2.toFixed(2) +'</div><div class="ScoreGame4-text">คะแนน<br>ที่ได้รับ</div>');
      str0 = '<div class="progress"><div class="bar1" style="width:'+CalRatio+'%;"></div></div>'
      $("#Bar0").html(str0);  

      if(xCheck1!=0) { $("#UserPoint1").html(xCheck1.toFixed(2)); }
      if(xCheck2!=0) { $("#UserPoint2").html(xCheck2.toFixed(2)); }
      if(xCheck3!=0) { $("#UserPoint3").html(xCheck3.toFixed(2)); }
      if(xCheck4!=0) { $("#UserPoint4").html(xCheck4.toFixed(2)); }
      if(xCheck5!=0) { $("#UserPoint5").html(xCheck5.toFixed(2)); }
      if(xCheck6!=0) { $("#UserPoint6").html(xCheck6.toFixed(2)); }
      if(xCheck7!=0) { $("#UserPoint7").html(xCheck7.toFixed(2)); }
      if(xCheck8!=0) { $("#UserPoint8").html(xCheck8.toFixed(2)); }
      if(xCheck9!=0) { $("#UserPoint9").html(xCheck9.toFixed(2)); }

      if(xCheck1!=0) {
        str = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar1").html(str);  
      document.getElementById('DisplayWait1').style.display='none';
      document.getElementById('DisplayShow1').style.display='block';
      if(xCheck2!=0) {
        str2 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str2 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar2").html(str2);  
      document.getElementById('DisplayWait2').style.display='none';
      document.getElementById('DisplayShow2').style.display='block';
      if(xCheck3!=0) {
        str3 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str3 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar3").html(str3);  
      document.getElementById('DisplayWait3').style.display='none';
      document.getElementById('DisplayShow3').style.display='block';
      if(xCheck4!=0) {
        str4 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str4 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar4").html(str4);  
      document.getElementById('DisplayWait4').style.display='none';
      document.getElementById('DisplayShow4').style.display='block';
      if(xCheck5!=0) {
        str5 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str5 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar5").html(str5);  
      document.getElementById('DisplayWait5').style.display='none';
      document.getElementById('DisplayShow5').style.display='block';
      if(xCheck6!=0) {
        str6 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str6 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar6").html(str6);  
      document.getElementById('DisplayWait6').style.display='none';
      document.getElementById('DisplayShow6').style.display='block';
      if(xCheck7!=0) {
        str7 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str7 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar7").html(str7);  
      document.getElementById('DisplayWait7').style.display='none';
      document.getElementById('DisplayShow7').style.display='block';
      if(xCheck8!=0) {
        str8 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str8 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar8").html(str8);  
      document.getElementById('DisplayWait8').style.display='none';
      document.getElementById('DisplayShow8').style.display='block';
      if(xCheck9!=0) {
        str9 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str9 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar9").html(str9);  
      document.getElementById('DisplayWait9').style.display='none';
      document.getElementById('DisplayShow9').style.display='block';
      //alert(xCheck1+"===");
    });
    document.getElementById('Loading1').style.display='none';
    document.getElementById('Show1').style.display='block';
    document.getElementById('Loading2').style.display='none';
    document.getElementById('Show2').style.display='block';
    document.getElementById('Loading3').style.display='none';
    document.getElementById('Show3').style.display='block';
  });
}


function gotoGame2(x) {
  //console.log("X==="+x);
  var str = "";
  SelectChoice = 0;
  VDOtimer = 0;
  //sMyPoint = 0;
  clearInterval(counter);
  timer(x);
  //alert(xCheck1);
  SelectChoice = x;
  sVDOnumber = x;

  if(x==1) {
    //seeVDO = 1;
    //VDOtimer = 223;
    if(xCheck1==0) {
      //VDOtimer = 225;
      //VDOtimer = 120;
      VDOtimer = 5;
      timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
      counter = setInterval(timer, 1000);
    }
    str += '<div class="text-topic">';
    str += '<div class="btn-t3" style="margin:30px auto 20px auto;">วิธีการสมัครใช้งาน ttb touch ใหม่</div>';    
    str += '<iframe id="video" class="video" src="https://www.youtube.com/embed/yjLaMMu9ZUk?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    if(xCheck1==0) { 
      str += '<div id="timer" class="timer btn-t2-red" style="margin-top:10px;"></div>';
    }
    str += '<div style="padding:15px 15px 20px 15px;">';
    str += '<div class="title-touch" style="color:#0056ff;">เริ่มต้นใช้งาน ttb touch ง่าย ๆ ได้ทุกคน</div>';
    str += '<div class="font13" style="text-align:left;">เรามาพร้อมกับฟีเจอร์ใหม่ที่ชาญฉลาด<br>และวิธีการใช้งานที่ง่ายขึ้น ครอบคลุมทุกธุรกรรม<br>ที่จะมาตอบโจทย์ชีวิตทางการเงินของลูกค้าทุกกลุ่ม</div>';               
    str += '</div></div>';
  } else if(x==2) { 
    if(xCheck2==0) { 
      //VDOtimer = 166;
      VDOtimer = 120;
      //VDOtimer = 5;
      timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
      counter = setInterval(timer, 1000);
    }
    str += '<div class="text-topic">';
    str += '<div class="btn-t3" style="margin:30px auto 20px auto;">การตั้งค่าต่าง ๆ แบบเฉพาะของคุณ</div>';    
    str += '<iframe id="video" class="video" src="https://www.youtube.com/embed/HcGl_B2LapM?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    if(xCheck2==0) { 
      str += '<div id="timer" class="timer btn-t2-red" style="margin-top:10px;"></div>';
    }
    str += '<div style="padding:15px 15px 20px 15px;">';
    str += '<div class="title-touch" style="color:#0056ff;">ttb touch ใหม่<br>รู้ว่า จะจัดการแอปอย่างไรให้เหมาะกับคุณที่สุด</div>';
    str += '<div class="font13" style="text-align:left;">ให้คุณจัดการแอปได้อย่างง่าย ๆ ด้วยตัวคุณเอง<br>การจัดการวิดเจ็ต การเปลี่ยนรหัส<br>ตั้งค่าข้อมูลส่วนตัว หรือการรีเซ็ตรหัสผ่าน</div>';               
    str += '</div></div>';
  } else if(x==3) { 
    if(xCheck3==0) {  
      //VDOtimer = 292;
      VDOtimer = 120;
      timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
      counter = setInterval(timer, 1000);
    }
    str += '<div class="text-topic">';
    str += '<div class="btn-t3" style="margin:30px auto 20px auto;">สิทธิประโยชน์ของฉัน แบบเฉพาะของคุณ</div>';    
    str +='<iframe id="video" class="video" src="https://www.youtube.com/embed/qNaFl9uUdvA?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    if(xCheck3==0) { 
      str += '<div id="timer" class="timer btn-t2-red" style="margin-top:10px;"></div>';
    }
    str += '<div style="padding:15px 15px 20px 15px;">';
    str += '<div class="title-touch" style="color:#0056ff;">ttb touch ใหม่ รู้ใจคุณมากขึ้น ลงตัวในแบบเฉพาะคุณ</div>';
    str += '<div class="font13" style="text-align:left;">สิทธิประโยชน์ที่เป้นของคุณรวมไว้ให้อยู่ที่เดียว จัดการสิทธิประโยชน์ได้อย่างง่าย ๆ</div>';               
    str += '</div></div>';


    //str += '<div class="clr"></div><div class="btn-t33" style="margin-top:25px;">สิทธิประโยชน์ แบบเฉพาะของคุณ</div>';    
    //str += '<div class="text-subtopic1" style="text-align:left;">ttb touch ใหม่ รู้ใจคุณมากขึ้น งลงตัวในแบบเฉพาะคุณ</span></div>';
    //str += '<div class="text-subtopic2" style="text-align:left;">สิทธิประโยชน์ที่เป้นของคุณรวมไว้ให้อยู่ที่เดียว จัดการสิทธิประโยชน์ได้อย่างง่าย ๆ</div>';               
    //str += '</div>';
  } else if(x==4) { 
    if(xCheck4==0) {  
      //VDOtimer = 393;
      VDOtimer = 120;
      //VDOtimer = 5;
      timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
      counter = setInterval(timer, 1000);
    }
    str += '<div class="text-topic">';
    str += '<div class="btn-t3" style="margin:30px auto 20px auto;">บริการบัญชีเงินฝาก แบบเฉพาะของคุณ</div>';    
    str +='<iframe id="video" class="video" src="https://www.youtube.com/embed/JiWSdsLO9Qo?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    if(xCheck4==0) { 
      str += '<div id="timer" class="timer btn-t2-red" style="margin-top:10px;"></div>';
    }
    str += '<div style="padding:15px 15px 20px 15px;">';
    str += '<div class="title-touch" style="color:#0056ff;">ทุกเรื่องบัญชีเงินฝาก ttb touch ใหม่</div>';
    str += '<div class="font13" style="text-align:left;">ช่วยจัดการให้เหมาะกับชีวิตคุณ จัดการบัญชีเงินฝากตามแบบคุณได้อย่างง่าย ๆ</div>';               
    str += '</div></div>';


    //str += '<div class="clr"></div><div class="btn-t33" style="margin-top:25px;">สิทธิประโยชน์ แบบเฉพาะของคุณ</div>';    
    //str += '<div class="text-subtopic1" style="text-align:left;">ทุกเรื่องบัญชีเงินฝาก ttb touch ใหม่ </span></div>';
    //str += '<div class="text-subtopic2" style="text-align:left;">ช่วยจัดการให้เหมาะกับชีวิตคุณ จัดการบัญชีเงินฝากตามแบบคุณได้อย่างง่าย ๆ</div>';               

    //str += '<div><img src="./img/DisplayItem-4.jpg" style="width:100%;"></div>';
    //str += '<div class="text-subtopic1" style="text-align:left;">ttb touch ใหม่ รู้ใจคุณมากขึ้น งลงตัวในแบบเฉพาะคุณ</span></div>';
    //str += '<div class="text-subtopic2" style="text-align:left;">สิทธิประโยชน์ที่เป้นของคุณรวมไว้ให้อยู่ที่เดียว จัดการสิทธิประโยชน์ได้อย่างง่าย ๆ</div>';               
    str += '</div>';
  } else if(x==5) { 
    if(xCheck5==0) {  
      //VDOtimer = 443;
      VDOtimer = 120;
      //VDOtimer = 70;
      timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
      counter = setInterval(timer, 1000);
    } 
    str += '<div class="text-topic">';
    str += '<div class="btn-t3" style="margin:30px auto 20px auto;">บริการบัตรเครดิต แบบเฉพาะของคุณ</div>';    
    str +='<iframe id="video" class="video" src="https://www.youtube.com/embed/UATEeiUlDXo?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    if(xCheck5==0) { 
      str += '<div id="timer" class="timer btn-t2-red" style="margin-top:10px;"></div>';
    }
    str += '<div style="padding:15px 15px 20px 15px;">';
    str += '<div class="title-touch" style="color:#0056ff;">ttb touch ใหม่ จัดการบัตรเครดิตตางใจในแบบคุณ</div>';
    str += '<div class="font13" style="text-align:left;">เปิดการใช้งาน อายัดบัตร/ออกบัตรใหม่ ปรับวงเงิน <br>ตรวจสอบรายการทำรายการแบ่งจ่าย so gooood</div>';               
    str += '</div></div>';

    //str += '<div class="clr"></div><div class="btn-t33" style="margin-top:25px;">สิทธิประโยชน์ แบบเฉพาะของคุณ</div>';    
    //str += '<div><img src="./img/DisplayItem-4.jpg" style="width:100%;"></div>';
    //str += '<div class="clr"></div><div class="text-subtopic1" style="text-align:left;">ttb touch ใหม่ จัดการบัตรเครดิตตางใจในแบบคุณ</span></div>';
    //str += '<div class="text-subtopic2" style="text-align:left;">เปิดการใช้งาน อายัดบัตร/ออกบัตรใหม่ ปรับวงเงิน <br>ตรวจสอบรายการทำรายการแบ่งจ่าย so gooood</div>';               
    //str += '</div>';
  } else if(x==6) { 
    if(xCheck6==0) {  
      //VDOtimer = 569;
      VDOtimer = 120;
      //VDOtimer = 5;
      timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
      counter = setInterval(timer, 1000);
    }
    str += '<div class="text-topic">';
    str += '<div class="btn-t3" style="margin:30px auto 20px auto;">บริการสินเชื่อรถยนต์ แบบเฉพาะของคุณ</div>';    
    str +='<iframe id="video" class="video" src="https://www.youtube.com/embed/r3eOChjGBRw?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    if(xCheck6==0) { 
      str += '<div id="timer" class="timer btn-t2-red" style="margin-top:10px;"></div>';
    }
    str += '<div style="padding:15px 15px 20px 15px;">';
    str += '<div class="title-touch" style="color:#0056ff;">จัดการสินเชื่อรถยนต์ ให้เหมาะกับชีวิตการเงินคุณ</div>';
    str += '<div class="font13" style="text-align:left;">ttb touch ใหม่ จัดการสินเชื่อรถยนต์อย่างง่าย ๆ ตามแบบคุณ</div>';               
    str += '</div></div>';

    //str += '<div class="clr"></div><div class="btn-t33" style="margin-top:25px;">บริการสินเชื่อรถยนต์ แบบเฉพาะของคุณ</div>';    
    //str += '<div class="text-subtopic1" style="text-align:left;">จัดการสินเชื่อรถยนต์ ให้เหมาะกับชีวิตการเงินคุณ</span></div>';
    //str += '<div class="text-subtopic2" style="text-align:left;">ttb touch ใหม่ จัดการสินเชื่อรถยนต์อย่างง่าย ๆ ตามแบบคุณ</div>';               
    //str += '</div>';
  } else if(x==7) { 
    if(xCheck7==0) {  
      //VDOtimer = 279;
      VDOtimer = 120;
      //VDOtimer = 5;
      timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
      counter = setInterval(timer, 1000);
    }
    str += '<div class="text-topic">';
    str += '<div class="btn-t3" style="margin:30px auto 20px auto;">บริการกองทุน แบบเฉพาะของคุณ</div>';    
    str +='<iframe id="video" class="video" src="https://www.youtube.com/embed/_mPlS174S5s?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    if(xCheck7==0) { 
      str += '<div id="timer" class="timer btn-t2-red" style="margin-top:10px;"></div>';
    }
    str += '<div style="padding:15px 15px 20px 15px;">';
    str += '<div class="title-touch" style="color:#0056ff;">ลงทุนอย่างไร ให้เหมาะกับชีวิตคุณ</div>';
    str += '<div class="font13" style="text-align:left;">ttb touch ใหม่ช่วยให้การลงทุนของคุณง่ายขึ้น พร้อมกับการบริหารและจัดการกองทุนด้ายตัวคุณเอง</div>';               
    str += '</div></div>';

    //str += '<div class="clr"></div><div class="btn-t33" style="margin-top:25px;">บริการกองทุน แบบเฉพาะของคุณ</div>';    
    //str += '<div class="text-subtopic1" style="text-align:left;">ลงทุนอย่างไร ให้เหมาะกับชีวิตคุณ</span></div>';
    //str += '<div class="text-subtopic2" style="text-align:left;">ttb touch ใหม่ช่วยให้การลงทุนของคุณง่ายขึ้น พร้อมกับการบริหารและจัดการกองทุนด้ายตัวคุณเอง</div>';               
    //str += '</div>';
  } else if(x==8) { 
    if(xCheck8==0) {  
      //VDOtimer = 139;
      VDOtimer = 120;
      //VDOtimer = 5;
      timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
      counter = setInterval(timer, 1000);
    }
    str += '<div class="text-topic">';
    str += '<div class="btn-t3" style="margin:30px auto 20px auto;">บริการประกัน แบบเฉพาะของคุณ</div>';    
    str +='<iframe id="video" class="video" src="https://www.youtube.com/embed/mqGF-B8zPmY?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    if(xCheck8==0) { 
      str += '<div id="timer" class="timer btn-t2-red" style="margin-top:10px;"></div>';
    }
    str += '<div style="padding:15px 15px 20px 15px;">';
    str += '<div class="title-touch" style="color:#0056ff;">ttb touch ใหม่ รู้ทุกกรมธรรม์ที่คุณมี</div>';
    str += '<div class="font13" style="text-align:left;">พร้อมเตรียมความคุ้มครองที่เหมาะสมที่สุด จัดสรรทุกการคุ้มครองของคุณอย่างง่าย ๆ</div>';               
    str += '</div></div>';

    //str += '<div class="clr"></div><div class="btn-t33" style="margin-top:25px;">บริการประกัน แบบเฉพาะของคุณ</div>';    
    //str += '<div class="text-subtopic1" style="text-align:left;">ttb touch ใหม่ รู้ทุกกรมธรรม์ที่คุณมี</span></div>';
    //str += '<div class="text-subtopic2" style="text-align:left;">พร้อมเตรียมความคุ้มครองที่เหมาะสมที่สุด จัดสรรทุกการคุ้มครองของคุณอย่างง่าย ๆ</div>';               
    //str += '</div>';
  } else if(x==9) { 
    if(xCheck9==0) {  
      //VDOtimer = 214;
      VDOtimer = 120;
      //VDOtimer = 5;
      timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
      counter = setInterval(timer, 1000);
    }
    str += '<div class="text-topic">';
    str += '<div class="btn-t3" style="margin:30px auto 20px auto;">บริการสินเชื่อ แบบเฉพาะของคุณ</div>';    
    str +='<iframe id="video" class="video" src="https://www.youtube.com/embed/wZkMODxJYWg?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    if(xCheck9==0) { 
      str += '<div id="timer" class="timer btn-t2-red" style="margin-top:10px;"></div>';
    }
    str += '<div style="padding:15px 15px 20px 15px;">';
    str += '<div class="title-touch" style="color:#0056ff;">จะกู้ จะผ่อนสินเชื่อย่างไร ให้เข้ากับชีวิตคุณ</div>';
    str += '<div class="font13" style="text-align:left;">ttb touch จัดการสินเชื่อให้เหมาะสมกับคุณได้อย่างง่ายๆ กับการสมัครสินเชื่อออนไลน์ ชำระสินเชื่อตรวจสอบประวัติ การชำระสินเชื่อ หรือการสมัคร E-Statement</div>';               
    str += '</div></div>';

    //str += '<div class="clr"></div><div class="btn-t33" style="margin-top:25px;">บริการสินเชื่อ แบบเฉพาะของคุณ</div>';    
    //str += '<div class="text-subtopic1" style="text-align:left;">จะกู้ จะผ่อนสินเชื่อย่างไร ให้เข้ากับชีวิตคุณ</span></div>';
    //str += '<div class="text-subtopic2" style="text-align:left;">ttb touch จัดการสินเชื่อให้เหมาะสมกับคุณได้อย่างง่ายๆ<br>กับการสมัครสินเชื่อออนไลน์ ชำระสินเชื่อตรวจสอบประวัติ<br>การชำระสินเชื่อ หรือการสมัคร E-Statement</div>';               
    //str += '</div>';
  }

  if(sVDOnumber!=0 && VDOtimer!=0) {
     str += '<div class="clr"></div><center>';
     //str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว</div>';
     str += '<div class="btn-t2-ok" onclick="CloseAll()" style="margin-top:15px;">ยังไม่ดูตอนนี้</div>';
     str += '<div style="padding:10px;font-size:12px;color:#f68b1f; font-weight: 600;">ระบบจะไปที่หน้าสุ่มรางวัลเมื่อเวลานับถอยหลังสิ้นสุดลง</div>';
     str += '</center><div class="clr" style="height:10px;"></div>';
  } else {
     str += '<div class="clr"></div>';
     str += '<center><div class="btn-t2 stop-video" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</div></center><div class="clr" style="height:10px;"></div>';
  }
    $("#DisplayVDOLearning").html(str);  
    document.getElementById('id01').style.display='block';
}


function BeForRandom(x) {
    var i = 0;
    var str = "";
    var str1 = "";
    for (i = 0; i < 15; i++) {
     str1 += '<div class="box-number" id="'+i+'" onclick="SelectBox('+i+')">'+NewPoint[i].toFixed(2)+'</div>';
    }
    str += '<div class="random-number"><img src="./img/number.gif" width="100%"></div>';    
    str += '<div class="btn-t3" style="margin-top:20px auto;">ระบบสุ่มเหรียญรางวัล</div>';
    str += '<div class="font13" style="color:#f68b1f;text-align:center; margin:10px auto;"><b>เพื่อให้คุณได้สนุกกับการลุ้นเหรียญรางวัล<br>คุณคิดว่าคุณจะสุ่มได้เหรียญรางวัลเท่าไร?</b></div>';
    //str += '<div style="font-size:16px;color:#fff;"><input id="MyPointSelect" type="number" placeholder="ทายเหรียญซิ" pattern="[+-]?[0-9]" style="background:#f68b1f;color:#fff;text-align:center;border-radius:5px;min-height:30px;padding:5px;"></div>';
    str += '<div style="width:92%; margin:10px auto 10px auto;">'+ str1 +'</div><div class="clr"></div>';
    str += '<div class="text-subtopic3" style="margin-top:10px;"><b>ทายถูกรับเหรียญรางวัล คูณ 2</b></div>';
    str += '<div class="btn-t2 disabledbutton" id="SubmitApp" onclick="RandomPoint('+x+')" style="margin-top:15px;">คลิกสุ่มเหรียญรางวัล</div><div style="height:30px;"></div>';
    $("#DisplayGetPoint").html(str);
    //document.getElementById('id01').style.display='none';
    //document.getElementById('id02').style.display='block';
}



function SelectBox(x) {
   sMyPoint = 0;
   var i = 0;
   for (i = 0; i < 15; i++) {
      document.getElementById(i).classList.remove('box-novi');
   }    
   sMyPoint = NewPoint[x].toFixed(2);
   document.getElementById(x).classList.add('box-novi');
   $('#SubmitApp').removeClass('disabledbutton');
}



function RandomPoint(x) {
  str = "";
  var sNewMyPoint = 0;
  NewScore = 0;
  ChangeNow();
  if(sMyPoint==NewScore) { sNewMyPoint=(NewScore*2); }
  else if(sMyPoint!=NewScore) { sNewMyPoint=NewScore; }
  SaveDataFWB(SelectChoice,sNewMyPoint);
  str += '<div class="random-number"><img src="./img/number.gif" width="100%"></div>';    
  str += '<div class="btn-t33" style="margin-top:15px;">ผลการสุ่มเหรียญรางวัล</div>';
  str += '<div style="width:230px; margin:auto;">';
  str += '<div class="random-box" style="margin-right: 10px;">คุณได้ทายเหรียญ<br>ที่จะได้ไว้ที่';
  str += '<div class="get-number">'+sMyPoint+'</div></div>';
  str += '<div class="random-box">เหรียญรางวัล<br>ที่ระบบสุ่มได้<div class="get-number">'+NewScore.toFixed(2)+'</div></div>';
  str += '</div><div class="clr"></div>';
  str += '<div class="random-box1">เหรียญรางวัล<br>ที่ได้รับ<div class="get-number">'+sNewMyPoint.toFixed(2)+'</div></div>';
  str += '<div class="clr"></div>';
  str += '<div class="btn-t2" onclick="CloseAll()">ปิดหน้าต่างนี้</div>';
  str += '<div style="height: 30px;"></div>';
  //alert("XP="+sessionStorage.getItem("XP")+"\nRP="+sessionStorage.getItem("RP"));
  $("#DisplayGetPoint").html(str);  
}



function SaveDataFWB(x,p) {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  CheckScore();
  console.log(SelectChoice,p);
  //console.log(EidMember);
  //console.log(x+"==="+p+"==="+EidMember);
  var xHeader = "";
  TimeCount = parseFloat(TimeCount)+1;
  SumPoint = parseFloat(SumPoint)+parseFloat(p);
  SumScore = parseFloat(SumScore)+parseFloat(p);
/*
  if(SelectChoice==2 && xCheck2==0) {
   dbttbMember.doc(EidMember).update({
     SubGame22 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  }
*/
  if(SelectChoice==1 && xCheck1==0) {
   xHeader = "วิธีการสมัครใช้งาน ttb touch ใหม่";
   dbttbMember.doc(EidMember).update({
     SubGame21 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(SelectChoice==2 && xCheck2==0) {
   xHeader = "การตั้งค่าต่าง ๆ แบบเฉพาะของคุณ";
   dbttbMember.doc(EidMember).update({
     SubGame22 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(SelectChoice==3 && xCheck3==0) {
   xHeader = "สิทธิประโยชน์ของฉัน แบบเฉพาะของคุณ";
   dbttbMember.doc(EidMember).update({
     SubGame23 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(SelectChoice==4 && xCheck4==0) {
   xHeader = "บริการบัญชีเงินฝาก แบบเฉพาะของคุณ";
   dbttbMember.doc(EidMember).update({
     SubGame24 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(SelectChoice==5 && xCheck5==0) {
   xHeader = "บริการบัตรเครดิต แบบเฉพาะของคุณ";
   dbttbMember.doc(EidMember).update({
     SubGame25 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(SelectChoice==6 && xCheck6==0) {
   xHeader = "บริการสินเชื่อรถยนต์ แบบเฉพาะของคุณ";
   dbttbMember.doc(EidMember).update({
     SubGame26 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(SelectChoice==7 && xCheck7==0) {
   xHeader = "บริการกองทุน แบบเฉพาะของคุณ";
   dbttbMember.doc(EidMember).update({
     SubGame27 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(SelectChoice==8 && xCheck8==0) {
   xHeader = "บริการประกัน แบบเฉพาะของคุณ";
   dbttbMember.doc(EidMember).update({
     SubGame28 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(SelectChoice==9 && xCheck9==0) {
   xHeader = "บริการสินเชื่อ แบบเฉพาะของคุณ";
   dbttbMember.doc(EidMember).update({
     SubGame29 : p,
     TimeGame2 : TimeCount,
     TotalGame2 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });     
  }
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(p));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(p));
  dbttbMember.doc(EidMember).update({
    LastUpdate : dateString,
    XP_Point : sessionStorage.getItem("XP_Point"),
    RP_Point : sessionStorage.getItem("RP_Point")
  });
  dbttbnewsLog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Society"),
    EmpName : sessionStorage.getItem("EmpName_Society"),
    RefID : EidMember,
    NewsGroup : "QuizGame",
    HeadNews : "QuizGame-2",
    SubNews : xHeader,
    GetPoint : parseFloat(p),
    LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
  alert("Save Done");
  CheckScore();
  OpenPopMenu();
}



function ChangeNow(x) {
 NewScore = random_item(NewPoint);
}


function random_item(items) {
 return items[Math.floor(Math.random()*items.length)];   
}


function UnLoading(x) {
  SelectBoxGroup(x);
  document.getElementById('DisplayWait1').style.display='block';
  document.getElementById('DisplayWait2').style.display='block';
  document.getElementById('DisplayWait3').style.display='block';
  document.getElementById('DisplayWait4').style.display='block';
  document.getElementById('DisplayWait5').style.display='block';
  document.getElementById('DisplayWait6').style.display='block';
  document.getElementById('DisplayWait7').style.display='block';
  document.getElementById('DisplayWait8').style.display='block';
  document.getElementById('DisplayWait9').style.display='block';
  document.getElementById('DisplayShow1').style.display='none';
  document.getElementById('DisplayShow2').style.display='none';
  document.getElementById('DisplayShow3').style.display='none';
  document.getElementById('DisplayShow4').style.display='none';
  document.getElementById('DisplayShow5').style.display='none';
  document.getElementById('DisplayShow6').style.display='none';
  document.getElementById('DisplayShow7').style.display='none';
  document.getElementById('DisplayShow8').style.display='none';
  document.getElementById('DisplayShow9').style.display='none';
  document.getElementById('UserBoard').style.display='none';
  CheckScore();
}


function LeaderBoard(x) {
  SelectBoxGroup(x);
  document.getElementById('DisplayPage').style.display='none';
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  document.getElementById('UserBoard').style.display='none';
  var i = 1;
  var str = "";
  str += '<table class="table" style="width:95%;"><tbody>';
  dbttbMember.orderBy('TotalGame2','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:15%;text-align:center;">'+i+'</td>';
      str += '<td class="td-padding" style="width:70%;"><font color="#0056ff">'+doc.data().EmpName+'</font> <font color="#000">(แข่ง '+doc.data().TimeGame2+' ครั้ง)</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+(doc.data().TotalGame2).toFixed(2)+'</b></font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#UserScore0").html(str);  
    document.getElementById('LoadingScore').style.display='none';
    document.getElementById('UserScore').style.display='block';
  });
}

function UserBoard(x) {
  SelectBoxGroup(x);
  document.getElementById('DisplayPage').style.display='none';
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  document.getElementById('UserBoard').style.display='none';
  var i = 1;
  var str = "";
  str += '<table class="table" style="width:95%;"><tbody>';
  dbttbMember.orderBy('TotalGame2','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:15%;text-align:center;">'+i+'</td>';
      str += '<td class="td-padding" style="width:70%;"><font color="#0056ff">'+doc.data().EmpName+'</font> <font color="#000">(แข่ง '+doc.data().TimeGame2+' ครั้ง)</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+(doc.data().TotalGame2).toFixed(2)+'</b></font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#UserScore0").html(str);  
    document.getElementById('LoadingScore').style.display='none';
    document.getElementById('UserBoard').style.display='block';
  });
}

function ShowIntro() {
  var str = "";
  str += '<div class="btn-t33">แนะนำ ภารกิจที่ 1</div>';
  str += '<div><img src="./img/cognition-online-final.gif" style="width:100%;"></div>';
  str += '<div class="btn-t2" onclick="CloseAll_intro()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
  str += '<div class="clr" style="height:30px;"></div>';
  $("#DisplayIntro").html(str);  
  document.getElementById('id03').style.display='block';
}


function SelectBoxGroup(x) {
  var xx = "";
  if(x=="A") {
    xx = 'a1';
  } else if(x=="B") { 
    xx = 'a2';
  } else if(x=="C") { 
    xx = 'a3';
  }
  var i = 1;
  for (i = 1; i < 4; i++) {
    document.getElementById('a'+i).classList.remove('btn-t22a');
  }   
  if(x!="") {
    xClickMenu = x;
    document.getElementById(xx).classList.add('btn-t22a');
  }
}


function CloseAll() {
  CheckScore();
  clearInterval(counter);
  //player.stopVideo();
  var stopVideo = function(player) {
    var vidSrc = player.prop('src').replace('autoplay=1','autoplay=0');
    player.prop('src', vidSrc);
  };
  stopVideo($('#video'));
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}


function CloseAll_intro() {
  document.getElementById('id03').style.display='none';
}


function timer(x) {
 now = new Date();
 count = Math.round((timeup - now)/1000);
 //console.log(now+"==="+count+"==="+timeup+"==="+x);
 if (now > timeup) {
     window.location = "#"; //or somethin'
     $("#timer").html("<font color='#ffff00'>ขอบคุณสำหรับการชมวิดิโอนี้</font>");
     clearInterval(counter);
     if(timeup!=0 && VDOtimer!=0) {
      var stopVideo = function(player) {
        var vidSrc = player.prop('src').replace('autoplay=1','autoplay=0');
        player.prop('src', vidSrc);
      };
      stopVideo($('#video'));
      BeForRandom(x);
      document.getElementById('id01').style.display='none';
      document.getElementById('id02').style.display='block';
     }
     return;
 }
 var seconds = Math.floor((count%60));
 var minutes = Math.floor((count/60) % 60);
 if(seconds<10) { seconds="0"+seconds } 
 $("#timer").html("เหลือเวลาอีก <font color='#ffff00'>&nbsp;" + minutes + " นาที " + seconds + " วินาที</font>");
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


function CloseAll1() {
  document.getElementById('id03').style.display='none';
}
