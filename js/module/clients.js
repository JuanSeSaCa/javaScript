// //6. Devuelve un listado con el nombre de los todos los clientes españoles.

// export async function clientsByCity (country) {
//     let res = await fetch (`http://localhost:3000/clients?country=${country}`);
//     let clients = await res.json();
//     let dataUpdate = clients.map(clients =>{
//         return {
//             name: clients.name,
//             fullLastName: `${clients.lastname1} ${clients.lastname2}`,
//             city: clients.city

//         }
//     });
//     console.log(dataUpdate);
// }


// 6. Devuelve un listado con el nombre de los todos los clientes españoles.

export const getAllClientsfromSpain = async() =>{
    let rest = await fetch ("http://172.16.101.146:5581/clients?country=Spain")
    let data = await rest.json();
    let dataUpdate = data.map(val => {
        return {
            Name: val.client_name,
        }
    })
    return dataUpdate;
}






/*
export async function getFullnameEmailEmployeesWithoutSales(position) {
    let res = await fetch(`http://localhost:3000/employee?position=${position}`);
    let employees = await res.json();
    let dataUpdate = employees.map(employee => {
        return {
            name: employee.name,
            fullLastName: `${employee.lastname1} ${employee.lastname2}`,
            position: employee.position
        }
    });

    console.log(dataUpdate);
}
//getFullnameEmailEmployeesWithoutSales("Representante Ventas");*/

// 16. Devuelve un listado con todos los clientes que sean de la ciudad de Madrid y cuyo representante de ventas tenga el código de empleado 11 o 30.

export const getAllClientsFromCityAndCode = async() =>{
    let rest = await fetch ("http://172.16.101.146:5581/clients?city=Madrid")
    let data = await rest.json();
    let dataUpdate = [];
    data.forEach(val => {
        if (val.code_employee_sales_manager === 11 || val.code_employee_sales_manager === 30){
            dataUpdate.push(val);    
        }
    });
    return dataUpdate;
}

//CONSULTAS INTERNAS

// 1. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas.

export const getAllClientNameAndSalesManager = async () => {
    let res = await fetch("http://172.16.101.146:5581/clients");
    let data = await res.json();
    for (let i = 0; i < data.length; i++) {
        let [dataEmployee] = await getEmployeesByCode(data[i].code_employee_sales_manager)
        data[i] = {
            Client_name: data[i].client_name,
            Manager_name: `${dataEmployee.name} ${dataEmployee.lastname1} ${dataEmployee.lastname2}`
        }
    }
    return data;
}

// 2. Muestra el nombre de los clientes que hayan realizado pagos junto con el nombre de sus representantes de ventas.

export const getAllClientNameAndSalesManagerWithPayment = async () => {
    let payment = await getPaymentByClientCode()
    let dataUpdate = []
    for (const val of payment) {
        let res = await fetch(`http://172.16.101.146:5581/clients?client_code=${val.code_client}`);
        let data = await res.json();
        let [dataEmployee] = await getEmployeesByCode(data[0].code_employee_sales_manager)
        if (!dataUpdate.some(elmt => elmt.Client_name == data[0].client_name)) {
            let datos = ({
                Client_name: data[0].client_name,
                Client_Code: val.code_client,
                Manager_name: `${dataEmployee.name} ${dataEmployee.lastname1} ${dataEmployee.lastname2}`,
                Manager_Code: dataEmployee.employee_code
            })
            dataUpdate.push(datos)
        }
    }
    return dataUpdate;
}

// 3. Muestra el nombre de los clientes que **no** hayan realizado pagos junto con el nombre de sus representantes de ventas.

export const getAllClientNameAndSalesManagerWithoutPayment = async () => {
    let res = await fetch("http://172.16.101.146:5581/clients").then(res => res.json());
    let dataUpdate = [];
    for (const val of res) {
        let [employee] = await getEmployeesByCode(val.code_employee_sales_manager);
        let [pago] = await getPaymentByClientCode(val.client_code)
        if (pago == undefined) dataUpdate.push({
            Client_name: val.client_name,
            clientCode: val.client_code,
            Manager_name: `${employee.name} ${employee.lastname1} ${employee.lastname2}`,
            Manager_Code: val.code_employee_sales_manager
        })
    }
    return dataUpdate;
}


// 4.Devuelve el nombre de los clientes que han hecho pagos y el nombre de sus representantes junto con la 
// ciudad de la oficina a la que pertenece el representante.

export const getAllAlreadyClientsPaymentsAndManagerOffices = async () => {
    let clients = await getAllClientNameAndSalesManagerWithPayment();
    let dataUpdate = [];
    for (const client of clients) {
        let [dataEmployee] = await getEmployeesByCode(client.Manager_Code);
        let [offices] = await getOfficesByCode(dataEmployee.code_office);
        if (!dataUpdate.some(elmt => elmt.Client_name == client.Client_name)) {
            dataUpdate.push({
                Client_name: client.Client_name,
                Manager_name: `${dataEmployee.name} ${dataEmployee.lastname1} ${dataEmployee.lastname2}`,
                Manager_City: offices.city
            })
        }
    }
    return dataUpdate;
}

