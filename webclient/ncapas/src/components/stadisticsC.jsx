import React from "react";
import "../stylesheets/stats.css";


function StadisticsC(){
    return(
        <>
            <div className="contains-all">
                <div className="img-pres">
                </div>
                <div className="info-bg-clm">
                    <div className="info-tittle-st">
                        <h2>Juan Luis Guerra</h2>
                    </div>
                    <div className="info-stadistics">
                        <div className="info-stadistics1">
                            <div className="stats-localidaes">
                                <p><b>Localidades más populares:</b></p>
                                <p>Se toman en cuenta las tres localidades más vendidas del evento</p>
                                <img src={require(`../images/localidadespopu.png`)} className="popula-local" alt="Miniatura del evento" />
                            </div>
                            <div className="stats-asistencia">
                                <p><b>Asistencia:</b></p>
                                <p>Porcentaje de asistencia hasta el momento</p>
                                <p  className="pc">68.7%</p>
                            </div>
                            <div className="stats-ticket-hora">
                                <p><b>Tickets/Hora:</b></p>
                                <p>Flujo de tickets que están siendo canjeados por hora</p>
                                <img src={require(`../images/tickets-hora.png`)} className="tickets-hora-img" alt="Miniatura del evento" />
                            </div>
                        </div>
                        <div className="info-stadistics2">
                            <div className="stats-ticket-vendidos">
                                <p><b>Tickets vendidos:</b></p>
                                <p>Cantidad de tickets vendidos hasta el momento</p>
                                <p className="pc">4,890</p>
                            </div>
                            <div className="stats-grupo-indiv">
                                <p><b>Asistencia individual vs grupo:</b></p>
                                <p>Tomando de base los tickets canjeados, comparación entre personas que llegaron acompañadas con personas que llegaron solas </p>
                                <img src={require(`../images/grupovsindiv.png`)} className="circulo-stats" alt="Miniatura del evento" />
                            </div>
                        </div>
                    </div>
                    <div className="info-excel"> 
                        <p><b>¿Desea generar Excel y PDF con los datos?  </b>
                        <u>Click aquí</u></p>
                    </div>
                </div>
            </div>
        </>
);
}


export default StadisticsC;