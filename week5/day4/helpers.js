async function dynamicPagination(Model, pageNumber, pageSize) {
  try {
    const prods = await Model.find()
      .sort({ price: -1 })
      .skip(pageNumber * pageSize)
      .limit(pageSize);
    return prods;
  } catch (err) {
    throw err;
  }
}

async function paginationLimit(limitNu, Model) {
  try {
    const products_paginated = await Model.find().limit(limitNu);
    return products_paginated;
  } catch (err) {
    throw err;
  }
}

async function sortCollection(sortBy, Model, direction) {
  try {
    const sortObj = {};
    sortObj[sortBy] = direction;
    const sorted_products = await Model.find().sort(sortObj);
    return sorted_products;
  } catch (err) {
    throw err;
  }
}

async function sortCollectionWAggregate(Model, sortBy, direction = 1) {
  try {
    const sortObj = {};
    sortObj[sortBy] = direction;
    const prods_ = await Model.aggregate([
      {
        $sort: sortObj,
      },
    ]);
    return prods_;
  } catch (err) {
    throw err;
  }
}

async function countProds(Model) {
  try {
    const c = await Model.countDocuments();
    return c;
  } catch (err) {
    throw err;
  }
}

async function deleteAll(Model) {
  try {
    const info = await Model.deleteMany({});
    return info;
  } catch (err) {
    throw err;
  }
}
async function countProdsAgg(Model) {
  try {
    const c = await Model.aggregate([
      {
        $match: { inStock: { $eq: true } },
      },
      {
        $count: "stocked_products",
      },
    ]);
    if (c.length === 0) throw new Error("No Products Are Available in Stock");
    return c[0].stocked_products;
  } catch (err) {
    throw err;
  }
}

async function avgPrices(Model) {
  try {
    const avg = await Model.aggregate([
      {
        $group: {
          _id: null,
          avgPrices: { $avg: "$price" },
        },
      },
    ]);
    return avg[0].avgPrices;
  } catch (err) {
    throw err;
  }
}

async function updateProduct(Model, filter, newVals) {
  try {
    const newPd = await Model.findOneAndUpdate(
      filter,
      {
        $set: newVals,
      },
      {
        new: true,
      }
    );
    return newPd;
  } catch (err) {
    throw err;
  }
}

async function softDelete(Model, filter) {
  try {
    const softDelProd = await Model.findOneAndUpdate(
      filter,
      {
        $set: { isDeleted: true },
      },
      {
        new: true,
      }
    );
    return softDelProd;
  } catch (err) {
    throw err;
  }
}

async function descBulkUpdate(Model, newValue) {
  try {
    const info = await Model.updateMany(
      {},
      {
        $set: { description: newValue },
      }
    );
    return { numUpdated: info.modifiedCount };
  } catch (err) {
    throw err;
  }
}

async function outOfStockBulkDel(Model) {
  try {
    const info = await Model.deleteMany({ inStock: { $eq: false } });
    return { numDeleted: info.deletedCount };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  descBulkUpdate,
  outOfStockBulkDel,
  paginationLimit,
  softDelete,
  sortCollection,
  sortCollectionWAggregate,
  countProdsAgg,
  countProds,
  updateProduct,
  dynamicPagination,
  deleteAll,
  avgPrices,
};
