


let data = [
    { id : 1 , title : "یکشنبه 8 تا 9:30" , text :"خواندن و درک مفاهیم2 استاد رقیه مصلح پور"},
    { id : 2 , title : "یکشنبه 9:45 تا 11:15" , text :"گفت و شنود2 استاد مصلح رقیه پور"},
    { id : 3 , title : "یکشنبه 11:30 تا 13:00" , text : "آزمایشگاه زبان2 استاد رقیه مصلح پور"},
    { id : 4 , title : "یکشنبه 14:45 تا 16:30" , text : "متون مطبوعاتی استاد فرزین نوشین"},
    { id : 5 , title : "دوشنبه 8 تا 9:30" , text :"اصول و روش ترجمه1 استاد ثمین رضاپور"},
    { id : 6 , title : "دوشنبه 9:45 تا 11:15" , text :"ترجمه متون عمومی1 استاد ثمین رضاپور"},
    { id : 7 , title : "پنجشنبه 8 تا 9:30" , text : "جمله نویسی و نگارش استاد محمدرضا سلیمی"},
    { id : 8 , title : "پنجشنبه 9:45 تا 11:15" , text : "واژه شناسی استاد محمدرضا سلیمی"},
    { id : 9 , title : "پنجشنبه 11:30 تا 13:00" , text : "دستور زبان2 استاد محمدرضا سلیمی"},
]
//یک لیست از دیتا ها ایجاد میکنیم

new draggable({
    el : document.querySelector('#list'),
    list : data,
    template : (item) => {
        return `
        
            <div class="list-item" id="${item.id}">
                <div class="list-item_head">
                    <span class="head-id">${item.id}</span>
                </div>
                <div class="list-item_content">
                    <span class="item-title">${item.title}</span>
                    <p>${item.text}</p>
                </div>
            </div>
        
        `
    },
    update : (list) => {
        console.log('new List',list)
    }
})

