$(document).ready(() => {
  // let href = location.href;
  let socket = io.connect(`http://localhost:3008`);
  // get message from subscriber and display
  socket.on("randomMessage", data => {
    let newMessage = $(`.messageList`)
      .first()
      .clone();
    console.log(data);
    newMessage.text(data.message);
    $(`.list-group`).append(newMessage);
  });
});
