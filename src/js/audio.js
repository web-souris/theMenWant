import $ from 'jquery'
import Cookie from 'js-cookie'
export default () => {
  return {
    volume: 1,
    start: true,
    init() {
      const self = this
      this.initStatus()
      this.createAudio()
      this.createInterface()
      $(document).on('click', '.music__volume', function(event) {
        self.clickVolume(event.pageX - $(this).offset().left)
      })
      $(document).on('click', '.music__status', function() {
        self.clickStatus()
      })
    },
    changeVolume(val) {
      this.volume = val/100
      $('#music')[0].volume = this.volume
      this.changeVolumeInterface()
      return this
    },
    changeVolumeInterface() {
      $('.volume__active').css('width', this.getWidthPersent())
      return this
    },
    createAudio() {
      const audio = "<audio "+this.getFirstAutoplay()+" loop id='music'>" +
        "<source src='uploads/music.mp3'>" +
        "</audio>"
      $('.music').append(audio)
      return this
    },
    createInterface() {
      const content = "<p class='music__status'>"+ this.getStatusText() +"</p><div class='music__volume'>" +
        "<div class='volume__active' style='width: "+ this.getWidthPersent() +"'></div>"
      $('.music').append(content)
      return this
    },
    getStatusText() {
      return this.start ? 'Выкл' : 'Вкл'
    },
    getWidthPersent() {
      if(this.start) {
        return this.volume * 100 + '%'
      }
      else {
        return 0 + '%'
      }
    },
    clickVolume(val) {
      val = val + 0.5
      const percent = Math.floor(val / $('.music__volume').width()  * 100)
      this.changeVolume(percent)
      return this
    },
    clickStatus() {
      this.start = !this.start
      Cookie.set('play', this.start, {
        expires: 7
      })
      if(this.start) {
        $('#music')[0].play()
        $('.volume__active').css('width', this.volume * 100 + '%')
      }
      else {
        $('#music')[0].pause()
        $('.volume__active').css('width', 0)
      }
      this.changeStatus()
      return this
    },
    changeStatus() {
      return $('p.music__status').text(this.getStatusText())
    },
    initStatus() {
      const play = Cookie.get('play')
      if(play == 'true' || play == undefined) {
        this.start = true
      }
      else {
        this.start = false
        $('.volume__active').css('width', 0)
      }
      return this
    },
    getFirstAutoplay() {
      if(this.start) {
        return 'autoplay'
      }
      else {
        return
      }
    }
  }
}