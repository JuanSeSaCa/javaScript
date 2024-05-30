import { getAllDetailsByOrderCode } from './request_details.js'; 
import { getProductByCode } from './product.js';  
import {getAllOrdersByClientCode} from './requests.js'

//11. Devuelve un listado de las diferentes gamas de producto que ha comprado cada cliente.
export const getAllDifferentGammasFromEachClient = async () => {
    let clientes = await fetch("http://172.16.101.146:5581/clients").then(response => response.json());
    
    let ordenes = {};
    for(const cliente of clientes){
        let { client_code } = cliente;
        if (!ordenes.hasOwnProperty(client_code)) {
            ordenes[client_code] = {
                codigoCliente: client_code,
                gamasDistintas: new Set() // Usamos un Set para evitar duplicados
            };
        }
        
        let ordenesCliente = await getAllOrdersByClientCode(client_code);
        for(const orden of ordenesCliente){
            let detalles = await getAllDetailsByOrderCode(orden.code_request);
            detalles.forEach(detalle => {
                ordenes[client_code].gamasDistintas.add(detalle.product_code); // Agregamos el código del producto al Set de gamas distintas
            });
        }
    }
    
    // Convertimos el Set a un array y devolvemos el resultado
    return Object.values(ordenes).map(ord => {
        ord.gamasDistintas = [...ord.gamasDistintas];
        return ord;
    });
}
