var scrolled = false;

window.onscroll = function() {
  scrolled = true;
}

setInterval(function(){
  if (scrolled) {
    scrolled = false;
    scrollFunction()
  }
}, 150);

function scrollFunction() {
  var toc = document.getElementById("toc");
  var host = document.getElementById("toc-host");
  if(typeof $ != 'undefined') {
    toc = $(toc);
    host = $(host);
    var eltop = host.offset().top
    var wintop = $(window).scrollTop()

    if(wintop >= eltop) {
      if(!toc.hasClass("toc-pinned"))
        toc.addClass("toc-pinned");
    } else {
      if(toc.hasClass("toc-pinned"))
        toc.removeClass("toc-pinned");
    }
  }
}
