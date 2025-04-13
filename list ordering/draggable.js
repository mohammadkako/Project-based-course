class draggable {

    constructor(options) {
        this.setupList(options);//لیست را در صفحه html نمایش میدهد
        this.list = options.list;
        
        if(options.update) this.update = options.update;
//اگر تغیری در ترتیب لیست ایجاد شود تابع آبدیت در اون یکی سند جاوااسکریپت فعال میشه و تغیرات رو ثبت میکنه سپس با این کد در این سند ذخیره میشود
            
        for(let listItem of options.el.children) {
            this.addDnDHandlers(listItem)
        }//این بخش برای تک تک ایتم های لیست رویداد های کشیدن و رها کردن را اضافه میکند
    }
//در واقع این بخش ، تمام بخش های زیر رو به هم و به سند دیگر وصل میکنه

    setupList(options) {
        let {list , el : element , template } = options;

        if(! element ) throw Error('the list is not exists');
        if(! list ) throw Error('the data is not exists')
        if(! Array.isArray(list)) throw Error('the list is not an array, please insert an array')
        if(! template) throw Error('please add a Tempalte function')
        if(typeof template !== "function") throw Error('please add a function as template') 
            //اعتبارسنجی ورودی‌ها
        list.forEach(item => element.innerHTML += template(item))
        //لیست دیتا رو میبره تو html
    }

    addDnDHandlers(element) {
        element.setAttribute('draggable' , true); //عنصر قابل کشیدن شد

        //از ایونت هندلر داخل ایونت لیسینر استفاده شده
        element.addEventListener('dragstart' , this.handleDragStart.bind(this))
        element.addEventListener('dragover' , this.handleDragOver.bind(this))
        element.addEventListener('dragleave' , this.handleDragLeave.bind(this))
        element.addEventListener('drop' , this.handleDragDrop.bind(this))
        element.addEventListener('dragend' , this.handleDragEnd.bind(this))
    }

    handleDragStart(e) {// این برای المنتی هست که کشیده میشه
        this.dragSrcEl = e.target;

        e.dataTransfer.setData('text/html' , e.target.outerHTML)// دیتا رو بعد از جابه جایی حفظ میکند

        e.target.classList.add('dragElem')
    }

    handleDragOver(e) {// این برای المنتی هست که یک المنت اومده روش
        if(e.preventDefault) e.preventDefault();//از رفتار پیش‌فرض مرورگر جلوگیری می‌کند.

        e.target.classList.add('over');

    }

    handleDragLeave(e) {//همون المنتی هست که کشیده شده
        e.target.classList.remove('over');
    }

    handleDragDrop(e) {
        let target = e.target.closest('.list-item');

       if(this.dragSrcEl != target) {//این شرط بررسی می‌کند که آیا عنصر کشیده شده با عنصر هدف (تارگت) متفاوت است یا خیر.
            target.parentNode.removeChild(this.dragSrcEl);
//اگر عنصر کشیده شده جابجا شده باشد، این خط عنصر کشیده شده را از موقعیت قبلی خود در DOM حذف می‌کند
            let dropHTML = e.dataTransfer.getData('text/html');
            target.insertAdjacentHTML('afterend' , dropHTML);//عنصر کشیده شده رو میندازه قبل عنصر هدف
            this.addDnDHandlers(target.nextSibling)
       }
       e.target.classList.remove('over');

    }

    handleDragEnd(e) {
        e.target.classList.remove('dragElem');

        let newList = [];
        list.querySelectorAll('.list-item').forEach(elm => newList.push(this.list.find(item => elm.id == item.id)))
        this.update(newList);
    }
}