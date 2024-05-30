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

