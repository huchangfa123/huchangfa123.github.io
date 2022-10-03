;(function (window) {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

  const FRAME_RATE = 60
  const PARTICLE_NUM = 4000
  const RADIUS = Math.PI * 2
  const CANVASWIDTH = window.innerWidth;
  const CANVASHEIGHT = window.innerHeight;
  const CANVASID = 'canvas'

  let p1 = '';
  let p2 = '因为你喜欢星星';
  let p3 = '所以想到用这个方式';
  let p4 = '嘿嘿!';
  let p5 = '本来想的是';
  let p6 = '音乐会前和你表白';
  let p7 = '然后以情侣身份';
  let p8 = '和你一起听音乐会';
  let p9 = '这样更有纪念意义';
  let p10 = '不过我嘴比较笨';
  let p11 = '怕线下效果不好';
  let p12 = '所以想到了这一出～';
  let p13 = '之前就说过';
  let p14 = '我是有更进一步';
  let p15 = '了解你，';
  let p16 = '照顾你的想法的';
  let p17 = '我不知道，';
  let p18 = '如果我们在一起了';
  let p19 = '能不能一直走到最后';
  let p20 = '但是至少现在，';
  let p21 = '此时此刻，';
  let p22 = '我是希望';
  let p23 = '能和你走到一起的!';
  let p24 = '和我在一起，';
  let p25 = '我不能承诺将来，';
  let p26 = '毕竟已经画了很多饼';
  let p27 = '再画不太好,哈哈';
  let p28 = '但我能保证现在，';
  let p29 = '至少从现在起，';
  let p30 = '我会努力的去实现，';
  let p31 = '你想要的那种';
  let p32 = '甜甜的，';
  let p33 = '被偏爱的恋爱，';
  let p34 = '所以，敏敏！';
  let p35 = '你愿意,';
  let p36 = '做我女朋友吗？'


  let texts = [
    '',
    '',
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8,
    p9,
    p10,
    p11,
    p12,
    p13,
    p14,
    p15,
    p16,
    p17,
    p18,
    p19,
    p20,
    p21,
    p22,
    p23,
    p24,
    p25,
    p26,
    p27,
    p28,
    p29,
    p30,
    p31,
    p32,
    p33,
    p34,
    p35,
    p36,
  ];

  let canvas,
    ctx,
    particles = [],
    quiver = true,
    text = texts[0],
    textIndex = 0,
    textSize = 110

  function draw () {
    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.textBaseline = 'middle'
    ctx.fontWeight = 'bolder'
    ctx.font = textSize + 'px \'SimHei\', \'微软雅黑\', \'Avenir\', \'Helvetica Neue\', \'Arial\', \'sans-serif\''
    ctx.fillText(text, (CANVASWIDTH - ctx.measureText(text).width) * 0.5, CANVASHEIGHT * 0.5)

    let imgData = ctx.getImageData(0, 0, CANVASWIDTH, CANVASHEIGHT)

    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)

    for (let i = 0, l = particles.length; i < l; i++) {
      let p = particles[i]
      p.inText = false
    }
    particleText(imgData)

    window.requestAnimationFrame(draw)
  }

  function particleText (imgData) {
    // 点坐标获取
    var pxls = []
    for (var w = CANVASWIDTH; w > 0; w -= 3) {
      for (var h = 0; h < CANVASHEIGHT; h += 3) {
        var index = (w + h * (CANVASWIDTH)) * 4
        if (imgData.data[index] > 1) {
          pxls.push([w, h])
        }
      }
    }

    var count = pxls.length
    var j = parseInt((particles.length - pxls.length) / 2, 10)
    j = j < 0 ? 0 : j

    for (var i = 0; i < pxls.length && j < particles.length; i++, j++) {
      try {
        var p = particles[j],
          X,
          Y

        if (quiver) {
          X = (pxls[i - 1][0]) - (p.px + Math.random() * 10)
          Y = (pxls[i - 1][1]) - (p.py + Math.random() * 10)
        } else {
          X = (pxls[i - 1][0]) - p.px
          Y = (pxls[i - 1][1]) - p.py
        }
        var T = Math.sqrt(X * X + Y * Y)
        var A = Math.atan2(Y, X)
        var C = Math.cos(A)
        var S = Math.sin(A)
        p.x = p.px + C * T * p.delta
        p.y = p.py + S * T * p.delta
        p.px = p.x
        p.py = p.y
        p.inText = true
        p.fadeIn()
        p.draw(ctx)
      } catch (e) {}
    }
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i]
      if (!p.inText) {
        p.fadeOut()

        var X = p.mx - p.px
        var Y = p.my - p.py
        var T = Math.sqrt(X * X + Y * Y)
        var A = Math.atan2(Y, X)
        var C = Math.cos(A)
        var S = Math.sin(A)

        p.x = p.px + C * T * p.delta / 2
        p.y = p.py + S * T * p.delta / 2
        p.px = p.x
        p.py = p.y

        p.draw(ctx)
      }
    }
  }

  function setDimensions () {
    canvas.width = CANVASWIDTH
    canvas.height = CANVASHEIGHT
    canvas.style.position = 'absolute'
    canvas.style.left = '0%'
    canvas.style.top = '0%'
    canvas.style.bottom = '0%'
    canvas.style.right = '0%'
  }

  function event () {
    document.addEventListener('click', function (e) {
      const canvas = document.getElementById('canvas');
      if (canvas.style.display === 'none') return;
      textIndex++
      if (textIndex >= texts.length) {
        textIndex--
        const total = document.getElementById('total');
        total.style.display = 'flex';
        return
      }
      text = texts[textIndex]
      console.log(textIndex)
    }, false)

    document.addEventListener('touchstart', function (e) {
      const canvas = document.getElementById('canvas');
      if (canvas.style.display === 'none') return;
      textIndex++
      if (textIndex >= texts.length) {
        textIndex--
        const total = document.getElementById('total');
        total.style.display = 'flex';
        return
      }
      text = texts[textIndex]
      console.log(textIndex)
    }, false)
  }

  function init () {
    canvas = document.getElementById(CANVASID)
    if (canvas === null || !canvas.getContext) {
      return
    }
    ctx = canvas.getContext('2d')
    setDimensions()
    event()

    for (var i = 0; i < PARTICLE_NUM; i++) {
      particles[i] = new Particle(canvas)
    }

    draw()
  }

  class Particle {
    constructor (canvas) {
      let spread = canvas.height
      let size = Math.random() * 1.2
      // 速度
      this.delta = 0.06
      // 现在的位置
      this.x = 0
      this.y = 0
      // 上次的位置
      this.px = Math.random() * canvas.width
      this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread)
      // 记录点最初的位置
      this.mx = this.px
      this.my = this.py
      // 点的大小
      this.size = size
      // this.origSize = size
      // 是否用来显示字
      this.inText = false
      // 透明度相关
      this.opacity = 0
      this.fadeInRate = 0.005
      this.fadeOutRate = 0.03
      this.opacityTresh = 0.98
      this.fadingOut = true
      this.fadingIn = true
    }
    fadeIn () {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true
      if (this.fadingIn) {
        this.opacity += this.fadeInRate
      }else {
        this.opacity = 1
      }
    }
    fadeOut () {
      this.fadingOut = this.opacity < 0 ? false : true
      if (this.fadingOut) {
        this.opacity -= this.fadeOutRate
        if (this.opacity < 0) {
          this.opacity = 0
        }
      }else {
        this.opacity = 0
      }
    }

    draw (ctx) {
      ctx.fillStyle = 'rgba(248,204,0, ' + this.opacity + ')'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, RADIUS, true)
      ctx.closePath()
      ctx.fill()
    }

  }
  
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if(!isChrome){
      $('#iframeAudio').remove()
  }
  
  // setTimeout(() => {
    init()  
  // }, 4000);
  // mp3.play()
})(window)
