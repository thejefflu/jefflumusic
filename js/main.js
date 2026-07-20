// -----------------
// SMOOTH SCROLLING
// -----------------

const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



// -----------------
// ON-SCROLL EFFECTS
// -----------------

window.addEventListener('scroll', reveal);
window.addEventListener('resize', reveal);

function reveal(){
  var reveals = document.querySelectorAll('.reveal');

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 50;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('shown');
    } else {
      reveals[i].classList.remove('shown');
    }
  }
}

(function () {
  // threshold in em
  const thresholdEm = 999;
  const pxPerEm = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const thresholdPx = thresholdEm * pxPerEm;

  if (window.innerWidth < thresholdPx) {
    const viewportHeight = window.innerHeight;

    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible =
        rect.top < viewportHeight && rect.bottom > 0; // element intersects viewport

      if (isVisible) {
        el.classList.remove('reveal');
      }
    });
  }
})();



// -----------------
// JUMP NAVIGATION
// -----------------

var navMenu = document.getElementById("nav-menu");

function smoothScroll(target, duration) {
  navMenu.checked = false;
  target = document.querySelector(target);

  let offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0;

  let targetPosition = target.getBoundingClientRect().top - offset;
  let startPosition = window.scrollY;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;

    let run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t * t + b;
    t -= 2;
    return -c / 2 * (t * t * t * t - 2) + b;
  }

  requestAnimationFrame(animation);
}

function smoothScrollNoOffset(target, duration) {
  navMenu.checked = false;
  target = document.querySelector(target);

  let offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0;

  let targetPosition = target.getBoundingClientRect().top - offset;
  let startPosition = window.scrollY;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;

    let run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t * t + b;
    t -= 2;
    return -c / 2 * (t * t * t * t - 2) + b;
  }

  requestAnimationFrame(animation);
}

function menuOff() {
  navMenu.checked = false;
}

var nav0 = document.querySelector('.logomark');
nav0.addEventListener('click', function() {
  smoothScrollNoOffset('.scroll-helper-top', 1500);
});

var nav1 = document.querySelector('.nav-bio');
nav1.addEventListener('click', function() {
  smoothScroll('.scroll-helper-bio', 1500);
});

var nav2 = document.querySelector('.nav-services');
nav2.addEventListener('click', function() {
  smoothScroll('.scroll-helper-services', 1500);
});

var nav3 = document.querySelector('.nav-music');
nav3.addEventListener('click', function() {
  smoothScroll('.scroll-helper-music', 1500);
});

var nav4 = document.querySelector('.nav-faq');
nav4.addEventListener('click', function() {
  smoothScroll('.scroll-helper-faq', 1500);
});

var nav5 = document.querySelector('.nav-contact');
nav5.addEventListener('click', function() {
  smoothScrollNoOffset('.scroll-helper-bottom', 1500);
});

var nav6 = document.querySelector('.nav-music-2');
nav6.addEventListener('click', function() {
  smoothScroll('.scroll-helper-music', 1500);
});

var nav7 = document.querySelector('.nav-music-3');
nav7.addEventListener('click', function() {
  smoothScroll('.scroll-helper-music', 1500);
});

var nav8 = document.querySelector('.nav-music-4');
nav8.addEventListener('click', function() {
  smoothScroll('.scroll-helper-music', 1500);
});

var nav9 = document.querySelector('.nav-contact-1');
nav9.addEventListener('click', function() {
  smoothScroll('.scroll-helper-bottom', 1500);
});

var nav10 = document.querySelector('.nav-services-1');
nav10.addEventListener('click', function() {
  smoothScroll('.scroll-helper-services', 1500);
});

var nav11 = document.querySelector('.nav-contact-2');
nav11.addEventListener('click', function() {
  smoothScrollNoOffset('.scroll-helper-bottom', 1500);
});



// -----------------
// DYNAMIC HEADER
// -----------------

window.addEventListener("scroll", function() {
  var logomark = document.querySelector('.logomark');
  logomark.classList.toggle("active", window.scrollY > 600);
});



// -----------------
// HAMBURGER MENU SCROLL PREVENTION
// -----------------

