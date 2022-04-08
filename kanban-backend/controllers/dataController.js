const { ListModel, CardModel } = require("../models/DataModel");

// @desc   GET data
// @route  GET /api/v1/data
// @access Public
async function getData(req, res, next) {
  
  const user_id = req.user.id;
  
  try {
    const data = await ListModel.find({ user_id: user_id });
    
    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}

// @desc   Add Card at given id
// @route  POST /api/v1/card/:id
// @access Public
async function addCard(req, res, next) {
  const { listId, text, position } = req.body;

  try {
    const card = new CardModel({ title: text });

    const result = await ListModel.findById({ _id: listId }).updateOne({
      $push: {
        cards: { $each: [card], $position: position || 0 },
      },
    });

    result["id"] = card._id;

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}

// @desc   Update list
// @route  PUT /api/v1/list/:id
// @access Public
async function updateList(req, res, next) {
  const { title } = req.body;
  const listId = req.params.id;

  try {
    const result = await ListModel.findById({ _id: listId }).updateOne({
      $set: { title: title },
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}

// @desc   Delete list
// @route  DELETE /api/v1/list/:id
// @access Public
async function deleteList(req, res, next) {
  const listId = req.params.id;

  try {
    const result = await ListModel.deleteOne({ _id: listId });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}

// @desc   Add new List
// @route  POST /api/v1/list
// @access Public
async function addList(req, res, next) {
  const user_id = req.user.id;
  const { title } = req.body;

  try {
    const result = await ListModel.insertMany([{ user_id: user_id, title: title }]);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}

// @desc   Delete Card with given Id
// @route  DELETE /api/v1/card
// @access Public
async function deleteCard(req, res, next) {
  const { cardId, listId } = req.body;

  try {
    const result = await ListModel.find({ _id: listId }).updateOne({
      $pull: { cards: { _id: cardId } },
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}

module.exports = {
  getData,
  updateList,
  deleteList,
  addList,
  addCard,
  deleteCard,
};
