var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Society")==null) { location.href = "index.html"; }
  Connect_DB();
  dbttbMember = firebase.firestore().collection("ttbMember");
  dbGroupNews = firebase.firestore().collection("ttbheadnews");
  dbttbRedeemRewards = firebase.firestore().collection("ttbRedeemRewards");
  dbttbGiftRewards = firebase.firestore().collection("ttbGiftRewards");
  MyPoint();
  RedeemRewards();
  GiftRewards();
  OpenPopMenu();
});


function RedeemRewards() {
  var str = "";
  var i = 1;
  var xStatus = "";
  str += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str += '<th scope="col">No.</th><th scope="col">รางวัล</th><th scope="col">ใช้เหรียญ</th></tr></thead><tbody>';
  dbttbRedeemRewards.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .orderBy('LogTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().SubNews!='วงล้อมหาสนุก') {
        if(doc.data().Status_Start==0) {
          xStatus = "<font color='#999999'>รอการจัดส่ง</font>";
        } else if(doc.data().Status_Start==1) {
          xStatus = "<font color='#f68b1f'>อยู่ระหว่างการจัดส่ง</font>";
        } else if(doc.data().Status_Start==2) {
          xStatus = "<font color='#07bb12'>จัดส่งเรียบร้อยแล้ว</font>";
        }
        str += '<tr><th scope="row" style="text-align: center;">'+ i +'</th>';
        str += '<td style="text-align: left; line-height: 1.2;"><font color="#0056ff">'+ doc.data().SubNews +'</font>';
        str += '<br>แลกเมื่อ : '+ doc.data().LogDate +'<br>สถานะ : '+ xStatus +'</td>';
        str += '<td style="text-align: center;">'+ (doc.data().GetPoint)*-1 +' เหรียญ</td></tr>';
        i++;
      }
    });
    str += '</tbody></table></div>';
    str += '<div class="clr"></div>';
    $("#DisplayRedeem").html(str);
  });
}


function GiftRewards() {
  var str = "";
  var i = 1;
  var xStatus = "";
  str += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str += '<th scope="col">No.</th><th scope="col">รางวัล</th><th scope="col">ใช้เหรียญ</th></tr></thead><tbody>';
  dbttbGiftRewards.where('EmpID','==',sessionStorage.getItem("EmpID_Society"))
  .orderBy('DateRegister','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().giftname!='เสียใจด้วยน้า') {
        if(doc.data().StatusSend==0) {
          xStatus = "<font color='#999999'>รอการจัดส่ง</font>";
        } else if(doc.data().StatusSend==1) {
          xStatus = "<font color='#f68b1f'>อยู่ระหว่างการจัดส่ง</font>";
        } else if(doc.data().StatusSend==2) {
          xStatus = "<font color='#07bb12'>จัดส่งเรียบร้อยแล้ว</font>";
        }
        str += '<tr><th scope="row" style="text-align: center;">'+ i +'</th>';
        str += '<td style="text-align: left; line-height: 1.2;"><font color="#0056ff">'+ doc.data().giftname +'</font>';
        str += '<br>แลกเมื่อ : '+ doc.data().DateRegister +'<br>สถานะ : '+ xStatus +'</td>';
        str += '<td style="text-align: center;">5 เหรียญ</td></tr>';
        i++;
      }
    });
    str += '</tbody></table></div>';
    str += '<div class="clr"></div>';
    $("#DisplayGiftRandom").html(str);
  });
}
