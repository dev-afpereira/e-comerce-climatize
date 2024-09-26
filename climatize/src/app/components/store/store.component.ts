import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  categorias = [
    {
      nome: 'Ar Condicionado',
      marcas: [
        {
          nome: 'Toyotomi',
          modelos: ['Modelo A', 'Modelo B', 'Modelo C'],
        },
        {
          nome: 'Samsung',
          modelos: ['Modelo D', 'Modelo E', 'Modelo F'],
        },
        {
          nome: 'LG',
          modelos: ['Modelo G', 'Modelo H', 'Modelo I'],
        },
        {
          nome: 'Daikin',
          modelos: ['Modelo J', 'Modelo K', 'Modelo L'],
        },
        {
          nome: 'Midea',
          modelos: ['Modelo M', 'Modelo N', 'Modelo O'],
        },
        {
          nome: 'Gree',
          modelos: ['Modelo P', 'Modelo Q', 'Modelo R'],
        },
        // Adicione mais marcas e modelos conforme necessário
      ],
    },
    {
      nome: 'Acessórios',
      marcas: [], // Você pode adicionar marcas e modelos para acessórios se desejar
    },
  ];
}

