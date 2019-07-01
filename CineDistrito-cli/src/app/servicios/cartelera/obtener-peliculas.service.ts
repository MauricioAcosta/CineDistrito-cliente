import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//interfaces models for json
import { ObtenerPeliculas, Fkpelicula } from 'src/app/models/obtener-peliculas';

@Injectable({
  providedIn: 'root'
})
export class ObtenerPeliculasService {

  private peliculasCartelera:Fkpelicula[];
  private baseURL;

  constructor(private httpClient: HttpClient) { 
    this.peliculasCartelera = [];
    this.baseURL = `http://127.0.0.1:8000/api/v1/funciones/funciones/?format=json&page=`;
  }
  
  public obtenerPeliculas() {
    let peliculasGuardadas:Number[]=[];
    let n = false;
    for (let i = 1; i < 10; i++){
        this.httpClient.get<ObtenerPeliculas>(this.baseURL+i).subscribe(
          data => {
            let datosPagina = data;
            for (let funcion of datosPagina.results){
              if (funcion.v_estado=="activa"){
                if (!peliculasGuardadas.includes(funcion.fk_pelicula.id)){
                  this.peliculasCartelera.push(funcion.fk_pelicula);
                  peliculasGuardadas.push(funcion.fk_pelicula.id)
                }
              }
            }
          },
            error => {
              console.error(error);
            }
        );
      }
      return this.peliculasCartelera;
    }
}
