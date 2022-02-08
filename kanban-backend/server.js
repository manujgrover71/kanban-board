const express = require("express");
const app = express();
const dataModel = require("./models/data");
const port = 5000;
require("././config/dbconnect");
app.use(express.json());

let data = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "Todo",
      cards: [
        {
          id: "1",
          title: "Learning how to code...",
        },
        {
          id: "2",
          title: "Second card content, just a little bigger.",
        },
        {
          id: "3",
          title: "This is just a normal size one.",
        },
      ],
    },
    "list-2": {
      id: "list-2",
      title: "Doing",
      cards: [],
    },
  },
  listIds: ["list-1", "list-2"],
};

app.options("*", function (request, response) {
  // console.log("Sending the response of the post request");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.send("");
});

app.get("/data", (req, res) => {
  console.log("Sending data");
  res.set("Access-Control-Allow-Origin", "*");
  // dataModel.getData(req, function(error, result) {
  //   if(error) console.log("Error while featching data");
  //   else console.log("From get Data ", result);
  // });
  res.send(data);
});

app.post("/data", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // console.log(req.body);
  
  if (req.body.type === "addTitle") {
    const newCard = {
      id: req.body.id,
      title: req.body.title,
    };

    const list = data.lists[req.body.listId];
    list.cards = [...list.cards, newCard];

    data = {
      ...data,
      lists: {
        ...data.lists,
        [req.body.listId]: list,
      },
    };
    
    dataModel.insertData(data, function (error, result) {
      if(error) console.log("Error while inserting data ", error);
      else console.log("Result received from insertData ", result);
    });
    
  } else if (req.body.type === "addList") {
    data = {
      ...data,
      lists: {
        ...data.lists,
        [req.body.list.id]: req.body.list,
      },
      listIds: [...data.listIds, req.body.list.id],
    };
  } else if (req.body.type === "updateList") {
    data = {
      ...data,
      lists: {
        ...data.lists,
        [req.body.list.id]: req.body.list,
      },
    };
  } else if(req.body.type === 'onDragEnd') {
    
    const { destination, source, draggableId } = req.body;
    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      sourceList.cards.splice(destination.index, 0, draggingCard);

      data = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
        },
      };

    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      data = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
    } 
  }

  // console.log("changed data from server ", data);
  res.send(data);
});

app.delete("/data", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // console.log("Delete is called with data: ", req.body);
  
  let cards = data.lists[req.body.listId].cards;
  cards = cards.filter((card) => card.id !== req.body.cardId);
  console.log(cards)
  
  data = {
    ...data, 
    lists: {
      ...data.lists,
      [req.body.listId]: {
        ...data.lists[req.body.listId],
        cards: cards
      }
    }
  };
  
  res.send(data);
});

app.get("/", (req, res) => {
  // console.log(req);
  res.send("Root Path");
});

app.listen(port, function () {
  console.log(`App listening on ${port}`);
});
