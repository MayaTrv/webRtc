
let mediaRecorder;
let recordedBlobs;

const startRecording = () =>{

    // se clicar em mostrar stream antes do termino da transmissao, um alerta sera enviado e entao retornara a funcao
    if(!stream){  // eh possivel gravar o compartilhamento de tela alterando para mediaStream aqui e na linha 19
        alert("No current feed")
        return;
    }

    // testando a funcionalidade do botao
    console.log('Start Recording')

    recordedBlobs = []; // an array to hold the blobs for playback

    // criando um gravador de midia (o navegador escolhera o stream que 'achar melhor')
    mediaRecorder = new MediaRecorder(stream) // make a mediaRecorder from the constructor
    
    mediaRecorder.ondataavailable = e=> {

        //ondataavailable will run when the stream ends, or stopped, or we specifically ask for it
        console.log('Data is available for the media recorder!')
        recordedBlobs.push(e.data) // vamos pegar sua propriedade de dados e empurra-lo para frente
    }
    mediaRecorder.start();
    changeButtons([
        'green', 'green', 'blue', 'blue', 'green', 'green', 'blue', 'blue'
    ])
}

const stopRecording = () =>{

    if(!mediaRecorder){
        alert("Please record before stopping")
        return;
    }
    // testando a funcionalidade do botao
    console.log('Stop Recording')

    mediaRecorder.stop()
}

const playRecording = () =>{

    if(!recordedBlobs){
        alert("No Recording Saved")
        return;
    }

    // testando a funcionalidade do botao
    console.log('Play Recording')
    const superBuffer = new Blob(recordedBlobs) // com isso, sera possivel escolher se eh para ser exportado, etc
    const recordedVideoEl = document.querySelector('#other-video');

    // Precisamos usar o ponto de URL do Windows, criar a URL do objeto e entregá-la ao nosso super buffer.
    recordedVideoEl.src = window.URL.createObjectURL(superBuffer); 
    recordedVideoEl.controls = true;
    recordedVideoEl.play();
    
    changeButtons([
        'green', 'green', 'blue', 'blue', 'green', 'green', 'blue', 'blue'
    ])
}