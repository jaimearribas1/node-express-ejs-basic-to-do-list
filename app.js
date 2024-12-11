// Importar módulos necesarios
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// Inicializar la app
const app = express();

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Asegúrate de que `public/styles.css` esté accesible

// Datos de ejemplo para las columnas del To-Do List
const tasks = {
  "To Do": ["Buy Food", "Cook Food"],
  "In Progress": ["Learn Express.js"],
  "Done": ["Install Node.js"]
};

// Ruta principal: Renderizar la vista del To-Do List
app.get("/", (req, res) => {
  const day = date.getDate();
  res.render("list", { listTitle: day, taskColumns: tasks });
});

// Ruta para añadir una tarea
app.post("/add-task", (req, res) => {
  const { column, task } = req.body;
  if (tasks[column]) {
    tasks[column].push(task);
  }
  res.redirect("/");
});

// Ruta para mover una tarea a otra columna (opcional)
app.post("/move-task", (req, res) => {
  const { fromColumn, toColumn, task } = req.body;
  if (tasks[fromColumn] && tasks[toColumn]) {
    // Eliminar la tarea de la columna de origen y añadirla a la columna de destino
    tasks[fromColumn] = tasks[fromColumn].filter(t => t !== task);
    tasks[toColumn].push(task);
  }
  res.redirect("/");
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
