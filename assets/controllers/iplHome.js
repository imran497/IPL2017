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


});
