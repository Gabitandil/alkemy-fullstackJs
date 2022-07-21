const {Router} = require('express')
const router = Router()


 const {Transaction } = require('../config/db')

 
 router.post('/create', async (req, res) => {
    let {
        concept,
        amount,
        date,
        type_transaction,  
        category
    } = req.body



 try {
    let createTransaction = await Transaction.create({
        concept: concept,
        amount: amount,
        date: date,
        type_transaction: type_transaction,
        category : category
    })
    if (createTransaction.type_transaction == "expense"){
        
        let expenseTransaction = await Transaction.update({ amount:-Math.abs(amount)}, {where: {id: createTransaction.id}})
            
        
       
        
        
      return  res.send(expenseTransaction)

        
        
        
        
    } else {
      return  res.send(createTransaction)
    }
 } catch (error) {
    console.log(error.message)
 }
     
})



router.get('/', async (req,res) => {
    try {
        const data = await Transaction.findAll()

        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
  
    
})



router.put('/change/:id', async (req, res) => {
    try {
        const {id } = req.params
        let {concept, amount, date} = req.body
        
       let createTransaction =   await Transaction.update({concept, amount, date},
        
             {
            silent: true,
            where : {
                id
            }
        } )
        // if (createTransaction.type_transaction == "expense"){
        
        //     let expenseTransaction = await Transaction.update({ amount:-Math.abs(amount)}, {where: {id: createTransaction.id}})
        //     console.log('hola')
        // }
        res.status(200).send("transaction succesfully updated")
    } catch (error) {

        console.log(error.message)
    }
   

})

router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        await Transaction.destroy({
         where: {id}
        })
        res.status(200).send("transaction deleted succesfully")
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;