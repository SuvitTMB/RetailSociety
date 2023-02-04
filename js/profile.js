var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbttbNews = firebase.firestore().collection("ttbnews");
  dbttbnewsLog = firebase.firestore().collection("ttbnewsLog");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  CheckData();
  MyPoint();
  //NewsLog();
  OpenPopMenu();
});


//var CheckFoundData = 0;
function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //CheckFoundData = doc.data().statusconfirm;
      if(doc.data().statusconfirm==1) {
        EidProfile = doc.id;
        //document.getElementById("txtEmpID").value = doc.data().empID;
        //document.getElementById('txtEmpID').setAttribute("class","DisableEmpID"); 
        document.getElementById("txtEmpName").value = doc.data().empName;
        document.getElementById('txtEmpName').setAttribute("class","DisableEmpID"); 
        document.getElementById("txtEmpPhone").value = doc.data().empPhone;
        document.getElementById("txtEmpRH").value = doc.data().empRH;
        document.getElementById("txtEmpBR").value = doc.data().empBr;
        document.getElementById("txtEmpAddress").value = doc.data().empAddress;
      } else {
        location.href = "cancelpage.html";
      }
    });
  });
}


function SaveProfile() {
  NewDate();
  //alert(xdateCheck);
  //alert(EidProfile);
  var str="";
  //sCheckBottom = 0;
  //stxtEmpID = document.getElementById("txtEmpID").value;
  //stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  stxtEmpRH = document.getElementById("txtEmpRH").value;
  stxtEmpBR = document.getElementById("txtEmpBR").value;
  stxtEmpAddress = document.getElementById("txtEmpAddress").value;

  dbProfile.doc(EidProfile).update({
    empPhone : stxtEmpPhone,
    empRH : stxtEmpRH,
    empBr : stxtEmpBR,
    empAddress : stxtEmpAddress
  });
  alert("ระบบทำการบันทึกรายการของคุณเรียบร้อยแล้ว")

/*
  if(stxtEmpAccept == true && sCheckBottom==3) { 
    dbProfile.add({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      linePicture : sessionStorage.getItem("LinePicture"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : stxtEmpID,
      empName : stxtEmpName,
      empPhone : stxtEmpPhone,
      empRH : stxtEmpRH,
      empBr : stxtEmpBR,
      empAddress : stxtEmpAddress,
      empAccept : stxtEmpAccept,
      statusconfirm : 2,
      statusedit : 1,
      statuspass : 0,
      lastcheckin : '',
      memo : '',
      EmpCheckIN : 0,
      DateAccept : xdateCheck,
      DateRegister : dateString
    });
    document.getElementById('id02').style.display='block';
  }
*/
}


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

/*
function NewsLog() {
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbttbnewsLog.where('LineID','==',sessionStorage.getItem("LineID"))
  .orderBy('LogTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      var xNews = '<b>' + doc.data().SubNews + '</b><br>'+ doc.data().HeadNews + ' | ' + doc.data().LogDate;

      dataSet = [i, xNews, doc.data().GetPoint, doc.data().LogTimeStamp, doc.data().RefID, doc.data().NewsGroup];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "No", className: "txt-center" },
        { title: "News" },
        { title: "Point", className: "txt-center" },
        { title: "Time", className: "txt-none" }
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],
        columnDefs: [ { type: 'num-fmt', 'targets': [1] } ],
        order: [[ 3, 'desc']]
      });   
      //if(dTable.row( this ).data()[5]==1) {
        $('#ex-table tbody').on( 'click', 'tr', function () {
          var data = dTable.row( $(this).parents('tr') ).data();
          if(count!=0) {
            console.log(dTable.row( this ).data()[5]);
            if(dTable.row( this ).data()[5]!=0) {
              ReadNews(dTable.row( this ).data()[4],dTable.row( this ).data()[5]);
            }
          }
        });        
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}
*/

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



function NewDate() {
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var today = new Date();
  var day = today.getDate() + "";
  var monthEN = (today.getMonth()) + "";
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
  xdateCheck = months[monthEN] + " " + day + ", " + year + " " + hour + ":" + minutes + ":" + seconds ;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}