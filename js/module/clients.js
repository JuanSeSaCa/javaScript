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