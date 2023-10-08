class Orders{
    id:number;
    title:string;
    total:number;
    date:string;
}

function getOrdersData(){
    const ordersSummaryContainer =(<HTMLElement> document.querySelector('.ordersContainer'));
    ordersSummaryContainer.innerHTML="";
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    console.log(orders);
    const table = document.createElement('table');
    table.classList.add('table','table-bordered','mt-5');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Total</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            ${orders.map(item => `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>$${item.total}</td>
                    <td>${item.date}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    ordersSummaryContainer.appendChild(table);
}

getOrdersData();
