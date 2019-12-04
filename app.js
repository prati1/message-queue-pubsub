const createError = require(`http-errors`);
const express = require(`express`);
const path = require(`path`);
const cookieParser = require(`cookie-parser`);

const app = express();
const indexRouter = require(`./routes/index`);

const queueservice = require(`./Services/queueservice`);
const subscriber = require(`./client/subscriber`);
const bodyParser = require(`body-parser`);

// view engine setup
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `pug`);

const server = require(`http`).createServer(app);
const io = require(`socket.io`)(server);
server.listen(3003);

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)));

app.use(`/`, indexRouter);

// Publisher to publish messages
queueservice.sendMessageToQueue();

// Setup subscriber to receive message on socket connection
io.on(`connection`, socket => {
  subscriber.receiveMessageFromQueue(socket);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get(`env`) === `development` ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(`error`);
});

module.exports = app;
