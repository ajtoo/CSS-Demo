function autorun()
{
  let titleNav = document.querySelector(".title-nav");
  let navModal = document.getElementById("attach-nav-code");
  let navButton = document.getElementById("nav-code-button");
  let flipModal = document.getElementById("flip-code");
  let flipButton = document.getElementById("flip-code-button");
  let rotateModal = document.getElementById("rotate-code");
  let rotateButton = document.getElementById("rotate-code-button");
  let carouselModal = document.getElementById("carousel-code");
  let carouselButton = document.getElementById("carousel-code-button");
  fixNavOnScroll(titleNav);
  bindModalToButton(navModal, navButton);
  bindModalToButton(flipModal, flipButton);
  bindModalToButton(rotateModal, rotateButton);
  bindModalToButton(carouselModal, carouselButton);

  let carousel = document.querySelector(".carousel");
  let carouselButtons = document.querySelector(".carousel-controls").children;
  let leftButton = carouselButtons[0];
  let rightButton = carouselButtons[1];

  rightButton.addEventListener("click", () => rotateCarousel(carousel, "right"));
  leftButton.addEventListener("click", () => rotateCarousel(carousel, "left"));
}
if (window.addEventListener) window.addEventListener("load", autorun, false);
else if (window.attachEvent) window.attachEvent("onload", autorun);
else window.onload = autorun;

function fixNavOnScroll(nav) {
  let navTopFixed = document.querySelector(".nav-top-fixed");
  let navTopInitialHeight = 0;
  if(navTopFixed) 
    navTopInitialHeight = navTopFixed.offsetHeight; 
  window.addEventListener("scroll", (e) => {
    let lastScrollPos = window.scrollY;
    let vh = getViewHeight();
    let swapWaypoint = vh - nav.offsetHeight;
    
    if(navTopFixed) {
      if(lastScrollPos < swapWaypoint) {
        let newHeight = swapWaypoint - lastScrollPos;
        if(newHeight <= 0) {
          newHeight = 0;
        } else if(newHeight > navTopInitialHeight) {
          newHeight = navTopInitialHeight;
        }   
        navTopFixed.style.height = newHeight + "px";
        nav.style.marginBottom = "-" + (nav.offsetHeight - newHeight) + "px";
      }
    }

    if(lastScrollPos > swapWaypoint &&  !nav.className.includes("nav-top-fixed")) {
      nav.classList.add("nav-top-fixed");
      nav.classList.remove("nav-bottom");
    } else if(lastScrollPos <= swapWaypoint && nav.className.includes("nav-top-fixed")) {
      nav.classList.remove("nav-top-fixed");
    }
  });
}

function bindModalToButton(modal, button) {
  button.addEventListener("click", () => {
    modal.style.display= "flex";
  });
  modal.addEventListener("click", (e) => {
    modal.style.display= "none";
  });
  modal.querySelector(".modal-content").addEventListener("click", (e) => {
    e.stopPropagation();
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

function rotateCarousel(carousel, direction) {
  let numItems = carousel.children.length;
  let rotationIncrement = 360/numItems;

  for(let i = 0; i < numItems; ++i) {
    if(direction === "right")
      rotateCard(carousel.children[i], rotationIncrement , i);
    else
      rotateCard(carousel.children[i], rotationIncrement * -1, i);
  }
}

function rotateCard(card, deg, order) {
  if(card.style && card.style.transform) {
    let newRotation = Number((/-?\d+/.exec(card.style.transform))) + deg;
    card.style.transform = `rotateY(${newRotation}deg) translateZ(25vh)`;
  } else {
    let initialRotation;
    if(deg > 0) 
      initialRotation = deg + deg * order;
    else
      initialRotation = deg + deg * order * -1;
    card.style.transform = `rotateY(${initialRotation}deg) translateZ(25vh)`;
  }
}