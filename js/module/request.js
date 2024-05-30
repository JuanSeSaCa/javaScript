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
// 11. Devuelve un listado de todos los pedidos que fueron rechazados en 2009

export const getAllOrdersThatWereRejectedIn2009 = async () => {
    let res = await fetch("http://172.16.101.146:5588/requests?status=Rechazado");
    let data = await res.json();
    let rejectedOrdersIn2009 = data.filter(order => {
        let year = new Date(order.date_request).getFullYear();
        return year === 2009;
    });
    return rejectedOrdersIn2009;
}

// 12. Devuelve un listado de todos los pedidos que han sido entregados en el mes de enero de cualquier año.

export const getAllOrdersDeliveredInTheMonthOfJanuaryOfAnyYear = async () => {
    let res = await fetch("http://172.16.101.146:5588/requests?status=Entregado");
    let data = await res.json();
    let ordersDeliveredInJanuary = data.filter(order => {
        let month = new Date(order.date_delivery).getMonth();
        return month === 0;
    });
    return ordersDeliveredInJanuary;
}

//Obtener el estado de un pedido mediante el codigo de su cliente
export const getAllOrdersByClientCode = async(code = "")=>{
    let res = await fetch(`http://172.16.101.146:5588/requests?code_client=${code}`).then(res => res.json());
    return res
}

//Obetener datos de clientes mediante codgigo
export const getAllClientsWhoRequest = async(code)=>{
    let res = await fetch("http://172.16.101.146:5588/requests?code_client=${code}")
    let data =await res.json();
    return data;
}

