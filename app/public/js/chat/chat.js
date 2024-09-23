
 const socket = io();
 const form = document.getElementById('form')
 const input = document.getElementById('input')
 const message = document.getElementById('messages')
 const imageInput = document.getElementById('image-input')

  form.addEventListener('submit',(e) => {
    e.preventDefault()
    sendMessage()

  })

  imageInput.addEventListener('change', sendImageMessage)

function sendMessage(){
  if(input.value){
    socket.emit('chat',input.value)
    input.value = ""
  }
}
async function sendImageMessage(){
  if(imageInput.files.length > 0 ){
    const formData = new FormData()
    formData.append('image', imageInput.files[0])
    try{
      const response = await fetch('/upload', {
        method: "POST",
        body:formData
      })
      const data = await response.json()
      socket.emit('image', data.imageUrl)
      imageInput.value = ""
    }catch(error){
      console.error("Erro ao enviar Imagem", error)
    }
  }

}
function formatTimeStamp(isosString){
  const date = new Date(isosString)
  return date.toLocaleString()
}



  socket.on('chat',(data)=>{
    const item = document.createElement('li')
    const timestamp = formatTimeStamp(data.timestamp)
    item.innerHTML = `<span class="timestamp">${timestamp }</span><span class="message"><br>${data.message}</span>`
    message.appendChild(item)
    scrollBottom()
  
  })

  socket.on('image',(data)=>{
    const li = document.createElement('li')
    const img = document.createElement('img')
    img.src = data.imageUrl
    const timestamp = formatTimeStamp(data.timestamp)
    li.innerHTML = `<span class="timestamp">${timestamp}<br>`
    li.appendChild(img)
    message.appendChild(li)
    scrollBottom()
   
  })

  function scrollBottom(){
    window.scrollTo(0, document.body.scrollHeight)
  }
