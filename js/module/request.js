// 7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.

export const getListStatusRequests = async () => {
    let res = await fetch("http://172.16.101.146:5548/requests")
    let data = await res.json();
    let dataupdateset = new Set(data.map(dev => dev.status))
    let dataUpdate = [...dataupdateset]
    return dataUpdate
}




