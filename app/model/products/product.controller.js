const conn = require("../../dbconfig/db");
exports.getProducts = (req,res) => {
  try {
    let currentPage = req.body.currentPage ? req.body.currentPage : 1;
    let pageSize = req.body.pageSize ? req.body.pageSize : 10;
    let orderBy = req.body.orderBy ? req.body.orderBy : "createdAt";
    let orderDir = req.body.orderDir ? req.body.orderDir : "desc";
    let searchFields = req.body.searchFields ? req.body.searchFields : [];
    let searchBy = req.body.searchBy ? req.body.searchBy : "";

    let offset = (currentPage - 1) * pageSize;
    let rawQuery = `select * from ProductV2 `;

    if (searchFields && searchBy) {
      rawQuery += "where ";
      for(let i=0;i<searchFields.length;i++){
        rawQuery += `${searchFields[i]} = "${searchBy}" `;
        if(i != searchFields.length-1){
          rawQuery += `and `
        }
      }
    }

    let query2 = `order by ${orderBy} ${orderDir} limit ${pageSize} offset ${offset};`;
    let finalquery = rawQuery + query2;
    
    conn.query(finalquery, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const finalResult = {
          currentPage,
          pageSize,
          totalPages: currentPage,
          totalCount: result.length,
          data: result,
        };
        res.status(200).json(finalResult);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
