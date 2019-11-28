const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/chat");

module.exports.getClientByEmail = (email) => {
    return db.query(
        `SELECT id, email FROM users WHERE email=$1`,
        [email]
    );
};

module.exports.getUserInfo = (id) => {
    return db.query(
        `SELECT * FROM users
        WHERE users.id = $1`,
        [id]
    ).catch(error => {
        console.log(error.message);
    });
};

// module.exports.updateImgUrl = (imgUrl, id) => {
//     return db.query(
//         `UPDATE users SET imgUrl = $1
//         WHERE users.id = $2`,
//         [imgUrl, id]
//     ).catch(error => {
//         console.log(error.message);
//     });
// };

// module.exports.updateUsersBio = (bio, id) => {
//     return db.query(
//         `UPDATE users SET bio = $1
//         WHERE users.id = $2`,
//         [bio, id]
//     ).catch(error => {
//         console.log(error.message);
//     });
// };

// module.exports.getRecentUsers = () => {
//     return db.query(
//         `SELECT first, last, id, imgurl FROM users 
//         ORDER BY id DESC
//         LIMIT 4;`
//     ).catch(error => {
//         console.log(error.message);
//     });
// };

// module.exports.getMoreUsers = (val) => {
//     return db.query(
//         `SELECT first, last, id, imgurl FROM users
//         WHERE first ILIKE $1 
//         ORDER BY id DESC`,
//         [val + '%']
//     ).catch(error => {
//         console.log(error.message);
//     });
// };

// module.exports.initFriendShipStatus = (sender_id,receiver_id) => {
//     return db.query(
//         `SELECT * FROM friendships
//         WHERE (receiver_id = $1 AND sender_id = $2)
//         OR (receiver_id = $2 AND sender_id = $1)`,
//         [receiver_id, sender_id]
//     ).catch(error => {
//         console.log(error.message);
//     });
// };

// module.exports.insertFriendShipIds = (sender_id, receiver_id) => {
//     return db.query(
//         `INSERT INTO friendships(sender_id, receiver_id) 
//         VALUES ($1, $2)
//         RETURNING id`,
//         [sender_id, receiver_id]
//     ).catch(error => {
//         console.log(error.message);
//     });
// };

// module.exports.updateAcceptColumn = (sender_id, receiver_id) => {
//     return db.query(
//         `UPDATE friendships SET accepted = true 
//         WHERE (receiver_id = $1 AND sender_id = $2)
//         OR (receiver_id = $2 AND sender_id = $1)
//         RETURNING id`,
//         [sender_id, receiver_id]
//     ).catch(error => {
//         console.log(error.message);
//     });
// };

// module.exports.deleteFriendShipRow = (sender_id, receiver_id) => {
//     return db.query(
//         `DELETE FROM friendships
//         WHERE (receiver_id = $1 AND sender_id = $2)
//         OR (receiver_id = $2 AND sender_id = $1)
//         RETURNING id`,
//         [sender_id, receiver_id]
//     ).catch(error => {
//         console.log(error.message);
//     });
// };


// module.exports.pendingUsers = (id) => {
//     return db.query(
//         `SELECT users.id, first, last, imgurl, accepted
//         FROM friendships
//         JOIN users
//         ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
//         OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
//         OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
//         [id]
//     ).catch(error => {
//         console.log(error.message);
//     });
// };

module.exports.getLastTenMessages = () => {
    return db.query(
        `SELECT *
        FROM chat
        JOIN users
        ON (sender_id = users.id)
        ORDER BY chat.id DESC
        LIMIT 10`
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.insertUsersMessage = (sender_id, message) => {
    return db.query(
        `INSERT INTO chat(sender_id, message) 
        VALUES ($1, $2)`,
        [sender_id, message]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.getNewMsg = (userId) => {
    return db.query(
        `SELECT sender_id, first, last, message
        FROM chat
        JOIN users
        ON (sender_id = users.id AND sender_id = $1)
        ORDER BY chat.id DESC
        LIMIT 1`,
        [userId]
    ).catch(error => {
        console.log(error.message);
    });
};