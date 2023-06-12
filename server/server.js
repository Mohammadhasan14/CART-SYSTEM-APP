require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const { Food, Order  } = require("./model/dataSchema")
const foodDetails = require('./Data/foodDetails')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const app = express()

app.use(cors())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: "true" }))

app.get('/', async (req, res) => {
    try {
        const data = await Food.find()
        console.log(data)
        res.json(data);
      } catch (error) {
        console.log(error); 
      }
})

app.get('/order', async (req, res) => {
  try {
      const data = await Order.find()
      console.log(data)
      res.json(data);
    } catch (error) {
      console.log(error); 
    }
})

//////////////////////////////////// Checkout /////////////////////////////////////
app.post('/create-checkout-session', async (req, res) => {
  try {
    // Create the session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      phone_number_collection: {
        enabled: true
      },
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.url],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.cartQuantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

///////////////////////////////// stripe webhook ////////////////////////////////////////

// This is your Stripe CLI webhook secret for testing your endpoint locally.

let endpointSecret;

// endpointSecret = "";

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let data;
  let eventType;

  if (endpointSecret) {
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      data = event.data.object;
      eventType = event.type;
      console.log('Webhook verified');
    } catch (err) {
      console.error('Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === 'checkout.session.completed') {
    try {
      const session = data;

      // Access the relevant information from the session object
      const sessionId = session.id;
      const customerName = session.customer_details.name;
      const customerEmail = session.customer_details.email;
      const paymentStatus = session.payment_status;
      const amountTotal = session.amount_total;
      // ... access other relevant properties as needed
      console.log(session)
      console.log('Session ID:', sessionId);
      console.log('Customer Name:', customerName);
      console.log('Customer Email:', customerEmail);
      console.log('Payment Status:', paymentStatus);
      console.log('Amount Total:', amountTotal);

      // Perform any necessary actions with the retrieved data

      // Example: Save the order details in the database
      const order = new Order({
        _id: sessionId,
        name: customerName,
        email: customerEmail,
        status: paymentStatus,
        amount_total: amountTotal,
        // ... save other relevant order details
      });

      await order.save();
      console.log('Order saved successfully');
    } catch (error) {
      console.error('Error processing webhook event:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});


////////////////////////////////////////////////////////////////////////



//////////////////////// below is the code to add data in a collections /////////////////////////////////////////////////

Food.find().then(res => {
    res.length < 1 && Food.insertMany(foodDetails).then(res => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}).catch(error => {
    console.log(error)
})



///////////////////// below is the code for sending mathing keyword of collections feild to a client//////////////////////////////////////

  app.post('/foodData', async (req, res) => {
      const data = req?.body?.searchKeyword?.toString();
      console.log('data:', data); 
    
      try {
        const matchingAds = await Food.find({ name: { $regex: data, $options: 'i' } });
        res.json(matchingAds);
      } catch (error) {
        console.log(error); 
      }
    });


    ////////////////////////////////////// Delete data ////////////////////////////////////

    app.delete('/delete', async (req, res)=>{
      const deleteData = req.body;
      console.log('deleteData',deleteData)
      try {
        const deletePerformance = await Food.findOneAndDelete(
          {_id: deleteData._id}
        );
        res.status(200).send('data successfully deleted')
      } catch (error) {
        console.error(error)
        console.log(error)
      }
    
    })
    

    app.delete('/deletecustomer', async (req, res)=>{
      const deleteData = req.body;
      console.log('deleteData',deleteData)
      try {
        // const deletePerformance = await Order.findOneAndDelete(
        //   {_id: deleteData._id}
        // );
        res.status(200).send('data successfully deleted')
      } catch (error) {
        console.error(error)
        console.log(error)
      }
    
    })

    //////////////////////////////////// Add Data ///////////////////////////////////////////

    app.post('/addmore', async(req,res)=>{
      const newData = new Food(req.body)
      console.log(newData)
      try{
        await newData.save()
        .then(res => console.log(res))
        .catch(err => console.log(err))
        res.status(200).send('data saved!')
      }
      catch (error) {
        res.status(400).send(error)
      }
    })

    
    //////////////////////////////////// Edit Data //////////////////////////////////////////

    app.post('/edit', async (req, res)=>{
      const performanceData = req.body
      console.log('performanceData ',performanceData);
      try{
        const updatePerformance = await Food.findOneAndUpdate(
          {_id : performanceData._id},
          performanceData,
          {new : true}
          )
    
        res.status(200).send('Data received')
      } catch (err){
        console.log(err)
        res.status(400).send(err)
    
      }
    })


    /////////////////////////////////////
  
  



app.listen(5000, () => {
    console.log("server is running on port 5000")
})

