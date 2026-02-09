document.addEventListener('DOMContentLoaded', () => {
    idCount = Number(sessionStorage.getItem('idCount'));
    const savedBlocks = sessionStorage.getItem('blocks');
    if (savedBlocks) {
        // Si existen datos guardados, conviértelos a objetos y cárgalos en el array `blocks`
        blocks.push(...JSON.parse(savedBlocks));
        // Muestra los bloques recuperados en la interfaz
        showBlocks();
    }
});
//this variable is added later to assign an id to a new block.
let idCount = 0;
const blocks = [];

//this fuction is used by the create button on blocks.html.
function createblock () {
    
    //we create the variables that are used for retrieve the data from the labels.
    const labelName = document.getElementById('labelName').value;
    const labelDescription = document.getElementById('labelDescription').value;

    //statement to only create the block if the labels name and description aren't empty.
    if (labelName && labelDescription){
        //we increment by one the track of the ids and we create the new block with the new parameters from the labels.
        const id = `${idCount++}`;
        sessionStorage.setItem('idCount',idCount.toString())        
        const newBlock = new Block(id,labelName,labelDescription)
        blocks.push(newBlock);
        //we convert the array in JSON and save it in a sessionStorage
        sessionStorage.setItem('blocks', JSON.stringify(blocks));
        showBlocks();
    }
}

function showBlocks(){

    const blockContainer = document.getElementById('blocksContainer');
    if(blockContainer){
        blockContainer.innerHTML= '';
        blocks.forEach (block =>
        {
            const blockDiv = document.createElement('div')
            blockDiv.classList.add('blockContainer');
            blockDiv.classList.add('block');
            blockDiv.innerHTML = `
            <li class="block primary-container">
                <ul class="block-content">
                    <li class="block-name"><h4>${block.name}</h4></li>
                    <li class="block-id"><h4>ID:</h4><h5>${block.id}</h5></span></li>
                    <li><h5>${block.description}</h5></li>
                    </ul>
                    <div>
                    <button class="btn btn-primary" onclick="redirectToDetails('${block.id}')" margin-right: 15px;">Ver</button> 
                    <button class="btn btn-danger"" onclick="deleteBlock('${block.id}')">Eliminar</button>
                </div>
            </article>`;
            
            blockContainer.appendChild(blockDiv);
        }
    );
    }
    

    
}

function deleteBlock(id){

    const index = blocks.findIndex(block => block.id === id);

    if (index !== -1) {
        blocks.splice(index, 1);
        sessionStorage.setItem('blocks', JSON.stringify(blocks));
        showBlocks(); 
    }
}

function redirectToDetails(blockId){
    const block = blocks.find(b => b.id === blockId);
    sessionStorage.setItem('selectedBlockId', `${blockId}`)
    window.location.href = `blockDetails.html`;
}
