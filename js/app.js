// categories btn
const categoryContainer = document.getElementById('categoryContainer');
const cardsContainer = document.getElementById('card-items');
const plantsDetails = document.getElementById('plants-details');
const modalContainer = document.getElementById('modal-container');
let cartArr = [];
//load category btn
const loadCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => {
       displayCategories(data.categories)
    })
};
// show category btn items
const displayCategories = (cat) => {
    
    cat.forEach(cat => {
        // console.log(cat.category_name);
        categoryContainer. innerHTML += `
            <button id = ${cat.id} class="bg-btn d-block w-full px-2 py-1 my-1 rounded-lg cursor-pointer text-left">
                ${cat.category_name}
            </button>
        `;

    });
    categoryContainer.addEventListener('click' , (e) => {
        // console.log(e)
        const allBtn = document.getElementsByClassName('bg-btn');
        for (const ele of allBtn) {
            ele.classList.remove('bg-[#15803D]' , 'text-white')
        }
        if(e.target.localName === 'button'){
            // console.log(e.target)
            e.target.classList.add('bg-[#15803D]' , 'text-white');
           loadPlantsByCategory(e.target.id)
           showLoading()
        }
    })
    
}
//load cards item
const loadPlantsByCategory = (plantsId) => {
    const url = `https://openapi.programming-hero.com/api/category/${plantsId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      showCardItems(data.plants)
      
    })
}


// show card items

const showCardItems = (plants) => {
    // console.log(cards)

     cardsContainer.innerHTML = "";
   plants.forEach(plants => {
        
        cardsContainer.innerHTML += `
            <div class="card-body p-0 bg-white  shadow-md">
                <div class="img-box w-full ">
                    <img src="${plants.image}" alt="" class="w-full h-50 object-cover rounded-tl-lg rounded-tr-lg">
                </div>
                <div class="p-3 w-full">
                    <h2 class="card-title font-bold">${plants.name}</h2>
                    <p class="text-justify my-3">${plants.description}</p>
                    <div class="flex justify-between items-center ">
                        <div class="bg-[#DCFCE7] text-[#15803D] p-2 rounded-2xl font-bold">
                            <p>${plants.category}</p>
                        </div>
                        <div class="font-bold">
                            <p>৳<span>${plants.price}</span></p>
                        </div>        
                    </div>
                    <button  class="add-btn btn bg-[#15803D] text-white rounded-3xl w-full mt-3">Add To Cart</button>
                </div>
            </div>
        `;
        
    })
    
}


// all plants
const loadAllPlants = () => {
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showAllPlants(data.plants)
    })
     showLoading()
     
}
//show all plants

const showAllPlants = (allPlants) => {
    cardsContainer.innerHTML = "";
    allPlants.forEach(plants => {
        // console.log(plants)
        
        cardsContainer.innerHTML += `
        
        <div class="card-body p-0 bg-white  shadow-md">
                <div class="img-box w-full ">
                    <img src="${plants.image}" alt="" class="w-full h-50 object-cover rounded-tl-lg rounded-tr-lg">
                </div>
                <div id = "${plants.id}" class="p-3 w-full">
                    <h2 class="card-title font-bold">${plants.name}</h2>
                    <p class="text-justify my-3">${plants.description}</p>
                    <div   class="flex justify-between items-center ">
                        <div class="bg-[#DCFCE7] text-[#15803D] p-2 rounded-2xl font-bold">
                            <p>${plants.category}</p>
                        </div>
                        <div class="font-bold">
                            <p>৳<span>${plants.price}</span></p>
                        </div>        
                    </div>
                    <button class="add-btn btn bg-[#15803D] text-white rounded-3xl w-full mt-3">Add To Cart</button>
                </div>
            </div>
        
        `;
    })
}

//  total of cards
let cartTotal = 0;
let cartCount = 0;

cardsContainer.addEventListener('click', (e) => {
    if(e.target.className.includes('add-btn')){
        cartHandler(e)
    }
    if(e.target.className.includes('card-title')){
       itemDetails(e)
    }
})

// card cart and price handler
const cartHandler = (e) => {
    const cardTitle = e.target.parentNode.children[0].innerText;
    const cardPrice = Number(e.target.parentNode.children[2].children[1].children[0].children[0].innerText);
    const cardId = e.target.parentNode.id;
    console.log(cardId)

    cartArr.push({
        title: cardTitle,
        price: cardPrice,
        id: cardId
    })

    // cart total 
    cartTotal += cardPrice;
    document.getElementById('cart-total').innerText = cartTotal;

    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML += `
        <div id="cart-${cardId}" class="flex justify-between items-center bg-[#DCFCE7] mt-3">
            <div class="p-2 rounded-2xl font-bold">
                <p>${cardTitle}</p>
                <p>${cardPrice}</p>
            </div>
            <div class="font-bold">
                <button onclick="deleteCartItem('${cardId}', ${cardPrice})" class="btn bg-[#DCFCE7] border-0 text-red-600">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `;
}


const itemDetails = (e) => {
    const cardId = e.target.parentNode.id;
    // console.log(cardId)
    // plantsDetails.showModal()
    const url = `https://openapi.programming-hero.com/api/plant/${cardId}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showItemDetails(data.plants)
    })
}

const showItemDetails = (plants) => {
    // console.log(plants.name)
    plantsDetails.showModal();
     modalContainer.innerHTML = "";
    modalContainer.innerHTML = `
        <div class="card-body p-0 bg-white  shadow-md">
            <div class="img-box w-full ">
                <img src="${plants.image}" alt="" class="w-full h-50 object-cover rounded-tl-lg rounded-tr-lg">
            </div>
            <div class="p-3 w-full">
                <h2 class="card-title font-bold">${plants.name}</h2>
                <p class="text-justify my-3">${plants.description}</p>
                <div class="font-bold">
                    <p>৳<span>${plants.price}</span></p>
                </div>  
            
            </div>
        </div>
    
    `;
}

const deleteCartItem = (deleteId, deletePrice) => {
    // cartArr filter
    cartArr = cartArr.filter(item => item.id !== deleteId);

    // total থেকে price বাদ দেওয়া
    cartTotal -= deletePrice;
    document.getElementById('cart-total').innerText = cartTotal;

    // ui থেকে আইটেম রিমুভ করা
    const deleteElement = document.getElementById(`cart-${deleteId}`);
    if(deleteElement){
        deleteElement.remove();
    }
}


// show loading 
const showLoading = () => {
    cardsContainer.innerHTML = `
        <span class="  text-center loading loading-ring loading-xl"></span>
    `;
}


loadCategory()
loadAllPlants()

