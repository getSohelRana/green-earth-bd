// categories btn
const categoryContainer = document.getElementById('categoryContainer');
const cardsContainer = document.getElementById('card-items');

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

const showCardItems = (cards) => {
    // console.log(cards)
     cardsContainer.innerHTML = "";
    cards.forEach(card => {
        cardsContainer.innerHTML += `
            <div class="card-body p-0 bg-white  shadow-md">
                <div class="img-box w-full ">
                    <img src="${card.image}" alt="" class="w-full max-h-50 object-cover rounded-tl-lg rounded-tr-lg">
                </div>
                <div class="p-3 w-full">
                    <h2 class="card-title font-bold">${card.name}</h2>
                    <p class="text-justify my-3">${card.description}</p>
                    <div class="flex justify-between items-center ">
                        <div class="bg-[#DCFCE7] text-[#15803D] p-2 rounded-2xl font-bold">
                            <p>${card.category}</p>
                        </div>
                        <div class="font-bold">
                            <p>৳<span>${card.price}</span></p>
                        </div>        
                    </div>
                    <button class="btn bg-[#15803D] text-white rounded-3xl w-full mt-3">Add To Cart</button>
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
}
//show all plants

const showAllPlants = (allPlants) => {
    cardsContainer.innerHTML = "";
    allPlants.forEach(plants => {
        // console.log(plants)
        cardsContainer.innerHTML += `
        
        <div class="card-body p-0 bg-white  shadow-md">
                <div class="img-box w-full ">
                    <img src="${plants.image}" alt="" class="w-full max-h-50 object-cover rounded-tl-lg rounded-tr-lg">
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
                    <button class="btn bg-[#15803D] text-white rounded-3xl w-full mt-3">Add To Cart</button>
                </div>
            </div>
        
        `;
        
    })
}


loadAllPlants()

loadCategory()

