import $ from "jquery"
export default () => {
  return {
    active: $('.slide.active').index(),
    length: $('.slide').length,
    interval: null,
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
      $('.slider__right img.active').fadeOut()
      $('.slider__right img.active').removeClass('active')
      $('.slider__right img').eq(val).addClass('active')
      $('.slider__right img.active').fadeIn()
      $('.slide.active').fadeOut()
      $('.slide.active').removeClass('active')
      $('.slide').eq(val).addClass('active')
      $('.slide.active').fadeIn()
      this.activeSlide()
    },
    startTime(index, status) {
      $('.slide__line').html('')
      $('.slide__line').append("<span style='width: 0;'></span>")
      $('.slide__line span').css('width', '100%')
      if(status) {
        this.changeSlide(index == this.length ? 0 : index)
      }
      this.interval = setTimeout(function() {
        this.startTime(index == this.length ? 0 : index + 1, true)
      }.bind(this), 5000)
    },
    init() {
      $('.slide.active').show()
      $('.slider__right img.active').show()
      this.activeSlide()
      this.lastSlide()
      this.startTime(0, false)
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
      $('.slider__left, .slider__right').hover(() => {
        clearTimeout(this.interval)
        $('.slide__line').html('')
      }, () => {
        this.startTime(this.active, false)
      })
    }
  }
}