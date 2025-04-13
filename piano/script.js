let playing = document.querySelector(".nowplaying")
let keys = document.querySelectorAll(".kye")//تمام المنت های این کلاس انتخاب شدند
let hints = document.querySelectorAll(".hints")


window.addEventListener('keydown', function(event) {
  let key = document.querySelector(`.key[data-key="${event.code}"]`);//دکمه هایی که دیتاشون تو هچ تی ام ال هست قبول میشوند  
  if (!key) return 
    const keyNote = key.getAttribute('data-note')
    playing.textContent = keyNote
    key.classList.add("play")
// با فشرده شدن کلید های کیبورد اگر آنها جزو نت پیانو نباشند ایونت برمیگرده و اتفاقی نمی افتد
// اگر جزو نت های پیانو باشد کلاس پلی را میگیره و استایل لمس شدن بهش اعمال میشه همچنین نتش بالای پیانو به نمایش در میاد    
  
  let audio = document.querySelector(`.audio[data-key="${event.code}"]`)
    audio.play()
    audio.currentTime = 0
//دیتا دکمه فشرده شده با دیتا صدای ما تطبیق داده میشه و با هربار کلیک رو دکمه نت ها از اول پلی میشوند

}); 

window.addEventListener('keyup',function(event){
  let key = document.querySelector(`.key[data-key="${event.code}"]`);
  if (!key) return
  playing.textContent = " "
  key.classList.remove("play")
// با رها شدن کلید های کیبورد اگر آنها جزو نت پیانو نباشند ایونت برمیگرده و اتفاقی نمی افتد
// اگر جزو نت های پیانو باشد کلاس پلی حذف میشود و استایل لمس شدن از بین میره همچنین نتش از بالای پیانو ناپدید میشود    

})


hints.forEach(function(ele,index){
  ele.style = `transition-delay : ${index * 50}ms`
})

