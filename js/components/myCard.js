import {
    getAllOficceAndCodeCity,
    getAllCityandPhoneSpain
    //  CONSULTA EXTERNA 
    } from "../module/offices.js"
    
import {
        getAllEmployeesWithBossAndCodeSeven,
        getAllBoss,
        getAllFullNamePositionDiferentSalesRepresentative,
        //Interna
        getAllEmployeesAndBossNames,
        getAllEmployeeBossAndHisBossNames,
        //  CONSULTA EXTERNA 
        getAllemployeesHaveNotOffices,
        getAllemployeesHaveNotClients,
        getAllemployeesHaveNotClientsWithOffices,
        getAllEmployeesThatArentAssociatedWithAnyClientOrOffice
    } from "../module/employee.js"
    
import {
        getAllClientsfromSpain,
        getAllClientsFromCityAndCode,
        //Interna
        getAllClientNameAndSalesManager,
        getAllClientNameAndSalesManagerWithPayment,
        getAllClientNameAndSalesManagerWithoutPayment,
        getAllAlreadyClientsPaymentsAndManagerOffices,
        getAllNotAlreadyClientsPaymentsAndManagerOffices,
        getAllOfficeswithFuenlabradaClients,
        getAllClientNameAndSalesManagerAndOffices,
        getAllClientsWithALateDeliveryArrive,
        //  CONSULTA EXTERNA 
        getAllClientsWhoHaventPaid,
        getAllClientsWhoHaventRequest,
        getAllClientsWhoHaveNeitherPaidNorRequest
    } from "../module/clients.js"
    
import {
        getListStatusRequests,
        getAllOrderCodeClientCodeAndOrdersThatHaveNotBeenDeliveredOnTime,
        getAllOrderCodeClientCodeAndDeliveryDateLeastTwoDaysBefore,
        getAllOrdersThatWereRejectedIn2009,
        getAllOrdersDeliveredInTheMonthOfJanuaryOfAnyYear,
        //  CONSULTA EXTERNA 
    } from "../module/requests.js"
    
import {
        getClientPayments_At_2008,
        getPaypalPayments2008OrderedDescending,
        getAllPaymentsMethods,
        //  CONSULTA EXTERNA 
    } from "../module/payments.js"
    
import {
        getOrnamentalProductsOver100StockByPrice,
        //  CONSULTA EXTERNA 
        getAllProductsThatNeverHasBeenRequested
    } from "../module/products.js"
    
import {
        //Interna
        getAllDifferentGammasFromEachClient,
        //  CONSULTA EXTERNA 
    } from "../module/gama.js"
    import { 
    getAllClientsFromSpainAndRepresentative11Or30, 
    getClientsEmploy 
} from "../module/clients.js";
import {
    getAllEmployNotClients 
} from "../module/employees.js";

