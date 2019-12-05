$(document).ready(() => {
  // let href = location.href;
  let socket = io.connect(`http://localhost:8018`);
  // get message from subscriber and display
  socket.on("randomMessage", data => {
    let newMessage = $(`.message-cont`)
      .first()
      .clone();
    // console.log(data);
    newMessage.find(`p`).text(data.message);
    newMessage.find(`.badge`).text(data.priority);
    newMessage.find(`.time-right`).text(data.timestamp);
    $(`#mainContainer`).append(newMessage);
  });
});
