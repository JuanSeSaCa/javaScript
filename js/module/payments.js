
// 8. Devuelve un listado con el código de cliente de aquellos clientes que realizaron algún pago en 2008. 
//    Tenga en cuenta que deberá eliminar aquellos códigos de cliente que aparezcan repetidos.

export const getClientPayments_At_2008 = async () => {
    let res = await fetch("http://172.16.101.146:5586/payments");
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let year = new Date(val.date_payment).getFullYear();
        if (year === 2008) {
            dataUpdate.push({
                Code: val.code_client,
                Year: val.date_payment
            });
        }
    });
    return dataUpdate;
};

// 13. Devuelve un listado con todos los pagos que se realizaron en el año 2008 mediante Paypal. Ordene el resultado de mayor a menor.

export const getPaypalPayments2008OrderedDescending = async () =>{
    let res = await fetch("http://172.16.101.146:5586/payments?payment=PayPal");
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let year08 = new Date(val.date_payment).getFullYear();
        if (year08 === 2008) {
            dataUpdate.push(val);
        }
    });
    dataUpdate.sort((a, b) => b.total - a.total)
    return dataUpdate;
}

// 14. Devuelve un listado con todas las formas de pago que aparecen en la tabla pago. Tenga en cuenta que no deben aparecer formas de pago repetidas.

export const getAllPaymentsMethods = async () => {
    let res = await fetch('http://172.16.101.146:5586/payments');
    let data = await res.json();
    let paymentMethodsSet = new Set(data.map(item => item.payment));
    return paymentMethodsSet;
}


//Obtener el pago de algun cliente mediante codigo
export const getPaymentByClientCode = async (code = "") => {
    let res = await fetch(`http://172.16.101.146:5586/payments?code_client=${code}`);
    let data = await res.json();
    return data;
}


export const getAllClientsWhoPaid = async(code = "") => {
    let res = await fetch(`http://172.16.101.146:5586/payments?code_client=${code}`)
    let data =await res.json();
    return data;

}