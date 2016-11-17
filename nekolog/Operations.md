## Operations:

- [x] Operation 1 add new
- [x] Operation 2 restock
- [x] Operation 3 sell product and update stock
- [x] Operation 4 expiration date
- [ ] Operation 5
- [ ] Operation 6
- [ ] Operation 7
- [ ] Operation 8
- [ ] Operation 9


1. Add a new product to the system (QR identify)

    A new kind of protein powder was developed and produced. The company now want to add this new product to the system so that it is easier to keep records of the stock and track its information. The current system does not support creating new product records. The product record can only be inserted at the server side by SQL queries.

    The work items are: “product information” and “the inventory system database”

2. Restock stock to each retail store (batch no as ref)

    The central warehouse will restock the retail stores every fixed period. The user need to determine the  restocking amount based on the selling of each retail store. It takes time to deliver the product from the central warehouse to the retail stores. The user need to keep tracking the delivery status of the products , and update the stock of the products once the products are delivered.

    The work items are: “the selling report of each retail store”, “the delivery status of the products” and “the restocking amount of the products”.  

3. Update product stock (comprehensive restock log for quantity, date and assigned team members)

    Whenever, a product is sold or purchased, the stock of it needs be updated as soon as possible. The new stock amount, the selling/purchasing price, the proof of each update (i.e. tax invoices and receipt number), the team members who assigned the stock  need to be recorded with each update.  All these information are very useful during accounting an auditing.

    The work items are: “the latest stock of the product”, “the change of the stock”, “proof of purchase/ sale”, “The selling/ purchasing price” and “expiration date”.

4. Find the products that are going to be expired

    The retail wants to sell the products that are going to be expired within 6 months with a discount price. And the retail need to return the products that are going to be expired with 2 weeks to the supplier. The staffs in the retail need to do this routine work frequently. Every time, they need to check the expiration date product by product.

    The work item is: “expiration dates of products”

5. Find the right time and time quantity for reordering

    ~~The retail wants to place an order before the products are out-of-stock. Thus, it requires the staffs to check the stock of the products regularly. The retail also wants to find the economic quantity for each order. More stock means more spending on storage facilities and a higher risk of having product going expired. After placing a order, the retail needs to follow up the order until the products are received. The stock will be updated only after the order is fulfilled.~~

    ~~The work items are: “the stock of each product”, “the reorder time”, “the economic order quantity” and “the proof of the order”.~~

6. Establish the business strategy base on sells report (generate automated order)

    An accurate real time sells report can give insights for making business decisions. The  company need to generate the sells report through the records of the inventory, sales and orders. The reports covers metrics like “the most popular products”, “the top-grossing products”, “the top sales stores” and  summaries like “the sales history report by product”, “ the sales history report by product type ”, “the sales history report by time period”.

    The work items are: “the records of the inventory, sales and orders”.

7. Discover customers' purchasing habits to maximize profit

    The company wants to find customers' purchasing habits. Based on the customers' purchasing habits, the company can plan for different promotions and design the placement of products to maximize its profit.

    The work items are: “sales history”, “customer purchase history” and “algorithm for discovering purchasing habits”.

8. Transfer products from one retail store to another

9. Physical check of the stock (double confirm)
