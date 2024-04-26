//7. Devuelve un listado con los distintos estados por los que 
//puede pasar un pedido.


export async function getRequestFullStatus(status) {
    let res = await fetch(`http://localhost:3000/requests?status=${status}`);
    let requests = await res.json();
    let dataUpdate = new set (requests.map(status => {
        return {
            status:status.status
        }
    }));

    console.log(dataUpdate);
}
getRequestFullStatus()





