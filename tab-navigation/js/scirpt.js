let items = document.querySelectorAll(".cd-tabs-navigation li a")
items.forEach((item)=>{
    item.addEventListener("click",function(e){
        e.preventDefault()
//از اعمال پیشفرض جلوگیری میکنی مثلا با کلیک رو عنصر اِی(انگلیسی) بالای صفحه # نمیاد
   
    document.querySelector(".cd-tabs-navigation li a.selected").classList.remove("selected")
    this.classList.add("selected")
    // تب ها عوض میشن

        let dataBox = this.getAttribute("data-content")
// دیتا کانتنت تب ها به واسطه کلیک کردن گرفته میشه و دیتا کانتنت محتوای هر تب رو درستی جایگزاری میکنه

    document.querySelector(".cd-tabs-content li.selected").classList.remove("selected")
    document.querySelector(`.cd-tabs-content li[data-content="${dataBox}"]`).classList.add("selected")
   //محتوای هر تب با تغییر آن تغییر میکند
    })
})