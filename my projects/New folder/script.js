const date = document.getElementById('date')
const time = document.getElementById('time')
const before = document.getElementById('before')
const tool = document.getElementById('tool')
const where = document.getElementById('where')
const alone = document.getElementById('alone')
const bussyness = document.getElementById('bussyness')
const duration = document.getElementById('duration')
const submit = document.getElementById('submit')
const worships = document.getElementsByName('worship-value')

let day = new Date().getDate()
let month = new Date().getMonth()
let year = new Date().getFullYear()
let today = `${year}-${(month<10)?String(0)+(month+1):month+1}-${day}`
date.value=today
duration.value = 10
document.querySelector('.bigger strong').innerHTML = "10 minutes"
document.querySelector('.bigger strong').style.backgroundColor = '#019c5e'

let data;
if(localStorage.borndata != null){
    data = JSON.parse(localStorage.borndata)
} else {
    data = []
}

duration.oninput = function(){
    let durStyle = document.querySelector('#durationh')
    let durationH;
    if (this.value != 60){
        if(Math.floor(this.value/60) != 0){
        if(this.value%60 == 0){
            durationH = `${Math.floor(this.value/60)} hours`
        } else if (this.value%60<10 && this.value>0){
            durationH = `${Math.floor(this.value/60)}:0${this.value%60} hours`
        } else if(this.value/60 == 1){
            durationH = "1 hour"
        } else {
            durationH = `${Math.floor(this.value/60)}:${this.value%60} hours`
        }
        durStyle.style.backgroundColor = '#9c0101'
    } else {
        if(this.value%60 == 1){
            durationH = `1 minute`
            durStyle.style.backgroundColor = '#019c5e'
        } else {
            if(this.value <= 15){
                durStyle.style.backgroundColor = '#019c5e'
                durationH = `${this.value%60} minutes`
            } else {
                durStyle.style.backgroundColor = '#9c9901'
                durationH = `${this.value%60} minutes`
            }
        }
    }
    } else {
        durationH = '1 hour'
        durStyle.style.backgroundColor = '#9c9901'
    }
    
    document.querySelector('.bigger strong').innerHTML = durationH
}

submit.onclick = function addData(){
    if(date.value != ''&&time.value != ''&&document.querySelector('.bigger strong').innerHTML != ''){
    let datarow = {
    date: date.value,
    time: time.value,
    before: before.value,
    where: where.value,
    tool: tool.value,
    duration: document.querySelector('.bigger strong').innerHTML,
}
if(alone.checked){
    datarow.alone = true
} else {
    datarow.alone = false
}
if(bussyness.checked){
    datarow.bussyness = true
} else {
    datarow.bussyness = false
}
if(document.getElementById('low').checked){
    datarow.worship = "low"
} else if(document.getElementById('normal').checked) {
    datarow.worship = "normal"
} else if(document.getElementById('high').checked) {
    datarow.worship = "high"
}
data.push(datarow)

localStorage.setItem("borndata",JSON.stringify(data))
showData()
    }
console.log(document.getElementsByName('worship-value'))

}

console.log(document.getElementsByName('worship-value'))

function showData(){
    let table = '';
    for(let i = 0; i < data.length; i++){
        table += `<tr>
        <td>${data[i].date}</td>
        <td>${data[i].time}</td>
        <td>${data[i].before}</td>
        <td>${data[i].duration}</td>
        <td>${data[i].alone}</td>
        <td>${data[i].tool}</td>
        <td>${data[i].where}</td>
        <td>${data[i].bussyness}</td>
        <td>${data[i].worship}</td>
        </tr>`
    }
    document.querySelector('tbody').innerHTML = table
}
showData()

document.querySelector('.head button').onclick = function(){
    document.querySelector('.crud').style.display = 'none'
    document.querySelector('.container').style.display = 'flex'
    document.getElementById('returnBtn').style.display = 'flex'
}

