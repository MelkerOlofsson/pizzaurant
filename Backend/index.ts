import cors from "cors";
import * as dotenv from "dotenv";
import { Client } from "pg";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
const port = process.env.PORT || 8001;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.static(path.join(path.resolve(), "dist")));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/foods", async (req: Request, res: Response) => {
  // Skickar alla rader i foods.
  const { rows } = await client.query("SELECT * FROM foods");
  return res.send(rows);
});

app.post("/foods", async (req: Request, res: Response) => {
  const vegetarian = Number(req.body.vegetarian);
  const vegan = Number(req.body.vegan);
  const glutenFree = Number(req.body.glutenFree);

  const { rows } = await client.query("SELECT * FROM foods");

  // Får inte skicka in ett tomt värde.
  if (req.body.menuName === "") {
    return res
      .status(400)
      .json({ message: "No food was sent in with request" });
  }
  // Får inte finnas tidigare.
  else if (rows.find((row) => row.menu_name === req.body.menuName)) {
    return res.status(409).json({ message: "Item already exist" });
  }
  // Lägger till varan.
  else {
    try {
      await client.query(
        "INSERT INTO foods (menu_name, price, vegetarian, vegan, gluten_free) VALUES ($1, $2, $3, $4, $5)",
        [req.body.menuName, req.body.price, vegetarian, vegan, glutenFree]
      );

      return res.status(201).json({ message: "Food was added!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal error" });
    }
  }
});

