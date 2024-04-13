const OrderRouter = require("express").Router();
const OrderModel = require("./Orders.model");

/**
 * 1. Create order
 * 2. Get All Orders
 * 3. Get Order by id
 * 4. Update order by id
 * 5. Delete order
 */
OrderRouter.post("/create", async (req, res, next) => {
  try {
    const Order = new OrderModel(req.body);
    const response = await Order.save();

    if (response && response._id) {
      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: response,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Order creation failed",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      success: false,
      message: "Order creation failed",
    });
  }
});

OrderRouter.get("/all", async (req, res, next) => {
  const { page = 1, count = 5 } = req.query;
  try {
    const response = await OrderModel.find()
      .limit(count)
      .skip(Number(page) === 1 ? 0 : page * count);
    if (response && response.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: response,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No Order Found",
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});

OrderRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: true,
      error: "Order id is not provided",
      message: "Something went wrong",
    });
  }
  try {
    const response = await OrderModel.findOne({ _id: id }); // null or {}
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: response,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No Order Found",
        data: {},
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});
module.exports = OrderRouter;
