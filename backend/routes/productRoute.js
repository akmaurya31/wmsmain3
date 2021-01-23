import express from 'express';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../util.js';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler';
const router=express.Router();

////////////////////

router.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
       await Product.remove({});
      const createdProducts = await Product.insertMany(data.products);
      res.send({ createdProducts });
    })
  );

  /////////////////////

router.get("/", async(req, res)=>{
  const name = req.query.name || '';
  // const category = req.query.category || '';
  const categoryAr = req.query.category || '';

  const bblanguageAr = req.query.bblanguage || '';

  const bbindAr = req.query.bbind || '';

  const bsearchStr = req.query.bsearch || '';
  console.log("MyCategoryisSearch-------"+bsearchStr);
  //let Arrcate=explode(",",categoryAr);
  let Arrcate = categoryAr.split(","); 
  let Arrblang = bblanguageAr.split(","); 
  let ArrbBind = bbindAr.split(","); 


  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  // const categoryFilter = category ? { category } : {};

  const categoryFilter = categoryAr ? {category: {$in:Arrcate}}  : {};

   const blangFilter = bblanguageAr ? {book_language: {$in:Arrblang}}  : {};

   const bBindFilter = bbindAr ? {book_format: {$in:ArrbBind}}  : {};
   var bSearchFilter='';
if(bsearchStr!=''){
  let jbsearchStr='/'+bsearchStr+'/';
    bSearchFilter = {$or: [{category: jbsearchStr}, {book_language:jbsearchStr},{name:jbsearchStr}]};
}else{

    bSearchFilter ="";
}
console.log("MyCategoryisSearch-------"+bSearchFilter);

  //  {$or: [{category: /ook/}, {book_language:/ook/},{name:/ook/}]}

  const products = await Product.find({
    ...nameFilter,
    ...categoryFilter,
    ...blangFilter,
    ...bBindFilter,
    ...bSearchFilter,
  });

 
   // const products= await Product.find({});
console.log("i am insidessssssssssssssssssssssssssssssss of get request22222",categoryFilter)
//console.log(products)
    res.send(products);
})

// router.get("/:id", async(req, res)=>{
//     const product= await Product.findOne({_id: req.params.id});

//     console.log("i am inside product get id of thing")

//         if(product){
//             res.send(product);
//           //  console.log(product)
//         }else{
//             res.status(404).send({message:"Product not Found"})
//         }
    
// })

router.post("/", async(req, res)=>{
    console.log("i am inside nodejs post method");
    let mfullPath=req.body.image;
    let mfilename = mfullPath.replace(/^.*[\\\/]/, '')
    //console.log(mfilename);

    const product= new Product({
        name: req.body.name,
        author_name: req.body.author_name,
        isbn: req.body.isbn,
        sku: req.body.sku,
        book_format:req.body.book_format,
        fc:req.body.fc,
        book_language: req.body.book_language,
        countInStock: req.body.unit,
        mrp: req.body.mrp,
        selling_price: req.body.selling_price,
        book_size: req.body.book_size,
        page_number: req.body.page_number,
        item_weight: req.body.item_weight,
        dimension: req.body.dimension,
        brand: req.body.brand,
        image:req.body.image,
        image_name:mfilename,
        description: req.body.description,
        category:req.body.cat
    });
  //  console.log(product);
    const newProduct= await product.save();

    if(newProduct){
        return    res.status(201).send({message: "New Product Created", data:newProduct})
    }
    return res.status(500).send({ message:'Error in creating Product.'});
})



router.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

  // Delete

  router.delete('/:id', async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  });




 router.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        if (product.reviews.find((x) => x.name === req.user.name)) {
          return res
            .status(400)
            .send({ message: 'You already submitted a review' });
        }
        const review = {
          name: req.user.name,
          rating: Number(req.body.rating),
          comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, c) => c.rating + a, 0) /
          product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
          message: 'Review Created',
          review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );


  //Update

router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.author_name = req.body.author_name;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});
export default router;