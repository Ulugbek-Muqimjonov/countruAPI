const ellist = document.querySelector(".hero__country-list");
const elForm = document.querySelector(".hero__form");
const elinput = elForm.querySelector(".hero__searchinput");
const errorMassage = document.querySelector(".hero__error");

const DocumentFragment = document.createDocumentFragment();
function render(arr,node) {
    node.innerHtml =null;
    arr.forEach(item => {
        const ItemElement = document.createElement("li");
        const imgElement = document.createElement("img");
        const wrapElement = document.createElement("div");
        const titleElement = document.createElement("h3");
        const papulationElement = document.createElement("span");
        const papulationBoldElement = document.createElement("strong");
        const regionElement = document.createElement("span");
        const regionBoldElement = document.createElement("strong");
        
        ItemElement.classList.add("hero__country-item","shadow","d-flex","flex-column","justify-content-between");
        imgElement.classList.add("hero__country-img");
        wrapElement.classList.add("hero__country-innerdiv");
        titleElement.classList.add("hero__item-title","fs-2","fw-bold");
        papulationElement.classList.add("hero__item-country-population","d-block","fs-5");
        papulationBoldElement.classList.add("hero__item-country-bold");
        regionElement.classList.add("hero__country-region","fs-5");
        regionBoldElement.classList.add("hero__country-region-bold");
        
        
        titleElement.textContent = item.name?.common;
        papulationElement.textContent =`Population:`;
        papulationBoldElement.textContent = item.population;
        regionElement.textContent = `Region:`;
        regionBoldElement.textContent = item.region;
        
        imgElement.src = `${item.flags?.svg}`;
        imgElement.alt = `${item.name?.common}`;
        papulationElement.appendChild(papulationBoldElement);
        regionElement.appendChild(regionBoldElement)
        wrapElement.append(titleElement,papulationElement,regionElement)
        ItemElement.append(imgElement,wrapElement);
        DocumentFragment.appendChild(ItemElement)
    });
    node.appendChild(DocumentFragment);
}
async function getContry(url,node) {
    try {
        ellist.style.display = "grid";
        errorMassage.textContent = "";
        const request = await fetch(url);
        const requestJson = await request.json();
        render(requestJson,node);
    } catch (error) {
        ellist.style.display = "none";
        errorMassage.textContent = "Bunday davlat yo'q";
    }
}
getContry("https://restcountries.com/v3.1/all",ellist);

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const elinputValue = elinput.value.trim();

    ellist.innerHTML ="";
    
    if (elinputValue) {
        getContry(`https://restcountries.com/v3.1/name/${elinputValue}`,ellist)
    }
    else {
        getContry(`https://restcountries.com/v3.1/all`,ellist)
    }
    console.log(elformSellectValue);   
})


