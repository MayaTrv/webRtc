const videoEl = document.querySelector('#my-video');

let stream = null // Init stream var so we can use anywhere

let mediaStream = null // Init mediaStream var for our screen share

// INICIANDO O getUserMedia // 

const constraints = {
    audio: true, // use seus fones ou esteja preparado para feedback
    video: true,
}

// criando uma funcao para pegar o microfone e camera, usando async
const getMicAndCamera = async(e)=>{

    // precisa colocar um try/catch, pois o usuario pode dizer 'Nao', rejeitando a tentativa de pegar o mic e audio
    try{
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        console.log(stream) // ira produzir um MediaStream
        // troca a cor para cada um dos botoes, conforme cada botao eh habilitado
        changeButtons([
            'green', 'blue', 'blue', 'grey', 'grey', 'grey', 'grey', 'grey'
        ])
        
    }catch(err){
        //user denied access to constraints
        console.log("user denied access to constraints")
        console.log(err)
    }
};

// INICIANDO O VIDEO //

// criando uma funcao para habilitar/mostrar o video quando apertar o botao
const showMyFeed = e=>{

    console.log("showMyFeed is working")

    // se clicar em mostrar stream antes do termino da transmissao, um alerta sera enviado e entao retornara a funcao
    if(!stream){
        alert("Stream still loading...")
        return;
    }
    videoEl.srcObject = stream; // this will set our MediaStream (stream) to our tag <video />
    const tracks = stream.getTracks();
    console.log(tracks); // isso que o getTracks faz, ele obtem cada track/faixa individual que faz parte do MediaStream que vem do getUserMedia
    
    // troca a cor para cada um dos botoes, conforme cada botao eh habilitado
    changeButtons([
        'green', 'green', 'blue', 'blue', 'blue', 'grey', 'grey', 'blue'
    ])
}

// INTERROMPENDO/PARANDO O VIDEO //
const stopMyFeed = e=>{

    // se clicar em mostrar stream antes do termino da transmissao, um alerta sera enviado e entao retornara a funcao
    if(!stream){
        alert("Stream still loading...")
        return;
    }
    const tracks = stream.getTracks();
    tracks.forEach(track=>{
        // console.log(track) // isso que o getTracks faz, ele obtem cada track/faixa individual que faz parte do MediaStream que vem do getUserMedia
        track.stop(); // disassoates the track with the source (voce dissasocia eles)
    })

    // troca a cor para cada um dos botoes, conforme cada botao eh habilitado
    changeButtons([
        'blue', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'blue'
    ])
}

// SOBRE OS BOTOES NO HTML //

// no arquivo 'index.html' ha o botao com um ID de compartilhamento de microfone e camera
document.querySelector('#share').addEventListener('click', e=>getMicAndCamera(e))

// agora temos outro botao chamado show-video, para iniciar/habilitar o video no html
document.querySelector('#show-video').addEventListener('click', e=>showMyFeed(e))

// agora temos outro botao chamado stop-video, para parar/interromper o video no html
document.querySelector('#stop-video').addEventListener('click', e=>stopMyFeed(e))

// agora temos outro botao chamado change-size, para mudar o tamanho do video na visualizacao html de acordo com as restricoes do navegador
document.querySelector('#change-size').addEventListener('click',e=>changeVideoSize(e))

// agora temos outro botao chamado start-record, para iniciar reproducao
document.querySelector('#start-record').addEventListener('click', e=>startRecording(e))

// agora temos outro botao chamado stop-record, para parar reproducao
document.querySelector('#stop-record').addEventListener('click', e=>stopRecording(e))

// agora temos outro botao chamado play-record, para iniciar reproducao gravada
document.querySelector('#play-record').addEventListener('click', e=>playRecording(e))

// agora temos outro botao chamado share-screen, para compartilhar a tela
document.querySelector('#share-screen').addEventListener('click', e=>shareScreen(e))

// Teremos entrada de áudio, saída de áudio e depois mudaremos o vídeo
document.querySelector('#audio-input').addEventListener('change', e=>changeAudioInput(e))
document.querySelector('#audio-output').addEventListener('change', e=>changeAudioOutput(e))
document.querySelector('#video-input').addEventListener('change', e=>changeVideo(e))