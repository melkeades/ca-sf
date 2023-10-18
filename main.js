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