// 5.Devuelve el nombre de los clientes que no hayan hecho pagos y el nombre de sus representantes 
// junto con la ciudad de la oficina a la que pertenece el representante.

export const getAllNotAlreadyClientsPaymentsAndManagerOffices = async () => {
    let clients = await getAllClientNameAndSalesManagerWithoutPayment();
    let dataUpdate = [];
    for (const client of clients) {
        let [dataEmployee] = await getEmployeesByCode(client.Manager_Code);
        let [offices] = await getOfficesByCode(dataEmployee.code_office);
        if (!dataUpdate.some(elmt => elmt.Client_name == client.Client_name)) {
            dataUpdate.push({
                Client_name: client.Client_name,
                Manager_name: `${dataEmployee.name} ${dataEmployee.lastname1} ${dataEmployee.lastname2}`,
                City: offices.city
            })
        }
    }
    return dataUpdate;
}

// 6. Lista la dirección de las oficinas que tengan clientes en Fuenlabrada.

export const getAllOfficeswithFuenlabradaClients = async () => {
    let res = await fetch("http://172.16.101.146:5581/clients?city=Fuenlabrada").then(res => res.json());
    let dataUpdate = [];
    for (const val of res) {
        let [employee] = await getEmployeesByCode(val.code_employee_sales_manager)
        let { code_office } = employee
        let [officeDirection] = await getOfficesByCode(code_office)
        dataUpdate.push({
            cliente: val.client_name,
            encargado: `${employee.name} ${employee.lastname1} ${employee.lastname2}`,
            Oficina: code_office,
            direccionOficina: `${officeDirection.address1} ${officeDirection.address2}`
        })
    }
    return dataUpdate;
}

// 7. Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.

export const getAllClientNameAndSalesManagerAndOffices = async () => {
    let res = await fetch("http://172.16.101.146:5581/clients").then(res => res.json());
    let dataUpdate = [];
    for (const val of res) {
        let [employee] = await getEmployeesByCode(val.code_employee_sales_manager)
        let { code_office } = employee
        let [officeDirection] = await getOfficesByCode(code_office)
        dataUpdate.push({
            Client_name: val.client_name,
            Manager_name: `${employee.name} ${employee.lastname1} ${employee.lastname2}`,
            City: officeDirection.city
        })
    }
    return dataUpdate;
}

// 10. Devuelve el nombre de los clientes a los que no se les ha entregado a tiempo un pedido.
export const getAllClientsWithALateDeliveryArrive = async ()=>{
    let res = await fetch("http://172.16.101.146:5588/requests?status=Entregado");
    let dataRequest = await res.json();
    let dataClients = [];

    // Obtener todos los clientes
    let clientsRes = await fetch("http://172.16.101.146:5581/clients");
    let clientsData = await clientsRes.json();
    let clientsMap = new Map(clientsData.map(client => [client.client_code, client.client_name]));

    for (let i = 0; i < dataRequest.length; i++) {
        let fecha1 = new Date(dataRequest[i].date_wait);
        let fecha2 = new Date(dataRequest[i].date_delivery);
        if (fecha2 > fecha1) {
            let clientName = clientsMap.get(dataRequest[i].code_client);
            if (clientName) {
                let exists = dataClients.some(item => item.client_name === clientName);
                if (!exists) {
                    dataClients.push({
                        "client_name": clientName,
                    });
                }
            }
        }
    }
    return dataClients;
}


//  CONSULTA EXTERNA 

//1. Devuelve un listado que muestre solamente los clientes que no han realizado ningún pago
export const getAllClientsWhoHaventPaid = async()=>{
    let res = await fetch("http://172.16.101.146:5541/clients")
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [payments] = await getAllClientsWhoPaid(data[i].client_code);
        if (payments === undefined) {
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}

//2. Devuelve un listado que muestre solamente los clientes que no han realizado ningún pedido.
export const getAllClientsWhoHaventRequest = async()=>{
    let res = await fetch("http://172.16.101.146:5541/clients")
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [ requests ] = await getAllClientsWhoPaid(data[i].client_code);
        if(requests === undefined){
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}

//3. Devuelve un listado que muestre los clientes que no han realizado ningún pago y los que no han realizado ningún pedido.
export const getAllClientsWhoHaveNeitherPaidNorRequest = async()=>{
    let res = await fetch("http://172.16.101.146:5541/clients")
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [ payments ] = await getAllClientsWhoPaid(data[i].client_code);
        let [ requests ] = await getAllClientsWhoRequest(data[i].client_code);
        if(payments === undefined && requests === undefined){
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}


// obtener clientes por codigo de asesor de ventas
export const getAllClientsByManagerCode = async (code) => {
    let res = await fetch("http://172.16.101.146:5541/clients?code_employee_sales_manager=${code}")
    let data = await res.json();
    return data;
}