
const supportedConstraints = navigator.mediaDevices.getSupportedConstraints(); // obter as restricoes suportadas do navegador/midia do usuario
console.log(supportedConstraints);

const changeVideoSize = () =>{
    stream.getVideoTracks().forEach(track=>{
        // track is a video track.
        // podemos obter sua capacidades
        // ou podemos aplicar novas restricoes

        const capabilities = track.getCapabilities()
        
        // tornando a alteracao dinamica, de acordo com o valor escrito pelo usuario
        const height = document.querySelector('#vid-height').value
        const width = document.querySelector('#vid-width').value

        const vConstraints = {
            height: {exact: height < capabilities.height.max ? height : capabilities.height.max},
            width: {exact: width < capabilities.width.max ? width : capabilities.width.max},
            // frameRate: 5,
            }
        track.applyConstraints(vConstraints)            
    })
    // isso nos dira o tamanho que a tela pode ter, qual proporcao podemos usar
    // stream.getTracks().forEach(track=>{
    //     const capabilities = track.getCapabilities()
    //     console.log('Change Video Size');
    //     console.log(capabilities);
    // })

}