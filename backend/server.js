import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
 import config from './config.js';
 import mongoose from 'mongoose';
 import path from 'path';
 import userRoute from './routes/userRoute.js';
 import productRoute from './routes/productRoute.js';
 import uploadRouter from './routes/uploadRouter.js';
import bodyParser from 'body-parser';
import orderRouter from './routes/orderRouter.js';
var Schema = mongoose.Schema;
//import Schema from 'mongoose.Schema';
//import {Payouts}   from 'cashfree-sdk';
// const { Payouts } = require('./cashfree-sdk');

 
dotenv.config();

 


const mongodbUrl= config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useCreateIndex:true
}).catch(error => console.log(error.reason));

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', uploadRouter);
app.use("/api/users/",userRoute);
app.use("/api/products", productRoute)
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));





//var getschema = require("../backend/route.js");//ravi line

const foliocams = new Schema({
    amc_code: { type: String },
    foliochk: { type: String },
    inv_name: { type: String },
    sch_name: { type: String },
    jnt_name1: { type: String },
    jnt_name2: { type: String },
    holding_nature: { type: String },
    pan_no: { type: String },
    joint1_pan: { type: String },
    bank_name: { type: String },
    ac_no: { type: String },
    nom_name: { type: String },
    nom2_name: { type: String },
    nom3_name: { type: String },
    ifsc_code: { type: String },
}, { versionKey: false });

const foliokarvy = new Schema({
    Folio: { type: String },
    City: { type: String },
    Email: { type: String },
    BankAccno: { type: String },
    InvestorName: { type: String },
    PANNumber: { type: String },
}, { versionKey: false });

const foliofranklin = new Schema({
    BRANCH_N12: { type: String },
    BANK_CODE: { type: String },
    IFSC_CODE: { type: String },
    NEFT_CODE: { type: String },
    NOMINEE1: { type: String },
    FOLIO_NO: { type: String },
    INV_NAME: { type: String },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
    ADDRESS2: { type: String },
    ADDRESS3: { type: String },
    D_BIRTH: { type: String },
    F_NAME: { type: String },
    PHONE_RES: { type: String },
}, { versionKey: false });

var transcams = new Schema({
    trxnno: {type: String },
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    traddate: { type: String },
    units: { type: String },
    amount: { type: String },
    trxn_nature: { type: String },
    scheme_type: { type: String },
    pan: { type: String },
    trxn_type_flag: { type: String },
    amc_code: { type: String },
}, { versionKey: false });

const transkarvy = new Schema({
    FMCODE: { type: String },
    TD_ACNO: { type: String },
    FUNDDESC: { type: String },
    TD_TRNO: { type: String },
    SMCODE: { type: String },
    INVNAME: { type: String },
    TD_TRDT: { type: String },
    TD_POP: { type: String },
    TD_AMT: { type: String },
    TD_APPNO: { type: String },
    UNQNO: { type: String },
    TD_NAV: { type: String },
    IHNO: { type: String },
    BRANCHCODE: { type: String },
}, { versionKey: false });

const transfranklin = new Schema({
    COMP_CODE: { type: String },
    SCHEME_CO0: { type: String },
    SCHEME_NA1: { type: String },
    FOLIO_NO: { type: String },
    TRXN_TYPE: { type: String },
    TRXN_NO: { type: String },
    INVESTOR_2: { type: String },
    TRXN_DATE: { type: String },
    NAV: { type: String },
    POP: { type: String },
    UNITS: { type: String },
    AMOUNT: { type: String },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
}, { versionKey: false });

var cams_navSchema = new Schema({
    trxnno: {type: String },
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    traddate: { type: String },
    units: { type: String },
    amount: { type: String },
    trxn_nature: { type: String },
    scheme_type: { type: String },
    pan: { type: String },
    trxn_type_flag: { type: String },
}, { versionKey: false });

const cams_transSchema = new Schema({
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    ac_no: { type: String },
    bank_name: { type: String },
}, { versionKey: false });




app.get("/api/gettranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            console.log("data="+data);
            res.send(data);
        }
    });
})


app.get("/api/getcamstransdata", function (req, res) {
    var model = mongoose.model('cams_trans', cams_transSchema, 'cams_trans');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})

app.get("/api/getamclist", function (req, res) {
Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
{data:{ email:'sunilguptabfc@gmail.com'}}
  ).then(function(result) {
    //let json = CircularJSON.stringify(result);
    var pan =  result.data.data.User[0].pan_card;
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
    var datacollection = model.find({"pan_no":pan}).distinct("amc_code", function (err, newdata) { 
        if(newdata != 0){    
                 resdata= {
                    status:200,
                    message:'Successfull',
                    data:  newdata 
                  }
                }else{
                 resdata= {
                    status:400,
                    message:'Data not found',            
               }
                  // res.send(newdata);
                }
             //   res.json(resdata)    
            });
    var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
    var datacollection1 = trans.find({"pan":pan}).distinct("amc_code", function (err, newdata) { 
        if(newdata != 0){    
                 resdata1= {
                    status:200,
                    message:'Successfull',
                    data:  newdata 
                  }
                }else{
                    resdata1= {
                    status:400,
                    message:'Data not found',            
               }
                  // res.send(newdata);
                }
                //res.json(resdata1)
                var datacon = resdata.data.concat(resdata1.data)
                var removeduplicates = Array.from(new Set(datacon));
                resdata.data = removeduplicates
              //  console.log(datacon)
              //  console.log(removeduplicates)
                res.send(resdata)
            
            });

       // return resdata
});
})

