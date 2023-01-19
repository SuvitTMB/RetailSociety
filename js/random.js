var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var idRoomWebboard = "";
var xidRoomWebboard = "";
var MaxTime = 0;
var qInterval;
var i = 0;
var str = '';
var randomDegree = 0;
var xGroupGift = 0;
var idCodeGift = "";
var xgiftstock = 0;
var xgiftstatus = 0;
var xgiftname = "";
var xgiftimg = "";
var EidMember = "";
var xRP_Point = 0;
var EidMember = "";
var xRP_Point = 0;
var xgiftredeem = 0;
var xgiftall = 0;

$(document).ready(function () {
  if(sessionStorage.getItem("RandomWheel")==null) { location.href = "catalog.html"; }
  Connect_DB();
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGiftRandom = firebase.firestore().collection("ttbGiftRandom");
  dbGiftRewards = firebase.firestore().collection("ttbGiftRewards");
  OpenPopMenu();
  ShowRewards();
});


const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
];
const data = [16, 16, 16, 16, 16, 16];
var pieColors = [
  "#0056ff",
  "#f68b1f",
  "#0056ff",
  "#f68b1f",
  "#0056ff",
  "#f68b1f",
];
let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
const valueGenerator = (angleValue) => {
  var str = "";
  var str0 = "";
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      //finalValue.innerHTML = `<p style="text-align: center;">หมายเลขที่สุ่มได้ : ${i.value}</p>`;
      var varTimerInMiliseconds = 2000;
      setTimeout(function(){ 
        sessionStorage.removeItem("RandomWheel");
        document.getElementById('ShowWheel').style.display='none';
        document.getElementById('final-value').style.display='none';
        document.getElementById('ShowWheel1').style.display='block';
        switch(parseFloat(xGroupGift)) {
          case 1:
            str += '<div class="btn-t3" style="margin-top:15px; background-color:#fff;">คุณได้รับรางวัล</div>';
            str += '<div style="margin:12px auto; background-color:#fff;"><center><img src="./rewards/'+ xgiftimg +'" style="position: relative; width:80%;right: 0%;"></center></div>';
            str += '<div class="font13" style="text-align:center; color:#f68b1f; font-weight: 600;">รางวัล : '+ xgiftname +'</div>';
            str += '<div class="font13" style="margin-top:15px; text-align:center;">คุณสามารถตรวจสอบได้ที่เมนู รางวัลของคุณ</div>';
            str0 += '<div class="font13" style="margin-top:15px;text-align: center;">ยินดีด้วย ... คุณได้รับรางวัล<br><b>'+ xgiftname +'</b><br>หากคุณอยู่สาขาเราจะจัดส่งของรางวัลไปให้</div>';
            break;
          case 2:
            str += '<div class="btn-t3" style="margin-top:15px; background-color:#fff;">คุณได้รับรางวัล</div>';
            str += '<div style="margin:12px auto; background-color:#fff;"><center><img src="./rewards/'+ xgiftimg +'" style="position: relative; width:80%;right: 0%;"></center></div>';
            str += '<div class="font13" style="text-align:center; color:#f68b1f; font-weight: 600;">รางวัล : '+ xgiftname +'</div>';
            str += '<div class="font13" style="margin-top:15px; text-align:center;">คุณสามารถตรวจสอบได้ที่เมนู รางวัลของคุณ</div>';
            str0 += '<div class="font13" style="margin-top:15px;text-align: center;">ยินดีด้วย ... คุณได้รับรางวัล<br><b>'+ xgiftname +'</b><br>หากคุณอยู่สาขาเราจะจัดส่งของรางวัลไปให้</div>';
            break;
          case 3:
            str += '<div class="btn-t3" style="margin-top:15px; background-color:#fff;">คุณได้รับรางวัล</div>';
            str += '<div style="margin:12px auto; background-color:#fff;"><center><img src="./rewards/'+ xgiftimg +'" style="position: relative; width:80%;right: 0%;"></center></div>';
            str += '<div class="font13" style="text-align:center; color:#f68b1f; font-weight: 600;">รางวัล : '+ xgiftname +'</div>';
            str += '<div class="font13" style="margin-top:15px; text-align:center;">คุณสามารถตรวจสอบได้ที่เมนู รางวัลของคุณ</div>';
            str0 += '<div class="font13" style="margin-top:15px;text-align: center;">ยินดีด้วย ... คุณได้รับรางวัล<br><b>'+ xgiftname +'</b><br>เราจะทำการโอน WOW ให้คุณในเดือนถัดไปน้า</div>';
            break;
          case 4:
            str += '<div class="btn-t3" style="margin-top:15px; background-color:#fff;">คุณได้รับรางวัล</div>';
            str += '<div style="margin:12px auto; background-color:#fff;"><center><img src="./rewards/'+ xgiftimg +'" style="position: relative; width:80%;right: 0%;"></center></div>';
            str += '<div class="font13" style="text-align:center; color:#f68b1f; font-weight: 600;">รางวัล : '+ xgiftname +'</div>';
            str += '<div class="font13" style="margin-top:15px; text-align:center;">คุณสามารถตรวจสอบได้ที่เมนู รางวัลของคุณ</div>';
            str0 += '<div class="font13" style="margin-top:15px;text-align: center;">ยินดีด้วย ... คุณได้รับรางวัล<br><b>'+ xgiftname +'</b><br>เราจะทำการโอน WOW ให้คุณในเดือนถัดไปน้า</div>';
            break;
          case 5:
            CheckMember();
            break;
          case 6:
            str += '<div class="btn-t3" style="margin-top:15px; background-color: #fff;">คุณไม่ได้รับรางวัล</div>';
            str += '<div><img src="./img/'+ xgiftimg +'" style="position: relative; width:80%; margin-top:12px;"></div>';
            str += '<div class="font13" style="margin-top:15px; text-align:center;">เสียใจด้วยน้า ... <br>วันนี้คุณยังไม่ได้รับรางวัลจากเรา<br>ไปหาเหรียญมาเล่นใหม่น้า</div>';
            str0 += '<div class="font13" style="margin-top:15px;text-align: center;">เสียใจด้วยน้า ...<br><b>วันนี้คุณยังไม่ได้รับรางวัล</b><br>ไปหาเหรียญรางวัลแล้วกลับมาเล่นใหม่น้า</div>';
            break;
          default:
            str += '<div class="btn-t3" style="margin-top:15px; background-color: #fff;">คุณไม่ได้รับรางวัล</div>';
            str += '<div><img src="./img/sosad.gif" style="position: relative; width:80%; margin-top:12px;"></div>';
            str += '<div class="font13" style="margin-top:15px; text-align:center;">เสียใจด้วยน้า ... <br>วันนี้คุณยังไม่ได้รับรางวัลจากเรา<br>ไปหาเหรียญมาเล่นใหม่น้า</div>';
            str0 += '<div class="font13" style="margin-top:15px;text-align: center;">เสียใจด้วยน้า ...<br><b>วันนี้คุณยังไม่ได้รับรางวัล</b><br>ไปหาเหรียญรางวัลแล้วกลับมาเล่นใหม่น้า</div>';
        }
        if(parseFloat(xGroupGift)!=5) {
          console.log("GroupGift="+xGroupGift);
          str += '<div class="clr"></div><div class="btn-t2" onclick="GotoRewards()" style="margin-top:20px; position:relate;">รางวัลของคุณ</div>';
          str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px; position:relate;">ปิดหน้าต่าง</div>';
          $("#DisplayGift").html(str);
          $("#DisplayGiftRewards").html(str0);
          document.getElementById('id01').style.display='block';
        }
      }, varTimerInMiliseconds);
      spinBtn.disabled = false;
      OpenPopMenu();
      break;
    }
  }
};


