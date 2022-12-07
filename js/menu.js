var xLine = "";
xLine += '<div style="margin:10px 0 20px 0;">';
xLine += '<div class="container" style="width:100%;padding:5px;">';
xLine += '<div style="width:95px;float: left;text-align: center;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="Profile-img"></div>';
xLine += '<div class="Profile-title"><b>สุวิทย์ ชัยรุ่งปัญญาxxx</b><br>LineName : Website<br>Phone : 0837850099</div>';
xLine += '</div></div><div class="clr"></div>';
xLine += '<div style="height: 70px;background-color: #fff;">';
xLine += '<div class="box-reward1"> </div>';
xLine += '<div class="box-reward"><div class="XPpoint">1</div>ระดับ<br>ผู้แข่งขัน</div>';
xLine += '<div class="box-reward"><div class="XPpoint">45.98</div>คะแนน<br>ประสบการณ์</div>';
xLine += '<div class="box-reward"><div class="XPpoint">45.98</div>คะแนน<br>แลกรางวัล</div>';
xLine += '<div class="box-reward1"> </div>';
xLine += '</div><div style="margin-top:25px;">';
xLine += '<ul><li class="active"><a href="home.html">ระบบงาน LINE Retail Society</a></li>';
xLine += '<li class="drop-down"><a href="">About</a>';
xLine += '<ul><li><a href="about.html">About Us</a></li><li><a href="team.html">Team</a></li>';
xLine += '<li><a href="testimonials.html">Testimonials</a></li>';
xLine += '<li class="drop-down"><a href="#">Deep Drop Down</a>';
xLine += '<ul><li><a href="#">Deep Drop Down 1</a></li>';
xLine += '<li><a href="#">Deep Drop Down 2</a></li><li><a href="#">Deep Drop Down 3</a></li>';
xLine += '<li><a href="#">Deep Drop Down 4</a></li><li><a href="#">Deep Drop Down 5</a></li></ul></li></ul></li>';
xLine += '<li><a href="services.html">Services</a></li><li><a href="portfolio.html">Portfolio</a></li>';
xLine += '<li><a href="news.html">ข่าวสารองค์กร</a></li><li><a href="blog.html">Blog</a></li>';
xLine += '<li><a href="contact.html">Contact</a></li></ul></div>';
$("#MenuSociety").html(xLine);  
//document.getElementById('MenuSociety').style.display='block';
$("#XPpoint").html("55 คะแนน");  


/*
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">
      <h1 class="logo mr-auto"><a href="index.html"><span>LINE</span> Retail Society</a></h1>
      <nav class="nav-menu d-none d-lg-block" style="background: #d6ebff;">
        <div style="margin:10px 0 20px 0;">
          <div class="container" style="width:100%;padding:5px;">
            <div id="MenuSociety"></div>
          </div>
        </div>
      </nav>
    </div>
  </header>
*/
