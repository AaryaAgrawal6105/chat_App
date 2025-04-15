var socket = io();

let btn = document.getElementById('btn');
btn.onclick= function(){
        socket.emit('from_client');
        
}
socket.on('from_server' , ()=>{
    console.log('collected an event from the server')
    const div = document.createElement('div');
    div.innerText= 'new event from server';
    document.body.appendChild(div);

})