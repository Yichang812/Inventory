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
 The central warehouse need to distributes the products to the retail stores to make sure there is sufficient (not to much nor too little) stock. Alice needs to update the stock of products in central warehouse and the stock of products in each retail stores accordingly.

###### Situation
  In the current system, the user need to calculate the amount of products to restock. All the stores (warehouse) and the products are listed together, Alice has to find the products records of central warehouse, update them. After the retail stores notify Alice that they have received the products, Alice has to update the stock of products for each retail stores manually.

###### Expectation
 The system can provide an suggesting amount for each product restocking. The system will automatically update the stock of all restocking products after the retail stores received them. When a delivery does not reach its destination by the expected date, the system will alert the user.

###### Proposal
 As the selling products are relatively fixed, the products that are sold in the retail store will be directly translated into a restocking request. The system will generate a summary of the restocking requests as a suggestion. The warehouse staff can adjust the restocking amount, and then delivery the products to the retail stores. Once the retail store confirms that it has received the products, the stock of the products (the total stock and the stock of that retail store) will be updated automatically. If the products don't reach the retail store by the expected date, the system alerts the user about this situation.


## User B (Store manager in retail store A, Bob)

#### Operation 2
> Confirm received products

###### Purpose
The central warehouse wants to track the delivery status of the restocking products. The central warehouse will update the stock of products for retail store A only after retail store A has received the products. If the products are not delivered by the expected date, the central warehouse will contact the transportation team.

###### Situation
To notify the central warehouse that the retail store A has received the products, Bob has to make a call or send an email to the central warehouse. Then the central warehouse will update the stock of retail store A. It is very inefficient.

###### Expectation
There is a function for Bob to confirm that retail store has received the products. The system will update the stock of retail store A automatically.

###### Proposal
The retail store can check the status of the restocking products and change the status to received after the products are delivered. The system will update the stock of products for the retail store after the status changes.

#### Operation 3
> Update Sold products

###### Purpose
When a retail store sold a product, the retail store needs to update the stock of that product so the system can maintain the correct stock of the products.

###### Situation
In the current system, the user need to firstly find the correct product record and then update the stock manually. The system does not have any function to check the correctness of each update and dose not require any the reference/proof (e.g. receipt number for each sale ) for each operation.

###### Expectation
The stock of sold product is updated automatically when the purchase is made. The system stores the proof for each purchase (i.e. the receipt number).  _selling price?????_

###### Proposal
The cashier can use the system to scan and read the QR code of all the sold products. The system will generate a receipt for these product and update their stocks automatically. The receipt number and the staff who makes this updates will be recorded.

#### Operation 4
> find expiring products

###### Purpose
To reduce lost the retail wants to sell the products that are going to be expired within 6 months with a discount price. If a product will be expired within 1 month, and has not been sold, the retail store will send it back to central warehouse.

###### Situation
The current system does not keep the expiration dates of the products. So Bob has to keep record of the expiration date of each product. He also need to check if any products match the condition for discounting or returning.

###### Expectation
The system can keep record of the expiration dates of products for retail store A. When there is product whose expiration date is within 6 months, or the expiration date is within 1 month, the system will alert the user.

###### Proposal
After each restocking, the expiration date for each kind of products is the same. Therefore, the system will keep the batch number and the expiration dates of each kind of restocking products. When the expiration date of a kind of product is within 6 months, the system will alert the user so that the user can find out the expiring products by the batch number.  

#### Operation 6
>check stock

###### Purpose
The are possibility that the product is broken or stolen. For such cases, it requires Bob to update the stock of product manually.
###### Situation
###### Expectation
###### Proposal

## User C (Sales manager, Charlie)

#### Operation 7
>sales report

###### Purpose
Charlie wants to know the information like “the most popular products”, “the top-grossing products”, “the top sales stores” and summaries like “the sales history report by product”, “ the sales history report by product type ”, “the sales history report by time period”. With these information, Charlie can make a better sales plan.

###### Situation
To obtain the required information from current system, Charlie has to record the data from the system to tools like Excel and manipulate the data e.g. filtering the data, ordering the data.

###### Expectation
Charlie wants the required information be generated directly from the system. Charlie wants to specify the time period or the product type or the store for the data that is used to generate the information (e.g. he wants to know the top-grossing products for the last 3 months).

###### Proposal
The system will generate a sales report containing the required information automatically. The user can decide the time period, the product types, and the store for the data to generate the report. A information in the report will be presented in both literal and visual ways.

#### Operation 8
> purchasing habit

###### Purpose
Charlie wants to know customers' purchasing habits, like what they usually buy together, what products are more popular before holidays. Charlie wants to know these information, so that he can plan for different promotions, like value set, holiday set. The information also provides guide when the retail store place the products, e.g. the information shows that people buy protein powder trends to buy diet food too, so the store can place the two types of product beside each other.

###### Situation
The operation involves data mining technics which does not support in current system. It also not feasible for Charlie to analysis the huge number of data manually.

###### Expectation
Charlie wants to know the information

###### Proposal
