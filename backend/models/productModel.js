import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );

const productSchema= new mongoose.Schema({
    name: { type:String, required:true, unique:true},
    author_name: { type:String, required:true},
    isbn: { type:String},
    sku: { type:Number},
    book_format: { type:String},
    book_language: { type:String},
    fc: { type:String},
    mrp: { type:Number},
    selling_price: { type:Number},
    book_size: { type:String},
    page_number:{ type:Number},
    item_weight:{ type:Number},
    dimension: { type:String},
    image: { type:String},
    image_name: { type:String},
     brand:{ type:String },
    category: {type: String},
    description:{ type:String},
    rating: { type:Number, default:0},
    numReviews:{ type:Number, default:0},
    countInStock: { type: Number },
    reviews: [reviewSchema],
     
},
{
    timestamps: true,
}

);

const Product= mongoose.model("Product", productSchema);

export default Product;