app.get("/api/getfoliolist", function (req, res) {
    Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    {data:{ email:'sunilguptabfc@gmail.com'}}
      ).then(function(result) {
        //let json = CircularJSON.stringify(result);
        var pan =  result.data.data.User[0].pan_card;
        var folio = mongoose.model('folio_cams', foliocams, 'folio_cams');
        var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
        var datacollection = folio.find({"pan_no":pan}).distinct("foliochk", function (err, newdata) { 
            if(newdata != 0){    
                     resdata= {
                        status:200,
                        message:'Successfull',
                        data:  newdata 
                      }
                    }else{
                     resdata= {
                        status:400,
                        message:'Data not found',            
                   }
                      // res.send(newdata);
                    }
                 //   res.json(resdata)    
                });
        var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
        var datacollection1 = trans.find({"pan":pan}).distinct("folio_no", function (err, newdata) { 
            if(newdata != 0){    
                     resdata1= {
                        status:200,
                        message:'Successfull',
                        data:  newdata 
                      }
                    }else{
                        resdata1= {
                        status:400,
                        message:'Data not found',            
                   }
                      // res.send(newdata);
                    }
                    //res.json(resdata1)
                    var datacon = resdata.data.concat(resdata1.data)
                    var removeduplicates = Array.from(new Set(datacon));
                    resdata.data = removeduplicates
                  //  console.log(datacon)
                  //  console.log(removeduplicates)
                    res.send(resdata)
                
                });
    
            //return resdata
    });
    })

app.get("/api/getfoliocams", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})



app.post("/api/savecamsnav", function (req, res) {
    var model = mongoose.model('cams_nav', nav_cams, 'cams_nav');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log(data);
            }
        });
    }
})


app.post("/api/savecamstrans", function (req, res) {
    var model = mongoose.model('cams_trans', cams_transSchema, 'cams_trans');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log(data);
            }
        });
    }
})

app.post("/api/savefoliocams", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    for (var i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log(data);
            }
        });
    }
})

app.post("/api/savefoliokarvy", function (req, res) {
    var model = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log("foliokarvy="+foliokarvy)
                console.log(data);
            }
        });
    }
})

app.post("/api/savefoliofranklin", function (req, res) {
    var model = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/savetranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/savetranskarvy", function (req, res) {
    var model = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/savetransfranklin", function (req, res) {
    var model = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/Updatecamsnav", function(req, res) {
    var model = mongoose.model('cams_nav', cams_navSchema, 'cams_nav');  
    var i;
for (i = 0; i < req.body.length; i++) {   
  // model.find({trxnno : req.body[i].trxnno}).exec(function(err, newdata) {
  //  if (!newdata.length){   
        //console.log("length="+newdata.length);  
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                console.log(data);
                //res.send({data:"Record has been Inserted..!!"});
            }
        });

/*    } else {

        let folio_no="";
        var data = { $set:{ "folio_no" : req.body[i].folio_no ,
            "scheme" : req.body[i].scheme , inv_name : req.body[i].inv_name ,
            traddate: req.body[i].traddate ,
            units: req.body[i].units,
            amount: req.body[i].amount ,
             trxn_nature: req.body[i].trxn_nature,
            scheme_type: req.body[i].scheme_type,
            pan: req.body[i].pan,
            trxn_type_flag: req.body[i].trxn_type_flag }  }
            
        db.cams_nav.update({}, data,{multi:true}, (err , collection) => {
          if (err) throw err;
           console.log('Name exists already3='+collection);
        });
        
    }  */
 // });
}

})


//api for Update data from database
app.post("/api/Updatedata", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('cams_nav').findAndModify(
                    {trxnno: req.body[i].trxnno}, // query
                    [['_id','asc']],  // sort order
                    {$set: { folio_no : req.body[i].folio_no ,
                        scheme : req.body[i].scheme ,
                        inv_name : req.body[i].inv_name ,
                        traddate: req.body[i].traddate ,
                        units: req.body[i].units,
                        amount: req.body[i].amount ,
                        trxn_nature: req.body[i].trxn_nature ,
                        scheme_type: req.body[i].scheme_type ,
                        pan: req.body[i].pan ,
                        trxn_type_flag: req.body[i].trxn_type_flag 
                        }}, // replacement, replaces only the field "hi"
                    {}, // options
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                            console.dir("successfully");
                            //console.dir(object);
                        }
                    })
}

 })

 app.get("/api/getuserdetail", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    //console.log("hh2="+req.body.data)
    db.collection('folio_cams').aggregate({ $group: { amc_code: { $addToSet: '$amc_code' } } },);
  
})

















/* app.get('/', (req, res)=>{
	res.send('server is ready')
}) */

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

const port= process.env.PORT ||  3000;



// app.get("/api/products/:id", (req, res)=>{
// 	//res.send(data.products);
// 		const productId= req.params.id;
// 		const product= data.products.find(x => x._id === productId);
// 		if(product){
// 			res.send(product)
// 		}else{
// 			res.status(404).send({ msg: "Product Not Found"})
// 		}
// });

///////////////////////////

// app.get("/api/products", (req, res)=>{
// 	res.send(data.products);
// });

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
  });

app.listen(port, ()=> { console.log("server started at port ",port)})
