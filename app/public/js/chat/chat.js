
 const socket = io();
 const form = document.getElementById('form')
 const input = document.getElementById('input')
 const message = document.getElementById('messages')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
      socket.emit('chat', input.value);
      input.value = ''
    }
  })

  socket.on('chat',(msg)=>{
    const item = document.createElement('li')
    item.textContent = msg
    message.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
  })
  socket.on('clientCount',(count)=>{
    const countCli = document.getElementById('clientCount')
    countCli.textContent = "Numeros de usuário: " + count
  })