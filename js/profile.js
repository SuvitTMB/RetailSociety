var _0x52f2c8=_0x4385;(function(_0x3b6847,_0xd427f5){var _0x4311bc=_0x4385,_0x574ac5=_0x3b6847();while(!![]){try{var _0x1e6e96=parseInt(_0x4311bc(0x8d))/0x1*(-parseInt(_0x4311bc(0xb4))/0x2)+-parseInt(_0x4311bc(0x98))/0x3+-parseInt(_0x4311bc(0x94))/0x4*(-parseInt(_0x4311bc(0xb5))/0x5)+-parseInt(_0x4311bc(0xbd))/0x6+-parseInt(_0x4311bc(0x8e))/0x7+parseInt(_0x4311bc(0xcd))/0x8*(-parseInt(_0x4311bc(0x92))/0x9)+parseInt(_0x4311bc(0xa9))/0xa;if(_0x1e6e96===_0xd427f5)break;else _0x574ac5['push'](_0x574ac5['shift']());}catch(_0x29e807){_0x574ac5['push'](_0x574ac5['shift']());}}}(_0x41fa,0x86ce6));var cleararray='',GroupNews=0x0,xCal=0x0;$(document)[_0x52f2c8(0xb1)](function(){var _0x3b3bed=_0x52f2c8;sessionStorage[_0x3b3bed(0xc9)](_0x3b3bed(0xcc))==null&&(location[_0x3b3bed(0x9e)]='index.html'),Connect_DB(),dbProfile=firebase[_0x3b3bed(0xba)]()[_0x3b3bed(0xa4)](_0x3b3bed(0xc6)),dbttbMember=firebase['firestore']()['collection'](_0x3b3bed(0x86)),dbttbNews=firebase[_0x3b3bed(0xba)]()['collection'](_0x3b3bed(0xc1)),dbttbnewsLog=firebase['firestore']()[_0x3b3bed(0xa4)]('ttbnewsLog'),dbGroupNews=firebase[_0x3b3bed(0xba)]()[_0x3b3bed(0xa4)](_0x3b3bed(0xa5)),CheckData(),MyPoint(),OpenPopMenu();});function CheckData(){var _0x4b0549=_0x52f2c8;dbProfile[_0x4b0549(0x88)](_0x4b0549(0x82),'==',sessionStorage['getItem'](_0x4b0549(0xac)))[_0x4b0549(0xa3)](0x1)[_0x4b0549(0xca)]()['then'](_0x1741e5=>{var _0x283cdc=_0x4b0549;_0x1741e5[_0x283cdc(0xaa)](_0x5f38e6=>{var _0x3fae19=_0x283cdc;_0x5f38e6[_0x3fae19(0x8f)]()[_0x3fae19(0x87)]==0x1?(EidProfile=_0x5f38e6['id'],document[_0x3fae19(0xb9)](_0x3fae19(0x80))[_0x3fae19(0xce)]=_0x5f38e6[_0x3fae19(0x8f)]()[_0x3fae19(0xc8)],document[_0x3fae19(0xb9)](_0x3fae19(0x80))[_0x3fae19(0xc0)](_0x3fae19(0x83),_0x3fae19(0xad)),document[_0x3fae19(0xb9)](_0x3fae19(0x9d))['value']=_0x5f38e6['data']()[_0x3fae19(0x95)],document[_0x3fae19(0xb9)](_0x3fae19(0xbe))[_0x3fae19(0xce)]=_0x5f38e6[_0x3fae19(0x8f)]()[_0x3fae19(0x9a)],document[_0x3fae19(0xb9)](_0x3fae19(0xc3))[_0x3fae19(0xce)]=_0x5f38e6[_0x3fae19(0x8f)]()[_0x3fae19(0x81)],document[_0x3fae19(0xb9)]('txtEmpAddress')[_0x3fae19(0xce)]=_0x5f38e6['data']()['empAddress']):location[_0x3fae19(0x9e)]=_0x3fae19(0xb0);});});}function _0x4385(_0x299efa,_0x133333){var _0x41fab4=_0x41fa();return _0x4385=function(_0x438545,_0x5d2093){_0x438545=_0x438545-0x80;var _0x946fbc=_0x41fab4[_0x438545];return _0x946fbc;},_0x4385(_0x299efa,_0x133333);}function SaveProfile(){var _0x3095f6=_0x52f2c8;NewDate();var _0x15de84='';stxtEmpPhone=document[_0x3095f6(0xb9)](_0x3095f6(0x9d))[_0x3095f6(0xce)],stxtEmpRH=document[_0x3095f6(0xb9)]('txtEmpRH')[_0x3095f6(0xce)],stxtEmpBR=document[_0x3095f6(0xb9)]('txtEmpBR')[_0x3095f6(0xce)],stxtEmpAddress=document['getElementById'](_0x3095f6(0xa2))[_0x3095f6(0xce)],dbProfile[_0x3095f6(0x89)](EidProfile)['update']({'empPhone':stxtEmpPhone,'empRH':stxtEmpRH,'empBr':stxtEmpBR,'empAddress':stxtEmpAddress}),alert('ระบบทำการบันทึกรายการของคุณเรียบร้อยแล้ว');}function CheckGroupNews(){var _0x5525a1=_0x52f2c8,_0x2bed5c='',_0xa420bf=0x0;dbGroupNews['where'](_0x5525a1(0x8b),'==',0x1)[_0x5525a1(0x88)]('NewsStatus','==',0x1)[_0x5525a1(0xa6)]('NewsGroup','asc')[_0x5525a1(0xca)]()[_0x5525a1(0x9f)](_0x1cc7bb=>{var _0x46b218=_0x5525a1;_0x1cc7bb[_0x46b218(0xaa)](_0x374783=>{var _0x263c68=_0x46b218;_0x2bed5c+='<a\x20href=\x22#ttbNews\x22><div\x20class=\x22box-menu-group\x22\x20onclick=\x22CheckNews('+_0x374783[_0x263c68(0x8f)]()[_0x263c68(0xaf)]+')\x22>',_0x2bed5c+=_0x263c68(0x84)+_0x374783['data']()[_0x263c68(0xa0)]+_0x263c68(0x96),_0x2bed5c+=_0x263c68(0xb3)+_0x374783[_0x263c68(0x8f)]()[_0x263c68(0xbf)]+_0x263c68(0xcb),_0x2bed5c+=_0x263c68(0xc2)+_0x374783[_0x263c68(0x8f)]()[_0x263c68(0xab)]+'\x20ข่าว</div></div></a>',_0xa420bf=_0xa420bf+_0x374783[_0x263c68(0x8f)]()[_0x263c68(0xab)];}),_0x2bed5c+='<a\x20href=\x22#ttbNews\x22><div\x20class=\x22box-menu-group\x22\x20onclick=\x22CheckNews(0)\x22>',_0x2bed5c+=_0x46b218(0x97),_0x2bed5c+=_0x46b218(0xa1),_0x2bed5c+=_0x46b218(0xc2)+_0xa420bf+_0x46b218(0x8c),$(_0x46b218(0x91))['html'](_0x2bed5c);});}function ReadNews(_0x2ff009,_0xcf7882){var _0x3f65c1=_0x52f2c8;location[_0x3f65c1(0x9e)]=_0x3f65c1(0xae)+_0x2ff009+_0x3f65c1(0x93)+_0xcf7882+'';}function GotoHome(){var _0x429874=_0x52f2c8;location[_0x429874(0x9e)]=_0x429874(0xa7);}function GotoGroupNews(){var _0x4274c1=_0x52f2c8;location[_0x4274c1(0x9e)]='groupnews.html';}function CloseAll(){var _0x251d78=_0x52f2c8;document[_0x251d78(0xb9)](_0x251d78(0xb8))['style'][_0x251d78(0xc5)]='none';}function _0x41fa(){var _0x37d0fa=['3034083smBgop','February','empRH','May','November','txtEmpPhone','href','then','NewsIcon','<div\x20class=\x22box-menu-text-group\x22>ดูข่าวสาร<br>ทั้งหมด</div>','txtEmpAddress','limit','collection','ttbheadnews','orderBy','home.html','September','27181400HazYsA','forEach','TotalNews','LineID','DisableEmpID','readnews.html?gid=','NewsGroup','cancelpage.html','ready','January','<div\x20class=\x22box-menu-text-group\x22>','354hyqQEu','115zGmCPx','getMonth','December','menu','getElementById','firestore','getHours','October','4602264pbHzvP','txtEmpRH','NewsNameWeb','setAttribute','ttbnews','<div\x20class=\x22box-menu-count\x22>','txtEmpBR','April','display','CheckProfile','getMinutes','empName','getItem','get','</div>','EmpID_Society','8CuVbuQ','value','txtEmpName','empBr','lineID','class','<div><img\x20src=\x22','June','ttbMember','statusconfirm','where','doc','getFullYear','GroupType','\x20ข่าว</div></div></a>','2538RBRYmB','1608075KwrMbh','data','August','#DisplayGroupNews','2743623AJZyHw','&groupid=','103692AMdkhO','empPhone','\x22\x20class=\x22box-menu-img-group\x22></div>','<div><img\x20src=\x22./img/news-00.png\x22\x20class=\x22box-menu-img-group\x22></div>'];_0x41fa=function(){return _0x37d0fa;};return _0x41fa();}function NewDate(){var _0x182ebe=_0x52f2c8,_0x48badf=new Array(0xc);_0x48badf[0x0]=_0x182ebe(0xb2),_0x48badf[0x1]=_0x182ebe(0x99),_0x48badf[0x2]='March',_0x48badf[0x3]=_0x182ebe(0xc4),_0x48badf[0x4]=_0x182ebe(0x9b),_0x48badf[0x5]=_0x182ebe(0x85),_0x48badf[0x6]='July',_0x48badf[0x7]=_0x182ebe(0x90),_0x48badf[0x8]=_0x182ebe(0xa8),_0x48badf[0x9]=_0x182ebe(0xbc),_0x48badf[0xa]=_0x182ebe(0x9c),_0x48badf[0xb]=_0x182ebe(0xb7);var _0x584bc1=new Date(),_0x5e8ae9=_0x584bc1['getDate']()+'',_0x11fdcc=_0x584bc1[_0x182ebe(0xb6)]()+'',_0x3cadcb=_0x584bc1['getMonth']()+0x1+'',_0x27d1f1=_0x584bc1[_0x182ebe(0x8a)]()+'',_0xa915b4=_0x584bc1[_0x182ebe(0xbb)]()+'',_0x21e57e=_0x584bc1[_0x182ebe(0xc7)]()+'',_0x310cdc=_0x584bc1['getSeconds']()+'',_0x1af2da=_0xa915b4>=0xc?'PM':'AM';_0x5e8ae9=checkZero(_0x5e8ae9),_0x3cadcb=checkZero(_0x3cadcb),_0x27d1f1=checkZero(_0x27d1f1),_0xa915b4=checkZero(_0xa915b4),_0x21e57e=checkZero(_0x21e57e),_0x310cdc=checkZero(_0x310cdc),dateString=_0x5e8ae9+'/'+_0x3cadcb+'/'+_0x27d1f1+'\x20'+_0xa915b4+':'+_0x21e57e+':'+_0x310cdc+'\x20'+_0x1af2da,xdateCheck=_0x48badf[_0x11fdcc]+'\x20'+_0x5e8ae9+',\x20'+_0x27d1f1+'\x20'+_0xa915b4+':'+_0x21e57e+':'+_0x310cdc;}function checkZero(_0x5eaf26){return _0x5eaf26['length']==0x1&&(_0x5eaf26='0'+_0x5eaf26),_0x5eaf26;}
