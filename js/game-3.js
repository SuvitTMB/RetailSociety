var _0x11c56f=_0x3e0d;(function(_0x55fae2,_0x3b2918){var _0x3f5707=_0x3e0d,_0x281b1b=_0x55fae2();while(!![]){try{var _0x48af0d=-parseInt(_0x3f5707(0x1fa))/0x1*(-parseInt(_0x3f5707(0x1ec))/0x2)+-parseInt(_0x3f5707(0x203))/0x3*(parseInt(_0x3f5707(0x21d))/0x4)+-parseInt(_0x3f5707(0x1d3))/0x5+parseInt(_0x3f5707(0x187))/0x6*(parseInt(_0x3f5707(0x1af))/0x7)+-parseInt(_0x3f5707(0x1e6))/0x8*(parseInt(_0x3f5707(0x201))/0x9)+parseInt(_0x3f5707(0x1b0))/0xa+-parseInt(_0x3f5707(0x1bc))/0xb;if(_0x48af0d===_0x3b2918)break;else _0x281b1b['push'](_0x281b1b['shift']());}catch(_0x5df099){_0x281b1b['push'](_0x281b1b['shift']());}}}(_0x3409,0x974b3));var cleararray='',dateString=new Date()['toLocaleString'](_0x11c56f(0x1b6),{'timeZone':_0x11c56f(0x1b1)}),today=new Date(),dd=String(today[_0x11c56f(0x1df)]())[_0x11c56f(0x1c8)](0x2,'0'),mm=String(today['getMonth']()+0x1)[_0x11c56f(0x1c8)](0x2,'0'),yyyy=today[_0x11c56f(0x1ac)]()+0x21f;today=dd+'/'+mm+'/'+yyyy;var endscore=0x3,xCoin=0x1,CheckAddEdit=0x0,Eid='',EidScorePoint='',sGroupQuiz=_0x11c56f(0x1ce),xHeader=_0x11c56f(0x1e1),sTypeSelect=_0x11c56f(0x1e8),xWin=0x0,xLost=0x0,sQuizTime=0x0,sQuizWin=0x0,sQuizLost=0x0,sQuizCoin=0x0,EQuizForm='',sUserSumTime=0x0,sUserSumTrue=0x0,sUserSumFalse=0x0,sUserSumFree=0x0,ChoiceSelect='',newScore=0x0,YourScore=0x0,typeResult='',xPointIN=0x0,xPointOUT=0x0,TextSelectChoice='',ArrQuestion=[],NewQuestion='',EidQuestion='';$(document)[_0x11c56f(0x18c)](function(){var _0x1bb43d=_0x11c56f;sessionStorage[_0x1bb43d(0x1f2)](_0x1bb43d(0x1f3))==null&&(location[_0x1bb43d(0x219)]=_0x1bb43d(0x20c)),Connect_DB(),db=firebase[_0x1bb43d(0x17f)]()[_0x1bb43d(0x1dd)](_0x1bb43d(0x190)),dbttbMember=firebase[_0x1bb43d(0x17f)]()['collection'](_0x1bb43d(0x1c0)),dbGroupNews=firebase[_0x1bb43d(0x17f)]()[_0x1bb43d(0x1dd)]('ttbheadnews'),dbttbGameQuestion=firebase[_0x1bb43d(0x17f)]()[_0x1bb43d(0x1dd)](_0x1bb43d(0x1c2)),dbttbnewsLog=firebase[_0x1bb43d(0x17f)]()[_0x1bb43d(0x1dd)](_0x1bb43d(0x194)),CheckUserScore(),CheckUserQuiz(),OpenPopMenu();});function CheckUserScore(){var _0x5a33cc=_0x11c56f;dbttbMember[_0x5a33cc(0x1b8)](_0x5a33cc(0x182),'==',sessionStorage['getItem']('EmpID_Society'))[_0x5a33cc(0x1d1)]()['then'](_0x20e050=>{var _0x5b15b1=_0x5a33cc;_0x20e050[_0x5b15b1(0x19a)](_0x4bbbb9=>{var _0x31c0c4=_0x5b15b1;EidScorePoint=_0x4bbbb9['id'],sQuizTime=_0x4bbbb9[_0x31c0c4(0x198)]()[_0x31c0c4(0x183)],sQuizWin=_0x4bbbb9[_0x31c0c4(0x198)]()[_0x31c0c4(0x1ef)],sQuizLost=_0x4bbbb9[_0x31c0c4(0x198)]()[_0x31c0c4(0x193)],sQuizCoin=_0x4bbbb9[_0x31c0c4(0x198)]()[_0x31c0c4(0x1a2)];});});}function CheckUserQuiz(){var _0x57cbf8=_0x11c56f,_0x15c54a='';dbttbGameQuestion['where'](_0x57cbf8(0x1ee),'==',today)[_0x57cbf8(0x1b8)]('EmpID','==',sessionStorage[_0x57cbf8(0x1f2)](_0x57cbf8(0x1f3)))['get']()[_0x57cbf8(0x211)](_0x3c7b97=>{var _0x35d19c=_0x57cbf8;_0x3c7b97[_0x35d19c(0x19a)](_0x5d32fe=>{var _0x109915=_0x35d19c;Eid=_0x5d32fe['id'],location[_0x109915(0x219)]=_0x109915(0x1f6);});if(Eid==''){CheckAddEdit=0x1,AddNewUser();var _0x440e4b=0x5,_0x28a943=setInterval(function(){var _0x36c46d=_0x35d19c;_0x440e4b<=0x0&&(clearInterval(_0x28a943),document['getElementById'](_0x36c46d(0x1ab))['style'][_0x36c46d(0x1d7)]=_0x36c46d(0x1bb),RandomQuestion()),document['getElementById']('progressBar')[_0x36c46d(0x1e4)]=0x6-_0x440e4b,_0x440e4b-=0x1;},0x1f4);$('#ToDayDate')[_0x35d19c(0x1db)](_0x35d19c(0x1ad)+today);}});}function RandomQuestion(){var _0x2214a6=_0x11c56f,_0x412ba2=0x0;db['where'](_0x2214a6(0x1f8),'==',sGroupQuiz)[_0x2214a6(0x1b8)](_0x2214a6(0x1d6),'==',0x1)[_0x2214a6(0x1d1)]()[_0x2214a6(0x211)](_0x2e8bc2=>{var _0xfe12b7=_0x2214a6;_0x2e8bc2[_0xfe12b7(0x19a)](_0x45ac11=>{_0x412ba2=_0x412ba2+0x1,ArrQuestion['push']([_0x45ac11['id']]);}),NewQuestion=random_item(ArrQuestion),EidQuestion=NewQuestion[0x0],console[_0xfe12b7(0x1c1)](NewQuestion[0x0]),GetQuestion();});}function AddNewUser(){var _0x5256cc=_0x11c56f;if(CheckAddEdit==0x1){var _0x1395b2='';dbttbGameQuestion[_0x5256cc(0x1cd)]({'GroupQuiz':xHeader,'LineID':sessionStorage[_0x5256cc(0x1f2)]('LineID'),'LineName':sessionStorage[_0x5256cc(0x1f2)](_0x5256cc(0x1d5)),'LinePicture':sessionStorage['getItem'](_0x5256cc(0x21e)),'EmpID':sessionStorage[_0x5256cc(0x1f2)](_0x5256cc(0x1f3)),'EmpName':sessionStorage[_0x5256cc(0x1f2)](_0x5256cc(0x218)),'QuizDate':today,'RefID':'','QuizType':0x0,'Quetion':'','Answer':'','AnswerTxt':'','ResultQuiz':'','PointIN':0x0,'PointOUT':0x0,'LastScore':parseFloat(sessionStorage['getItem'](_0x5256cc(0x21c))),'DateRewards':'','DateRegister':dateString,'TypeSelect':sTypeSelect,'TimeStamp':0x0}),CheckEid();}}function CheckEid(){var _0x5e61a6=_0x11c56f;dbttbGameQuestion[_0x5e61a6(0x1b8)]('QuizDate','==',today)['where'](_0x5e61a6(0x182),'==',sessionStorage[_0x5e61a6(0x1f2)](_0x5e61a6(0x1f3)))['get']()['then'](_0x4b7cf9=>{var _0x42588f=_0x5e61a6;_0x4b7cf9[_0x42588f(0x19a)](_0x59a575=>{Eid=_0x59a575['id'];});});}function GetQuestion(){var _0x5de24e=_0x11c56f;$(_0x5de24e(0x21b))[_0x5de24e(0x1db)](cleararray),$(_0x5de24e(0x18e))['val'](cleararray),$(_0x5de24e(0x184))[_0x5de24e(0x1f0)](cleararray),$(_0x5de24e(0x20f))[_0x5de24e(0x1f0)](cleararray),$(_0x5de24e(0x216))[_0x5de24e(0x1f0)](cleararray),db[_0x5de24e(0x1b8)](firebase[_0x5de24e(0x17f)]['FieldPath'][_0x5de24e(0x1a0)](),'==',EidQuestion)[_0x5de24e(0x1d1)]()['then'](_0x4db37e=>{var _0xe6aa27=_0x5de24e;_0x4db37e[_0xe6aa27(0x19a)](_0x33ff1d=>{var _0x2b4d90=_0xe6aa27;EQuizDate=_0x33ff1d['data']()['QuizDate'],EQuizQuizTimer=Number(_0x33ff1d['data']()[_0x2b4d90(0x197)]),now=new Date(),timeup=now[_0x2b4d90(0x1d4)](now['getSeconds']()+Number(_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x197)])),counter=setInterval(timer,0x3e8),timer(),CheckType=_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x18b)],CheckQuizQuestion=_0x33ff1d['data']()[_0x2b4d90(0x1cb)],CheckQuizAnswer=_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x202)],CheckQuizAnswerText=_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1fb)],CheckPoint=_0x33ff1d[_0x2b4d90(0x198)]()['QuizPoint'],SumQuiz=_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1f9)],SumChoice1=_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x19d)],SumChoice2=_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1b7)],SumChoice3=_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1b5)],SumChoice4=_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1e0)],SumQuizTrue=_0x33ff1d[_0x2b4d90(0x198)]()['SumQuizTrue'],SumQuizFalse=_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x18a)];if(_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x18b)]=='1')$(_0x2b4d90(0x184))[_0x2b4d90(0x1db)](_0x2b4d90(0x1a5)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1cb)]+_0x2b4d90(0x204)),EQuizForm+=_0x2b4d90(0x1bd),EQuizForm+='<div\x20class=\x27quiz-choice\x27\x20onclick=\x27ClickChoice(1,\x22'+_0x33ff1d['data']()[_0x2b4d90(0x1c3)]+_0x2b4d90(0x210)+_0x33ff1d[_0x2b4d90(0x198)]()['QuizChoice1']+_0x2b4d90(0x204),EQuizForm+=_0x2b4d90(0x1ae)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1eb)]+'\x22)\x27\x20id=\x27answer2\x27><input\x20type=\x27radio\x27>'+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1eb)]+'</div>',EQuizForm+=_0x2b4d90(0x1ff)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x188)]+_0x2b4d90(0x1dc)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x188)]+'</div>',EQuizForm+=_0x2b4d90(0x1da)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1e3)]+_0x2b4d90(0x215)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1e3)]+_0x2b4d90(0x204),EQuizForm+=_0x2b4d90(0x1ed),EQuizForm+=_0x2b4d90(0x18f);else{if(_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x18b)]=='2')_0x33ff1d[_0x2b4d90(0x198)]()['QuizQuestion']!=null?$(_0x2b4d90(0x184))[_0x2b4d90(0x1db)](_0x2b4d90(0x191)+_0x33ff1d['data']()[_0x2b4d90(0x18d)]+_0x2b4d90(0x1a6)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1f5)]+_0x2b4d90(0x207)):$('#DisplayQuestion')[_0x2b4d90(0x1db)](_0x2b4d90(0x191)+_0x33ff1d[_0x2b4d90(0x198)]()['QuizImg']+'\x27\x20class=\x27imggame\x27\x20style=\x27max-width:370px;width:90%;\x27></div>'),EQuizForm+='<div><input\x20type=\x27text\x27\x20id=\x27SendCheckType2\x27\x20placeholder=\x27กรอกคำตอบของคุณ\x20..\x27\x20style=\x27margin-top:25px;width:250px\x20!important;text-align:\x20center;\x20color:#0056ff;font-size:13px;\x27\x20onkeyup=\x27ChkText()\x27></div>',EQuizForm+=_0x2b4d90(0x1c7);else{if(_0x33ff1d[_0x2b4d90(0x198)]()['QuizTypeQuestion']=='3')_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1c4)]!=null?$('#DisplayQuestion')[_0x2b4d90(0x1db)](_0x2b4d90(0x180)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1c4)]+_0x2b4d90(0x1a5)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1f5)]+_0x2b4d90(0x207)):$(_0x2b4d90(0x184))[_0x2b4d90(0x1db)]('<div>'+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1c4)]+'</div>'),EQuizForm+=_0x2b4d90(0x1bd),EQuizForm+=_0x2b4d90(0x20b)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1c3)]+_0x2b4d90(0x210)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1c3)]+'</div>',EQuizForm+='<div\x20class=\x27quiz-choice\x27\x20onclick=\x27ClickChoice(2,\x22'+_0x33ff1d['data']()[_0x2b4d90(0x1eb)]+'\x22)\x27\x20id=\x27answer2\x27><input\x20type=\x27radio\x27>'+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1eb)]+_0x2b4d90(0x204),EQuizForm+=_0x2b4d90(0x1ff)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x188)]+_0x2b4d90(0x1dc)+_0x33ff1d['data']()[_0x2b4d90(0x188)]+_0x2b4d90(0x204),EQuizForm+='<div\x20class=\x27quiz-choice\x27\x20onclick=\x27ClickChoice(4,\x22'+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1e3)]+_0x2b4d90(0x215)+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1e3)]+_0x2b4d90(0x204),EQuizForm+=_0x2b4d90(0x1d2),EQuizForm+=_0x2b4d90(0x18f);else _0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x18b)]=='4'&&(_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1c4)]!=null?$('#DisplayQuestion')[_0x2b4d90(0x1db)]('<div>'+_0x33ff1d['data']()[_0x2b4d90(0x1c4)]+'<div\x20class=\x27txt-qq\x27>'+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1f5)]+_0x2b4d90(0x207)):$(_0x2b4d90(0x184))['html']('<div>'+_0x33ff1d[_0x2b4d90(0x198)]()[_0x2b4d90(0x1c4)]+'</div>'),EQuizForm+=_0x2b4d90(0x186),EQuizForm+=_0x2b4d90(0x1fd),EQuizForm+=_0x2b4d90(0x1b2));}}$(_0x2b4d90(0x216))[_0x2b4d90(0x1db)](_0x2b4d90(0x1a3));}),$(_0xe6aa27(0x20f))[_0xe6aa27(0x1db)](EQuizForm),document[_0xe6aa27(0x195)](_0xe6aa27(0x181))[_0xe6aa27(0x1e9)]['display']=_0xe6aa27(0x205);});}function timer(){var _0x8f43fe=_0x11c56f;now=new Date(),count=Math['round']((timeup-now)/0x3e8);if(now>timeup){window['location']='#',$(_0x8f43fe(0x1ea))[_0x8f43fe(0x1db)]('<font\x20color=\x27#ffff00\x27>หมดเวลาตอบคำถาม</font>'),document['getElementById'](_0x8f43fe(0x1a7))[_0x8f43fe(0x1e9)]['display']=_0x8f43fe(0x1bb),clearInterval(counter),SaveData();return;}var _0x1ab234=Math[_0x8f43fe(0x212)](count%0x3c),_0x2cec51=Math[_0x8f43fe(0x212)](count/0x3c%0x3c);_0x1ab234<0xa&&(_0x1ab234='0'+_0x1ab234),$(_0x8f43fe(0x1ea))[_0x8f43fe(0x1db)]('เหลือเวลาอีก\x20<font\x20color=\x27#ffff00\x27>'+_0x2cec51+_0x8f43fe(0x1e2)+_0x1ab234+_0x8f43fe(0x1a9));}function random_item(_0x1d9bfe){var _0x261ab4=_0x11c56f;return _0x1d9bfe[Math[_0x261ab4(0x212)](Math[_0x261ab4(0x1de)]()*_0x1d9bfe[_0x261ab4(0x19e)])];}function ClickChoice(_0xfc675e){var _0x13a18e=_0x11c56f;ChoiceSelect=_0xfc675e;if(_0xfc675e==0x1)document[_0x13a18e(0x195)](_0x13a18e(0x19b))['className']=_0x13a18e(0x1d9),document[_0x13a18e(0x195)]('answer2')[_0x13a18e(0x1c5)]=_0x13a18e(0x21a),document[_0x13a18e(0x195)]('answer3')['className']=_0x13a18e(0x21a),document[_0x13a18e(0x195)]('answer4')['className']='quiz-choice',document[_0x13a18e(0x195)](_0x13a18e(0x1a7))[_0x13a18e(0x1c5)]=_0x13a18e(0x189);else{if(_0xfc675e==0x2)document[_0x13a18e(0x195)]('answer1')[_0x13a18e(0x1c5)]=_0x13a18e(0x21a),document[_0x13a18e(0x195)](_0x13a18e(0x1f4))[_0x13a18e(0x1c5)]=_0x13a18e(0x1d9),document[_0x13a18e(0x195)](_0x13a18e(0x208))[_0x13a18e(0x1c5)]='quiz-choice',document[_0x13a18e(0x195)]('answer4')[_0x13a18e(0x1c5)]='quiz-choice',document[_0x13a18e(0x195)](_0x13a18e(0x1a7))[_0x13a18e(0x1c5)]='btn-t2-no\x20SelectA';else{if(_0xfc675e==0x3)document[_0x13a18e(0x195)]('answer1')['className']=_0x13a18e(0x21a),document[_0x13a18e(0x195)](_0x13a18e(0x1f4))[_0x13a18e(0x1c5)]='quiz-choice',document['getElementById'](_0x13a18e(0x208))[_0x13a18e(0x1c5)]=_0x13a18e(0x1d9),document[_0x13a18e(0x195)](_0x13a18e(0x200))[_0x13a18e(0x1c5)]=_0x13a18e(0x21a),document[_0x13a18e(0x195)]('SubmitAns')[_0x13a18e(0x1c5)]='btn-t2-no\x20SelectA';else _0xfc675e==0x4&&(document[_0x13a18e(0x195)]('answer1')[_0x13a18e(0x1c5)]=_0x13a18e(0x21a),document[_0x13a18e(0x195)](_0x13a18e(0x1f4))['className']=_0x13a18e(0x21a),document[_0x13a18e(0x195)]('answer3')[_0x13a18e(0x1c5)]='quiz-choice',document[_0x13a18e(0x195)]('answer4')[_0x13a18e(0x1c5)]=_0x13a18e(0x1d9),document[_0x13a18e(0x195)](_0x13a18e(0x1a7))[_0x13a18e(0x1c5)]='btn-t2-no\x20SelectA');}}}function SendAnswer(){var _0x16a68a=_0x11c56f;if(CheckType==0x1)ChoiceSelect==CheckQuizAnswer?(YourScore=CheckPoint,sUserSumTrue=sUserSumTrue+0x1,TrueGame()):(YourScore=0x0,sUserSumFalse=sUserSumFalse+0x1,FalseGame());else{if(CheckType==0x2)ChoiceSelect=0x0,TextSelectChoice=document[_0x16a68a(0x195)](_0x16a68a(0x1a8))[_0x16a68a(0x1e4)],TextSelectChoice==CheckQuizAnswerText?(YourScore=CheckPoint,sUserSumTrue=sUserSumTrue+0x1,TrueGame()):(YourScore=0x0,sUserSumFalse=sUserSumFalse+0x1,FalseGame());else{if(CheckType==0x3)ChoiceSelect==CheckQuizAnswer?(YourScore=CheckPoint,sUserSumTrue=sUserSumTrue+0x1,TrueGame()):(YourScore=0x0,sUserSumFalse=sUserSumFalse+0x1,TrueGame());else CheckType==0x4&&(ChoiceSelect=0x0,TextSelectChoice=document[_0x16a68a(0x195)](_0x16a68a(0x20d))['value'],TextSelectChoice==CheckQuizAnswerText?(YourScore=CheckPoint,sUserSumTrue=sUserSumTrue+0x1,TrueGame()):(YourScore=0x0,sUserSumFalse=sUserSumFalse+0x1,TrueGame()));}}SaveData();}function SaveData(){var _0x4fff29=_0x11c56f;NewDate();var _0x347034=Math[_0x4fff29(0x1e5)](Date['now']()/0x3e8),_0xeed575='';YourScore==0x1?(_0xeed575='True',xPointIN=0x1,xPointOUT=0x1):(_0xeed575=_0x4fff29(0x1b9),xPointIN=0x0,xPointOUT=0x0),CheckAddEdit==0x1&&(sessionStorage['setItem'](_0x4fff29(0x21c),parseFloat(sessionStorage['getItem'](_0x4fff29(0x21c)))+parseFloat(xPointIN)),sessionStorage[_0x4fff29(0x199)](_0x4fff29(0x1c9),parseFloat(sessionStorage['getItem']('RP_Point'))+parseFloat(xPointIN)),xPointIN==0x0?dbttbMember['doc'](EidScorePoint)['update']({'QuizTime':parseFloat(sQuizTime)+0x1,'QuizLost':parseFloat(sQuizLost)+parseFloat(xLost),'LastUpdate':dateString}):dbttbMember[_0x4fff29(0x213)](EidScorePoint)[_0x4fff29(0x1b3)]({'QuizTime':parseFloat(sQuizTime)+0x1,'QuizWin':parseFloat(sQuizWin)+0x1,'QuizCoin':parseFloat(sQuizCoin)+parseFloat(xCoin),'XP_Point':parseFloat(sessionStorage[_0x4fff29(0x1f2)]('XP_Point')),'RP_Point':parseFloat(sessionStorage[_0x4fff29(0x1f2)](_0x4fff29(0x1c9))),'LastUpdate':dateString}),dbttbGameQuestion[_0x4fff29(0x213)](Eid)[_0x4fff29(0x1b3)]({'GroupQuiz':xHeader,'LineID':sessionStorage[_0x4fff29(0x1f2)](_0x4fff29(0x1ca)),'LineName':sessionStorage[_0x4fff29(0x1f2)](_0x4fff29(0x1d5)),'LinePicture':sessionStorage[_0x4fff29(0x1f2)](_0x4fff29(0x21e)),'EmpID':sessionStorage[_0x4fff29(0x1f2)]('EmpID_Society'),'EmpName':sessionStorage[_0x4fff29(0x1f2)](_0x4fff29(0x218)),'QuizDate':today,'RefID':EidQuestion,'QuizType':CheckType,'Quetion':CheckQuizQuestion,'Answer':ChoiceSelect,'AnswerTxt':TextSelectChoice,'ResultQuiz':_0xeed575,'PointIN':parseFloat(xPointIN),'PointOUT':parseFloat(xPointIN),'DateRewards':'','DateRegister':dateString,'TimeStamp':_0x347034}),dbttbnewsLog['add']({'LineID':sessionStorage[_0x4fff29(0x1f2)](_0x4fff29(0x1ca)),'LineName':sessionStorage[_0x4fff29(0x1f2)](_0x4fff29(0x1d5)),'LinePicture':sessionStorage[_0x4fff29(0x1f2)]('LinePicture'),'EmpID':sessionStorage[_0x4fff29(0x1f2)](_0x4fff29(0x1f3)),'EmpName':sessionStorage['getItem']('EmpName_Society'),'RefID':EidScorePoint,'NewsGroup':0x0,'HeadNews':xHeader,'SubNews':sTypeSelect,'GetPoint':parseFloat(xWin),'LastPoint':parseFloat(sessionStorage[_0x4fff29(0x1f2)]('XP_Point')),'LogDate':dateString,'LogTimeStamp':_0x347034}),OpenPopMenu()),CheckAddEdit==0x1?(SaveQuestion(),ClearQuiz()):document[_0x4fff29(0x195)](_0x4fff29(0x1c6))['style'][_0x4fff29(0x1d7)]=_0x4fff29(0x1bb);}function _0x3409(){var _0x1fcb91=['<div\x20class=\x27BoxScoreCard\x27>วันนี้คุณทำเหรียญรางวัลได้\x20','QuizZone','getFullYear','<div\x20class=\x27font13black\x27\x20style=\x27margin:0px\x20auto\x2025px\x20auto;\x20color:#ffffff;\x20font-weight:600;\x27>กิจกรรมประจำวันที่\x20','<div\x20class=\x27quiz-choice\x27\x20onclick=\x27ClickChoice(2,\x22','7908803fjrKDf','4336100MsHtiY','Asia/Jakarta','<div\x20style=\x27height:20px;\x27></div>','update','<div\x20style=\x27line-height:1.2;\x27>เราเสียใจที่ไม่สามารถให้เหรียญรางวัลกับคุณได้</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า</div>','SumChoice3','en-US','SumChoice2','where','False','<div\x20class=\x27txt-qq\x27>วันนี้คุณตอบคำถามไม่ถูกต้อง<div\x20class=\x27font13black\x27\x20style=\x27color:#fff;\x27>คุณไม่ได้รับเหรียญรางวัล</div></div>','none','13814988KcHTXB','<div\x20style=\x27margin-top:20px;\x27></div><center>','getSeconds','<div\x20class=\x27text-false\x27><br>คุณแพ้การแข่งขันในรอบนี้</div>','ttbMember','log','ttbGameQuestion','QuizChoice1','QuizVDO','className','id03','<div\x20id=\x27SubmitAns\x27\x20class=\x27btn-t0\x27\x20onclick=\x27SendAnswer()\x27>ส่งคำตอบ</div><div\x20id=\x27chars\x27\x20style=\x27color:#0016ed;\x27></div><br><br>','padStart','RP_Point','LineID','QuizQuestion','ยินดีด้วยคุณตอบคำถามได้ถูกต้อง','add','Newyear','<div><img\x20src=\x27./img/false.jpg\x27\x20style=\x27max-width:\x20100%;\x20margin-top:\x2010px;border-radius:10px;\x27></div>','#DisplayMessage','get','<div\x20id=\x27SubmitAns\x27\x20class=\x27btn-t0\x27\x20onclick=\x27SendAnswer()\x27>ส่งคำตอบ</div><br><br>','67295eGXUVs','setSeconds','LineName','QuizStatus','display','.png\x27\x20style=\x27max-width:\x20100%;\x20margin-bottom:\x2010px;background:#e6ecfa;\x20border-radius:10px;\x27></div>','quiz-choice\x20SelectQ','<div\x20class=\x27quiz-choice\x27\x20onclick=\x27ClickChoice(4,\x22','html','\x22)\x27\x20id=\x27answer3\x27><input\x20type=\x27radio\x27>','collection','random','getDate','SumChoice4','Game\x20Zone','\x20นาที\x20','QuizChoice4','value','round','8vzNEGl','getMinutes','คำถามประจำวัน','style','#timer','QuizChoice2','2FMRFTN','<div\x20id=\x27SubmitAns\x27\x20class=\x27btn-t0\x27\x20onclick=\x27SendAnswer()\x27\x20style=\x27margin-top:10px;\x27>ส่งคำตอบ</div><br><br><br>','QuizDate','QuizWin','val','<div\x20class=\x27font12black\x27\x20style=\x27text-align:center;\x27>วันนี้คุณได้รับ\x20<b>','getItem','EmpID_Society','answer2','MoreDetail','intro-game3.html','<div><img\x20src=\x27./img/coin-','GroupQuiz','SumQuiz','597409fDGziZ','QuizAnswerText','innerHTML','<div\x20id=\x27SubmitAns\x27\x20class=\x27btn-t0\x27\x20onclick=\x27SendAnswer()\x27>ส่งคำตอบ\x20</div><br><br><div\x20id=\x27chars4\x27\x20style=\x27color:#ffffff;\x27><div>','\x20เหรียญรางวัล</div>','<div\x20class=\x27quiz-choice\x27\x20onclick=\x27ClickChoice(3,\x22','answer4','475317GEptTT','QuizAnswer','3KkXoRQ','</div>','block','#DisplayWarning','</div></div>','answer3','\x20เหรียญรางวัล</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า</div>','MessageEnd','<div\x20class=\x27quiz-choice\x27\x20onclick=\x27ClickChoice(1,\x22','index.html','SendCheckType4','getMonth','#DisplayChoice','\x22)\x27\x20id=\x27answer1\x27><input\x20type=\x27radio\x27>','then','floor','doc','DisplayChoice','\x22)\x27\x20id=\x27answer4\x27><input\x20type=\x27radio\x27>','#DisplayTimer','#Displayintromessage','EmpName_Society','href','quiz-choice','#ShowStory','XP_Point','875876ReOUgS','LinePicture','เสียใจด้วยน้า\x20พรุ่งนี้มาเล่นกันใหม่','firestore','<div>','ShowQuiz','EmpID','QuizTime','#DisplayQuestion','DisplayQuestion','<div><input\x20type=\x27text\x27\x20id=\x27SendCheckType4\x27\x20placeholder=\x27กรอกคำตอบของคุณ\x20..\x27\x20style=\x27margin-top:10px;width:250px\x20!important;text-align:\x20center;\x20color:#0056ff;font-size:13px;\x27\x20onkeyup=\x27ChkText4()\x27></div>','6IGbmQF','QuizChoice3','btn-t2-no\x20SelectA','SumQuizFalse','QuizTypeQuestion','ready','QuizImg','#DisplayDay','</center>','QuizoftheDay','<div><img\x20src=\x27','toFixed','QuizLost','ttbnewsLog','getElementById','#DisplayEndScore','QuizTimer','data','setItem','forEach','answer1','id01','SumChoice1','length','<div\x20class=\x27btn-t3\x27\x20style=\x27margin-top:20px;\x27><b>คุณได้รับเหรียญรางวัล</b></div>','documentId','#DisplayMyScore','QuizCoin','<center><div\x20id=\x27timer\x27\x20class=\x27timer\x27></div></center>','id02','<div\x20class=\x27txt-qq\x27>','\x27\x20class=\x27imggame\x27\x20style=\x27max-width:370px;width:90%;\x27><div\x20class=\x27txt-qq\x27>','SubmitAns','SendCheckType2','\x20วินาที</font>'];_0x3409=function(){return _0x1fcb91;};return _0x3409();}function FalseGame(){var _0x544d79=_0x11c56f;xLost=0x1;var _0x23f351='';$(_0x544d79(0x206))['html'](cleararray),$(_0x544d79(0x1d0))[_0x544d79(0x1f0)](cleararray),$(_0x544d79(0x1d0))[_0x544d79(0x1db)](cleararray),$(_0x544d79(0x217))[_0x544d79(0x1f0)](cleararray),$(_0x544d79(0x217))[_0x544d79(0x1db)](cleararray),$('#DisplayLastScore')[_0x544d79(0x1f0)](cleararray),_0x23f351+='<div\x20class=\x27btn-t3\x27\x20style=\x27margin-top:20px;\x27><b>เสียใจด้วยน้า</b></div>',_0x23f351+=_0x544d79(0x1cf),_0x23f351+=_0x544d79(0x1bf),_0x23f351+=_0x544d79(0x1b4),textmessage=_0x544d79(0x21f),$(_0x544d79(0x1d0))[_0x544d79(0x1db)](textmessage),$('#DisplayLastScore')[_0x544d79(0x1db)](_0x23f351),document[_0x544d79(0x195)](_0x544d79(0x20a))[_0x544d79(0x1e9)][_0x544d79(0x1d7)]=_0x544d79(0x205),document['getElementById'](_0x544d79(0x19c))[_0x544d79(0x1e9)][_0x544d79(0x1d7)]='block';}function TrueGame(){var _0x2a3158=_0x11c56f;EndGame=0x1,xWin=0x1;var _0x11be1e='';$(_0x2a3158(0x206))[_0x2a3158(0x1db)](cleararray),$(_0x2a3158(0x217))[_0x2a3158(0x1f0)](cleararray),$(_0x2a3158(0x217))[_0x2a3158(0x1db)](cleararray),textmessage=_0x2a3158(0x1cc),$('#DisplayMessage')[_0x2a3158(0x1f0)](cleararray),$(_0x2a3158(0x1d0))[_0x2a3158(0x1db)](textmessage),$(_0x2a3158(0x196))[_0x2a3158(0x1f0)](cleararray),_0x11be1e+=_0x2a3158(0x19f),_0x11be1e+=_0x2a3158(0x1f7)+xCoin+_0x2a3158(0x1d8),_0x11be1e+='<div\x20class=\x27text-false\x27>คุณตอบคำถามถูกในรอบนนี้</div>',_0x11be1e+=_0x2a3158(0x1f1)+xCoin+_0x2a3158(0x209),$(_0x2a3158(0x196))[_0x2a3158(0x1db)](_0x11be1e),document[_0x2a3158(0x195)](_0x2a3158(0x20a))[_0x2a3158(0x1e9)]['display']=_0x2a3158(0x205),document['getElementById'](_0x2a3158(0x1a4))[_0x2a3158(0x1e9)][_0x2a3158(0x1d7)]=_0x2a3158(0x205);}function _0x3e0d(_0xa15432,_0x3bbbc0){var _0x340987=_0x3409();return _0x3e0d=function(_0x3e0de2,_0xaf3e91){_0x3e0de2=_0x3e0de2-0x17f;var _0x29537e=_0x340987[_0x3e0de2];return _0x29537e;},_0x3e0d(_0xa15432,_0x3bbbc0);}function SaveQuestion(){var _0x217405=_0x11c56f;SumQuiz=SumQuiz+0x1;if(YourScore==0x0)SumQuizFalse=SumQuizFalse+0x1;else YourScore!=0x0&&(SumQuizTrue=SumQuizTrue+0x1);if(ChoiceSelect==0x1)SumChoice1=SumChoice1+0x1;else{if(ChoiceSelect==0x2)SumChoice2=SumChoice2+0x1;else{if(ChoiceSelect==0x3)SumChoice3=SumChoice3+0x1;else ChoiceSelect==0x4&&(SumChoice4=SumChoice4+0x1);}}db[_0x217405(0x213)](EidQuestion)[_0x217405(0x1b3)]({'SumQuiz':SumQuiz,'SumQuizTrue':SumQuizTrue,'SumQuizFalse':SumQuizFalse,'SumChoice1':SumChoice1,'SumChoice2':SumChoice2,'SumChoice3':SumChoice3,'SumChoice4':SumChoice4});}function ClearQuiz(){var _0x4f4fca=_0x11c56f,_0x347ec9='';clearInterval(counter),document[_0x4f4fca(0x195)]('DisplayTimer')[_0x4f4fca(0x1fc)]='',document[_0x4f4fca(0x195)](_0x4f4fca(0x214))[_0x4f4fca(0x1fc)]='',document[_0x4f4fca(0x195)](_0x4f4fca(0x185))['innerHTML']='',document['getElementById']('DisplayChoice')['innerHTML']='';if(YourScore!=0x0){var _0x4941a2='',_0x284674='';LastScore=YourScore,$(_0x4f4fca(0x184))['html']('<div\x20class=\x27txt-qq\x27>ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>คุณทำเหรียญรางวัลได้\x20'+LastScore+_0x4f4fca(0x1fe)),_0x284674+='<div><br><br><img\x20src=\x22./img/true.png\x22\x20width=\x2270px;\x22></div>',$(_0x4f4fca(0x1a1))[_0x4f4fca(0x1db)](_0x4f4fca(0x1aa)+parseFloat(LastScore)[_0x4f4fca(0x192)](0x2)+_0x4f4fca(0x1fe)),$(_0x4f4fca(0x20f))[_0x4f4fca(0x1db)](_0x284674);}else{LastScore=0x0;var _0x284674='';$(_0x4f4fca(0x184))[_0x4f4fca(0x1db)](_0x4f4fca(0x1ba)),_0x284674+='<center><div><br><img\x20src=\x22./img/false.png\x22\x20width=\x22100px;\x22></div>',_0x284674+='<div\x20class=\x22txt-qq\x22\x20style=\x22color:#fff;margin-top:8px;\x22>เสียใจด้วยน้า<div></center>',$(_0x4f4fca(0x1a1))[_0x4f4fca(0x1db)](_0x4f4fca(0x1aa)+parseFloat(LastScore)[_0x4f4fca(0x192)](0x2)+'\x20เหรียญรางวัล</div>'),$(_0x4f4fca(0x20f))['html'](_0x284674);}}function NewDate(){var _0x4cc3b1=_0x11c56f,_0x50f0eb=new Date(),_0x3c5e2f=_0x50f0eb[_0x4cc3b1(0x1df)]()+'',_0x2085e9=_0x50f0eb[_0x4cc3b1(0x20e)]()+0x1+'',_0x1d2d7a=_0x50f0eb[_0x4cc3b1(0x1ac)]()+'',_0x28a8b3=_0x50f0eb['getHours']()+'',_0x1f7b7e=_0x50f0eb[_0x4cc3b1(0x1e7)]()+'',_0x35c285=_0x50f0eb[_0x4cc3b1(0x1be)]()+'',_0x4d1977=_0x28a8b3>=0xc?'PM':'AM';_0x3c5e2f=checkZero(_0x3c5e2f),_0x2085e9=checkZero(_0x2085e9),_0x1d2d7a=checkZero(_0x1d2d7a),_0x28a8b3=checkZero(_0x28a8b3),_0x1f7b7e=checkZero(_0x1f7b7e),_0x35c285=checkZero(_0x35c285),dateString=_0x3c5e2f+'/'+_0x2085e9+'/'+_0x1d2d7a+'\x20'+_0x28a8b3+':'+_0x1f7b7e+':'+_0x35c285+'\x20'+_0x4d1977;}function checkZero(_0x254911){return _0x254911['length']==0x1&&(_0x254911='0'+_0x254911),_0x254911;}function CloseAll(){var _0x3a6b0a=_0x11c56f;document[_0x3a6b0a(0x195)]('id01')[_0x3a6b0a(0x1e9)][_0x3a6b0a(0x1d7)]=_0x3a6b0a(0x1bb),document[_0x3a6b0a(0x195)](_0x3a6b0a(0x1a4))[_0x3a6b0a(0x1e9)][_0x3a6b0a(0x1d7)]=_0x3a6b0a(0x1bb);}
