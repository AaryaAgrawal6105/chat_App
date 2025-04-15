var socket = io();

let btn = document.getElementById('btn');
let inputmsg = document.getElementById('newmsg');
let msgList  = document.getElementById('msglist');

btn.onclick= function(){
        socket.emit('msg_send',{
            msg : inputmsg.value,
        });

}

socket.on('msg_rcvd' , (data)=>{
    let limsg = document.createElement('li');
    limsg.innerText=data.msg;
    msgList.appendChild(limsg);
})
