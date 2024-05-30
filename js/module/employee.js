import {getAllClientsByManagerCode} from "./clients.js"
import {getOfficesByCode} from "./offices.js"


// 3. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe tiene un código de jefe igual a 7.

export const getAllEmployeesWithBossAndCodeSeven = async() =>{
    let rest = await fetch ("http://172.16.101.146:5582/employee?code_boss=7")
    let data = await rest.json();
    let dataUpdate = [];
    data.forEach(val => {
        let [email] = val.email.match(/(?<=\[)[^\[\]]+@[^@\[\]]+(?=\])/)
        dataUpdate.push({
            nombre: val.name,
            apellidos: `${val.lastname1} ${val.lastname2}`,
            email
        });
    });
    return dataUpdate;
}




//4. devuelve  el nombre del puesto, nombre, apellidos y 
//email del jefe de la empresa  

// export const getBoss = async () =>{
//      let res = await fetch ("http://localhost:5502/employees")
//      let data = await res.json();

//      let boss = data.find(val=> val.boss === true);

export async function getBoss(codeBoss = null) {
    const res = await fetch(`http://172.16.101.146:5582/employee?code_boss=${codeBoss}`)
    let employee = await res.json();
    let dataUpdate = employee.map(employee => {

        return {
            position: `${employee.position}`,
            name: employee.name,
            fullLastName: `${employee.lastname1} ${employee.lastname2}`,
            email: employee.email

        }
    })

    console.log(dataUpdate);
}
//getBoss()

//5. Devuelve un listado con el nombre, apellidos y puesto de aquellos 
//empleados que no sean representantes de ventas.


export async function getFullnameEmailEmployeesWithoutSales(position) {
    let res = await fetch(`http://172.16.101.146:5582/employee?position=${position}`);
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
//getFullnameEmailEmployeesWithoutSales("Representante Ventas");

// Consulta interna

// 8. Devuelve un listado con el nombre de los empleados junto con el nombre de sus jefes.

export const getAllEmployeesAndBossNames = async () => {
    let res = await fetch('http://172.16.101.146:5542/employee').then(res => res.json());
    let dataUpdate = res.map(async (val) => {
        if (val.code_boss == null) {
            return{
                Empleado: val.name + ' ' + val.lastname1 + ' ' + val.lastname2,
                JefeACargo: val.name + ' ' + val.lastname1 + ' ' + val.lastname2
            };
        }
        let [boss] = await getEmployeesByCode(val.code_boss);
        return {
            Empleado: val.name + ' ' + val.lastname1 + ' ' + val.lastname2,
            JefeACargo: boss.name + ' ' + boss.lastname1 + ' ' + boss.lastname2
        };
    });
    return await Promise.all(dataUpdate);
};

// 9. Devuelve un listado que muestre el nombre de cada empleados, el nombre de su jefe y el nombre del jefe de sus jefe.
export const getAllEmployeeBossAndHisBossNames = async () => {
    let res = await fetch('http://172.16.101.146:5542/employee').then(res => res.json());
    let dataUpdate = res.map(async (val) => {
        if (val.code_boss == null) return {
            Empleado: `${val.name} ${val.lastname1} ${val.lastname2}`,
            JefeACargo: `${val.name} ${val.lastname1} ${val.lastname2}`,
            JefeDeJefe: `${val.name} ${val.lastname1} ${val.lastname2}`
        };
        let [boss] = await getEmployeesByCode(val.code_boss);
        if (boss.code_boss == null) return {
            Empleado: `${val.name} ${val.lastname1} ${val.lastname2}`,
            JefeACargo: `${boss.name} ${boss.lastname1} ${boss.lastname2}`,
            JefeDeJefe: `${boss.name} ${boss.lastname1} ${boss.lastname2}`
        };
        let [bossBoss] = await getEmployeesByCode(boss.code_boss);
        return {
            Empleado: `${val.name} ${val.lastname1} ${val.lastname2}`,
            JefeACargo: `${boss.name} ${boss.lastname1} ${boss.lastname2}`,
            JefeDeJefe: `${bossBoss.name} ${bossBoss.lastname1} ${bossBoss.lastname2}`
        };
    });
    return await Promise.all(dataUpdate);
};

// COSULTA EXTERNA

// 4.2 Devuelve un listado que muestre solamente los empleados que no tienen una oficina asociada.

export const getAllemployeesHaveNotOffices = async () => {
    let res = await fetch('http://172.16.101.146:5542/employee').then(res => res.json());
    let dataUpdate = res.map(async (val) => {
        if (val.code_office == null) return {
            Empleado: `${val.name} ${val.lastname1} ${val.lastname2}`
        };
        
    });
}

// 5.2 Devuelve un listado que muestre solamente los empleados que no tienen un cliente asociado.

export const getAllemployeesHaveNotClients = async () => {

    let resEmployees = await fetch("http://172.16.101.146:5542/employee");
    let employees = await resEmployees.json();
    let resClients = await fetch("http://172.16.101.146:5541/clients"); 
    let clients = await resClients.json();

    let dataUpdate = [];
    for (let i = 0; i < employees.length; i++) {
        let employeeAssociated = false;
        for (let j = 0; j < clients.length; j++) {
            if (employees[i].employee_code === clients[j].code_employee_sales_manager) {
                employeeAssociated = true;
                break;
            }
        }
        if (!employeeAssociated) {
            dataUpdate.push(employees[i]);
        }
    }
    return dataUpdate;
};
// 6.2 Devuelve un listado que muestre solamente los empleados que no tienen un cliente asociado junto con los datos de la oficina donde trabajan.

export const getAllemployeesHaveNotClientsWithOffices = async() => {
    let resEmployees = await fetch("http://172.16.101.146:5582/employee");
    let employees = await resEmployees.json();
    let resClients = await fetch("http://172.16.101.146:5581/clients"); 
    let clients = await resClients.json();
    let resOffices = await fetch("http://172.16.101.146:5585/offices"); 
    let offices = await resOffices.json();

    let dataUpdate = [];
    for (let i = 0; i < employees.length; i++) {
        let employeeAssociated = false;
        for (let j = 0; j < clients.length; j++) {
            if (employees[i].employee_code === clients[j].code_employee_sales_manager) {
                employeeAssociated = true;
                break;
            }
        }
        if (!employeeAssociated) {
            let employee = employees[i];
            let employeeUpdate = { ...employee };
            // Buscar la oficina del empleado
            let office = offices.find(office => office.code_office === employee.code_office);
            if (office) {
                // Agregar los datos de la oficina al empleado
                let officeUpdate = { id_office: office.id, ...office };
                dataUpdate.push({ ...employeeUpdate, ...officeUpdate });
            } else {
                console.log('No se encontró la oficina para el empleado con código de oficina: ${employee.code_office}');
            }
        }
    }
    return dataUpdate;
}

//7. Devuelve un listado que muestre los empleados que no tienen una oficina asociada y los que no tienen un cliente asociado.

export const getAllEmployeesThatArentAssociatedWithAnyClientOrOffice = async () => {
    let res = await fetch("http://172.16.101.146:5582/employee")
    let data = await res.json();
    let dataUpdate = [];
    for (let i = 0; i < data.length; i++) {
        let [client] = await getAllClientsByManagerCode(data[i].employee_code);
        let [office] = await getOfficesByCode(data[i].code_office);
        if (client === undefined && office === undefined) {
            dataUpdate.push(data[i]);
        }
    }
    return dataUpdate;
}