import bcrypt from 'bcryptjs';

export default {
  users: [
    {
      name: 'Agam',
      lname:'Sahu',
      email: 'agam@gmail.com',
      mobile:9087654321,
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      lname:'Cena',
      email: 'john@yahoo.com',
      mobile: 9087654321,
      password: bcrypt.hashSync('1234567', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      
      name: 'Book Eleven',
      author_name: 'Amit Shah',
      isbn: 'rto123r',
      sku: 123,
      book_format: 'HardBound',
      book_language: 'Sanskrit',
      Unit:12,
      mrp: 1425,
      selling_price:1140,
      book_size: '123',
      page_number:789,
      item_weight:500,
      dimension: '16*4*9',
      image: 'https://www.trainingatinfoseek.com/wp-content/uploads/2019/03/FGIT-Image-150x150.jpg',
       brand: 'BFC',
      price:345,
      category: 'Animation',
      description:' Morbi consequat nisi nec erat congue, in tempor lorem volutpat. Morbi convallis mi ac lorem accumsan mollis sed non est. Donec sapien ex, gravida sit amet finibus quis, tempor sit amet erat. Nullam quam magna, accumsan sodales rhoncus sed, laoreet vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      rating: 3.5,
      numReviews:2,
      countInStock: 7
    },
    {
      name: 'Book Ten',
      author_name: 'Narendra Modi',
      isbn: 'asd123',
      sku: 23456,
      book_format: 'paperback',
      book_language: 'English',
      Unit:1,
      mrp: 145,
      selling_price:140,
      book_size: '234',
      page_number:789,
      item_weight:300,
      dimension: '16*4*9',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBv-O8VtnucJyVOYCyVSC806ijEYmiDO3Iw&usqp=CAU',
       brand: 'BFC',
      price:345,
      category: 'Fiction',
      description:'Ut ac massa quis lectus vestibulum feugiat. Aenean quis dignissim sem. Vestibulum pulvinar enim at odio maximus hendrerit.',
      rating: 2.5,
      numReviews:2,
      countInStock: 13
    },
    {
      
      name: 'Honey Bee',
      author_name: 'Avinash Maurya',
      isbn: 'op723',
      sku: 23456,
      book_format: 'paperback',
      book_language: 'urdu',
      Unit:1,
      mrp: 1745,
      selling_price:1940,
      book_size: '234',
      page_number:349,
      item_weight:407,
      dimension: '12*4*9',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcw8LbUqUn-cN48aqhq9FXx4QtEZWdFR5sWg&usqp=CAU',
       brand: 'BFC',
      price:367,
      category: 'Romantic',
      description:'Fusce felis leo, condimentum quis pharetra vitae, sagittis quis est. Sed aliquam felis ut nunc porttitor, tincidunt bibendum orci rhoncus. Sed condimentum imperdiet ligula.',
      rating: 4.7,
      numReviews:21,
      countInStock: 13
    }
    
  ]
}