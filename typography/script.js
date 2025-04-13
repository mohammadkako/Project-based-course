let hero = document.querySelector(".hero")
let text = document.querySelector("h1")
let walk = 200// ایجاد مرز برای عدم دور شدن بیش از حد تکست شَدو ها

window.addEventListener("mousemove",function(e){
    let {offsetWidth : width , offsetHeight : height} = hero///ارتفاع و عرض عنصر هیرو
    let {offsetX : x , offsetY : y} = e ///مختصات قرار گیری موس

    x += e.target.offsetLeft
//مقدار عرض مختصاتی موس به علاوه فاصله عنصری که موس روشه (تارگت) از لبه چپ عنصر والدش 
    y += e.target.offsetTop
//مقدار ارتفاع مختصاتی موس به علاوه فاصله عنصری که موس روشه (تارگت) از لبه بالایی عنصر والدش 

    let xWalk=Math.round(x/width*walk) - (walk/2)
    //محدوده حرکت در محور ایکس
    let yWalk=Math.round(y/height*walk) - (walk/2)
    //محدوده حرکت در محور وای

    text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(250,80,58,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(222,98,200,0.7),
    ${yWalk}px ${xWalk* -1}px 0 rgba(12,250,151,0.7),
    ${yWalk* -1}px ${xWalk}px 0 rgba(23,187,251,0.7)

    `
})