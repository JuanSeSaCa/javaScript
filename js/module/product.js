// 15. Devuelve un listado con todos los productos que pertenecen a la gama Ornamentales y que tienen 
// más de 100 unidades en stock. El listado deberá estar ordenado por su precio de venta, mostrando en primer lugar los de mayor precio.

export const getOrnamentalProductsOver100StockByPrice = async () => {
    let res = await fetch("http://172.16.101.146:5587/products?gama=Ornamentales");
    let data = await res.json();
    let dataUpdate = [];

    data.forEach(val => {
        if (val.stock > 100){
            dataUpdate.push(val);
        }
    });
    dataUpdate.sort((a, b) => b.price_sale - a.price_sale);
    
    return dataUpdate;
}

//Obtener data de un producto mediante su codigo
export const getProductByCode = async (code = '') => {
    let res = await fetch(`http://172.16.101.146:5587/products?code_product=${code}`)
    let data = await res.json()
    return data
}