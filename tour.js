

let data=[];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json').then((response)=>{
    data=response.data.data;
    renderData(data);
}).catch((error)=>{
    console.log(error)
})

//渲染

const list = document.querySelector('.ticketCard-area')
const searchResult = document.querySelector('#searchResult-text')

function renderData(data){
    let str='';
data.forEach((item)=>{
    str+=`<li class="ticketCard">
    <div class="ticketCard-img">
      <a href="#">
        <img src=${item.imgUrl} alt="">
      </a>
      <div class="ticketCard-region">${item.area}</div>
      <div class="ticketCard-rank">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
      <div>
        <h3>
          <a href="#" class="ticketCard-name">${item.name}</a>
        </h3>
        <p class="ticketCard-description">
        ${item.description}
        </p>
      </div>
      <div class="ticketCard-info">
        <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
          TWD <span id="ticketCard-price">${item.price}</span>
        </p>
      </div>
    </div>
  </li>`
})
 list.innerHTML=str;
 searchResult.textContent=`本次搜尋共 ${data.length} 筆資料`;
}
renderData(data);

//搜尋

const search = document.querySelector('.regionSearch');
search.addEventListener('change',e=>{
    let showData=[];
    if(e.target.value===''){
      showData=data;
    }else if(e.target.value ==='台北'){
      showData=data.filter(i=>i.area==='台北')
      
    }else if(e.target.value ==='台中'){
      showData=data.filter(i=>i.area==='台中')
      
    }else if(e.target.value ==='高雄'){
      showData=data.filter(i=>i.area==='高雄')
      
    }
   renderData(showData);
})

//新增

const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');
const addTicket = document.querySelector('.addTicket-btn');
const resetForm = document.querySelector('.addTicket-form')

addTicket.addEventListener('click',e=>{
  if(ticketName.value=='' || ticketImgUrl.value=='' || 
      ticketRegion.value=='' || ticketPrice.value=='' || 
      ticketNum.value=='' || ticketRate.value=='' || 
      ticketDescription.value==''){
    alert('請輸入完整內容')
    resetForm.reset();
    return   
  }else if(ticketRate.value>10){
    alert('套票星級不得超過10')
    resetForm.reset();
    return
  }else if(ticketRate.value<1){
    alert('套票星級不得低於1')
    resetForm.reset();
    return
  }

  let addObj={};
  addObj.id = data.length;
  addObj.name = ticketName.value;
  addObj.imgUrl = ticketImgUrl.value;
  addObj.area = ticketRegion.value;
  addObj.price = ticketPrice.value;
  addObj.group = ticketNum.value;
  addObj.rate = ticketRate.value;
  addObj.description= ticketDescription.value;
  data.push(addObj);
  renderData(data);
  resetForm.reset();
})