document.getElementById("nav-menu").addEventListener("change", (e) => {
  if (e.target.checked) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

function enableScroll() {
  lenis.start();
}


// -----------------
// FOLD PARALLAX
// -----------------

(function() {
  const fold = document.querySelector('.fold');
  const speed = 0.2; // smaller = slower movement

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    fold.style.transform = `translateY(${scrollY * speed}px)`;
  });
})();



// -----------------
// LOGO TICKER
// -----------------

var copy = document.querySelector(".logos").cloneNode(true);
document.querySelector(".container-logos").appendChild(copy);

const tracks = document.querySelectorAll(".logos");
const ticker = document.querySelector(".container-logos");

// Create animations for all tracks
const animations = [...tracks].map(track =>
  track.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-100%)" }
    ],
    {
      duration: 35000,
      iterations: Infinity,
      easing: "linear"
    }
  )
);

// Smoothly interpolate the playback rate
function smoothPlaybackRate(animation, targetRate, duration = 500) {
  const startRate = animation.playbackRate;
  const startTime = performance.now();

  function update(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; 
    // easeInOutQuad

    animation.updatePlaybackRate(startRate + (targetRate - startRate) * eased);

    if (t < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

ticker.addEventListener("mouseenter", () => {
  animations.forEach(anim => smoothPlaybackRate(anim, 0.5, 500)); 
  // 0.2 = slow rate, 800ms easing
});

ticker.addEventListener("mouseleave", () => {
  animations.forEach(anim => smoothPlaybackRate(anim, 1, 500)); 
  // back to normal at 800ms easing
});



// -----------------
// TESTIMONIAL TICKER
// -----------------

const container = document.querySelector(".testimonial-ticker");

var copy = document.querySelector(".testimonial-container").cloneNode(true);
var copyTwo = document.querySelector(".testimonial-container").cloneNode(true);
container.appendChild(copy);
container.appendChild(copyTwo);

function onScroll() {
  const rect = container.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // How far the container has entered the viewport (0 → 1)
  const progress = Math.min(
    Math.max((viewportHeight - rect.top) / (viewportHeight + rect.width), 0),
    1
  );

  // How far we can scroll horizontally
  const maxTranslate =
    container.scrollWidth - container.clientWidth;

  // Map vertical progress → horizontal movement
  const translateX = -1750 - progress * .8 * maxTranslate;

  container.style.transform = `translateX(${translateX}px)`;
}

window.addEventListener("scroll", onScroll);
window.addEventListener("resize", onScroll);



// -----------------
// TESTIMONIAL MODAL
// -----------------

const reviews = [
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/yelp.png",
    adPlatformLink: "https://www.yelp.com/biz/jeff-lu-glendora-13",
    body: "We had an incredible experience with our violist Jeff at our wedding. From the very beginning, he was professional, flexible, and genuinely invested in making the music feel personal to us. Jeff went above and beyond by learning modern songs and even putting together K-pop mixes that meant a lot to us and our guests.\n\nThe performance itself was beautiful and created such a memorable atmosphere throughout the ceremony and reception. So many guests came up to us afterward asking about the music and complimenting how unique and elegant it felt.\n\nWhat we appreciated most was how collaborative he was throughout the process. He worked closely with us, listened to what we wanted, and made adjustments to ensure everything was perfect. You can tell he truly cares about his craft and about giving couples a special experience. The bridal entrance was perfectly executed with our favorite song.\n\nWe would absolutely recommend Jeff to anyone looking for a talented musician who can blend classical elegance with modern music in a way that feels fresh, personal, and unforgettable.",
    note: "\nThis review has been edited for clarity.",
    clientPhoto: "assets/imgs/4-testimonials/client-photos/george.jpg",
    name: "George",
    metadata: "Groom ∙ May 2026"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/google.png",
    adPlatformLink: "https://share.google/nbOKlWpMNAy7DfqIE",
    body: "I hired Jeff to play at my daughter’s 15th birthday. Prior to the party, Jeff was very communicative and inquired on the type of music we’d like for him to perform. His professionalism is on another level. He was kind and arrived early to set up. His attire was perfect for the event and his demeanor was perfect as well. This was all prior to performing.\n\nJeff arrived ready to perform with a wireless speaker and his viola. The moment he began playing, my guests were blown away. I have received so many compliments on my party due to Jeff making it so special. My daughter was so excited to have him perform and he did not disappoint. We will hire Jeff for all our future events because we were beyond satisfied! Jeff has true talent, professionalism, presence, and is so kind.",
    note: null,
    clientPhoto: "assets/imgs/4-testimonials/client-photos/vanessa.jpg",
    name: "Vanessa",
    metadata: "Party Host ∙ Dec 2025"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/zola.png",
    adPlatformLink: "https://www.zola.com/wedding-vendors/wedding-bands-djs/jefflumusic",
    body: "We hired Jeff Lu to perform at our wedding ceremony and cocktail hour, and he absolutely made those moments feel magical. From our first conversation, Jeff was easy to work with and responded quickly to every question we had. His talent on the viola is undeniable—our guests couldn't stop talking about him. The music he chose created the perfect atmosphere, elevating the whole vibe of our day without being distracting. If you're looking for a musician who is both professional and genuinely passionate about what he does, Jeff is your person. We're so grateful he was part of our celebration.",
    note: "\nThis review has been edited for clarity.",
    clientPhoto: "assets/imgs/4-testimonials/client-photos/anais.jpg",
    name: "Anais",
    metadata: "Bride ∙ May 2026"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/google.png",
    adPlatformLink: "https://share.google/nbOKlWpMNAy7DfqIE",
    body: "Jeff was absolutely amazing. He took our taste in music into consideration, made a killer set list, seamlessly set up for the event, and gave a wonderful performance! He was very easy to communicate and coordinate with and is a talented violist. All of our guests thought he made the ambiance even more special and left a lasting impression on everyone. I would recommend Jeff for any event one would want to elevate the atmosphere for.",
    note: null,
    clientPhoto: "assets/imgs/4-testimonials/client-photos/giselle.jpg",
    name: "Giselle",
    metadata: "Bride ∙ Oct 2025"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/google.png",
    adPlatformLink: "https://share.google/nbOKlWpMNAy7DfqIE",
    body: "Working with Jeff has been an incredible experience from start to finish. I reached out to commission a custom processional song for my wedding, and he truly brought my vision to life. He took the time to listen to exactly what I wanted, offered thoughtful suggestions that made the piece even better, and executed everything beautifully. His communication, creativity, and attention to detail made the entire process easy and enjoyable. I genuinely can’t wait to walk down the aisle to a song that feels so personal and meaningful. I highly recommend Jeff to anyone looking for a talented musician who cares deeply about creating something special.",
    note: null,
    clientPhoto: "assets/imgs/4-testimonials/client-photos/taylor.jpg",
    name: "Taylor",
    metadata: "Bride ∙ Sep 2026"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/google.png",
    adPlatformLink: "https://share.google/nbOKlWpMNAy7DfqIE",
    body: "We worked with Jeff and we are so happy that we found him! He was the best - so professional and easy to work with, great at communicating with us and keeping us updated. He was so helpful during the planning/music selection process. Super enjoyable experience and he was a hit at the wedding!!!!!!! He played beautifully and I lost count of how many guests commented on how beautifully he played.\nFinding a vendor/artist that can deliver your vision is a challenge, but finding someone who can deliver AND is a great person to collaborate with is the absolute best.\n\nJeff thank you so much for being so flexible and enjoyable to work with. We loved having you play on our special day!",
    note: null,
    clientPhoto: "assets/imgs/4-testimonials/client-photos/jennifer.jpg",
    name: "Jennifer",
    metadata: "Bride ∙ Jun 2026"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/zola.png",
    adPlatformLink: "https://www.zola.com/wedding-vendors/wedding-bands-djs/jefflumusic",
    body: "We hired Jeff Lu to play viola at our daughter's quinceañera and couldn't have been happier with our choice. Even though it was his first quinceañera, Jeff brought such professionalism and elegance to the event that you would never have known it. He was willing to rehearse with an opera singer the same day, which showed how dedicated he was to making our celebration special. Jeff stayed responsive throughout our planning process and handled all our last-minute requests with a great attitude. He looked sharp, played beautifully, and connected with our guests in a way that made the whole day feel memorable. We're so grateful to Jeff for bringing such grace and care to our daughter's milestone.",
    note: "\nThis review has been edited for clarity.",
    clientPhoto: "assets/imgs/4-testimonials/client-photos/sarah.jpg",
    name: "Sarah",
    metadata: "Party Host ∙ May 2026"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/google.png",
    adPlatformLink: "https://share.google/nbOKlWpMNAy7DfqIE",
    body: "Working with Jeff Lu Music was one of the best decisions we made for our wedding. From our first conversation through the big day, everything felt organized and seamless. Jeff went above and beyond during our ceremony—he learned a song that wasn't in his usual rotation because it was so important to us. He also provided recordings before our rehearsal so we could hear exactly how it would sound. The live music he played was flawless and made our ceremony feel intimate and personal. We can't recommend Jeff Lu Music enough.",
    note: null,
    clientPhoto: "assets/imgs/4-testimonials/client-photos/alivia.jpg",
    name: "Alivia",
    metadata: "Bride ∙ May 2026"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/google.png",
    adPlatformLink: "https://share.google/nbOKlWpMNAy7DfqIE",
    body: "Jeff was absolutely amazing to work with. From our initial introduction, he was warm, welcoming, and incredibly helpful from start to finish. He was even able to accommodate last-minute changes for our big day, which made a world of difference.\n\nMy entire experience with Jeff was wonderful, and I never had any doubts or worries working with him. He answered every question I had and was so communicative throughout the entire process. He was professional, reliable, and truly a pleasure to work with.\n\nHis beautiful talent made our wedding day that much more special, and I would absolutely recommend him to anyone looking for an exceptional violinist.",
    note: "\nThis review has been edited for clarity.",
    clientPhoto: "assets/imgs/4-testimonials/client-photos/alexis.jpg",
    name: "Alexis",
    metadata: "Bride ∙ Jul 2026"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/zola.png",
    adPlatformLink: "https://www.zola.com/wedding-vendors/wedding-bands-djs/jefflumusic",
    body: "Jeff Lu performed as a violist at our daughter’s wedding. Working with Jeff was an outstanding experience. He was not only prompt, but early. He performed beautifully, and was fully aware of and sensitive to the surroundings and occasion. His music was first class, and his demeanor and cheerful presence added a great deal to the ceremonies. I highly recommend Jeff for his viola skills to anyone needing music for their events.",
    note: null,
    clientPhoto: "assets/imgs/4-testimonials/client-photos/yu-fahn.jpg",
    name: "Yu-Fahn",
    metadata: "Father of the Bride ∙ Sep 2025"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/google.png",
    adPlatformLink: "https://share.google/nbOKlWpMNAy7DfqIE",
    body: "Jeff was absolutely AMAZING!! He performed during the ceremony and cocktail hour of our wedding. His performance was beautiful, fun and entertaining for our guests. He was wonderful to work with throughout the whole planning process and communicated throughout the planning process. Our guests still talk about how amazing he was, we couldn't be happier! Highly recommend Jeff!",
    note: null,
    clientPhoto: "assets/imgs/4-testimonials/client-photos/haley.jpg",
    name: "Haley",
    metadata: "Bride ∙ Apr 2026"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/google.png",
    adPlatformLink: "https://share.google/nbOKlWpMNAy7DfqIE",
    body: "We hired Jeff to play viola for our wedding ceremony and cocktail hour and could not have been happier. He was responsive, flexible, and on top of every detail from start to finish. The highlight for our guests was a custom Top Gun Anthem cover for the bride's entrance that was exactly as cool as it sounds and a massive hit with everyone there. Highly recommend him for any wedding or event!",
    note: null,
    clientPhoto: "assets/imgs/4-testimonials/client-photos/drew.jpg",
    name: "Drew",
    metadata: "Groom ∙ Apr 2026"
  },
  {
    adPlatform: "assets/imgs/4-testimonials/ad-platforms/yelp.png",
    adPlatformLink: "https://www.yelp.com/biz/jeff-lu-glendora-13",
    body: "Jeff was wonderful and we highly recommend him! He's an amazing violist. My wife and I just got married very recently in May and Jeff played during our ceremony; he played beautifully. We even asked him to learn a new song for us that's totally foreign to him since it's not English. He nailed it! He's also very responsive to text and easy to communicate with. Thank you Jeff.",
    note: null,
    clientPhoto: "assets/imgs/4-testimonials/client-photos/lilet.jpg",
    name: "Lilet",
    metadata: "Bride ∙ May 2026"
  }
];

const modal = document.getElementById("testimonialModal");
const review = document.querySelector(".review");
const info = document.querySelector(".info");

const reviewAdPlatform = document.querySelector(".ad-platform");
const reviewAdPlatformLink = document.querySelector(".ad-platform-link");
const reviewBody = document.querySelector(".review-body");
const reviewNote = document.querySelector(".review-note");
const reviewName = document.querySelector(".review-name");
const reviewClientPhoto = document.querySelector(".client-photo");
const reviewMetadata = document.querySelector(".review-metadata");
const reviewNumber = document.querySelector(".review-number");

let currentReview = 0;

let isAnimating = false;

function renderReviewNoAnimation(index) {
  reviewAdPlatform.src = reviews[index].adPlatform;
  reviewAdPlatformLink.href = reviews[index].adPlatformLink;
  reviewBody.textContent = reviews[index].body;
  reviewNote.textContent = reviews[index].note ? reviews[index].note : "";
  reviewNote.style.display = reviews[index].note ? "block" : "none";
  reviewName.textContent = reviews[index].name;
  reviewClientPhoto.src = reviews[index].clientPhoto;
  reviewMetadata.textContent = reviews[index].metadata;
  reviewNumber.textContent =
    String(index + 1).padStart(2, "0") +
    " / " +
    String(reviews.length).padStart(2, "0");
}

function renderReviewFromRight(index) {
  if (isAnimating) return;
  isAnimating = true;

  // old review exits left
  review.classList.add("left");
  info.classList.add("left");
  reviewNumber.classList.add("left");

  setTimeout(() => {
    // update content after exit    
    reviewAdPlatform.src = reviews[index].adPlatform;
    reviewAdPlatformLink.href = reviews[index].adPlatformLink;
    reviewBody.textContent = reviews[index].body;
    reviewNote.textContent = reviews[index].note ? reviews[index].note : "";
    reviewNote.style.display = reviews[index].note ? "block" : "none";
    reviewName.textContent = reviews[index].name;
    reviewClientPhoto.src = reviews[index].clientPhoto;
    reviewMetadata.textContent = reviews[index].metadata;
    reviewNumber.textContent =
      String(index + 1).padStart(2, "0") +
      " / " +
      String(reviews.length).padStart(2, "0");

    // remove exit state
    review.classList.remove("left");
    info.classList.remove("left");
    reviewNumber.classList.remove("left");

    // disable transition temporarily
    review.style.transition = "none";
    info.style.transition = "none";
    reviewNumber.style.transition = "none";

    // position new review offscreen right instantly
    review.classList.add("right");
    info.classList.add("right");
    reviewNumber.classList.add("right");

    requestAnimationFrame(() => {
      // re-enable transition AFTER browser paints
      review.style.transition = "";
      info.style.transition = "";
      reviewNumber.style.transition = "";

      requestAnimationFrame(() => {
        // animate to center
        review.classList.remove("right");
        info.classList.remove("right");
        reviewNumber.classList.remove("right");
      });
    });

    setTimeout(() => {
      isAnimating = false;
    }, 375);

  }, 375);
}

function renderReviewFromLeft(index) {
  if (isAnimating) return;
  isAnimating = true;

  // old review exits right
  review.classList.add("right");
  info.classList.add("right");
  reviewNumber.classList.add("right");

  setTimeout(() => {
    // update content after exit
    reviewAdPlatform.src = reviews[index].adPlatform;
    reviewAdPlatformLink.href = reviews[index].adPlatformLink;
    reviewBody.textContent = reviews[index].body;
    reviewNote.textContent = reviews[index].note ? reviews[index].note : "";
    reviewNote.style.display = reviews[index].note ? "block" : "none";
    reviewName.textContent = reviews[index].name;
    reviewClientPhoto.src = reviews[index].clientPhoto;
    reviewMetadata.textContent = reviews[index].metadata;
    reviewNumber.textContent =
      String(index + 1).padStart(2, "0") +
      " / " +
      String(reviews.length).padStart(2, "0");

    // remove exit state
    review.classList.remove("right");
    info.classList.remove("right");
    reviewNumber.classList.remove("right");

    // disable transition temporarily
    review.style.transition = "none";
    info.style.transition = "none";
    reviewNumber.style.transition = "none";

    // position new review offscreen left instantly
    review.classList.add("left");
    info.classList.add("left");
    reviewNumber.classList.add("left");

    requestAnimationFrame(() => {
      // re-enable transition AFTER browser paints
      review.style.transition = "";
      info.style.transition = "";
      reviewNumber.style.transition = "";

      requestAnimationFrame(() => {
        // animate to center
        review.classList.remove("left");
        info.classList.remove("left");
        reviewNumber.classList.remove("left");
      });
    });

    setTimeout(() => {
      isAnimating = false;
    }, 375);

  }, 375);
}

function openModal(index) {
  currentReview = index;
  renderReviewNoAnimation(currentReview);
  modal.classList.add("active");
  lenis.stop();
}

function closeModal() {
  modal.classList.remove("active");
  lenis.start();
}

document.querySelectorAll(".review-trigger").forEach(button => {
  button.addEventListener("click", () => {
    openModal(Number(button.dataset.review));
  });
});

document.getElementById("prevReview").addEventListener("click", () => {
  currentReview = (currentReview - 1 + reviews.length) % reviews.length;
  renderReviewFromLeft(currentReview);
});

document.getElementById("nextReview").addEventListener("click", () => {
  currentReview = (currentReview + 1) % reviews.length;
  renderReviewFromRight(currentReview);
});

document.querySelector(".close-modal").addEventListener("click", closeModal);
document.querySelector(".modal-overlay").addEventListener("click", closeModal);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") prevReview.click();
  if (e.key === "ArrowRight") nextReview.click();
  if (e.key === "Escape") closeModal();
});



