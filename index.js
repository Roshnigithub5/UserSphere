const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker");
const path = require("path");
const mysql = require("mysql2");
const methodOverride = require("method-override");
// const {v4 : uuidv4} = require("uuid");

let port = 8500;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "/public/css")));
// app.use(express.static(path.join(__dirname, "/public/js")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "roshni_5R",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    //   avatar: faker.image.avatar(),
    faker.internet.password(),
    //   birthdate: faker.date.birthdate(),
    //   registeredAt: faker.date.past(),
  ];
};

//Home Route
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["COUNT(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("ERROR!");
  }
});
//Show Users Route
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("user.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

//Edit Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(result[0]);
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

//Edit Route PATCH
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUser } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPass != user.password) {
        res.send("Wrong Password!");
      } else {
        let q2 = `UPDATE user SET username = '${newUser}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

//Delete Route
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}';`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("del.ejs", { user });
    });
  } catch (err) {
    res.send("Some error in DB..");
  }
});

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { email: newemail, password: newpass } = req.body;
  // let q = `SELECT * FROM user WHERE id='${id}'`;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (newemail != user.email && newpass != user.password) {
        res.send("Wrong Password Entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
          console.log("deleted!");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

//Add Route
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user", (req, res) => {
  let newid = faker.string.uuid();
  let { username: newusername, email: newemail, password: newpass } = req.body;
  let newquery = `INSERT INTO user (id, username, email, password) VALUES ('${newid}','${newusername}','${newemail}','${newpass}');`;

  try {
    connection.query(newquery, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
