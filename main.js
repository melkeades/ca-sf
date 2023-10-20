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
  default:
    console.log('unknown data-page')
}

function home() {
  mm.add('(min-width: 992px)', () => {})
  mm.add('(max-width: 991px)', () => {})
  console.log('sf')
}

function event() {}
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
  },
  autoScroll: { speed: 1, autoStart: false },
}).mount({ AutoScroll })

sel('.testimonials__arrows .arrow--left').addEventListener('click', (e) => {
  testSlider.go('+1')
})
sel('.testimonials__arrows .arrow:not(.arrow--left)').addEventListener('click', (e) => {
  testSlider.go('-1')
})

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
// const Components = trendsSplide.Components
// // to remove duplicates for inactive/small slider
// trendsSplide.on('overflow', function (isOverflow) {
//   trendsSplide.go(0) // Reset the carousel position

//   trendsSplide.options = {
//     focus: isOverflow ? 'center' : '',
//     // drag: isOverflow ? 'free' : false,
//     clones: isOverflow ? undefined : 0, // Toggle clones
//   }
// })
// let s2Overflow = true
// // to center inactive/small slider
// trendsSplide.on('resized', function () {
//   var isOverflow = Components.Layout.isOverflow()
//   s2Overflow = isOverflow
//   var list = Components.Elements.list
//   var lastSlide = Components.Slides.getAt(trendsSplide.length - 1)

//   if (lastSlide) {
//     // Toggles `justify-content: center`
//     list.style.justifyContent = isOverflow ? '' : 'center'

//     // Remove the last margin
//     if (!isOverflow) {
//       lastSlide.slide.style.marginRight = ''
//       // console.log('asdf')
//     }
//   }
// })
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
    console.log('fd')
  })
})
selAll('.bump__arrows .arrow:not(.arrow--left)').forEach((e) => {
  e.addEventListener('click', () => {
    bumpSplide.go('-1')
    console.log('fd')
  })
})
