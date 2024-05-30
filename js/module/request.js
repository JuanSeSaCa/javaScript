// 7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.

export const getListStatusRequests = async () => {
    let res = await fetch("http://172.16.101.146:5588/requests")
    let data = await res.json();
    let dataupdateset = new Set(data.map(dev => dev.status))
    let dataUpdate = [...dataupdateset]
    return dataUpdate
}


// 9. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y 
//    fecha de entrega de los pedidos que no han sido entregados a tiempo.

export const getAllOrderCodeClientCodeAndOrdersThatHaveNotBeenDeliveredOnTime = async () => {
    let res = await fetch("http://172.16.101.146:5588/requests?status=Entregado");
    let data = await res.json();
    let overdueOrders = [];
    data.forEach(order => {
        if (order.date_delivery > order.date_wait) {
            overdueOrders.push({
                code_request: order.code_request,
                code_client: order.code_client,
                date_wait: order.date_wait,
                date_delivery: order.date_delivery
            });
        }
    });
    return overdueOrders;
};

// 10. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y 
//     fecha de entrega de los pedidos cuya fecha de entrega ha sido al menos dos días antes de la fecha esperada.

export const getAllOrderCodeClientCodeAndDeliveryDateLeastTwoDaysBefore = async () => {
    let res = await fetch("http://172.16.101.146:5588/requests")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let date_wait = new Date(val.date_wait);
        let date_delivery = new Date(val.date_delivery);
        if (date_delivery < date_wait) {
            let diferenciaM = date_wait.getTime() - date_delivery.getTime();
            let diferenciaD = diferenciaM / (1000 * 3600 * 24)
            if (diferenciaD >= 2 && val.date_delivery != null) {
                dataUpdate.push({
                    code_request: val.code_request,
                    code_client: val.code_client,
                    date_wait: val.date_wait,
                    date_delivery: val.date_delivery,
                })
            }
        }
    })
    return dataUpdate;
}
