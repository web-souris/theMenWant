import $ from "jquery"
export default () => {
  return {
    active: $('.slide.active').index(),
    length: $('.slide').length,
    lineWidth() {
      return $('.slide__line span').css('width', this.active == 0 ? 0 : (this.active/(this.length - 1)) * 100 + '%')
    },
    activeSlide() {
      return $('.slide__active').html(this.changeVal(this.active + 1))
    },
    lastSlide() {
      return $('.slide__last').html(this.changeVal(this.length))
    },
    changeVal(val) {
      return val < 10 ? '0' + val : val
    },
    changeSlide(val) {
      this.active = val
      console.log(this.active)
      $('.slider__right img.active').fadeOut()
      $('.slider__right img.active').removeClass('active')
      $('.slider__right img').eq(val).addClass('active')
      $('.slider__right img.active').fadeIn()
      $('.slide.active').fadeOut()
      $('.slide.active').removeClass('active')
      $('.slide').eq(val).addClass('active')
      $('.slide.active').fadeIn()
      this.lineWidth()
      this.activeSlide()
    },
    init() {
      $('.slide.active').show()
      $('.slider__right img.active').show()
      this.activeSlide()
      this.lastSlide()
      this.lineWidth()
      $('.slide__button_prev').click(() => {
        if(this.active - 1 >= 0) {
          this.changeSlide(this.active - 1)
        }
      })
      $('.slide__button_next').click(() => {
        if(this.active + 1 < this.length) {
          this.changeSlide(this.active + 1)
        }
      })
    }
  }
}