document.getElementById('returnBtn').onclick = function(){
    document.querySelector('.crud').style.display = 'block'
    document.querySelector('.container').style.display = 'none'
    document.getElementById('returnBtn').style.display = 'none'
}

const timeana = document.getElementById('mostTime')
const beforeana = document.getElementById ('mostBefore')
const toolana = document.getElementById ('mostTool')
const whereana = document.getElementById ('mostPlace')
const aloneana = document.getElementById('lonRate')
const bussynessana = document.getElementById('bussyRate')
const durationana = document.getElementById('mostDuration')
const worshipsana = document.getElementById('worshipsValue')

function analysis(){
    let timeWithHours = []
    for (let i = 0; i < data.length; i++) {
        timeWithHours.push(Math.round(Number(data[i].time.split(':')[0])+Number(data[i].time.split(':')[1])/60))
    }
    let timesArr = [...timeWithHours].sort((a,b) => {return a-b})
    function mode(arr){
        return arr.sort((a,b) =>
            arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }

    function least(arr) {
        let arrMap = arr.reduce(function(obj, val) {
        obj[val] = ++obj[val] || 1;
        return obj;
        }, {});
        let rarest = Object.keys(arrMap)[0];
        for (key in arrMap) {
        rarest = arrMap[rarest] > arrMap[key] ? key : rarest;
        }
        return rarest;
    }

    let initialV
    let finalV
    timeWithHours = mode(timeWithHours)
    if(timeWithHours == 0 || timeWithHours == 24){
        initialV = "11:00 pm"
        finalV = "1:00 am"
    } else if(timeWithHours == 12){
        initialV = "11:00 am"
        finalV = "1:00 pm"
    } else if(timeWithHours == 11){
        initialV = "10:00 am"
        finalV = "12:00 pm"
    } else if(timeWithHours == 23){
        initialV = "10:00 pm"
        finalV = "12:00 am"
    } else if(timeWithHours == 13){
        initialV = "12:00 pm"
        finalV = "2:00 pm"
    } else if(timeWithHours == 1){
        initialV = "12:00 am"
        finalV = "2:00 am"
    } else if(timeWithHours<=10 && timeWithHours>=2){
        initialV = `${timeWithHours-1}:00 am`
        finalV = `${timeWithHours-1}:00 am`
    } else {
        initialV = `${timeWithHours-13}:00 pm`
        finalV = `${timeWithHours-11}:00 pm`
    }
    let rate = timesArr.reduce((t,v) => {return t+v})/timesArr.length
    let truncRate = Math.trunc(rate)
    let rateDecimal = `${(Math.round((rate - truncRate)*60))>=10?Math.round((rate - truncRate)*60):"0"+Math.round((rate - truncRate)*60)}`
    timeana.lastElementChild.lastElementChild.lastElementChild.innerHTML = `${truncRate>12?truncRate-12:truncRate}:${rateDecimal} ${truncRate>12?"pm":"am"}`

    let beforeArr = []
    for(let i = 0; i<data.length; i++){
        beforeArr.push(data[i].before)
    }
    
    notBefore = []
    for(let i = 0; i<before.options.length; i++){
        if(!beforeArr.includes(before.options[i].text)){
            notBefore.push(before.options[i].text)
        }
    }

    if(notBefore.toString() != ''){
        beforeana.lastElementChild.lastElementChild.lastElementChild.innerHTML = notBefore.toString()
    } else {
        beforeana.lastElementChild.lastElementChild.lastElementChild.innerHTML = least(beforeArr)
    }

    let places = []
    for(let i = 0; i<data.length; i++){
        places.push(data[i].where)
    }

    let allWorships = []
    for(let i = 0; i<data.length; i++){
        allWorships.push(data[i].worship)
    }

    let worshipRate = allWorships.map((value,index,array) => {
        if(value == "low"){
            return 10
        } else if(value == "high"){
            return 90
        } else {
            return 50
        }
    })
    

        let worRate = worshipRate.reduce((t,v) => {
            return t+v
        })

        worRate = Math.round(worRate/data.length*10)/10 + "%"

        let aloneValues = []
        let aloneRate = []
        for(let i = 0; i<data.length; i++){
            if(data[i].alone){
                aloneValues.push("alone")
                aloneRate.push(100)
            } else {
                aloneValues.push("not alone")
                aloneRate.push(0)
            }
        }
        aloneRate = aloneRate.reduce((t,v) => {
            return t+v
        })
        aloneRate = Math.round(aloneRate/data.length*10)/10 + "%" 

        let bussyValues = []
        let bussyRate = []
        for(let i = 0; i<data.length; i++){
            if(data[i].bussyness){
                bussyValues.push("bussy")
                bussyRate.push(100)
            } else {
                bussyValues.push("not bussy")
                bussyRate.push(0)
            }
        }
        bussyRate = bussyRate.reduce((t,v) => {
            return t+v
        })
        bussyRate = Math.round(bussyRate/data.length*10)/10 + "%" 

        let toolValues = []
        let toolRate = []
        for(let i = 0; i<data.length; i++){
            toolValues.push(data[i].tool)
        }

        let durationRate = []
        for (let i = 0; i < data.length; i++) {
            if(data[i].duration.split(' ')[1] == 'minutes'){
            durationRate.push(Number(data[i].duration.split(' ')[0]))
            } else {
                if(data[i].duration.split(' ')[0].split(':').length == 2){
                    let minute = Number(data[i].duration.split(' ')[0].split(':')[0])
                    minute *= 60
                    minute += Number(data[i].duration.split(' ')[0].split(':')[1])
                    durationRate.push(minute)
                } else {
                    let minute = data[i].duration.split(' ')[0]
                    minute *= 60
                    durationRate.push(minute)
                }
            }
        }

        durationRate = durationRate.reduce((t,v) => {
            return t+v
        })
        durationRate = Math.round(durationRate/data.length)
        if(durationRate<60){
            durationRate = durationRate + " minutes"
        } else {
            durationRate = `${Math.floor(durationRate/60)}:${durationRate%60 < 10?"0"+durationRate%60:durationRate%60} hours`
        }

    timeana.lastElementChild.firstElementChild.lastElementChild.innerHTML = `from ${initialV} to ${finalV}`
    beforeana.lastElementChild.firstElementChild.lastElementChild.innerHTML = mode(beforeArr)
    whereana.lastElementChild.firstElementChild.lastElementChild.innerHTML = mode(places)
    whereana.lastElementChild.lastElementChild.lastElementChild.innerHTML = least(places)
    worshipsana.lastElementChild.firstElementChild.lastElementChild.innerHTML = mode(allWorships)
    worshipsana.lastElementChild.children[1].lastElementChild.innerHTML = least(allWorships)
    worshipsana.lastElementChild.lastElementChild.lastElementChild.innerHTML = worRate
    aloneana.lastElementChild.firstElementChild.lastElementChild.innerHTML = mode(aloneValues)
    aloneana.lastElementChild.children[1].lastElementChild.innerHTML = least(aloneValues)
    aloneana.lastElementChild.lastElementChild.lastElementChild.innerHTML = aloneRate
    bussynessana.lastElementChild.firstElementChild.lastElementChild.innerHTML = mode(bussyValues)
    bussynessana.lastElementChild.children[1].lastElementChild.innerHTML = least(bussyValues)
    bussynessana.lastElementChild.lastElementChild.lastElementChild.innerHTML = bussyRate
    toolana.lastElementChild.firstElementChild.lastElementChild.innerHTML = mode(toolValues)
    toolana.lastElementChild.children[1].lastElementChild.innerHTML = least(toolValues)
    durationana.lastElementChild.innerHTML = durationRate
    console.log(notBefore)
}
analysis()