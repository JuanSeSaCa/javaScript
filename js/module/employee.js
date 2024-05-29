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
