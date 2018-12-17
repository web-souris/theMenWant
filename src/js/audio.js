import $ from 'jquery'
export default () => {
  return {
    volume: 1,
    start: true,
    init() {
      const self = this
      this.createAudio()
      this.createInterface()
      $(document).on('click', '.music__volume', function(event) {
        self.clickVolume(event.pageX - $(this).offset().left)
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
      const audio = "<audio autoplay loop id='music'>" +
        "<source src='/uploads/music.mp3'>" +
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
      return this.volume * 100 + '%'
    },
    clickVolume(val) {
      val = val + 0.5
      const percent = Math.floor(val / $('.music__volume').width()  * 100)
      this.changeVolume(percent)
      return this
    },
  }
}