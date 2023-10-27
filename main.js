import './style.styl'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

gsap.registerPlugin(ScrollTrigger)
const mm = gsap.matchMedia()

const sel = (e) => document.querySelector(e)
const selAll = (e) => document.querySelectorAll(e)
const vh = (e) => window.innerHeight * (e / 100)
const vw = (e) => window.innerWidth * (e / 100)

const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

switch (sel('.page-wrapper').getAttribute('data-page')) {
  case 'home':
    home()
    break
  case 'study':
    study()
    break
  case 'studies':
    studies()
    break
  case 'services':
    services()
    break
  case 'service':
    service()
    break
  case 'about':
    about()
    break
  case 'blog':
    blog()
    break
  case 'blog-post':
    blogPost()
    break
  case 'contact':
    contact()
    break
  case 'terms':
    terms()
    break
  case 'error':
    error()
    break
  default:
    console.log('unknown data-page')
}
ScrollTrigger.create({
  animation: gsap.timeline().to('.navbar-sticky-wrap', { y: 0, opacity: 1 }, 0),
  trigger: 'body',
  start: vh(100) + ' top',
  toggleActions: 'play none none reverse',
})

function home() {
  mm.add('(min-width: 992px)', () => {
    const propsItemsTl = gsap.from([...selAll('.props__item')], { opacity: 0, y: 100, duration: 2.5, ease: 'power4.out', stagger: 0.2 }, 0)

    ScrollTrigger.create({
      animation: propsItemsTl,
      trigger: '.props__grid',
      start: 'top center',
    })
  })
  testSliderInit()
  presenceSliderInit()
  trendsSliderInit()
  bumpSliderInit()
  mm.add('(max-width: 991px)', () => {})
  console.log('sf')
}

function study() {
  studyGallerySliderInit()
  studyMoreSliderInit()
}
function studies() {
  testSliderInit()
}
function service() {
  testSliderInit()
  presenceSliderInit()
}
function services() {
  testSliderInit()
}

function testSliderInit() {
  const testSlider = new Splide('.testimonials__slider', {
    arrows: false,
    pagination: false,
    gap: '4rem',
    type: 'loop',
    perPage: 2,
    // focus: 'center',
    // autoWidth: true,
    breakpoints: {
      991: {
        perPage: 1,
      },
      767: {
        gap: '1rem',
      },
    },
    autoScroll: { speed: 1, autoStart: true },
  }).mount({ AutoScroll })

  sel('.testimonials__arrows .arrow--left').addEventListener('click', (e) => {
    testSlider.go('+1')
  })
  sel('.testimonials__arrows .arrow:not(.arrow--left)').addEventListener('click', (e) => {
    testSlider.go('-1')
  })
}
function presenceSliderInit() {
  const presenceSplide = new Splide('.presence__slider', {
    arrows: false,
    pagination: false,
    gap: '3rem',
    // type: 'loop',
    perPage: 3,
    // focus: 'center',
    // autoWidth: true,
    breakpoints: {
      991: {
        perPage: 2,
      },
      767: {
        perPage: 1,
      },
    },
  }).mount()

  sel('.presence__arrows .round-arrow--left').addEventListener('click', (e) => {
    presenceSplide.go('+1')
  })
  sel('.presence__arrows .round-arrow:not(.round-arrow--left)').addEventListener('click', (e) => {
    presenceSplide.go('-1')
  })
}

function trendsSliderInit() {
  const trendsSplide = new Splide('.trends__slider', {
    arrows: false,
    pagination: false,
    gap: '3rem',
    perPage: 3,
    // focus: 'center',
    // autoWidth: true,
    breakpoints: {
      991: {
        perPage: 2,
      },
      767: {
        perPage: 1,
        gap: '1rem',
      },
    },
  })
  if (document.readyState !== 'loading') {
    initCode()
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      initCode()
    })
  }
  function initCode() {
    trendsSplide.mount()
  }

  sel('.trends__slider .round-arrow--left').addEventListener('click', (e) => {
    trendsSplide.go('+1')
  })
  sel('.trends__slider .round-arrow:not(.round-arrow--left)').addEventListener('click', (e) => {
    trendsSplide.go('-1')
  })
}
function bumpSliderInit() {
  const bumpSplide = new Splide('.bump__slider', {
    arrows: false,
    pagination: false,
    // gap: '3rem',
    type: 'loop',
    perPage: 1,
    // focus: 'center',
    // autoWidth: true,
    breakpoints: {},
  }).mount()

  selAll('.bump__arrows .arrow--left').forEach((e) => {
    e.addEventListener('click', () => {
      bumpSplide.go('+1')
    })
  })
  selAll('.bump__arrows .arrow:not(.arrow--left)').forEach((e) => {
    e.addEventListener('click', () => {
      bumpSplide.go('-1')
    })
  })
}
function studyGallerySliderInit() {
  const studyGallerySplide = new Splide('.study-gallery__slider', {
    arrows: false,
    pagination: false,
    gap: '4rem',
    type: 'loop',
    perPage: 2,
    focus: 'center',
    drag: 'free',
    breakpoints: {
      991: {
        perPage: 1,
      },
      767: {
        gap: '1rem',
      },
    },
    autoScroll: { speed: 0.5, autoStart: true },
  })
  const bar = studyGallerySplide.root.querySelector('.study-gallery__progress__bar')

  studyGallerySplide.on('mounted active', function () {
    var end = studyGallerySplide.Components.Controller.getEnd() + 1
    var rate = Math.min((studyGallerySplide.index + 1) / end, 1)
    bar.style.width = String(100 * rate) + '%'
  })
  studyGallerySplide.mount({ AutoScroll })
}
function studyMoreSliderInit() {
  const studyMoreSlider = new Splide('.study-more__slider', {
    arrows: false,
    pagination: false,
    gap: '4rem',
    type: 'loop',
    perPage: 2,
    // focus: 'center',
    // autoWidth: true,
    breakpoints: {
      991: {
        perPage: 1,
      },
      767: {
        gap: '1rem',
      },
    },
  }).mount()

  sel('.study-more__arrows .arrow--left').addEventListener('click', (e) => {
    studyMoreSlider.go('+1')
  })
  sel('.study-more__arrows .arrow:not(.arrow--left)').addEventListener('click', (e) => {
    studyMoreSlider.go('-1')
  })
}
