var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  //dbttbRedeemRewards = firebase.firestore().collection("ttbRedeemRewards");
  //dbttbGiftRewards = firebase.firestore().collection("ttbGiftRewards");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbGameRock = firebase.firestore().collection("ttbGameRock");
  dbttbGameLucky = firebase.firestore().collection("ttbGameLucky");
  dbttbGameQuestion = firebase.firestore().collection("ttbGameQuestion");
  dbttbGamePicture = firebase.firestore().collection("ttbGameImage");
  //MyPoint();
  //OpenGameZone();
  //RedeemRewards();
  //GiftRewards();
  CheckGameLucky();
  CheckGameRock();
  CheckGameQuestion();
  CheckGamePicture();
  OpenPopMenu();
});


function GotoGame(x) {
  if(x==1) {
    location.href = "intro-game1.html";
  } else if(x==2) { 
    location.href = "intro-game2.html";
  } else if(x==3) { 
    location.href = "intro-game3.html";
  } else if(x==4) { 
    location.href = "intro-game4.html";
  } else if(x==5) { 
    location.href = "intro-game5.html";
  }
}


function CheckGameLucky() {
  var game1 = "";
  var sCheckQ = 0;
  dbttbGameLucky.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game1 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game1 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame1").html(game1);  
  });
}


function CheckGameQuestion() {
  var game3 = "";
  var sCheckQ = 0;
  dbttbGameQuestion.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game3 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game3 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame3").html(game3);  
  });
}


function CheckGamePicture() {
  var game2 = "";
  var sCheckQ = 0;
  dbttbGamePicture.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game2 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game2 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame4").html(game2);  
  });
}


function CheckGameRock() {
  var game5 = "";
  var sCheckQ = 0;
  dbttbGameRock.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game5 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game5 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame5").html(game5);  
  });
}
