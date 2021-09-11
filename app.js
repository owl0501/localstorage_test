// let string ='test_string';
// let number=123;
// let array=['asd',123,true];
// let object={ob1:1};

// 存入localstorage(轉換JSON格式)
// localStorage.setItem('item1',JSON.stringify(string));
// localStorage.setItem('item2',JSON.stringify(number));
// localStorage.setItem('item3',JSON.stringify(array));
// localStorage.setItem('item4',JSON.stringify(object));

//讀取localstorage資料(轉換回原格式)=>原type
// console.log(JSON.parse(localStorage.getItem('item1')));
// console.log(JSON.parse(localStorage.getItem('item2')));
// console.log(JSON.parse(localStorage.getItem('item3')));
// console.log(JSON.parse(localStorage.getItem('item4')));
if (localStorage.getItem('item') === null) {
    let storageArray = [];
    localStorage.setItem('item', JSON.stringify(storageArray));
//當localStorage已存在資料陣列，指定一個內容與陣列資料庫相同的陣列
} else {
    storageArray = JSON.parse(localStorage.getItem('item'));
};

window.addEventListener('load',function(e){
    console.log('load');
    updateList();
});

const addItems=document.querySelector('.add-items');
const item_input=document.getElementById('item_input');
const submit=document.getElementById('submit');
const item_list=document.getElementById('item_list');
const btnClear=document.getElementsByClassName('clear_btn')[0];
// let storageArray=[];
//當localStorage沒有資料陣列，指定一個空陣列放入資料庫


addItems.addEventListener('submit',function(e){
    e.preventDefault();
    addItem();
});
console.log('storageArray',storageArray);
//新增item
function addItem(event){
    // event.preventDefault();
    //取得新增資料
    let inputValue=item_input.value;
    //建立一個符合我們需求的物件
    let inputObject={value:inputValue
                    ,done:false};
    //將物件加入陣列中
    storageArray.push(inputObject);
    //轉JSON
    let storageJSON=JSON.stringify(storageArray);
    //將物件加入localStorage中
    localStorage.setItem('item',storageJSON);
    //清空input欄
    item_input.value='';
    //呈現資料
    updateList();
}
//刪除item
function removeItem(event){    
    storageArray.pop();
    //轉JSON
    let storageJSON=JSON.stringify(storageArray);
    //將物件加入localStorage中
    localStorage.setItem('item',storageJSON);
    updateList();
}

btnClear.addEventListener('click',function(){
    storageArray=[];
    //轉JSON
    let storageJSON=JSON.stringify(storageArray);
    //將物件加入localStorage中
    localStorage.setItem('item',storageJSON);
    updateList();
});

//更新list
function updateList(){
    //將資料庫的陣列取出
    let arrayJSON=JSON.parse(localStorage.getItem('item'));
    //若資料庫內的陣列有資料,執行
    if(arrayJSON.length!==0){
        //清空list
        item_list.innerHTML='';
        //對陣列裡的每個元素執行函式
        arrayJSON.forEach(function(item){
            //在DOM創一個item
            let createLi=document.createElement('li');
            createLi.className='item';
            //在DOM創一個checkbox
            let btnCheck=document.createElement('input');
            btnCheck.setAttribute('type','checkbox');
            btnCheck.className='check_btn';
            // 在DOM創一個button
            let btnRemove=document.createElement('input');
            btnRemove.setAttribute('type','button');
            btnRemove.className='remove_btn';
            btnRemove.value='X';
            //在DOMt創一個label(content)
            let createLabel = document.createElement('label');
            // 將done值指定給checkbox的checked屬性
            btnCheck.checked=item['done'];
            //將物件中的value指定給label
            createLabel.textContent=item['value'];
            //將Label加入事件
            createLabel.addEventListener('click',function(e){
                checkstatus('label')
            });
            //將checkbox加入事件
            btnCheck.addEventListener('click',function(e){
                checkstatus('.check_btn');
            });
            //將removebtn加入事件
            btnRemove.addEventListener('click',function(e){
                removeItem(item_list,createLi);
            });
            //將btnCheckbox加入li
            createLi.appendChild(btnCheck);
            //將label加入li
            createLi.appendChild(createLabel);
            //將btnRemove加入li
            createLi.appendChild(btnRemove);
            //將li加入ul
            item_list.appendChild(createLi);
        });
    }
    else{
        item_list.innerHTML='<li class="item">Empty...</li>';
    }
}
//更新checkbox狀態
function checkstatus(item_element){
    //將目前頁面中所以<lable>選出來
    let allElements=document.querySelectorAll(item_element);
    //將上一步的nodelist轉陣列
    let labelArray=Array.from(allElements);
    //
    let getIndex=labelArray.indexOf(event.target);
    //將資料庫中的資料叫出來
    let arrayJSON=JSON.parse(localStorage.getItem('item'));
    //當click觸發,將done改為相反
    arrayJSON[getIndex]['done']=!arrayJSON[getIndex]['done'];
    //將新資料轉為JSON
    let stringJSON=JSON.stringify(arrayJSON);
    //加入localStorage
    localStorage.setItem('item',stringJSON);
    //重新將資料呈現
    updateList();
}





