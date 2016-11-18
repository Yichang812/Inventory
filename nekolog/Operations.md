## Operations:

##### Operation A
**_Add a new product to the system (QR identify)_**

The company developed and produced a new kind of protein powder. This new product will be stored in central warehouse and then distributed to retail stores. First of all, the central warehouse need to add this new product to the system so that they can manage the stock and information of this product. The current system does not support creating new product records. The product record can only be inserted at the server side by SQL queries.

The work items are: “product information” and “the inventory system database”

**Problem:**

It is infeasible for user without technical background to add new product records to the system directly by SQL queries.

**Ideal:**
- There is a GUI function for user to add new product records and product information directly to the system.
- The system will generates a product code and a QR code automatically.
- The user can easily identify a product by its product code.
- The user can retrieve the product information (i.e. product description, suggested price, product type) by scanning the QR code on the product. The QR code will re-direct user to the product information page.

##### Operation B
**_Restock products for each retail store (batch no as ref)_**

The central warehouse will restock the retail stores every month. The user needs to determine the restocking amount for a retail store based on its selling amount. There is a delay between the products are out of central and the products are actually arrived the retail store. Therefore, the user need update the stock of products in central warehouse and keep tracking the delivery status of the products. The stock of the retail store will be changed only after the products are delivered.

The work items are: “the selling report of each retail store”, “the delivery status of the products” and “the restocking amount of the products”.  

**Problem**

It contains multiple routine works to restock the products for each retail store. For each retail store, the user needs to check its selling amount and send the restocking products. As the stock of central warehouse and retail store are updated at different time, it is very troublesome for the user to keep tracking of the status of all the deliveries and update the stock of each retail stores.

**Ideal**
- The system presents users the recommended restocking amount for each retail store based on its selling amount.
- The user can easily manage the restocking for all the stores by a single operation. The system will generate a batch number for each restocking for future tracking.
- The system updates the stock of the central warehouse automatically when the restocking products are sent out.
- It will also keep tracking the delivery status of all the sending out products. If delivery does not reach the target retail store by the expected date, the system will alert the warehouse staff.
- The system will update the stock of the retail store once the restocking products are accepted by the retail store.   

##### Operation C
**_Update product stock (comprehensive restock log for quantity, date and assigned team members)_**

Whenever, a product is sold or purchased, the stock of it needs to be updated as soon as possible. The new stock amount, the selling/purchasing price, the proof of each update (i.e. tax invoices and receipt number), the team members who assigned the stock  need to be recorded with each update.  All these information are very useful during accounting an auditing.

The work items are: “the latest stock of the product”, “the change of the stock”, “proof of purchase/ sale”, “The selling/ purchasing price” and “expiration date”.

**Problem**

It is hard for user to keep the stock accurate as the user has to update the stock immediately after selling a product. If the user forget to update the stock, the mistake is hardly discovered.

**Ideal**
- While selling products, the user can use the system to scan the read the QR code of all the products one by one.
- The system will generate a receipt for the products and update the stock automatically.
- The system will also keep the receipt number and the staff name for future reference.

##### Operation D
**_Find the products that are going to be expired_**

The retailer wants to sell the products that are going to be expired within 6 months with discount prices. And for the products that are going to be expired with 1 month, the retail must return the product to the central warehouse. The central warehouse will also monitoring the expiration dates of the products. And remind the retailer if there is any products that will be expired within 1 month and have not been returned yet.

The work item is: “expiration dates of products”

**Problem**
It is troublesome for the user to keep checking the expiration date of products. If the user does not find the expiring product in time, the user has to suffer from the lost due to expired products. It is even worse, if the user sells expired products to the customers.

**Ideal**
- The system stores the expiration date and batch number during every restocking (during each restocking, the same kind of products have the same expiration data).
- The system will remind the user if there is any product whose expiration date is within the user specified period.
- The system will alert the central warehouse, if any product will be expired within 1 month and have not been returned yet.

##### Operation E
**_Plan for marketing campaigns (generate automated order)_**

The inventory records takes a crucial part in the sales report which gives insights for making marketing campaigns. The reports covers metrics like “the most popular products”, “the top-grossing products”, “the top sales stores” and  summaries like “the sales history report by product”, “ the sales history report by product type ”, “the sales history report by time period”. With these metrics, the marketing team can discover the customers' purchasing habits design holiday promotions or seasonal promotions.

The work items are: “the records of the inventory, sales and orders”.

**Problem**

A lot of useful information can be explored from the data in the inventory system. However, it is troublesome for the user to manipulate the date and get the information.

**Ideal**
- The user can define the desired time period, product types and the stores for the data.
- The system will automatically generates a sales report containing information (e.g. "best selling products", "top-grossing products") based on user selection.
- The information in the report will be presented in both literal and visual ways.
