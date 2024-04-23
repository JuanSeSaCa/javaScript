export const getAllOficeAndCodeCity = async () =>{
    let res = await fetch (http:)
    let data = await res.json()
    let dataUpdate = data.map (val =>{
        return {
            code_office: val.code_office,
            city: val.city 
        }
    });
    return data;
}