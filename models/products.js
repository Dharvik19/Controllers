const path = require("path");
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
   ' products.json'
);

const getProductsFromFile=(callBack)=>{
   
          fs.readFile(p, (error, fileContent)=>{
            if(error){
                return callBack([]);
            }else{
                callBack(JSON.parse(fileContent));
            }
          });
};
module.exports = class Product {
    constructor(title){
        this.title = title;
    }

    save(){
        getProductsFromFile(products =>{
            products.push(this);//refers to the object of the class 
            fs.writeFile(p, JSON.stringify(products),(err)=>{
                console.log(err);
            });
        })  
    }
    static fetchAll(callBack) {
       getProductsFromFile(callBack)
    }
}