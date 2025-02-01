const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UberSchema = new Schema({
    id:{type:Number, require:true},
    ganho:{type:Number, require:true},
    kmi:{type:Number, require:true},
    kmf:{type:Number, require:true},
    kmv:{type:Number, require:true},
    gasolina:{type:Number, require:true},
    carro:{type:Number, require:true},
    despesa:{type:Number, require:true},
    lucro:{type:Number, require:true},
    data:{type:Date, require:true}
})

const Uber = mongoose.model("Uber", UberSchema);

module.exports = Uber;