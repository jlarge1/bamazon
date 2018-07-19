var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    showAll();

});

function showAll() {
    console.log("Selecting all products...\n");

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (i = 0; i < res.length; i++) {
            console.log("\n ================= \n Item #: " + res[i].item_id + "\n Product: " + res[i].product_name + "\n Cost: " + res[i].price + "\n =================");
        }
        storefront();
    });

}

function storefront() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Enter the ID of the product you would like to buy:"
        },
        {
            name: "units",
            type: "input",
            message: "How many units would you like to purchase?"
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: answer.item }, function (err, res) {
            if (answer.units < res[0].stock_quantity) {
                console.log("\nYou have purchased " + answer.units + " units of " + res[0].product_name + ".");

                purchase(res[0], answer.units);

            } else {
                console.log("\nThere are " + res[0].stock_quantity + " units of " + res[0].product_name + " currently in stock.")
                console.log("Sale cancelled.");
                storefront();
            }

        });
    });
};

function purchase(arr, num) {
    var newStock = arr.stock_quantity - num;
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStock
            },
            {
                item_id: arr.item_id
            }
        ],
        function (err, res) {
            userCost(arr.price, arr.product_name, num);
        })
};

function userCost(price, product, num) {
    var cost = num * price;
    console.log("\nYour order has been processed.");
    console.log("\n\n///////////////////////\n" + num + " units of " + product)
    console.log("\nYour total:   $" + cost + "\n//////////////////////");
    connection.end();
}