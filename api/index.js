const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());

app.use(express.json());

app.post("/hijo", (req, res) => {
  const personData = req.body;
  savePersonInDB(personData.id, personData.name, personData.hijoDe, 1);
  res.send("Hello World!");
});

app.post("/deletehijo", (req, res) => {
  const personData = req.body;
  deletePersonFromDB(personData.id, 1);
  res.send("Hello World!");
});

app.post("/updatehijo", (req, res) => {
  const personData = req.body;
  updatePersonInDB(personData.id, personData.name, personData.hijoDe, 1);
  res.send("Hello World!");
});

app.post("/padre", (req, res) => {
  const personData = req.body;
  savePersonInDB(personData.id, personData.name, null, 2);
  res.send("Hello World!");
});

app.post("/deletepadre", (req, res) => {
  const personData = req.body;
  deletePersonFromDB(personData.id, 2);
  res.send("Hello World!");
});

app.post("/updatepadre", (req, res) => {
  const personData = req.body;
  updatePersonInDB(personData.id, personData.name, null, 2);
  res.send("Hello World!");
});

app.get("/hijo", async (req, res) => {
  const people = await getPersonFromDB(1);
  res.send(people);
});

app.get("/padre", async (req, res) => {
  const people = await getPersonFromDB(2);
  res.send(people);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function savePersonInDB(ID, name, hijoDe, rol) {
  try {
    const client = new Client({
      user: "uvqnibk4oetsi28neyqz",
      host: "bnwbml3w99h2zdpusmvq-postgresql.services.clever-cloud.com",
      database: "bnwbml3w99h2zdpusmvq",
      password: "tx5nlO01Y9saca3iLCTXmpK8pgqFLk",
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();

    if (rol == 1) {
      query =
        "INSERT INTO hijos VALUES (" + ID + ", '" + name + "', " + hijoDe + ")";
    } else {
      query = "INSERT INTO padres VALUES (" + ID + ", '" + name + "')";
    }

    console.log("se está ejecuntando " + query);
    const res = await client.query(query);
    await client.end();
  } catch (error) {
    console.log(error);
  }
}

async function getPersonFromDB(rol) {
  try {
    const client = new Client({
      user: "uvqnibk4oetsi28neyqz",
      host: "bnwbml3w99h2zdpusmvq-postgresql.services.clever-cloud.com",
      database: "bnwbml3w99h2zdpusmvq",
      password: "tx5nlO01Y9saca3iLCTXmpK8pgqFLk",
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();

    table = rol == 1 ? "hijos" : "padres";

    console.log("Se está ejecutando SELECT * FROM " + table);
    const res = await client.query("SELECT * FROM " + table + " order by id");

    await client.end();
    return res.rows;
  } catch (error) {
    console.log(error);
  }
}

async function deletePersonFromDB(ID, rol) {
  try {
    const client = new Client({
      user: "uvqnibk4oetsi28neyqz",
      host: "bnwbml3w99h2zdpusmvq-postgresql.services.clever-cloud.com",
      database: "bnwbml3w99h2zdpusmvq",
      password: "tx5nlO01Y9saca3iLCTXmpK8pgqFLk",
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();

    table = rol == 1 ? "hijos" : "padres";

    const query = "DELETE FROM " + table + " WHERE id = " + ID + "cascade";

    console.log("se está ejecutando " + query);
    const res = await client.query(query);
    await client.end();
  } catch (error) {
    console.log(error);
  }
}

async function updatePersonInDB(ID, name, hijoDe, rol) {
  try {
    const client = new Client({
      user: "uvqnibk4oetsi28neyqz",
      host: "bnwbml3w99h2zdpusmvq-postgresql.services.clever-cloud.com",
      database: "bnwbml3w99h2zdpusmvq",
      password: "tx5nlO01Y9saca3iLCTXmpK8pgqFLk",
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();

    if (rol == 1) {
      query =
        "UPDATE hijos SET nombre = '" +
        name +
        "', hijode = " +
        hijoDe +
        " where id = " +
        ID;
    } else {
      query = "UPDATE padres SET nombre = '" + name + "' where id = " + ID;
    }

    console.log("se está ejecutando " + query);
    const res = await client.query(query);
    await client.end();
  } catch (error) {
    console.log(error);
  }
}