let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  RandomRewards();
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p style="text-align: center;">Good Luck!</p>`;
  //let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  console.log("random-"+randomDegree);
  //let randomDegree = 5;
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 331) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});



function CheckMember() {
  var str1 = "";
  var str2 = "";
  dbttbMember.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidMember = doc.id; 
      xRP_Point = doc.data().RP_Point;
    });
    str1 += '<div class="btn-t3" style="margin-top:15px; background-color:#fff;">คุณได้รับรางวัล</div>';
    //str1 += '<div style="margin:12px auto; background-color:#fff;"><center><img src="./rewards/'+ xgiftimg +'" style="position: relative; width:80%;right: 0%;"></center></div>';
    str1 += '<div style="margin:12px auto; background-color:#fff; border-radius:15px;"><center><img src="./img/coin-10.png" style="position: relative; width:80%;right: 0%;"></center></div>';
    str1 += '<div class="font13" style="text-align:center; color:#f68b1f; font-weight: 600;">รางวัล : '+ xgiftname +'</div>';
    str1 += '<div class="clr"></div><div class="btn-t2" onclick="GotoRewards()" style="margin-top:15px;">รางวัลของคุณ</div>';
    str1 += '<div class="font13" style="margin-top:15px; text-align:center;">คุณสามารถตรวจสอบได้ที่เมนู <b>"รางวัลของคุณ"</b></div>';
    console.log(EidMember+"==="+xRP_Point);
    sessionStorage.setItem("RP_Point", parseFloat(xRP_Point)+10);
    dbttbMember.doc(EidMember).update({
      RP_Point : parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2)
    });
    console.log(parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2));
    str1 += '<div class="clr"></div><div class="btn-t2" onclick="CloseAll()" style="margin-top:20px; position:relate; ">ปิดหน้าต่างนี้</div>';
    str2 += '<div class="font13" style="margin-top:15px;text-align: center;">ยินดีด้วย ... คุณได้รับรางวัล<br><b>'+ xgiftname +'</b><br>เราโอนคะแนนให้คุณเรียบร้อยแล้วน้า</div>';
    $("#DisplayGift").html(str1);
    $("#DisplayGiftRewards").html(str2);
    document.getElementById('id01').style.display='block';
    OpenPopMenu();
  });
}


function GetCodeGift(codegift) { 
  dbGiftRandom.where('giftcode','==',codegift)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      idCodeGift = doc.id;
      xgiftstock = doc.data().giftstock;
      xgiftstatus = doc.data().giftstatus;
      xgiftname = doc.data().giftname;
      xgiftimg = doc.data().giftimg;
      xgiftredeem = doc.data().giftredeem;
      //xgiftall = console.log(xgiftall) + console.log(doc.data().giftstock); 
      GetCodeRandom(NewRewards[0],NewRewards[1]);
    });
  });  
}


var ArrRewards = [];
var NewRewards = "";
function RandomRewards() { 
  dbGiftRewards.where('LineID','==','')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      ArrRewards.push([doc.id, doc.data().giftcode]);
    });
    NewRewards = random_item(ArrRewards);
    GetCodeGift(NewRewards[1]);
  });  
}

var xResultQuiz = "";
function GetCodeRandom(x,y) {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  randomDegree = 0;
  switch(y) {
    case "gift-01":
      randomDegree = 85;
      xGroupGift = 1;
      xResultQuiz = "";
      break;
    case "gift-02":
      randomDegree = 17;
      xGroupGift = 2;
      break;
    case "gift-03":
      randomDegree = 326;
      xGroupGift = 3;
      break;
    case "gift-04":
      randomDegree = 265;
      xGroupGift = 4;
      break;
    case "gift-05":
      randomDegree = 207;
      xGroupGift = 5;
      break;
    case "gift-06":
      randomDegree = 139;
      xGroupGift = 6;
      break;
    default:
      randomDegree = 139;
  }
  if(randomDegree!=0) {
    //console.log("ID="+idCodeGift);
    var CheckStock = parseFloat(xgiftstock)-1;
    if(CheckStock!=0) {
      dbGiftRandom.doc(idCodeGift).update({
        giftredeem : parseFloat(xgiftredeem) + 1,
        giftstock : parseFloat(CheckStock)
      });
    } else {
      dbGiftRandom.doc(idCodeGift).update({
        giftstock : 0,
        giftstatus : 0
      });
    }
    if(y=='gift-05') {
      dbGiftRewards.doc(x).update({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        EmpID : sessionStorage.getItem("EmpID_Society"),
        EmpName : sessionStorage.getItem("EmpName_Society"),
        DateRegister : dateString,
        RefID : x,
        StatusSend : 2,
        Phone : sessionStorage.getItem("EmpPhone_Society"),
        address : sessionStorage.getItem("EmpAddress_Society"),
        TimeStampDate : TimeStampDate,
        ResultQuiz : 'Random'
      });
    } else {
      dbGiftRewards.doc(x).update({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        EmpID : sessionStorage.getItem("EmpID_Society"),
        EmpName : sessionStorage.getItem("EmpName_Society"),
        DateRegister : dateString,
        RefID : x,
        Phone : sessionStorage.getItem("EmpPhone_Society"),
        address : sessionStorage.getItem("EmpAddress_Society"),
        TimeStampDate : TimeStampDate,
        ResultQuiz : 'Random'
      });
    }
    ShowRewards();
  }
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function ShowRewards() {
  xgiftall = 0;
  var i = 1;
  var str = "";
  str += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str += '<th scope="col">No</th><th scope="col">รายละเอียด</th><th scope="col">คงเหลือ</th></tr></thead><tbody>';
  dbGiftRandom
  //.where('RewardsStatus','==',0)
  .orderBy('giftranking','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xgiftall = parseFloat(xgiftall) + parseFloat(doc.data().giftstock); 
      str += '<tr><th scope="row" style="text-align: center;">'+ i +'</th>';
      str += '<td>'+ doc.data().giftname +' ('+ doc.data().gifttotal +')</td>';
      str += '<td style="text-align: center;">'+ doc.data().giftstock +'</td></tr>';
      i++ ;
    });
    str += '</tbody></table>';
    $("#TableRewards").html(str);
    $("#DisplayAllStock").html("ของรางวัลคงเหลือ : "+xgiftall+" รายการ");
  });
}


function GotoRewards() {
  location.href = "yourrewards.html";
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


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('menu').style.display='none';
}
