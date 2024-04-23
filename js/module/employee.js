// 3.Devuelve un listado con el nombre, apellidos y email 
//de los empleados cuyo jefe tiene un código de jefe igual a 7.

export async function getAllFullNameAndEmails (codeBoss) {
   const res = await fetch ("http://localhost:3000/employee?code_boss=7")
     let data = await res.json();
     let dataUpdate = data.map(employee=>{

         return {
             name: employee.name,
             fullLastName: `${employee.lastname1} ${employee.lastname2}`,
             email: employee.email 
         }
     })

     console.log(dataUpdate);

     
 }

 getAllFullNameAndEmails()


//4. devuelve  el nombre del puesto, nombre, apellidos y 
//email del jefe de la empresa  

// export const getBoss = async () =>{
//     let res = await fetch ("http://localhost:5502/employees")
//     let data = await res.json();

//     let boss = data.find(val=> val.boss === true);