// -----------------
// REPERTOIRE/FAQ ACCORDIONS
// -----------------

document.querySelectorAll('.accordion').forEach(acc => {
  const content = acc.querySelector('.accordion-content');

  // Remove inline height so we can reapply cleanly
  function clearTransitionEnd() {
    content.removeEventListener('transitionend', onOpenEnd);
    content.removeEventListener('transitionend', onCloseEnd);
  }

  function onOpenEnd(e) {
    if (e.propertyName !== 'height') return; // Only react to height changes
    content.style.height = 'auto';
    clearTransitionEnd();
  }

  function onCloseEnd(e) {
    if (e.propertyName !== 'height') return;
    reveal(); // run fade-in logic
    clearTransitionEnd();
  }

  acc.addEventListener('click', () => {
    if (event.target.closest('a, button, input, textarea, select')) return;

    clearTransitionEnd(); // kill old listeners

    if (acc.classList.contains('active')) {
      // Closing
      content.style.height = content.scrollHeight + 'px';
      requestAnimationFrame(() => {
        content.style.height = '0px';
      });
      content.addEventListener('transitionend', onCloseEnd);
      acc.classList.remove('active');

    } else {
      // Opening
      content.style.height = content.scrollHeight + 'px';
      content.addEventListener('transitionend', onOpenEnd);
      acc.classList.add('active');
    }
  });
});


// TODO: ditch this in lieu of static CSS breakpoints

// -----------------
// PORTFOLIO STAGGERING
// -----------------

// function calculateColumns() {
//   const grid = document.querySelector('.video-grid');
//   if (!grid) return;

//   const items = [...grid.querySelectorAll('.video')];
//   if (!items.length) return;

//   const gridWidth = grid.clientWidth;
//   const itemWidth = items[0].getBoundingClientRect().width;

//   const cols = Math.max(1, Math.floor(gridWidth / itemWidth));

//   applyGridStagger(cols);
// }

// function applyGridStagger(cols) {
//   const grid = document.querySelector('.video-grid');
//   if (!grid) return;

//   const items = [...grid.querySelectorAll('.video')];

//   items.forEach((el, index) => {
//     el.classList.remove('stagger');

//     const col = (index % cols) + 1;

//     // Stagger even-numbered columns
//     if (col % 2 === 0) {
//       el.classList.add('stagger');
//     }
//   });
// }

// window.addEventListener('load', calculateColumns);
// window.addEventListener('resize', calculateColumns);