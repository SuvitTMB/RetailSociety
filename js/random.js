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

$(document).ready(function () {
  if(sessionStorage.getItem("RandomWheel")==null) { location.href = "catalog.html"; }
  Connect_DB();
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbGiftRandom = firebase.firestore().collection("ttbGiftRandom");
  dbGiftRewards = firebase.firestore().collection("ttbGiftRewards");
  //dbttbWebChat = firebase.firestore().collection("ttbWebChat");
  //CheckBoardID();
  //GroupChat();
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
  //{ minDegree: 331, maxDegree: 360, value: 2 },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#0056ff",
  "#f68b1f",
  "#0056ff",
  "#f68b1f",
  "#0056ff",
  "#f68b1f",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [1, 2, 3, 4, 5, 6],
    //labels: [1, 2, 3, 4, 5, 6],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  var str = "";
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    //angleValue = 4;
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      //console.log("XX-"+angleValue);
      //i.value = 4;
      finalValue.innerHTML = `<p style="text-align: center;">หมายเลขที่สุ่มได้ : ${i.value}</p>`;
      //sessionStorage.removeItem("RandomWheel");
      //document.getElementById('ShowWheel').style.display='none';
      str += `<p style="text-align: center;">หมายเลขที่สุ่มได้ : ${i.value}</p>`;
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</div>';
      $("#DisplayGift").html(str);
      document.getElementById('id01').style.display='block';
      spinBtn.disabled = false;
      break;
    }
      //i.value = 4;
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  RandomRewards();
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p style="text-align: center;">Good Luck!</p>`;
  //Generate random degrees to stop at
  //let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);


        //randomDegree = 11;
        //randomDegree = 85; no-1
        //randomDegree = 17; no-2
        //randomDegree = 326; no-3
        //randomDegree = 265; no-4
        //randomDegree = 207; no-5
        //randomDegree = 139; no-6

  console.log("random-"+randomDegree);
  //let randomDegree = 5;
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 331) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      //valueGenerator(randomDegree);
      valueGenerator(randomDegree);
      console.log("R="+randomDegree);
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

/*
function ClickRandom() {
  RandomRewards();
  //alert("Random");
}
*/

var idCodeGift = "";
var xgiftstock = 0;
var xgiftstatus = 0;
function GetCodeGift(codegift) { 
  dbGiftRandom.where('giftcode','==',codegift)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      idCodeGift = doc.id;
      xgiftstock = doc.data().giftstock;
      xgiftstatus = doc.data().giftstatus;
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
    //console.log("Random Rewards = "+NewRewards[0]+"==="+NewRewards[1]);
  });  
}

//var idCodeGift = "";
//function GetCodeGift(codegift) { 

function GetCodeRandom(x,y) {
  //alert(idCodeGift+"==="+xgiftstock+"==="+xgiftstatus);
  randomDegree = 0;
  //alert(y);
        //randomDegree = 11;
        //randomDegree = 85; no-1
        //randomDegree = 17; no-2
        //randomDegree = 326; no-3
        //randomDegree = 265; no-4
        //randomDegree = 207; no-5
        //randomDegree = 139; no-6
        //alert(y);
switch(y) {
  case "gift-01":
    randomDegree = 85;
    xGroupGift = 1;
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
  console.log("ID="+idCodeGift);
  //dbGiftRandom = firebase.firestore().collection("ttbGiftRandom");
  //dbGiftRewards = firebase.firestore().collection("ttbGiftRewards");
  var CheckStock = parseFloat(xgiftstock)-1;
  if(CheckStock!=0) {
    dbGiftRandom.doc(idCodeGift).update({
      giftstock : parseFloat(CheckStock)
    });
  } else {
    dbGiftRandom.doc(idCodeGift).update({
      giftstock : 0,
      giftstatus : 0
    });
  }
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
    ResultQuiz : 'Random'
  });
  ShowRewards();
}


console.log(x+"==="+y+"==="+randomDegree);

}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function ShowRewards() {
  var i = 1;
  var str = "";
  str += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str += '<th scope="col">No</th><th scope="col">รายละเอียด</th><th scope="col">คงเหลือ</th></tr></thead<tbody>';
  dbGiftRandom
  //.where('RewardsStatus','==',0)
  .orderBy('giftranking','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr><th scope="row" style="text-align: center;">'+ i +'</th>';
      str += '<td>'+ doc.data().giftname +' ('+ doc.data().gifttotal +')</td>';
      str += '<td style="text-align: center;">'+ doc.data().giftstock +'</td></tr>';
      i++ ;
    });
    str += '</tbody></table>';
    $("#TableRewards").html(str);
  });
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
