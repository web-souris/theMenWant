import $ from 'jquery'
export default () => {
  return {
    init() {
      this.createVideo()
      $('.video video')[0].addEventListener('canplay', this.getVideoInfo)
      $(document).on('click', '.video__cross', () => {
        $('.video video')[0].pause()
        $('.video__wrapper').fadeOut()
      })
      $('.video video')[0].addEventListener('timeupdate', this.changeVideoInfo)
      $('.video video')[0].addEventListener('ended', () => {
        $('.video__wrapper').fadeOut()
      })
      $('.show-video').click(() => {
        $('.video__wrapper').fadeIn()
        $('.video video')[0].play()
      })
    },
    createVideo() {
      const video = "<div class='video'>" +
        "<video src='uploads/video.mp4' class='video__video'></video>" +
        "<div class='video__header'>" +
        "<div class='video__logo'></div>" +
        "<div class='video__cross'>" +
        "</div>" +
        "</div>" +
        "<div class='video__controls'>" +
        "<div class='video__time'>" +
        "<span class='video__time_current'></span> / " +
        "<span class='video__time_all'></span></div>" +
        "<div class='video__line'>" +
        "<span class='video__current'></span></div>" +
        "</div>" +
        "</div>"
      const videoLogo = $('.header__link').html()
      $('.video__wrapper').append(video)
      $('.video__logo').append(`<a href="/">${videoLogo}</a>`)
    },
    getVideoInfo() {
      const curTime = this.currentTime
      const duration = this.duration
      $('.video__time_current').html(secondsToTime(curTime))
      $('.video__time_all').html(secondsToTime(duration))
    },
    changeVideoInfo() {
      const curTime = this.currentTime
      $('.video__current').css('width', curTime / this.duration * 100 + '%')
      $('.video__time_current').html(secondsToTime(curTime))
    },
    getVideo() {
      return $('.video video')[0]
    },
    deleteVideo() {
      $('.video__wrapper').html('')
    }
  }
}
function secondsToTime(time){
  var fulltime
  var h = Math.floor(time / (60 * 60)),
    dm = time % (60 * 60),
    m = Math.floor(dm / 60),
    ds = dm % 60,
    s = Math.ceil(ds);
  if (s === 60) {
    s = 0;
    m = m + 1;
  }
  if (s < 10) {
    s = '0' + s;
  }
  if (m === 60) {
    m = 0;
    h = h + 1;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (h === 0) {
    fulltime = m + ':' + s;
  } else {
    fulltime = h + ':' + m + ':' + s;
  }
  return fulltime;
}