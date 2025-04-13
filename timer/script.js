let startbox = document.querySelector(".start-box")
let inputCounter = document.querySelector("#input-container")
let startCounter = document.querySelector("#counting")
let errorEle = document.querySelector("#error-message")
let circle = document.querySelector(".c100")
let timerNum = document.querySelector(".c100 > span")
let loading = document.querySelector(".loading")
let done = document.querySelector(".success")

startCounter.addEventListener("click",function(e){
    let seconds = Number(inputCounter.value)
    timerNum.textContent= seconds
//با کلیک روی شروع مقدار وارد شده در اینپوت تبدیل به عدد میشه و در وسط دایره قرار میگیره
    if(isNaN(seconds)||seconds == ''){
        return toggleErrorMessage({show : true , message : 'زمان را به درستی وارد کنید' })
    //اگر زمان عدد نباشه ارور ظاهر میشه
    }else{
        toggleCircle({show : true})
        toggleStartBox({show : false})
        toggleErrorMessage({show : false})
//اگر عدد وارد شه دکمه شروع و اینپوت ناپدید میشوند همچنین اروری نمیده و دایره ظاهر میشود
    }
    
    
    let realseconds = seconds
    let lastpercent = ''

    let timeId = setInterval(()=>{
        /// از زیر timerNum شروع کن
        if(lastpercent) circle.classList.remove(lastpercent)
///هنگام اضافه کردن کلاس پی آکولاد باز بسته در هر یک ثانیه کلاس قبلی را پاک میکند
        if(seconds<=0){
            clearInterval(timeId)
            toggleStartBox({show : true})
            toggledoneMessages({show : true})
            toggleCircle({show : false})
            circle.classList.remove(lastpercent)
            return 
        ///وقتی عدد به صفر برسد اینتروال لغو میشه و وارد منفی نمیشه
        /// و دایره ناپدید میشه و اینپوت و دکمه شروع و پیام موفقیت ظاهر میشوند
        }

        seconds -= 1
        timerNum.textContent=seconds
        /// هر ثانیه از عدد وارد شده در اینپوت یکی کم میشه و در وسط دایره نشان داده میشه


        let percent = lastpercent = `p${Math.floor(((((realseconds - seconds) *100 / realseconds)-100)*-1))}`
///  هر یک ثانیه، درصد زمان گذشته شده رو محاسبه میکنیم و میریزیم تو پی آکولاد باز و بسته
        ///p{} ==> کلاس تعریف شده در سی اس اس که به شعاع دایره اشاره داره
        circle.classList.add(percent)
///هر ثانیه کلاس پی آکولاد باز و بسته رو اد میکنه و باعث کم شدن شعاع دایره قرمز همزمان با عدد وسط دایره میشه

    },1000)

})

let toggleErrorMessage = ({show , message}) => {

    if(show){
        errorEle.style.display = "block"
        errorEle.textContent = message
        done.style.display= "none"
    }else{
        errorEle.style.display = "none"
    }
}

let toggleCircle = ({show}) =>{
    if(show){
        circle.style.display = "block"
        loading.style.display = "block"
    }else{
        circle.style.display = "none"
        loading.style.display = "none"
    }
}

let toggleStartBox = ({show}) => {

    if(show){
        startbox.style.display = "block"
        inputCounter.value = ''
        }else{
        startbox.style.display = "none"
    }
}


let toggledoneMessages = ({show}) => {
    if(show){
        done.style.display = "block"
    }
}