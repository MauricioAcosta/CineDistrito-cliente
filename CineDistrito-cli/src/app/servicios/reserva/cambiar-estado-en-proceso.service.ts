import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CambiarEstadoEnProcesoService {

  constructor(private httpClient: HttpClient) { 

  }

  cambiarEstadoEnProceso(idsilla,idfuncionsala,idreserva,idfuncion,idsala){
    
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append("Authorization", "Basic " + localStorage.getItem('currentUser'));
    myheaders = myheaders.append("Content-Type", "application/json");

    let body = JSON.stringify({fk_silla: idsilla,fk_funcion_sala: idfuncionsala,fk_reserva: idreserva });

    console.log("Cuerpo cambiarEstadoEnproceso -> "+body);

    return this.httpClient.post<any>('http://192.168.43.110:8080/api/v1/reservas/disponibilidad-sillas/'+idfuncion+'/'+idsala+'/',body,{headers:myheaders});

  }
}
