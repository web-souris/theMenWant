import $ from "jquery"
import slider from './slider'
import audio from './audio'
import video from './video'
$(document).ready(function() {
  if($(document).width() > 768) {
    audio().init()
    video().init()
  }
  $(document).resize(() => {
    if($(document).width() > 768) {
      audio().init()
      video().init()
    }
  })
  slider().init()

})
