function autorun()
{
  console.log("autorunning");
  let titleNav = document.querySelector(".title-nav")
  fixNavOnScroll(titleNav);
}
if (window.addEventListener) window.addEventListener("load", autorun, false);
else if (window.attachEvent) window.attachEvent("onload", autorun);
else window.onload = autorun;

//TODO: debounce and determine scroll direction
//takes height in vh (recommend +5vh from height of item)
function fixNavOnScroll(nav) {
  var prevScrollPos = 0
  var navTopFixed = document.querySelector(".nav-top-fixed");
  window.addEventListener("scroll", (e) => {
    let lastScrollPos = window.scrollY;
    let vh = getViewHeight();
    let vhOne = vh * .01; //taking advantage of navbar being 10vh
    let swapWaypoint = vh - nav.offsetHeight;

    if(lastScrollPos < swapWaypoint) {
      let newHeight = swapWaypoint - lastScrollPos;
      if(newHeight < 0) {
        newHeight = 0;
      } else if(newHeight > vh * .1) {    //taking advantage of navbar being 10vh
        newHeight = vh * .1;
      }   
      navTopFixed.style.height = newHeight + "px";
    }

    if(lastScrollPos > swapWaypoint &&  !nav.className.includes("nav-top-fixed")) {
      nav.classList.add("nav-top-fixed");
      nav.classList.remove("nav-bottom");
    } else if(lastScrollPos <= swapWaypoint && nav.className.includes("nav-top-fixed")) {
      nav.classList.remove("nav-top-fixed");
    }
    prevScrollPos = lastScrollPos;
  });

}

//only supports standards compliant browsers
//to add IE support, see:
//http://stackoverflow.com/questions/1766861/find-the-exact-height-and-width-of-the-viewport-in-a-cross-browser-way-no-proto
function getViewHeight() {
  if(typeof window.innerHeight != 'undefined') {
    return window.innerHeight
  }

  throw 'window.innerHeight not set';
  return undefined;
}