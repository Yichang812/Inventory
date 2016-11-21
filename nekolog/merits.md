# Outline
Eventory is a system designed for retailers to manage the inventory of its central warehouse and retail stores. The key features include: keeping records of stocks, restocking management automatic stock updating, product identification through QR code, product expiration management marketing support.

# Merits

1. A GUI function for user to add new products to the system make the operation easier and saves users' time.

2. Simplify the workflow for identifying a product and retrieving its information by unique product code and QR code identifier.

3. Optimize the inventory level for each retail stores by suggesting a restocking quantity.

4. Reduce the judgement made by human by automating the process of tracking restocking products, updating stock of the retail stores and alerting the undelivered products.

5. Improve the efficiency and the accuracy when updating the stock of sold products by cooperating with the cash register.

6. Maximize the users' profit by reminding the user to sell nearly expired products in advance.

7. Inspire user to make better business decisions by accurate real time sales reports.

8. Secure the inventory information by restricting users' access rights.  


# Features
##### Merit 1
###### 1) A form for gathering product information
The user can create a new product record by simply filling and submitting a form. It is much easier for user with database knowledge to add new product records.

###### 2) Insert the information into database
This step is completely handled by the system. The system will insert the information gathering from the form to the database. The Inventory List will be updated automatically.

##### Merit 2
###### 3) Generate a product code for each product in the system
The system automatically generates a unique product code for each product in the system. The user can easily identify a product by its product code.

###### 4) Generate a QR code for each product in the system
The system automatically generates a QR code for each product in the system. Scanning the QR code, the user can easily access the product information.

##### Merit 3
###### 5) Calculate the restocking quantity for each retail store
As the user only sells a narrow selection of exclusive products and the selling quantity is quite steady, the system will translate the product sold in retail store into a restocking request. When the warehouse staff distributes products to each retail store, the staff can reference the summary of the restocking request from each store.

###### 6) Confirm restocking quantity and distribute the product to retail store
The user can specify the restocking quantity for retail stores before seasonal promotions or holidays. If no specification is mode, the system will automatically distribute the products based on its calculation. Once user confirm the distribution, the system will inform the transportation team to collect the products.

##### Merit 4
###### 7) Tracking shipping products
The system will assign each batch of restocking products a batch number for automating the tracking of the delivery status and expiration dates of the products. Once the transportation team collected the products, the transportation team member and the expected delivery date will be recorded in the system. The user can track the delivery status of the products by the batch number.

###### 8) Update stock of delivered products
Once the retail store confirms that the products are delivered, the system will update the stock of the retail store automatically.

###### 9) Alert undelivered products
If the retail store has not received the products by the expected date, the system will automatically alert the staff in the central warehouse.

##### Merit 5

###### 10) Generating receipt of sold products
The system cooperates with cash register to gather the purchase information and generate receipt for each purchase.

###### 11) Update stock of sold products
The system will automatically update the stock of sold products and record the receipt number with each update for reference.

##### Merit 6

###### 12) Report products whose expiration dates are within the selected period
The user can specified a time period e.g. 6 months. The system will find all the products that will be expired within 6 months for the user.

###### 13) Alert the products that need to be returned to central warehouse
When there are products that will be expired within 1 month, the system will automatically alert the user to return the products to central warehouse.

##### Merit 7

###### 14) Order the products based on their total selling amount in selected stores and time period
The system can generate a ranking based on the total selling amount of each product from user-specified stores and the time period (e.g. the top selling products for stores in city A during the last 6 months).

###### 15) Order the products based on the growth of their selling amount in selected stores and time period
The system can generate a ranking based on the growth of selling amount of each product from user-specified stores and the time period (e.g. the top-grossing products for stores in city A during the last 6 months).

###### 16) Order the stores based on their total revenue for selected products and time period
The system can generate a ranking based on the total revenue of each stores for user-specified products and the time period (e.g. the top selling stores for product A during the last 6 months).

###### 17) Visualize the inventory history of a product for central warehouse or a selected store
The system can generate graphs based on the inventory history of a product for user-specified stores. It presents the trends of product demanding in a vivid way.


##### Merit 8
###### 18) Restrict users access right
In the system, the central warehouse staff has the right to manage the inventory of central warehouse and view the inventory information of all the retail stores. The retail store staff only has the right to manage the inventory of the store he/she working in. The marketing staff can only view the sales report generated by the system.  
