var cleararray = "";


$(document).ready(function () {
    //if(sessionStorage.getItem("LINERetailSociety")==null) { location.href = "index.html"; }
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
  CheckData();
}

function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = doc.data().statusconfirm;
      EidProfile = doc.id;
      sDateRegister = doc.data().DateRegister;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
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
  });
}


function MenuSlide() {
  var str = "";
  str += '<div class="carousel-inner" role="listbox">';
  str += '<div class="carousel-item active" style="background-image: url(assets/img/slide/slide-1.jpg);">';
  str += '<div class="carousel-container"><div class="carousel-content animate__animated animate__fadeInUp">';
  str += '<h2>งานวิ่งที่จะเปลี่ยน...<span><br>ให้น้อง ๆ มีรอยยิ้มได้อีกครั้ง</span></h2>';
  str += '<p>รายได้จากงานวิ่งและเงินบริจาค ไม่หักค่าใช้จ่ายใด ๆ นำไปช่วยเหลือน้อง ๆ';
  str += 'จากมูลนิธิโรงพยาบาลเด็ก มูลนิธิเด็กอ่อนในสลัม และมูลนิธิทีทีบี';
  str += 'ค่าบัตรวิ่ง และเงินบริจาคสามารถนำไปลดหย่อนภาษีได้</p>';
  str += '<div class="text-center"><a href="" class="btn-get-started">อ่านข่าวนี้</a></div></div></div></div>';

  str += '<div class="carousel-item" style="background-image: url(assets/img/slide/slide-2.jpg);">';
  str += '<div class="carousel-container"><div class="carousel-content animate__animated animate__fadeInUp">';
  str += '<h2>ฮาวทูปรับตัวสู่การทำงานแบบ Agile ในยุคดิจิทัล ให้ดีต่อใจ</h2>';
  str += '<p>รูปแบบการทำงานทุกวันนี้มีการเปลี่ยนแปลง และปรับใหม่ตามยุคดิจิทัลและ New Normal อยู่ตลอดเวลา เช่น การ Work from Home, Remote Working, Hybrid Working เป็นต้น การทำงานแบบเดิม ๆ อาจไม่ตอบโจทย์ เนื่องจากใช้เวลา และกว่าจะเห็นผลลัพธ์อาจใช้เวลานานพอสมควร ซึ่งในขณะเดียวกันต้องการความรวดเร็ว ยืดหยุ่น และใช้งานได้จริงในแต่ละวัน การทำงานแบบ Agile จึงถูกนำมาเป็นโครงสร้างในยุคดิจิทัล และเป็นเทรนด์การทำงานในปี 2022 ที่เราต้องปรับตัวมากขึ้น</p>';
  str += '<div class="text-center"><a href="" class="btn-get-started">อ่านข่าวนี้</a></div>';
  str += '</div></div></div>';

  str += '<div class="carousel-item" style="background-image: url(assets/img/slide/slide-3.jpg);">';
  str += '<div class="carousel-container"><div class="carousel-content animate__animated animate__fadeInUp">';
  str += '<h2>อ่านที่เดียวจบ ครบ เรื่องรายการลดหย่อนภาษีปี 2565 มีอะไรบ้าง ?</h2>';
  str += '<p>สำหรับมนุษย์เงินเดือนที่มีรายได้ถึงเกณฑ์ที่ต้องยื่นภาษีเงินได้บุคคลธรรมดา หากไม่วางแผนภาษีตั้งแต่เนิ่น ๆ อาจจะทำให้ต้องเสียภาษีตามฐานภาษี 5% - 35% เลยก็ได้ แต่ถ้าเรามีการวางแผนภาษีที่ดีอย่างการคำนวณดูว่าในปีนี้เราต้องเสียภาษีเท่าไหร่ แล้วหาตัวช่วยลดหย่อนภาษีเตรียมไว้ อาจจะทำให้เราประหยัดภาษีได้หลักหมื่น หรือหลักแสนเลยก็ว่าได้</p>';
  str += '<div class="text-center"><a href="" class="btn-get-started">อ่านข่าวนี้</a></div>';
  str += '</div></div></div>';
  str += '</div>';
/*
  str += '<a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">';
  str += '<span class="carousel-control-prev-icon icofont-simple-left" aria-hidden="true"></span>';
  str += '<span class="sr-only">Previous</span></a>';
  str += '<a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">';
  str += '<span class="carousel-control-next-icon icofont-simple-right" aria-hidden="true"></span>';
  str += '<span class="sr-only">Next</span></a>';
  str += '<ol class="carousel-indicators" id="hero-carousel-indicators"></ol>';
*/











  $("#DisplaySlide").html(str);
  //document.getElementById('loading').style.display='none';
}