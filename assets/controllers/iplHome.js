$(document).ready(function(){

  $('.sliderDiv').slick({
   autoplay: true,
   arrows: false,
   autoplaySpeed: 3000,
   speed: 2000,
   draggable: false,
   pauseOnHover: false
  });

  setHeightMainDiv();
  window.onresize = function(){
    setHeightMainDiv();
  };

  function setHeightMainDiv(){
    var mainDiv = document.getElementsByClassName("mainDiv")[0];
    var heightMainDiv = mainDiv.offsetHeight;
    document.getElementsByClassName("backgroundImageDiv")[0].style.height = (heightMainDiv+10)+"px";
    document.getElementsByClassName("backgroundImageDiv")[1].style.height = (heightMainDiv+10)+"px";
  }

  var teamNames = ["srh", "dd", "rps", "kkr", "kp", "rcb" ,"mi", "gl"];
  for(var i = 0, len = teamNames.length; i < len; i++)
  {
    document.getElementById(teamNames[i]+"_like").addEventListener("click", function(){
      var teamLiked = this.getAttribute("data-team");
      $.post("/likeTeam", {teamLiked: teamLiked}, function(data){
        if(data == "Selected")
        {
          alert("selected");
          getPercents();
        }
        else {
          alert(data);
        }
      });
    });
  }


  var getPercents = function(){
    $.post("/", function(likesData){
      likesData = JSON.parse(likesData);
      var total = 0;
      var len = likesData.length;
      for(var i = 0; i < len; i++)
      {
        total = total + likesData[i].likes;
      }
      for(var i = 0; i < len; i++)
      {
        document.getElementById(likesData[i].team_name_key).children[0].style.width = ((likesData[i].likes/total)*100)+"%";
        document.getElementById(likesData[i].team_name_key+"_count").innerHTML = likesData[i].likes;
      }
    });
  };


  getPercents();

});
