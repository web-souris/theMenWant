import $ from "jquery"
import slider from './slider'
import audio from './audio'
$(document).ready(function() {
  slider().init()
  audio().init()
})
