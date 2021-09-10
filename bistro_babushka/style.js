const url = "https://babushka-dd8a.restdb.io/rest/menu";

const option = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
};


let ret;
let filter = "alle";
const filterKnapper = document.querySelectorAll("nav button");
filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
hentData();

function filtrerRetter(){
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    visRetter();
}

async function hentData (){
    const resspons = await fetch(url, option);
    ret = await resspons.json();
    console.log("ret", ret);
    visRetter();
    
}


function visRetter(){
    console.log(ret);
const section = document.querySelector("section");
const rettemplate = document.querySelector("template").content;
section.textContent = "";
    ret.forEach(ret => {
        if(filter == ret.kategori || filter == "alle"){ 
        const klon = rettemplate.cloneNode(true);
        klon.querySelector(".billede").src = "medium/" + ret.billednavn + "-md.jpg";
        klon.querySelector(".navn").textContent = ret.navn;
        klon.querySelector(".beskrivelse").textContent = ret.kortbeskrivelse;
        klon.querySelector(".pris").textContent =  ret.pris + "kr";
        klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));
       
        section.appendChild(klon);
    }
    });
}

function visDetaljer(ret){
    console.log(ret);
    const popup = document.querySelector("#popup");
    popup.style.display = "block";
    popup.querySelector(".billede").src = "medium/" + ret.billednavn + "-md.jpg";
    popup.querySelector(".navn").textContent = ret.navn;
    popup.querySelector(".beskrivelse").textContent = ret.langbeskrivelse;
    popup.querySelector(".pris").textContent =  ret.pris;
    document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");
    
}



hentData();