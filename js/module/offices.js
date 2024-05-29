//1. Devuelve un listado con el código de oficina y la ciudad donde hay oficinas.

export const getAllOficeAndCodeCity = async () =>{
    let res = await fetch("http://172.16.101.146:5585/offices")
    let offices = await res.json()
    let dataUpdate = offices.map(offices => {
        let { code_office, city } = offices
        return ({
            code_office,
            city

        })
    })

        console.log(dataUpdate);
    }

   // getAllOficeAndCodeCity ()

//2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.

export const getAllOficeAndTelephoneByCountry = async () =>{
    let res = await fetch("http://172.16.101.146:5585/offices?country=Espa\u00f1a")
    let offices = await res.json()
    let dataUpdate = offices.map(offices => {
        let { city, movil } = offices
        return ({
    
            city,
            movil

        })
    })

        console.log(dataUpdate);
    }

    //getAllOficeAndTelephoneByCountry ()

        // Obtener toda la informacion de la oficina por codigo
export const getOfficesByCode = async (code) => {
    let res = await fetch(`http://172.16.101.146:5585/offices?code_office=${code}`)
    let data = await res.json();
    return data
}