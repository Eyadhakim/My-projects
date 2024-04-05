const title = document.getElementById('title')
const price = document.getElementById('price')
const taxes = document.getElementById('taxes')
const ads = document.getElementById('ads')
const discount = document.getElementById('discount')
const total = document.getElementById('total')
const count = document.getElementById('count')
const category = document.getElementById('category')
const submit = document.getElementById('submit')

let mood = 'create'
let tmp;

function getTotal(){
    if(price.value > 0){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerText = result
        total.style.background = '#040'
    } else {
        total.innerText = ''
        total.style.background = '#9c0101'
    }
}

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
} else {
dataPro = []
}

submit.onclick = function (){
    if(title.value != '' && category.value != '' && price.value != ''){
        let newPro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }
    
        if(mood === 'create'){
            if(newPro.count >1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro)
                }
            } else {
                dataPro.push(newPro)
            }
        } else {
            dataPro[tmp] = newPro
            mood = 'create'
            submit.innerHTML = '<strong>Create</strong>'
            count.style.display = 'block'
        }
        
        localStorage.setItem('product', JSON.stringify(dataPro))
        clearData()
        showData()
    }
}

function clearData(){
    title.value =''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerText = ''
    count.value = ''
    category.value = ''
    price.value = ''
}

function showData(){
    getTotal()
    let table = ''
    for(let i = 0; i < dataPro.length; i++){
        table += `<tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "update(${i})" id ="update">update</button></td>
        <td><button onclick = "deleteData(${i})" id ="delete">delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML = table
    let deleteBtn = document.getElementById('deleteAll')
    if(dataPro.length > 0){
        deleteBtn.innerHTML = `<button onclick = "deleteAll()"><strong>Delete all (${dataPro.length})</strong></button>`
    } else {
        deleteBtn.innerHTML = ''
    }
}
showData()

function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll(){
    dataPro.splice(0)
    localStorage.clear('product')
    showData()
}

function update(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    getTotal()
    count.style.display = 'none'
    submit.innerHTML = '<strong>Update</strong>'
    mood = 'update'
    tmp = i
    scroll({
        top: 0
    })
}

let searchMood = 'title'

function getSearchMood(id){
    let search = document.getElementById('search')
    if (id == 'searchTitle'){
        searchMood = 'title'
    } else {
        searchMood = 'category'
    }
    search.placeholder = 'Search by '+searchMood
    search.focus()
    search.value = ''
    showData()
}

function searchData(value){
    let table = ''
    if(searchMood == 'title'){
        for(let i=0; i<dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `<tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "update(${i})" id ="update">update</button></td>
        <td><button onclick = "deleteData(${i})" id ="delete">delete</button></td>
    </tr>`
            }
        }
    } else {
        for(let i=0; i<dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `<tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "update(${i})" id ="update">update</button></td>
        <td><button onclick = "deleteData(${i})" id ="delete">delete</button></td>
    </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table
}