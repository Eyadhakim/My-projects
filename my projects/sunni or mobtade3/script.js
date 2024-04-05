const input = document.getElementById('personInp')
const button = document.querySelector('button')
const result = document.querySelector('p')

const good = [/عثيمين/i||/دمشقية/i||/محمد حسان/i||/هيثم طلعت/i||/مصطفى العدوي/i||/محمد حسين يعقوب/i||/شمس الدين/i||/النووي/i||/محمد إسماعيل المقدم/i||/الحويني/i]
const bad = [/خالد الجندي/i||/وسيم يوسف/i||/يسري جبر/i||/عمرو خالد/i||/بن عربي/i||/جابر البغدادي/i||/البوطي/i||/علي جمعة/i||/الجفري/i]

button.onclick = function(){
        if(input.value.match(/عثيمين/i)||input.value.match(/حسن الحسيني/i)||input.value.match(/الفوزان/i)||input.value.match(/برهامي/i)||input.value.match(/العصيمي/i)||input.value.match(/بن حجر/i)||input.value.match(/الشافعي/i)||input.value.match(/مالك بن أنس/i)||input.value.match(/حنيفة/i)||input.value.match(/حنبل/i)||input.value.match(/بن باز/i)||input.value.match(/دمشقية/i)||input.value.match(/محمد حسان/i)||input.value.match(/هيثم طلعت/i)||input.value.match(/مصطفى العدوي/i)||input.value.match(/محمد حسين يعقوب/i)||input.value.match(/شمس الدين/i)||input.value.match(/النووي/i)||input.value.match(/محمد إسماعيل المقدم/i)||input.value.match(/الحويني/i)){
            result.innerHTML = "سني"
            result.style.color = 'green'
        } else if(input.value.match(/خالد الجندي/i)||input.value.match(/وسيم يوسف/i)||input.value.match(/يسري جبر/i)||input.value.match(/عمرو خالد/i)||input.value.match(/بن عربي/i)||input.value.match(/جابر البغدادي/i)||input.value.match(/حلاج/i)||input.value.match(/بوطي/i)||input.value.match(/علي جمعة/i)||input.value.match(/الجفري/i)) {
            result.innerHTML = "مبتدع"
            result.style.color = 'red'
        } else if(input.value.match (/سيسي/)){
            result.innerHTML = "معرص"
            result.style.color = '#0088f7'
        } else {
            result.innerHTML = 'غير معروف'
            result.style.color = 'yellow'
        }
        input.value = ''
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});

