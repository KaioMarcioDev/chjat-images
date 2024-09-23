const socket = io()

socket.on('clientCount',(count)=>{
    const countCli = document.getElementById('clientCount')
    countCli.textContent = "Numeros de usuário: " + count
  })