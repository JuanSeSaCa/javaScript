
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
