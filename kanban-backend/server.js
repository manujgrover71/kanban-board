const express = require("express");
const app = express();
const dataModel = require("./models/data");
const port = 5000;
require("././config/dbconnect");
app.use(express.json());

app.options("*", function (request, response) {
  console.log("Sending the response of the post request");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.send("");
});

app.get("/data", (req, res) => {
  console.log("Sending data");
  res.set("Access-Control-Allow-Origin", "*");
  dataModel.getData(req, function (error, result) {
    if (error) console.log("Error while featching data");
    else res.send(result);
  });
});

app.post("/data", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log(req.body);

  if (req.body.type === "addTitle") {
    dataModel.addCard(
      { id: req.body.listId, title: req.body.title },
      function (error, result) {
        if (error) console.log("Error while adding card in db", error);
        else {
          res.send(result);
        }
      }
    );
  } else if (req.body.type === "addList") {
    dataModel.addList({ title: req.body.title }, function (error, result) {
      if (error) console.log("Error while adding a list");
      else {
        res.send(result);
      }
    });
  } else if (req.body.type === "updateList") {
    dataModel.updateListTitle(
      { id: req.body.listId, listTitle: req.body.listTitle },
      function (error, result) {
        if (error) console.log("Error while updating list title");
        else {
          console.log("Updated list result ", result);
          res.send(result);
        }
      }
    );
  } else if (req.body.type === "onDragEnd") {
    const { destination, source, draggableId, cardTitle } = req.body;

    console.log("Source List: ", source);

    dataModel.deleteCard(
      { cardId: draggableId, listId: source.droppableId },
      function (error, result) {
        if (error) console.log("Error while deleting from list");
        else {
          dataModel.addCardAtPosition(
            {
              listId: destination.droppableId,
              index: destination.index,
              cardTitle,
            },
            function (error1, result1) {
              if (error1) console.log("Error while adding into position");
              else res.send(result1);
            }
          );
        }
      }
    );
  }
});

app.delete("/data", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Delete is called with data: ", req.body);

  if (req.body.type == "deleteCard") {
    dataModel.deleteCard(
      { cardId: req.body.cardId, listId: req.body.listId },
      function (error, result) {
        if (error) console.log("Error in deleting");
        else res.send(result);
      }
    );
  } else {
    dataModel.deleteList({ listId: req.body.listId }, function (error, result) {
      if (error) console.log("Error in deleting");
      else res.send(result);
    });
  }
});

app.get("/", (req, res) => {
  res.send("Root Path");
});

app.listen(port, function () {
  console.log(`App listening on ${port}`);
});
