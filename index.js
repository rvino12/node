const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3011;
var nodemailer = require('nodemailer');

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: 'your_password',
  database: 'nodejs_rest_api',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

async function mail() {
    // let transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: 'quentin.koelpin@ethereal.email',
    //     pass: 'rPA24Bwbed6UtWGY9W'
    //   },
    //   from: 'quentin.koelpin@ethereal.email'
    // });

     let transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "tanmayburadkar7390@gmail.com",
        pass: "wcul llhp onpn kzwb",
      },
     });

     let message = {
      from: "Sender Name <tanmayburadkar7390@gmail.com>",
      to: "Recipient <durudkarkunal@gmail.com>",
      subject: "Nodemailer is unicode friendly ✔",
      text: "Hii Chutiye!",
      // html: "<p><b>Hello</b> to myself!</p>",
      };
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log("Error occurred. " + err.message);
        return process.exit(1);
      }
      
      console.log("Message sent: %s", info.messageId);
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Get all users
// app.get('/users', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//       if (err) throw err;
//       res.json(results);
//     });
//   });
  
  // Get a user by ID
  // app.get('/users/:id', (req, res) => {
  //   const { id } = req.params;
  //   db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
  //     if (err) throw err;
  //     res.json(results[0]);
  //   });
  // });
  
  // Create a new user
  app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
      if (err) throw err;
      res.json({ message: 'User added successfully', id: result.insertId });
      mail().catch(err => console.log(err));
      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });
    });
  });
  
  // Update a user
  // app.put('/users/:id', (req, res) => {
  //   const { id } = req.params;
  //   const { name, email } = req.body;
  //   db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
  //     if (err) throw err;
  //     res.json({ message: 'User updated successfully' });
  //   });
  // });
  
  // Delete a user
  // app.delete('/users/:id', (req, res) => {
  //   const { id } = req.params;
  //   db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
  //     if (err) throw err;
  //     res.json({ message: 'User deleted successfully' });
  //   });
  // });
