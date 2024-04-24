// 3.Devuelve un listado con el nombre, apellidos y email 
//de los empleados cuyo jefe tiene un código de jefe igual a 7.
/*
export async function getAllFullNameAndEmails (codeBoss) {
   const res = await fetch (`http://localhost:3000/employee?code_boss=${codeBoss}`)
     let employee  = await res.json();
     let dataUpdate = employee.map(employee=>{

         return {
             name: employee.name,
             fullLastName: `${employee.lastname1} ${employee.lastname2}`,
             email: employee.email 
         }
     })

     console.log(dataUpdate);   
 }
 getAllFullNameAndEmails(7)
*/




//4. devuelve  el nombre del puesto, nombre, apellidos y 
//email del jefe de la empresa  

// export const getBoss = async () =>{
//      let res = await fetch ("http://localhost:5502/employees")
//      let data = await res.json();

//      let boss = data.find(val=> val.boss === true);

export async function getBoss(codeBoss=null) {
        const res = await fetch (`http://localhost:3000/employee?code_boss=${codeBoss}`)
          let employee  = await res.json();
          let dataUpdate = employee.map(employee=>{
     
              return {
                 position: `${employee.position}`,
                  name: employee.name,
                  fullLastName: `${employee.lastname1} ${employee.lastname2}`,
                  email: employee.email 
                 
              }
          })
     
          console.log(dataUpdate);   
      }
      getBoss()
