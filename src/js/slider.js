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
    startTime(index) {
      if(index == this.length) {
        this.changeSlide(0)
        this.interval =  setTimeout(function() {
          this.startTime(1)
        }.bind(this), 5000)
      }
      else {
        this.changeSlide(index)
        this.interval =  setTimeout(function() {
          this.startTime(index + 1)
        }.bind(this), 5000)
      }
      $('.slide__line').html('')
      $('.slide__line').append("<span style='width: 0;'></span>")
      $('.slide__line span').css('width', '100%')
    },
    init() {
      $('.slide.active').show()
      $('.slider__right img.active').show()
      this.activeSlide()
      this.lastSlide()
      this.startTime(0)
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