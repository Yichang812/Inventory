## User A (Warehouse staff , Alice)

#### Operation 1
>add new product record

###### Purpose
The company develops and produces a new kind of protein powder. Alice wants to add this new product together with its information (description, product code, product type, suggested price) to the system.
###### Situation
 There is no way to add new product to the current system. Alice has to ask the technical staff to insert the product information into the database at the server side.

###### Expectation
There is a GUI for adding new products to the system.
A product code is generated automatically by the system, so the product can be easily identified and the product information can be easily retrieved.

###### Proposal
Develop a GUI function for adding new product and its information to the system.
Automatically generating a product code for identifying product and a QR code for easily retrieving product information.

#### Operation 2
>re-stocking

###### Purpose
 The central warehouse need to distributes the products to the retail stores to make sure there is sufficient (not to much nor too little) stock. Alice need to update the stock of products in each retail stores accordingly.

###### Situation
  In the current system, the user need to calculate the amount of products to restock. All the stores (warehouse) and the products are listed together, so it is very troublesome to find the correct record and make a replenish.

###### Expectation
 The system can provide an suggesting amount for each product restocking. The system will automatically update the stock of all restocking products after the retail stores received them. When a delivery does not reach its destination by the expected date, the system will alert the user.

###### Proposal
 As the selling products are relatively fixed, the products that are sold in the retail store will be directly translated into a restocking request. The system will generate a summary of the restocking requests as a suggestion. The warehouse staff can adjust the restocking amount, and then delivery the products to the retail stores. Once the retail store confirms that it has received the products, the stock of the products (the total stock and the stock of that retail store) will be updated automatically. If the products don't reach the retail store by the expected date, the system alerts the user about this situation.

## User B (Retail staff, Bob)

#### Operation 3
> Update Sold products


#### Operation 2
> Confirm received products

#### Operation 