app.delete("/foods/:foodID", async (req: Request, res: Response) => {
  const { rows } = await client.query("SELECT * FROM foods");

  // Kontrollerar så att varan faktiskt finns.
  if (rows.find((row) => row.id === parseInt(req.params.foodID))) {
    try {
      await client.query("DELETE FROM foods WHERE id=$1", [req.params.foodID]);

      return res.json({ message: "Item Removed" });
    } catch (err) {
      console.error("Error while removing: " + err);
      return res.status(500).json({ message: "Internal error" });
    }
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
});

app.put("/foods/", async (req: Request, res: Response) => {
  const vegetarian = Number(req.body.vegetarian);
  const vegan = Number(req.body.vegan);
  const glutenFree = Number(req.body.glutenFree);

  try {
    await client.query(
      "UPDATE foods SET menu_name=$1, price=$2, vegetarian=$3, vegan=$4, gluten_free=$5 WHERE id=$6",
      [
        req.body.menuName,
        req.body.price,
        vegetarian,
        vegan,
        glutenFree,
        req.query.food,
      ]
    );
    return res.json({ message: "Item adjusted" });
  } catch (err) {
    console.error("Error while adjusting item: " + err);
    return res.status(500).json({ message: "Internal error" });
  }
});

app.get("/drinks", async (req: Request, res: Response) => {
  // Skickar alla rader i drinks.
  const { rows } = await client.query("SELECT * FROM drinks");
  return res.send(rows);
});

app.post("/drinks", async (req: Request, res: Response) => {
  const alcohol = Number(req.body.alcohol);
  const { rows } = await client.query("SELECT * FROM drinks");

  // Får inte skicka in ett tomt värde.
  if (req.body.drinkName === "") {
    return res
      .status(400)
      .json({ message: "No drink was sent in with request" });
  }
  // Får inte finnas tidigare.
  else if (rows.find((row) => row.drink_name === req.body.drinkName)) {
    return res.status(409).json({ message: "Item already exist" });
  }
  // Lägger till varan.
  else {
    try {
      await client.query(
        "INSERT INTO drinks (drink_name, price, alcohol) VALUES ($1, $2, $3)",
        [req.body.drinkName, req.body.price, alcohol]
      );

      return res.status(201).send("Drink was added!");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal error" });
    }
  }
});

app.delete("/drinks/:drinkID", async (req: Request, res: Response) => {
  const { rows } = await client.query("SELECT * FROM drinks");

  // Kontrollerar så att varan faktiskt finns.
  if (rows.find((row) => row.id === parseInt(req.params.drinkID))) {
    try {
      await client.query("DELETE FROM drinks WHERE id=$1", [
        req.params.drinkID,
      ]);

      return res.json({ message: "Item Removed" });
    } catch (err) {
      console.error("Error while removing: " + err);
      return res.status(500).json({ message: "Internal error" });
    }
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
});

app.put("/drinks/", async (req: Request, res: Response) => {
  const alcohol = Number(req.body.alcohol);

  try {
    await client.query(
      "UPDATE drinks SET drink_name=$1, price=$2, alcohol=$3  WHERE id=$4",
      [req.body.drinkName, req.body.price, alcohol, req.query.drink]
    );
    return res.json({ message: "Item adjusted" });
  } catch (err) {
    console.error("Error while adjusting item: " + err);
    return res.status(500).json({ message: "Internal error" });
  }
});

// INLOGGNING:

app.post("/login", async (req: Request, res: Response) => {
  const accounts = await client.query("SELECT * FROM accounts");

  // Kolla så email och lösenord skickades med.
  if (req.body.email && req.body.password) {
    // Kolla om kontot finns.
    if (
      accounts.rows.find(
        (account) =>
          account.email === req.body.email &&
          account.password === req.body.password
      )
    ) {
      const uuid = uuidv4();

      // Skapa en inloggningstoken.
      await client.query(
        "INSERT INTO tokens (account_id, token) VALUES ($1, $2)",
        [
          accounts.rows.find((account) => account.email === req.body.email).id,
          uuid,
        ]
      );

      // Hämta token och skicka tillbaka den som en cookie.
      const tokens = await client.query(
        "SELECT token FROM tokens WHERE token=$1",
        [uuid]
      );
      res.cookie("token", tokens.rows[0].token, {
        maxAge: 300000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(201).send(JSON.stringify(tokens.rows[0]));
    }
    // Om kontot inte är registrerat.
    else {
      res.status(401).send("Login failed");
    }
  } else {
    res.status(400).send("Needs email and password");
  }
});

// UTLOGGNING:

app.post("/logout", async (req: Request, res: Response) => {
  const logInToken = req.cookies.token;
  const tokens = await client.query("SELECT * FROM tokens");

  // Om användarens token finns bland alla tokens.
  if (logInToken && tokens.rows.find((token) => token.token === logInToken)) {
    const tokenDetails = tokens.rows.find(
      (token) => token.token === logInToken
    );
    // Radera token ifrån databasen och rensa cookien.
    await client.query("DELETE FROM tokens WHERE token=$1", [
      tokenDetails.token,
    ]);
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Your'e now signed out" });
  }
  // Om token inte finns så var användaren inte inloggad.
  else {
    return res.status(401).json({ message: "This user is not signed in" });
  }
});

// VERIFIERING AV TOKEN: (Kolla om användaren är inloggad)

app.get("/verify-token", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    // Om ingen token finns.
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const tokenQuery = await client.query(
      "SELECT * FROM tokens WHERE token=$1",
      [token]
    );

    // Om ingen match görs mot databasen.
    if (tokenQuery.rows.length === 0) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Hämta användaruppgifter (kanske tar bort pga osäkert). Tanken var att skicka med dessa användaruppgifterna för att kunna skriva ut vissa användaruppgifter på webbplatsen.
    const accountQuery = await client.query(
      "SELECT * FROM accounts WHERE id=$1",
      [tokenQuery.rows[0].account_id]
    );

    // Om kontot inte skulle finnas.
    if (accountQuery.rows.length === 0) {
      return res.status(401).json({ message: "Invalid account" });
    }

    // Om allt är OK.
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    console.error("Error when verificatng:", error);
    return res.status(500).json({ message: "Internal error" });
  }
});

// SKAPA KONTO:

app.post("/accounts", async (req: Request, res: Response) => {
  // Kontrollera email, password och reapeat skickats med
  if (req.body.email && req.body.password && req.body.repeat) {
    const { rows } = await client.query("SELECT * FROM accounts");

    // Kolla så att det inte finns ett konto registrerat med samma email.
    if (rows.find((row) => row.email === req.body.email)) {
      return res.status(409).json({ message: "Account already exist" });
    }
    // Skapa kontot.
    else {
      try {
        await client.query(
          "INSERT INTO accounts (email, password) VALUES ($1, $2)",
          [req.body.email, req.body.password]
        );
        return res.status(201);
      } catch (error) {
        console.error("Error occured when creating account: " + error);
      }
    }
  } else {
    return res
      .status(406)
      .json({ message: "Please fill in the form correctly" });
  }
});

app.listen(port, () => {
  console.log(`Up and running on port ${port}`);
});
