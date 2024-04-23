export const getAllFullNameAndEmails = async () =>{
    let res = await fetch ("http://localhost:5502/employees")
    let data = await res.json();
    let dataUpdate = data.map(val=>{

        return {
            name: val.name,
            fullLastName: `${val.lastname} ${val. lastname2}`,
            email: val.email.match... 
        }
    })

    return dataUpdate;

}

//4. devuelve  el nombre del puesto, nombre, apellidos y 
//email del jefe de la empresa  

export const getBoss = async () =>{
    let res = await fetch ("http://localhost:5502/employees")
    let data = await res.json();

    let boss = data.find(val=> val.boss === true);
