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

function event() {
  const s2 = new Splide('.sponsors__slider', {
    arrows: false,
    pagination: false,
    gap: '4rem',
    type: 'loop',
    // focus: 'center',
    autoWidth: true,
    autoScroll: { speed: 1, autoStart: false },
  })
  const Components = s2.Components
  // to remove duplicates for inactive/small slider
  s2.on('overflow', function (isOverflow) {
    s2.go(0) // Reset the carousel position

    s2.options = {
      focus: isOverflow ? 'center' : '',
      drag: isOverflow ? 'free' : false,
      clones: isOverflow ? undefined : 0, // Toggle clones
    }
  })
  let s2Overflow = true
  let s2Ready = false
  // to center inactive/small slider
  s2.on('resized', function () {
    var isOverflow = Components.Layout.isOverflow()
    s2Overflow = isOverflow
    var list = Components.Elements.list
    var lastSlide = Components.Slides.getAt(s2.length - 1)

    if (lastSlide) {
      // Toggles `justify-content: center`
      list.style.justifyContent = isOverflow ? '' : 'center'

      // Remove the last margin
      if (!isOverflow) {
        lastSlide.slide.style.marginRight = ''
        // console.log('asdf')
      }
    }
    if (s2Ready) {
      s2PlayInit()
    }
  })
  s2.on('mounted', s2PlayInit)
  function s2PlayInit() {
    s2Ready = true
    if (!s2Overflow) {
      s2.Components.AutoScroll.pause()
    } else if (s2Overflow && s2.Components.AutoScroll.isPaused()) {
      s2.Components.AutoScroll.play()
    }
  }
  s2.mount({ AutoScroll })
}
