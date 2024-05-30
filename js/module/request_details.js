//Obtener detalles de un pedido mediante su codigo

export const getAllDetailsByOrderCode = async (code)=>{
    let res = await fetch(`http://172.16.101.146:5583/request_details?code_request=${code}`).then(response => response.json());
    return res
}

export const getAllRequestDetailsByCode = async(product_code)=>{
    let res = await fetch('http://172.16.101.146:5583/request_details?product_code=${product_code}');
    let data = await res.json();
    return data;
}