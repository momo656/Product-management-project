let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('submet');
let mood = create;
let Tmp ;
 
function getTotal(){

    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    }else{
        total.innerHTML = ''
        total.style.background = '#c90b0b'
    }
 }


  let dataPro;
 if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)

 }else{
     dataPro = [];
 }
 
 
 create.onclick = function (){

    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(title.value !=''&&
        price.value !=''&&
        category.value !='' ){
            if(mood === 'create'){

                if(newPro.count > 1){
                    for(i=1; i < newPro.count ; i++){
                        dataPro.push(newPro)
                    }
                    
                }else{
                    dataPro.push(newPro)
                }
                
            }else{
                console.log('ok');
                dataPro[Tmp] = newPro;
                count.style.display = 'block';
                mood = 'create';
                create.innerHTML = 'Create';
        
            }
            clearData()
        }

    
   
    
    localStorage.setItem( 'product' , JSON.stringify(dataPro))
   
   
    showData()
 }

 function clearData (){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';


 }
 function showData(){
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++ ){
        table += 
        `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick = 'updateData(${i})' id="update">Update</button></td>
            <td><button onclick = 'deleteData(${i})' id="delete">Delete</button></td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if( dataPro.length > 0){
        btnDelete.innerHTML = `<button onclick = 'deleteAll()' >delete All (${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML = ""
    }
 }
 showData()

 function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showData()


 }
 function deleteAll(){
    localStorage.clear
    dataPro.splice(0)
    showData()
 }
 function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display = 'none';
    mood = 'update';
    getTotal()
    create.innerHTML = 'Update'
    Tmp = i;
    
 }

 let searchMood = 'title';
 function getShearchmood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';


    }else{
        searchMood = 'category'
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showData();
 }

 function searchData(value){
    let table ='';
    for (let i = 0; i < dataPro.length; i++) {
    if(searchMood == 'title'){
      
            if(dataPro[i].title.includes(value)){
                table += 
                `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = 'updateData(${i})' id="update">Update</button></td>
                    <td><button onclick = 'deleteData(${i})' id="delete">Delete</button></td>
                </tr>
                `
        }
        
    }else{
        if(dataPro[i].category.includes(value)){
            table += 
            `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = 'updateData(${i})' id="update">Update</button></td>
                <td><button onclick = 'deleteData(${i})' id="delete">Delete</button></td>
            </tr>
            `    
        }
    }
    
}
document.getElementById('tbody').innerHTML = table;
 }