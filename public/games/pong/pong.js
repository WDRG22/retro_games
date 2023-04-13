function initPong(){
    console.log("pong.js is running...")
    
    const root = document.getElementById('root');
    const title = document.createElement("title")
    title.innerText = 'Here'
    root.appendChild(title)
}

initPong();