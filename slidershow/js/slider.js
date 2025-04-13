class slider{
    slideIndex = 1

    constructor(options){
        this.options = options
        this.intialStuff()

        this.createNextAndPrevBtns()
        this.createDots()

        this.showSlides(1)
        this.slideTime()
    }

    intialStuff(){
        let {el:sliderElement , slideClass , auto} = this.options

        if(! sliderElement) throw Error ("this element doesn`t exist")//اعتبارسنجیه تگی که اسلایدها توشه
        Number.isInteger(auto) ? this.auto = auto :  this.auto = 0;
        // اگر زمان هر چیزی به جز عدد صحیح بود 0 میشه و اگر عدد بود به دیس اُتو داده میشه

        this.sliders = [...sliderElement.children].filter(item => item.classList.contains(slideClass))
        //یک آرایه از عناصری که کلاس اسلاید دارند میسازه
    }

    createNextAndPrevBtns(){
        let {el:sliderElement} = this.options

        sliderElement.insertAdjacentHTML("beforeend",`
        <a class="next">&#10095</a>
        <a class="prev">&#10094</a>
        `)//کلید قبلی و بعدی ایجاد میشه
        sliderElement.querySelector(".next").addEventListener("click",()=>this.nextAndPrev(this.slideIndex += 1))
        sliderElement.querySelector(".prev").addEventListener("click",()=>this.nextAndPrev(this.slideIndex -= 1))
    }
    nextAndPrev(n){
    this.resetSlideTime()
    this.showSlides(n)
    } 
     // در صورت کیلیک دکمه بعدی یا قبلی از اسلایدایندکس یکی زیاد یا کم میشه
    
     currentSlide = n =>{
        this.resetSlideTime()
        this.showSlides(this.slideIndex = n)
     }
     // دیتای هر نقطه رو از آخرین فورایچ فانکشن یر میگیره و با ایندکس تصاویر تطابق میده

    createDots(){
        let { el : sliderElement} = this.options;

        let dotElements = [...this.sliders].map((slider , index) => `<span class="dot" data-slide="${index+1}"></span>`)
        //آرایه ای که از عناصر اسلایددار ساخته بودیم رو بر میداریم و به تعداد ایندکساش اسپن میسازیم

        let dots = document.createElement('div')//یه دیو میسازیم
        dots.classList.add('dots');
        dots.innerHTML = `${dotElements.join('')}`
        // اسپن هایی که ساختیم رو میزاریم تو این دیو
        sliderElement.after(dots);
        // دیو رو داخل اچ تی ام ال میزاریم بعد از دیوی که اسلایدها توشن
        this.dots = dots.querySelectorAll('.dot');


        this.dots.forEach(dot => dot.addEventListener('click' , e => this.currentSlide(parseInt(e.target.dataset.slide))))    
        //با کلیک رو نقطه ها دیتای ست شده در اچ تی ام ال ازشون گرفته میشه و به کیورنت اسلاید داده میشه
    }

    showSlides(number){
        let { el : sliderElement , slideClass , currentSlider} = this.options;

        if(number > this.sliders.length)this.slideIndex = 1
        if(number < 1)this.slideIndex = this.sliders.length
//اگر رسیدیم به اولین یا آخرین اسلایدایندکس در صورت کیلیک دوباره برمیگرده به آخرین یا اولین اسلاید

        sliderElement.querySelector(`.${slideClass}.active`).classList.remove('active');
        this.dots.forEach(dot => dot.classList.remove('active'))
        this.sliders[this.slideIndex-1].classList.add('active');
        this.dots[this.slideIndex-1].classList.add('active')

        if(currentSlider) currentSlider(this.sliders[this.slideIndex-1])

    }
    slideTime() {
        if(this.auto != 0){
            this.x = setInterval(()=> this.showSlides(this.slideIndex +=1) ,this.auto)
        }
    }
    resetSlideTime(){
        clearInterval(this.x)
        this.slideTime()
    }

} 