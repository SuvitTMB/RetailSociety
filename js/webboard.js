var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbWebboard = firebase.firestore().collection("ttbWebboard");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  CheckWebboard();
  OpenPopMenu();
});


function CheckWebboard() {
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbttbWebboard.where('StatusBoard','==',0)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      if(doc.data().Pin==1) {
        var xPicture = '<div style="width:100%; text-align:center;position: relative;"><img src="' + doc.data().LinePicture + '" class="profile-team" onerror="javascript:imgError(this)" style="width:35px;height:35px;"></div><div style="position: absolute;padding:18px;"><img src="./icon/icon-pin1.png" style="width:20px; height:20px;"></div>';
      } else {
        var xPicture = '<div style="width:100%; text-align:center;position: relative;"><img src="' + doc.data().LinePicture + '" class="profile-team" onerror="javascript:imgError(this)" style="width:35px;height:35px;"></div>';
      }
      var xPost = '<div><b>'+doc.data().QWebboard.substring(0, 80)+'</b></div><div style="font-size:12px;">Date '+ doc.data().SendDate +' | Read '+doc.data().ReadWebboard +'</div>';
      dataSet = [xPicture, xPost, "<b>"+doc.data().AnsWebboard+"</b>", doc.data().Pin, doc.data().TimeStamp, doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [ 
        { title: "img", className: "txt-center" },
        { title: "คำถาม" },
        { title: "โพส", className: "txt-center" },
        { title: "Time", className: "txt-none" }
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],
        columnDefs: [ { type: 'num-fmt', 'targets': [1] } ],
        order: [[ 3, 'desc', 4, 'desc']]
      });   
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
          //console.log(dTable.row( this ).data()[5]);
          if(dTable.row( this ).data()[6]!=0) {
            //ReadWebboard(dTable.row( this ).data()[3],dTable.row( this ).data()[4]);
            WebboardChat(dTable.row( this ).data()[5]);
          }
        }
      });        
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}



function YourQuestion() {
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbttbWebboard.where('StatusBoard','==',0)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .orderBy('Pin','desc')
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      var xPicture = '<div style="width:100%; text-align:center;"><img src="' + doc.data().LinePicture + '" class="profile-team" onerror="javascript:imgError(this)" style="width:35px;height:35px;"></div>';
      var xPost = '<div><b>'+doc.data().QWebboard.substring(0, 80)+'</b></div><div style="font-size:12px;">Date '+ doc.data().SendDate +' | Read '+doc.data().ReadWebboard +'</div>';

      dataSet = [xPicture, xPost, "<b>"+doc.data().AnsWebboard+"</b>", doc.data().TimeStamp, doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [ 
        { title: "img", className: "txt-center" },
        { title: "คำถาม" },
        { title: "โพส", className: "txt-center" },
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
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
          //console.log(dTable.row( this ).data()[5]);
          if(dTable.row( this ).data()[5]!=0) {
            //ReadWebboard(dTable.row( this ).data()[3],dTable.row( this ).data()[4]);
            WebboardChat(dTable.row( this ).data()[4]);
          }
        }
      });        
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}


function NewQuestion() {
  var str = ""; 
  str += '<div class="btn-t3" style="margin-top:15px;">ตั้งคำถามใหม่</div>';
  str += '<div class="row-font"><div class="header-font" style="padding:15px 10px;line-height:1.2;">เพื่อน ๆ สามารถตั้งคำถามที่อยากจะถามผ่าน โดยการพิมพ์คำถามที่จะถาม ผ่านทางกล่องคำถามด้านล่างได้เลยน้า</div>';
  str += '<div class="input-group"><textarea id="txtQuestion" rows="10" placeholder="เพิ่มข้อความที่ต้องการถามได้ที่นี่ ..."></textarea></div></div>';
  str += '<div class="clr" style="height:10px;"></div><div class="btn-t2" onclick="AddNewQuestion()" style="margin-top:10px;">เพิ่มคำถามใหม่</div>';
  str += '<div class="btn-t2" onclick="CloseAll()">ยกเลิก</div>';
  $("#DisplayQuestion").html(str);
  document.getElementById('id01').style.display='block';
}



function AddNewQuestion() {
  var str = "";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var xQuestion = document.getElementById("txtQuestion").value;
  if(xQuestion!="") {
    dbttbWebboard.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      QWebboard : xQuestion,
      AnsWebboard : 0,
      ReadWebboard : 0,
      StatusBoard : 0,
      Pin : 0,
      SendDate : dateString,
      TimeStamp : TimeStampDate
    });
    str += '<div class="btn-t3" style="margin-top:15px;">ขอบคุณสำหรับการร่วมตั้งคำถาม</div>';
    str += '<div><img src="./img/giphy.gif" style="width:90%;"></div><div class="font13" style="text-align:center;">กรุณารอคำตอบจากเพื่อน ๆ น้า</div>';
    str += '<div class="clr" style="height:10px;"></div><div class="btn-t2" onclick="CloseAll()">ปิดหน้าต่างนี้</div><div class="clr" style="height:25px;">';
    $("#DisplayQuestion").html(str);
    CheckWebboard();
  } else {
    alert("กรุณาตั้งคำถามบนกระดานเว็บบอร์ดก่อนบันทึกรายการ");
  }
}



function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    return true;
}



function WebboardChat(id) {
  location.href = "webboard-chat.html?gid="+id+"";
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


function CloseAll() {
  document.getElementById('id01').style.display='none';
}

