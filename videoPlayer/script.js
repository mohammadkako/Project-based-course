let playerArea = document.querySelector(".myplayer")
let media = playerArea.querySelector("video")
let controls = playerArea.querySelector(".myplayer__controls")
let timerBar = playerArea.querySelector(".controls__progressbar-current")


let play = playerArea.querySelector(".play")
let rewind = playerArea.querySelector(".rewind")
let forward = playerArea.querySelector(".forward")
let volume = playerArea.querySelector(".volume")
let watchedTimes = playerArea.querySelector(".currentTime")
let videoTime = playerArea.querySelector(".videoTime")
let volumeIcon = playerArea.querySelector(".volume .icon")
let volumeProgress = playerArea.querySelector(".volume .volume__progress")
let volumeProgressInput = volumeProgress.querySelector('input');
let fullscreen = controls.querySelector('.fullscreen');


///شروع یا ایست فیلم///


media.addEventListener("click",function(){
    if(media.paused){
        media.play()
        togglePlayIcon()
    }else{
        media.pause()
        togglePlayIcon()
    }
//// کلیک روی صفحه فیلم رو شروع یا ایست میکنه و علامت شروع ایست تغییر میده
})
play.addEventListener("click",function(){
    if(media.paused){
        media.play()
        togglePlayIcon()
    }else{
        media.pause()
        togglePlayIcon()
    }
    //// کلیک روی دکمه پلی رو شروع یا ایست میکنه و علامت شروع ایست تغییر میده
})
function togglePlayIcon() {
    let icon = play.querySelector("i")
    icon.classList.toggle("ion-md-pause")
    icon.classList.toggle("ion-md-play")// این کلاس ها در سی اس اس فرم گرفتند
    ///تابعی برای تغییر دکمه شروع به ایست و ایست به شروع هست
}


            ///جلو و عقب زدن فیلم///


forward.addEventListener("click",function(){
    media.currentTime = media.currentTime + 5
    ///با زدن دکمه فیلم 5 ثانیه جلو میره
})
rewind.addEventListener("click",function(){
    media.currentTime = media.currentTime - 5
    ///با زدن دکمه فیلم 5 ثانیه عقب میره
})


            ///زمان هر لحظه و زمان کل ویدیو و نوار زمان///


function getTime(time){
    let minutes = Math.floor(time / 60).toString().padStart(2 , "0")///
    let seconds = Math.floor(time - (minutes * 60)).toString().padStart(2 , "0")
    return `${minutes}:${seconds}`
    ///// این تابع زمان رو بر حسب ثانیه میگیره و بر حسب دقیقه و ثانیه برمیگردونه
}
media.addEventListener("timeupdate",function(){///
    watchedTimes.textContent = getTime(media.currentTime)
    ///هر لحظه زمان دیده شده را مینویسه
    videoTime.textContent = getTime(media.duration)
    ////با شروع فیلم زمان کل ویدیو رو مینویسه

    timerBar.value  = (media.currentTime / media.duration) * 100;
    ///هر لحظه زمان دیده شده را به درصد حساب میکنه
    timerBar.style = `background: linear-gradient(90deg, rgba(80, 230, 34,1) ${timerBar.value}%, #e1e1e1 0%);`
    /// برحسب درصد به دست آمده در بالا نوار زمان رنگی میشه
})
timerBar.addEventListener("input",function(){/////input range even input dare
    media.currentTime = ((this.value/100) * media.duration)
    /// برای جابهجا کردن زمان فیلم (جلو عقب کردن فیلم با کلیک روی نوار)
})


            ///تنظیم صدای فیلم///


volumeIcon.addEventListener("click",function() {
    if(volumeProgress.style.display == "none"){
        volumeProgress.style.display = "block"

    }else{
        volumeProgress.style.display = "none"
    }
    /// با کلیک روی دکمه بلندگو نوار صدا ظاهر یا ناپدید میشه
})
media.volume = 0.5///صدا به صورت پیشفرض 50% هست (با ایونت زیر میشه کمتر یا بیشترش کرد)
volumeProgressInput.addEventListener('input' , function() {
    media.volume = this.value / 100; 
    /// مقدار ولوم بین 0 و 1 این لاین تبدیلش میکنه به درصد
    this.style = `background : linear-gradient(90deg, rgba(80, 230, 34,1)${this.value}%, #e1e1e1 0%);`
    /// برحسب درصد به دست آمده در بالا نوار صدا رنگی میشه
})
 

            ///تنظیم وضعیت صفحه///


fullscreen.addEventListener('click' , function() {
    ///برای تمام صفحه کردن ویدیو ها در متورهای جستوجوی مختلف

    if (!document.fullscreenElement) {
        if(playerArea.requestFullscreen) {
            playerArea.requestFullscreen();//همگانی
        } else if(playerArea.mozFullScreenElement) {
            playerArea.mozFullScreenElement()//برای موزیلا
        } else if(playerArea.msFullscreenElement) {
            playerArea.msFullscreenElement()//برای ماکروسافت
        } else if(playerArea.webkitFullscreenElement) {
            playerArea.webkitFullscreenElement()//برای کروم
        }
        //// تمام صفحه شدن ویدیو با کلیک رو دکمه تمام صفحه
    
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();//همگانی 
      } else if(document.mozCancelFullscreen) {
        document.mozCancelFullscreen();//برای موزیلا 
      } else if(document.msCancelFullscreen) {
        document.msCancelFullscreen();//برای ماکروسافت 
      } else if(document.webkitCancelFullscreen) {
        document.webkitCancelFullscreen();//برای کروم 
      }
        //// خروج از حالت تمام صفحه ویدیو با کلیک رو دکمه تمام صفحه
    }
})
