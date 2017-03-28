function autorun()
{
  console.log("autorunning");
  let titleNav = document.querySelector(".title-nav")
  fixNavOnScroll(titleNav, 75);
}
if (window.addEventListener) window.addEventListener("load", autorun, false);
else if (window.attachEvent) window.attachEvent("onload", autorun);
else window.onload = autorun;

//TODO: debounce
//takes height in vh (recommend +5vh from height of item)
function fixNavOnScroll(nav, height) {
  window.addEventListener("scroll", (e) => {
    let lastScrollPos = window.scrollY;
    let swapWaypoint = getViewHeight() - 136;  //vh
    let transitionOutWaypoint = getViewHeight() - 200;
    let transitionInWaypoint = getViewHeight();
    console.log(window.scrollY)
    if(lastScrollPos > transitionOutWaypoint) {
      (transitionOutFixedNavbar = () => {
        let navTopFixed = document.querySelector(".nav-top-fixed");
        if(navTopFixed !== null) {
          // lastScrollPos - swapWaypoint
          navTopFixed.style.height = 68;
        }
      })();
    } else if(lastScrollPos <= transitionInWaypoint) {
      (transitionInFixedNavbar = () => {
        let navTopFixed = document.querySelector(".nav-top-fixed");
        if(navTopFixed !== null) {
          navTopFixed.style.height = "10vh";
        }
      })();
    }

    if(lastScrollPos > swapWaypoint && !nav.className.includes("nav-top-fixed")) {
      nav.classList.add("nav-top-fixed");
      nav.classList.remove("nav-bottom");
    } else if(lastScrollPos <= swapWaypoint && nav.className.includes("nav-top-fixed")) {
      nav.classList.remove("nav-top-fixed");
    }
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