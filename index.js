const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });
const db = require('./sql/db');

app.use(compression());
app.use(express.static('./public'));
app.use(express.static('./sql'));
app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: `my secrets`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use(express.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.cookie('mytoken', req.csrfToken());
    next();
});

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8082/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('/join', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.post('/join', async (req, res) => {
    let { email } = req.body;
    console.log("body", email);
    const { rows } = await db.getClientByEmail(email);
    req.session.userId = rows[0].id;
    res.redirect('/app');
});

app.get('/user', async (req, res) => {
    let { userId } = req.session;
    const { rows } = await db.getUserInfo(userId);
    res.json(rows[0]);
});

// app.get('/logout', (req, res) => {
//     req.session = null;
//     res.redirect('/');
// });

// DON'T DELETE !!!!!!!!!!!!!!!!!!!!
app.get('*', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/join');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

io.on('connection', socket => {
    console.log("Socket running");

    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;

    db.getLastTenMessages().then(({ rows }) => {
        io.sockets.emit('chatMessages', rows.reverse());
    });

    socket.on('chatMessage', newMessage => {
        db.insertUsersMessage(userId, newMessage).then(() => {
            db.getNewMsg(userId).then(({ rows }) => {
                io.sockets.emit('chatMessage', rows);
            });
        });
    });

    socket.on('disconnect', () => {
        console.log('Socket disconect');
    });

});

server.listen(8080, () => { console.log("I'm listening."); });
