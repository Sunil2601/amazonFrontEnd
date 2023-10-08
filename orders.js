var Orders = /** @class */ (function () {
    function Orders() {
    }
    return Orders;
}());
function getOrdersData() {
    var ordersSummaryContainer = document.querySelector('.ordersContainer');
    ordersSummaryContainer.innerHTML = "";
    var orders = JSON.parse(localStorage.getItem('orders')) || [];
    console.log(orders);
    var table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'mt-5');
    table.innerHTML = "\n        <thead>\n            <tr>\n                <th>ID</th>\n                <th>Name</th>\n                <th>Total</th>\n                <th>Date</th>\n            </tr>\n        </thead>\n        <tbody>\n            ".concat(orders.map(function (item) { return "\n                <tr>\n                    <td>".concat(item.id, "</td>\n                    <td>").concat(item.title, "</td>\n                    <td>$").concat(item.total, "</td>\n                    <td>").concat(item.date, "</td>\n                </tr>\n            "); }).join(''), "\n        </tbody>\n    ");
    ordersSummaryContainer.appendChild(table);
}
getOrdersData();
