import './style.styl'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

gsap.registerPlugin(ScrollTrigger)
const mm = gsap.matchMedia()
const mqd = 1440
const mqt = 991
const mql = 767
const mqm = 478

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
  case 'blogCategory':
    blogCategory()
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

function terms() {}

function about() {
  mm.add('(min-width: 992px)', () => {
    const propsItemsTl = gsap.from([...selAll('.about-props_item')], { opacity: 0, y: 100, duration: 2.5, ease: 'power4.out', stagger: 0.2 }, 0)

    ScrollTrigger.create({
      animation: propsItemsTl,
      trigger: '.about-props_list',
      start: 'top center',
    })
  })
  testSliderInit()
  let teamSplide = { item: {} }

  mm.add('(min-width: 992px)', () => {
    if (Object.keys(teamSplide.item).length) {
      removeSplideClasses('team__slider')
      teamSplide.item.destroy() // to avoid the slides width issues on viewport resize
    }
  })
  mm.add('(max-width: 991px)', () => {
    addSplideClasses('team__slider')
    ;[teamSplide.item, teamSplide.prev, teamSplide.next] = teamSliderInit(teamSplide.prev, teamSplide.next)
  })
}
function blog() {
  blogCategory()

  mm.add('(min-width: 992px)', () => {
    sel('.filter-select__select').setAttribute('multiple', '')
  })
  mm.add('(max-width: 991px)', () => {
    sel('.filter-select__select').removeAttribute('multiple', '')
  })
}
function blogCategory() {
  const searchInput$ = sel('.filter__search')
  const searchReset$ = sel('.x-ico')

  searchReset$.addEventListener('click', (e) => {
    searchInput$.value = searchInput$.defaultValue
  })
}

function blogPost() {}

function contact() {
  testSliderInit()
}

function teamSliderInit(oldPrevHandler, oldNextHandler) {
  const teamSlider = new Splide('.team__slider', {
    arrows: false,
    pagination: false,
    type: 'loop',
    perPage: 2,
    perMove: 2,
    gap: '4rem',
    destroy: true,
    breakpoints: {
      991: {
        destroy: false,
      },
      767: {
        gap: '1rem',
      },
      474: {
        perPage: 1,
        perMove: 1,
      },
    },
  }).mount()

  const [prevHandler, nextHandler] = initSplideArrows(teamSlider, '.team__arrows', oldPrevHandler, oldNextHandler)

  return [teamSlider, prevHandler, nextHandler]
}
function initSplideArrows(splideItem, arrowsWrapClass = '.arrows', oldPrevHandler, oldNextHandler) {
  const prev$ = sel(arrowsWrapClass + ' .arrow--left')
  const next$ = sel(arrowsWrapClass + ' .arrow:not(.arrow--left)')
  if (oldNextHandler) {
    prev$.removeEventListener('click', oldPrevHandler)
    next$.removeEventListener('click', oldNextHandler)
  }
  const prevHandler = () => splideItem.go('>')
  const nextHandler = () => splideItem.go('<')

  prev$.addEventListener('click', prevHandler)
  next$.addEventListener('click', nextHandler)
  return [prevHandler, nextHandler]
}
//
// < SLIDERS -----------------------
//
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
// function initSplideArrows(slider, arrowsWrap) {
//   const prevHandler = () => slider.go('>')
//   const nextHandler = () => slider.go('<')

//   const prev$ = sel(`${arrowsWrap} .arrow--left`)
//   prev$.addEventListener('click', prevHandler)
//   const next$ = sel(`${arrowsWrap} .arrow:not(.arrow--left)`)
//   next$.addEventListener('click', nextHandler)
// }
function removeSplideClasses(slider) {
  console.log('re')

  const splide = document.querySelector('.' + slider)
  const track = splide.querySelector('.splide__track')
  const list = splide.querySelector('.splide__list')
  const slide = splide.querySelectorAll('.splide__slide')
  splide.classList.remove('splide')
  track.classList.remove('splide__track')
  list.classList.remove('splide__list')
  slide.forEach((slide) => slide.classList.remove('splide__slide'))
}
function addSplideClasses(slider) {
  const splide = document.querySelector('.' + slider)
  const track = splide.children[0]
  const list = track.children[0]
  const slide = list.childNodes
  splide.classList.add('splide')
  track.classList.add('splide__track')
  list.classList.add('splide__list')
  slide.forEach((slide) => slide.classList.add('splide__slide'))
}

// function showSplideOld() {
//   let teamSplide = {}

//   mm.add('(min-width: 992px)', () => {
//     if (Object.keys(teamSplide).length) {
//       removeSplideClasses('team__slider')
//       teamSplide.destroy() // to avoid the slides width issues on viewport resize
//     }
//   })
//   mm.add('(max-width: 991px)', () => {
//     addSplideClasses('team__slider')
//     teamSplide = teamSliderInit(Object.keys(teamSplide).length && true)
//   })
// }
function showSplideMq(splide, splideClass, breakpoint = mqt, relativeToBp = '<', arrows = false) {
  let splideItem = {}

  const addSplide = () => {
    addSplideClasses(splideClass)
    splideItem = splide(Object.keys(splideItem).length)
  }
  const removeSplide = () => {
    if (Object.keys(splideItem).length) {
      removeSplideClasses(splideClass)
      splideItem.destroy() // to avoid the slides width issues on viewport resize
    }
  }
  mm.add(`(min-width: ${breakpoint + 1}px)`, () => {
    relativeToBp === '>' ? addSplide() : removeSplide()
  })
  mm.add(`(max-width: ${breakpoint}px)`, () => {
    relativeToBp === '>' ? removeSplide() : addSplide()
  })
}
