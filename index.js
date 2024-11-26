import { dataItems } from "./dataItems.js";

const lengthItems = dataItems.length;
const totalPages = lengthItems / 6;

const articles = document.getElementsByClassName("article");

let btns = [];
let nodebtns = [];

let indexBtn = 0;
let firstIndex = 0;
let lastIndex = 5;

/**creacion de botones y pegado de funcion*/
for(let i = 1; i <= totalPages; i++){
    let fIndex;
    let lIndex;

/*    if(i > 1){fIndex = (i*6)-6+1;}else{fIndex = (i*6)-6}*/
    fIndex = (i*6)-6;
    if(i === totalPages){lIndex = dataItems.length;}else{lIndex = (i*6)+1;}

    const setItems = dataItems.slice(fIndex,lIndex);

    let btn = document.createElement('button');
    btn.textContent = i;

    btn.onclick = () => {
        let scopeArticle = setItems;
        for(let c = 0; c <= 5; c++){articles[c].innerHTML = "";}
        for(let a = 0; a <= scopeArticle.length - 1; a++){
            let article = scopeArticle[a];
            let articlehtml = articles[a];
            articlehtml.innerHTML = article;
        }
    };

    btns.push(btn);
}

/*anidar botones*/
function addbtns (aIndex,bIndex){
    const siderbtn = document.getElementById('siderbtn');
    siderbtn.innerHTML = "";
    nodebtns = [];
    for(let idx = aIndex; idx <= bIndex; idx++){
        const btn = btns[idx];
        siderbtn.appendChild(btn);
    }
    nodebtns = siderbtn.childNodes;
    console.log(nodebtns)
}

function backORnext(action){
    if(action === "next"){
        if(nodebtns[indexBtn + 1]){
            indexBtn += 1;
            nodebtns[indexBtn].click();
        } else{
            if(btns[lastIndex + 1]){
                firstIndex++;
                lastIndex++;
                addbtns(firstIndex,lastIndex);
                const lastbtnindex= nodebtns.length - 1;
                nodebtns[lastbtnindex].click();
                indexBtn = lastbtnindex;
            }
        }
    }else{
        if(nodebtns[indexBtn - 1]){
            indexBtn -= 1;
            nodebtns[indexBtn].click();
        } else{
            if(btns[firstIndex - 1]){
                firstIndex--;
                lastIndex--;
                addbtns(firstIndex,lastIndex);
                const firstbtnindex= 0;
                nodebtns[firstbtnindex].click();
                indexBtn = firstbtnindex;
            }
        }
    }
}

document.getElementById("back").addEventListener("click", () => {backORnext("back")});
document.getElementById("next").addEventListener("click", () => {backORnext("next")});

addbtns(firstIndex,lastIndex);
nodebtns[0].click();