
$(document).ready(function() {
  if($(window).width() >= 992) {
    generateVideo()
  }

  $('.first__play').click(function() {
    if($(this).hasClass('play')) {
      audio.play()
      $(this).removeClass('play')
      $(this).html('<i class="fa fa-pause"></i>')
      $(this).addClass('stop')
    }
    else {
      audio.pause()
      $(this).html('<i class="fa fa-play"></i>')
      $(this).removeClass('stop')
      $(this).addClass('play')
    }
  })

  //Каруселька
  const owl = $('.first-carousel').owlCarousel({
    items: 1,
    animateOut: 'fadeOut',
    autoplay: true,
    animateIn: 'fadeIn',
    autoplayTimeout: 5000,
    mouseDrag: false,
    loop: true,
    onInitialized: function(e) {
      const carousel = e.relatedTarget
      $('.carousel__all').text(getNumberSlide(carousel.items().length))
    },
    onChanged: function(e) {
      const carousel = e.relatedTarget
      $('.carousel__current').text(getNumberSlide((carousel.relative(carousel.current() )) + 1))
      slideChange()
    }
  })
  $('.carousel__button_next').click(function() {
    owl.trigger('next.owl.carousel')
  })
  $('.carousel__button_prev').click(function() {
    owl.trigger('prev.owl.carousel')
  })

  //Аудио
  const audio = document.getElementById('audio')
  audio.load()
  //Канвас
  var context = new AudioContext();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();

  var canvas = document.getElementById("visualizator");
  canvas.width = 300;
  canvas.height = 40;
  var ctx = canvas.getContext("2d");

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 32;

  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = 300 / 8 + 4;
  console.log(barWidth)
  var barHeight;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    x = WIDTH;

    analyser.getByteFrequencyData(dataArray) ;
    ctx.fillStyle = "#1c1c1e";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 7;
      ctx.fillStyle = "#d3964d";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x -= barWidth + 2;
    }
  }
  renderFrame();
})






function generateVideo() {
  var videoSrc = $('.section_first').attr('data-video')
  var videoHtml = '<div class="first__video">' +
    '<video src="'+ videoSrc +'" muted loop id="video"></video></div>'
  $('.section_first').append(videoHtml)
  const video = $('#video')[0]
  video.load()
  video.play()
}
function getNumberSlide(number) {
  if(number < 10) {
    return '0' + number
  }
  else {
    return number
  }
}

function slideChange() {
  $('.carousel__line').html('')
  $('.carousel__line').html('<span></span>')
  $('.carousel__line span').css('width', '100%')
}