export class Mycard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="../css/myCard.css">  
        `
    }
    // async getClientsEmployDesign(){
    //     let data = await getClientsEmploy();
    //     data.forEach(val => {
    //         this.shadowRoot.innerHTML += /*html*/`
    //             <div class="report__card">
    //                 <div class="card__title">
    //                     <div>${val.client_name}</div>
    //                 </div>
    //                 <div class="card__body">
    //                     <div class="body__marck">
    //                         <p><b>Nombre del empleado: </b>${val.name_employee}</p>
    //                         <p><b>Ciudad: </b>${val.city}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         `;
    //     });
    // }
    async getAllClientsFromSpainAndRepresentative11Or30Design(){
        let data = await getAllClientsFromSpainAndRepresentative11Or30();
        data.forEach(val => {
            let money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.limit_credit);
            this.shadowRoot.innerHTML += /*html*/`
            
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.client_name} # ${val.client_code}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Id: </b> ${val.id}</p>
                            <p><b>Codigo del empleado: </b>${val.code_employee_sales_manager}</p>
                            <p><b>Contacto: </b>${val.phone} - ${val.fax}</p>
                            <p><b>Nombre del representante: </b>${val.contact_name} ${val.contact_lastname}</p>
                            <p><b>Dirrecion: </b>${val.address1} ${(val.address2) ? val.address2 : ""}</p>
                            <p><b>Ubicacion: </b>${val.country} ${val.region} ${val.city} ${val.postal_code}</p>
                            <p><b>Total a prestar: </b>${money}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    async getAllEmployNotClientsDesign(){
        let data = await getAllEmployNotClients();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.name} ${val.lastname1} ${val.lastname2} # ${val.employee_code}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Id: </b> ${val.id}</p>
                            <p><b>Cargo: </b>${val.position}</p>
                            <p><b>Oficina: </b>${val.code_office}</p>
                            <p><b>Jefe encargado: </b>${val.name_boss}</p>
                            <p><b>Numero de extencion: </b>${val.extension}</p>
                            <p><b>Correo electronico: </b>${val.email}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllClientNameAndSalesManagerWithPaymentDesign() {
    let data = await getAllClientNameAndSalesManagerWithPayment();
    data.forEach(val => {
        this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Cliente que ha hecho pagos</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre del cliente: </b>${val.Client_name}</p>
                        <p><b>Nombre del representante: </b>${val.Manager_name}</p>
                    </div>
                    </div>
                    </div>
                    `;
                });
            }
    async getAllClientNameAndSalesManagerWithoutPaymentDesign() {
        let data = await getAllClientNameAndSalesManagerWithoutPayment();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Cliente que no ha hecho pagos</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del cliente: </b>${val.Client_name}</p>
                            <p><b>Nombre del representante: </b>${val.Manager_name}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllAlreadyClientsPaymentsAndManagerOfficesDesign() {
        let data = await getAllAlreadyClientsPaymentsAndManagerOffices();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Cliente que ha hecho pagos</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del cliente: </b>${val.Client_name}</p>
                            <p><b>Nombre del representante: </b>${val.Manager_name}</p>
                            <p><b>Oficina: </b>${val.Manager_City}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllNotAlreadyClientsPaymentsAndManagerOfficesDesign() {
        let data = await getAllNotAlreadyClientsPaymentsAndManagerOffices();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Cliente que ha hecho pagos</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del cliente: </b>${val.Client_name}</p>
                            <p><b>Nombre del representante: </b>${val.Manager_name}</p>
                            <p><b>Oficina: </b>${val.City}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllOfficeswithFuenlabradaClientsDesign() {
        let data = await getAllOfficeswithFuenlabradaClients();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Cliente que tienen oficina en Fuenlabrada</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del cliente: </b>${val.cliente}</p>
                            <p><b>Oficina: </b>${val.Oficina}</p>
                            <p><b>Direccion de oficina: </b>${val.direccionOficina}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllClientNameAndSalesManagerAndOfficesDesign() {
        let data = await getAllClientNameAndSalesManagerAndOffices();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Cliente con la oficina de su representante</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del cliente: </b>${val.Client_name}</p>
                            <p><b>Nombre del manager: </b>${val.Manager_name}</p>
                            <p><b>Officina: </b>${val.City}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllClientsWithALateDeliveryArriveDesign() {
        let data = await getAllClientsWithALateDeliveryArrive();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Cliente que no se les ha entregado a tiempo</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del cliente: </b>${val.client_name}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllClientsWhoHaventPaidDesign() {
        let data = await getAllClientsWhoHaventPaid();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Cliente que no han realizado ningun pago</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del cliente: </b>${val.client_name}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    
    async getAllClientsWhoHaventRequestDesign() {
        let data = await getAllClientsWhoHaventRequest();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Cliente que no han realizado ningun pedido</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del cliente: </b>${val.client_name}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    
    //EMPLOYEES
    
    async getAllEmployeesWithBossAndCodeSevenDesign() {
        let data = await getAllEmployeesWithBossAndCodeSeven();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Empleado con Codigo de Jefe igual a 7</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre: </b>${val.nombre} ${val.apellidos}</p>
                            <p><b>Email: </b>${val.email}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllBossDesign() {
        let data = await getAllBoss();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Jefe de la empresa</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre: </b>${val.nombre} ${val.apellidos}</p>
                            <p><b>Email: </b>${val.email}</p>
                            <p><b>Posicion: </b>${val.position}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllFullNamePositionDiferentSalesRepresentativeDesign() {
        let data = await getAllFullNamePositionDiferentSalesRepresentative();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Empleados que no son representante de ventas</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre: </b>${val.nombre} ${val.apellidos}</p>
                            <p><b>Posicion: </b>${val.position}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllEmployeesAndBossNamesDesign() {
        let data = await getAllEmployeesAndBossNames();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Empleado junto a su Jefe</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Empleado: </b>${val.Empleado}</p>
                            <p><b>Jefe a cargo: </b>${val.JefeACargo}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllEmployeeBossAndHisBossNamesDesign() {
        let data = await getAllEmployeeBossAndHisBossNames();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
            <div class="card__title">
                <div><h3>Empleado junto a su Jefe, junto al jefe de su jefe</h3></div>
            </div>
            <div class="card__body">
                <div class="body__marck">
                    <p><b>Empleado: </b>${val.Empleado}</p>
                    <p><b>Jefe a cargo: </b>${val.JefeACargo}</p>
                    <p><b>Jefe de Jefe: </b>${val.JefeDeJefe}</p>
                </div>
            </div>
        </div>
            `;
        });
    }
    
    async getAllemployeesHaveNotOfficesDesign() {
        let data = await getAllemployeesHaveNotOffices();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Empleado sin oficina asociada</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre: </b>${val.Empleado}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllemployeesHaveNotClientsDesign() {
        let data = await getAllemployeesHaveNotClients();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Empleado sin cliente</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                        <p><b>Nombre: </b>${val.name} ${val.lastname1} ${val.lastname2}</p>
                        <p><b>Posicion: </b>${val.position}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    async getAllemployeesHaveNotClientsWithOfficesDesign() {
        let data = await getAllemployeesHaveNotClientsWithOffices();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Empleado sin cliente y datos de la oficina</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre: </b>${val.name} ${val.lastname1} ${val.lastname2}</p>
                        <p><b>Posicion: </b>${val.position}</p>
                        <p><b>Ciudad: </b>${val.city}</p>
                        <p><b>Id Oficina: </b>${val.id_office}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getAllEmployeesThatArentAssociatedWithAnyClientOrOfficeDesign() {
        let data = await getAllEmployeesThatArentAssociatedWithAnyClientOrOffice();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Empleados sin cliente ni oficina</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del cliente: </b>${val.name}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    // GAMA
    
    async getAllDifferentGammasFromEachClientDesign() {
        let data = await getAllDifferentGammasFromEachClient();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div><h3>Gamas que ha comprado cada cliente</h3></div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Codigo del Cliente: </b>${val.codigoCliente}</p>
                            <p><b>Gamas: </b>${val.gamasDistintas} </p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    //OFFICES
    
    async getAllOficceAndCodeCityDesign() {
        let data = await getAllOficceAndCodeCity();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                    <div class="report__card">
                        <div class="card__title">
                            <div><h3>Oficina y Ciudad</h3></div>
                        </div>
                        <div class="card__body">
                            <div class="body__marck">
                                <p><b>Codigo de oficina: </b>${val.code_office}</p>
                                <p><b>Ciudad: </b>${val.city} </p>
                            </div>
                        </div>
                    </div>
            `;
        });
    }
    
    async getAllCityandPhoneSpainDesign() {
        let data = await getAllCityandPhoneSpain();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Telefono de España</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Numero: </b>${val.movil}</p>
                        <p><b>Ciudad: </b>${val.city}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    // PAYMENTS
    
    async getClientPayments_At_2008Design() {
        let data = await getClientPayments_At_2008();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Cliente que haya pagado en 2008</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo: </b>${val.Code}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getPaypalPayments2008OrderedDescendingDesign() {
        let data = await getPaypalPayments2008OrderedDescending();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Cliente que ha pagado mediante Paypal</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo de el cliente: </b>${val.code_client}</p>
                        <p><b>Id: </b>${val.id_transaction}</p>
                        <p><b>Total: </b>${val.total}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getAllPaymentsMethodsDesign() {
        let data = await getAllPaymentsMethods();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Metodo de pago: </b>${val}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    // PRODUCTS
    
    async getOrnamentalProductsOver100StockByPriceDesign() {
        let data = await getOrnamentalProductsOver100StockByPrice();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Productos con mas de 100 unidades en stock</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre: </b>${val.name}</p>
                        <p><b>Codigo: </b>${val.code_product}</p>
                        <p><b>Stock: </b>${val.stock}</p>
                        <p><b>Gama: </b>${val.gama}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getAllProductsThatNeverHasBeenRequestedDesign() {
        let data = await getAllProductsThatNeverHasBeenRequested();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Productos que no se han pedido</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre: </b>${val.name}</p>
                        <p><b>Codigo: </b>${val.code_product}</p>
                        <p><b>Stock: </b>${val.stock}</p>
                        <p><b>Gama: </b>${val.gama}</p>
                        <p><b>Descricion: </b>${val.description}</p>
                        <p><b>Dimension: </b>${val.dimension}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    //REQUEST    
    
    async getListStatusRequestsDesign() {
        let data = await getListStatusRequests();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Estado: </b>${val}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getAllOrderCodeClientCodeAndOrdersThatHaveNotBeenDeliveredOnTimeDesign() {
        let data = await getAllOrderCodeClientCodeAndOrdersThatHaveNotBeenDeliveredOnTime();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Pedido que no se han entregado a tiempo</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo cliente: </b>${val.code_client}</p>
                        <p><b>Dia esperado: </b>${val.date_wait}</p>
                        <p><b>Dia que llego: </b>${val.date_delivery}</p>
    
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getAllOrderCodeClientCodeAndDeliveryDateLeastTwoDaysBeforeDesign() {
        let data = await getAllOrderCodeClientCodeAndDeliveryDateLeastTwoDaysBefore();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Pedido que se ha entregdo almenos 2 dias antes</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo cliente: </b>${val.code_client}</p>
                        <p><b>Dia esperado: </b>${val.date_wait}</p>
                        <p><b>Dia que llego: </b>${val.date_delivery}</p>
    
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getAllOrdersThatWereRejectedIn2009Design() {
        let data = await getAllOrdersThatWereRejectedIn2009();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Producto rechazado en 2009</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo de cliente: </b>${val.code_client}</p>
                        <p><b>Codigo de pedido: </b>${val.code_request}</p>
                        <p><b>Dia del pedido: </b>${val.date_request}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getAllOrdersDeliveredInTheMonthOfJanuaryOfAnyYearDesign() {
        let data = await getAllOrdersDeliveredInTheMonthOfJanuaryOfAnyYear();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            <div class="report__card">
                <div class="card__title">
                    <div><h3>Producto entregado en Enero</h3></div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo de cliente: </b>${val.code_client}</p>
                        <p><b>Codigo de pedido: </b>${val.code_request}</p>
                        <p><b>Dia entregado: </b>${val.date_delivery}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    static get observedAttributes() {
        return ["logic"];
    }
    attributeChangedCallback(name, old, now) {
        if(name=="logic" && now=="client_6") this.getClientsEmployDesign()
        if(name=="logic" && now=="client_16") this.getAllClientsFromSpainAndRepresentative11Or30Design()
        if(name=="logic" && now=="employ_12") this.getAllEmployNotClientsDesign()
        if (name == "logic" && now == "client_1") this.getAllClientsfromSpainDesign()
        if (name == "logic" && now == "client_2") this.getAllClientsFromCityAndCodeDesign()
        if (name == "logic" && now == "client_3") this.getAllClientNameAndSalesManagerDesign()
        if (name == "logic" && now == "client_4") this.getAllClientNameAndSalesManagerWithPaymentDesign()
        if (name == "logic" && now == "client_5") this.getAllClientNameAndSalesManagerWithoutPaymentDesign()
        if (name == "logic" && now == "client_6") this.getAllAlreadyClientsPaymentsAndManagerOfficesDesign()
        if (name == "logic" && now == "client_7") this.getAllNotAlreadyClientsPaymentsAndManagerOfficesDesign()
        if (name == "logic" && now == "client_8") this.getAllOfficeswithFuenlabradaClientsDesign()
        if (name == "logic" && now == "client_9") this.getAllClientNameAndSalesManagerAndOfficesDesign() 
        if (name == "logic" && now == "client_10") this.getAllClientsWithALateDeliveryArriveDesign()   
        if (name == "logic" && now == "client_11") this.getAllClientsWhoHaventPaidDesign() 
        if (name == "logic" && now == "client_12") this.getAllClientsWhoHaveNeitherPaidNorRequest() 
        //EMPLEADOS
        if (name == "logic" && now == "employee_1") this.getAllEmployeesWithBossAndCodeSevenDesign()
        if (name == "logic" && now == "employee_2") this.getAllBossDesign()
        if (name == "logic" && now == "employee_3") this.getAllFullNamePositionDiferentSalesRepresentativeDesign()
        if (name == "logic" && now == "employee_4") this.getAllEmployeesAndBossNamesDesign()
        if (name == "logic" && now == "employee_5") this.getAllEmployeeBossAndHisBossNamesDesign()
        if (name == "logic" && now == "employee_6") this.getAllemployeesHaveNotOfficesDesign()
        if (name == "logic" && now == "employee_7") this.getAllemployeesHaveNotClientsDesign()
        if (name == "logic" && now == "employee_8") this.getAllemployeesHaveNotClientsWithOfficesDesign()
        if (name == "logic" && now == "employee_9") this.getAllEmployeesThatArentAssociatedWithAnyClientOrOfficeDesign() 
        //GAMA
        if (name == "logic" && now == "gama_1") this.getAllDifferentGammasFromEachClientDesign()
        //OFFICES
        if (name == "logic" && now == "office_1") this.getAllOficceAndCodeCityDesign()
        if (name == "logic" && now == "office_2") this.getAllCityandPhoneSpainDesign()
        //Payments
        if (name == "logic" && now == "payment_1") this.getClientPayments_At_2008Design()
        if (name == "logic" && now == "payment_2") this.getPaypalPayments2008OrderedDescendingDesign() 
        if (name == "logic" && now == "payment_3") this.getAllPaymentsMethodsDesign()
        //Products
        if (name == "logic" && now == "product_1") this.getOrnamentalProductsOver100StockByPriceDesign()
        if (name == "logic" && now == "product_2") this.getAllProductsThatNeverHasBeenRequestedDesign()
        //Request
        if (name == "logic" && now == "request_1") this.getListStatusRequestsDesign()
        if (name == "logic" && now == "request_2") this.getAllOrderCodeClientCodeAndOrdersThatHaveNotBeenDeliveredOnTimeDesign()
        if (name == "logic" && now == "request_3") this.getAllOrderCodeClientCodeAndDeliveryDateLeastTwoDaysBeforeDesign()
        if (name == "logic" && now == "request_4") this.getAllOrdersThatWereRejectedIn2009Design()
        if (name == "logic" && now == "request_5") this.getAllOrdersDeliveredInTheMonthOfJanuaryOfAnyYearDesign() 

    }
}

