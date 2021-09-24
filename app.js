
const formulario = document.querySelector("form");
formulario.addEventListener("submit", buscarPkmn);

function buscarPkmn (e){
    e.preventDefault()
    let pkmn = document.querySelector("input").value;
    let ajax = new XMLHttpRequest();
    ajax.open("get","https://pokeapi.co/api/v2/pokemon/"+pkmn)
    ajax.addEventListener("load", agregarTarjeta)
    ajax.send()
}

function agregarTarjeta(e){
    const resp = document.getElementById("resultado");
    const ajax = e.target;
    pkmn = JSON.parse(ajax.response)
    let name_pkmn = pkmn.name.slice(0,1).toUpperCase() + pkmn.name.slice(1);
    let foto_pkmn = pkmn.sprites.other.dream_world.front_default;
    let ataques = [];
    for (i=0; i<5; i++){
        ataques.push(`<li>${pkmn.moves[i].move.name}</li>`)};
    ataques = ataques.join("")
    let num_pkmn = pkmn.id
    tarjeta = `
    <div id="${num_pkmn} "class="card">
        <img height="150" src="${foto_pkmn}" />
        <p>${num_pkmn} - ${name_pkmn}</p>
        <p>Ataques:</p>
        <ul>${ataques}</ul>
    </div>
    `;
    resp.innerHTML += tarjeta

    resp.addEventListener("dragstart", moverTarjeta)
    
    function moverTarjeta(e) {
        console.log(e.target);
        // Set the drag's format and data. Use the event target's id for the data
        e.dataTransfer.setData("text/plain",e.target.closest("div").id);
    }

    document.querySelector("#elegidos").addEventListener("dragover", e => e.preventDefault());

    document.querySelector("#elegidos").addEventListener("drop", e => {
        e.preventDefault();
        // Get the data, which is the id of the drop target
        var data = e.dataTransfer.getData("text");
        console.log(data)
        e.target.appendChild(document.getElementById(data));
    })
}

