let text=document.querySelector(".text");
let btn=document.querySelector(".btn");
let container=document.querySelector(".container");
let popdatas=document.querySelector(".popdatas");
let show_all=document.querySelector(".show_all");
let body=document.querySelector("body");
let footer=document.querySelector(".footer");

async function check(){
    container.style.display="flex";
    let searchText=text.value;
    console.log(searchText);
let response=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
let data=await response.json();
// console.log(data);
display(data);
}
let all_data;

btn.addEventListener('click',check);

function form_card(image,name,brand){
    let card=document.createElement("div");
    card.style.width="23%";
    card.style.padding="4%";
    card.style.display="flex";
    card.style.justifyContent="center";
    card.style.alignItems="center";
    card.style.flexDirection="column";
    card.style.marginBottom="30px";
    card.style.fontSize="19px";
    // card.style.border="2px solid black";
    card.style.boxShadow="0 0 25px 0 black";
    // card.style.position="absolute";

    card.innerHTML=`<img src="${image}"class="image">
    <div style="font-weight:bold; margin:10px;">${name}</div>
    <div class="detail">There are many variations of passages of available, but the majority have suffered</div>
    <button onclick="pops('${image}','${name}','${brand}')">Show Details</button>`;
    container.appendChild(card);
}
function display(details){
    all_data=details;
    container.innerHTML='';
    console.log(details["data"].length);
    let maxlength=details["data"].length;
    details["data"].forEach((element,index) => {
        if(index<12)
        {
           form_card(element.image,element.phone_name,element.brand);
        }
        if(maxlength>12)
        {
            show_all.style.display="inline";
            // show_all.style.marg="center";
        }
    });
}
function show_all_data(){
     console.log(all_data);
     for(let i=12;i<all_data["data"].length;i++)
     {
        let x=all_data["data"][i];
        form_card(x.image,x.phone_name,x.brand);
     }
     show_all.style.display="none";

}
function pops(image,name,brand){
    popdatas.innerHTML="";
    console.log(image,name,brand);
    let popcard=document.createElement("div");
    popcard.innerHTML=`<img src="${image}"class="image">
    <div>${name}</div><div>Brand: ${brand}</div><button onclick="deleted()">cancel</button>`;
    popcard.style.lineHeight="1.5";
    popdatas.style.display="block";
    const windowWidth = window.innerWidth;
    let windowHeight = window.scrollY;
    
    console.log("Window size: ", windowWidth, windowHeight);
    popdatas.style.top="30vh";
    popdatas.style.margin="13% 0";
    popdatas.style.top=`${windowHeight}px`;
    // popdatas.style.left=`-${windowWidth}px`;
    popdatas.appendChild(popcard);
    container.style.pointerEvents="none";
    body.style.overflow="hidden";
    // body.style.overflow="hidden";
    
}
function deleted()
{
    popdatas.style.display="none";
    container.style.pointerEvents="all";
    body.style.overflow="visible";
    // body.style.overflow="scroll";
}