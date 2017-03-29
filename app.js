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
  let navTopFixed = document.querySelector(".nav-top-fixed");
  let fixNavHeight = navTopFixed.offsetHeight;
  window.addEventListener("scroll", (e) => {
    let lastScrollPos = window.scrollY;
    let vh = getViewHeight();
    let vhOne = vh * .01;
    let swapWaypoint = vh - nav.offsetHeight;

    let transitionHalfWaypoint = vh - (nav.offsetHeight + fixNavHeight + vhOne);
    let transitionInWaypoint = transitionHalfWaypoint  + vhOne;

    if(lastScrollPos > transitionHalfWaypoint && lastScrollPos < swapWaypoint && navTopFixed.style.height != 0 && navTopFixed.style.height != "5vh") {
      console.log("first collapse")
        if(navTopFixed !== null) {
          navTopFixed.style.height = "5vh";
        }
    } else if (lastScrollPos > swapWaypoint - fixNavHeight* 0.5) {
      console.log("second collapse", lastScrollPos, swapWaypoint - fixNavHeight * .75);
      navTopFixed.style.height = "0";
    } else if(lastScrollPos < transitionInWaypoint && lastScrollPos < prevScrollPos) {
      console.log("expand")
        if(navTopFixed !== null) {
          navTopFixed.style.height = "10vh";
        }
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