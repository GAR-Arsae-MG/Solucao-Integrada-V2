type LatLngTuple = [number, number];
type LatLngExpression = LatLngTuple | LatLngTuple[];

export interface MapItem {
  id: number;
  nomeAtivo: string,
  tipo: string;
  sistema: string;
  tipo2: string;
  coordenadas: LatLngExpression;
  valorOriginal: number;
  valorResidual: number,
  data: string;
}

export const columns = [
    {name: "NOME ATIVO", uid: "name"},
    {name: "TIPO", uid: "type"},
    {name: "TIPO 2", uid: "Secondtype"},
    {name: "VALOR ORIGINAL", uid: "originalValue"},
    {name: "VALOR RESIDUAL", uid: "ResidualValue"},
    {name: "DATA", uid: "data"},
    {name: "ACTIONS", uid: "actions"}
  ];

export const MapData: MapItem[] = [
    {
    "id":0,  
    nomeAtivo: 'z-01',
    tipo:"enterrado",
    sistema:"agua",
    tipo2:"linear",
    coordenadas:[
        [-19.947128, -45.165717],
        [-19.951, -45.165717],
        [-19.947128, -45.17],
    ],
    valorOriginal:1000,
    valorResidual: 1000,
    data:"05/20/2023"
    },

    {
    id:1, 
    nomeAtivo: 'A-293',
    tipo:"enterrado",
    sistema:"agua",
    tipo2:"linear",
    coordenadas:[
        [-19.95, -45.17],
        [-19.95, -45.172],
        [-19.94, -45.18],
    ],
    valorOriginal: 33, 
    valorResidual: 100,
    data:"05/21/2023"
    },

    {
    id:2, 
    nomeAtivo: 'X-78',
    tipo:"enterrado",
    sistema:"agua",
    tipo2:"pontual",
    coordenadas:[-19.95, -45.17],
    valorOriginal: 43, 
    valorResidual: 57,
    data:"05/22/2023"
    },

    {
    "id":3, 
    nomeAtivo: 'A-200',
    tipo:"enterrado",
    sistema:"agua",
    tipo2:"pontual",
    coordenadas:[-19.947128, -45.17],
    valorOriginal: 20, 
    valorResidual: 80,
    data:"05/23/2023"
    },

    {
    "id":4, 
    nomeAtivo: 'Q-100',
    tipo:"enterrado",
    sistema:"esgoto",
    tipo2:"linear",
    coordenadas:[
        [-19.9428, -45.1657],
        [-19.951, -45.1657],
        [-19.9428, -45.17],
    ],
    valorOriginal: 25.5, 
    valorResidual: 75,
    data:"05/24/2023"
    },

    {
    id:5, 
    nomeAtivo: 'M-69',
    tipo:"enterrado",
    sistema:"esgoto",
    tipo2:"pontual",
    coordenadas:[-19.951, -45.1657],
    valorOriginal: 22.9, 
    valorResidual: 80,
    data:"05/25/2023"
    },

    {
    id:6, 
    nomeAtivo: 'L-003',
    tipo:"enterrado",
    sistema:"esgoto",
    tipo2:"pontual",
    coordenadas:[-19.9428, -45.17],
    valorOriginal: 20.3,
    valorResidual: 270,
    data:"05/26/2023"
    },

    {
    id:8, 
    nomeAtivo: 'C-24',
    tipo:"visivel",
    sistema:"agua",
    tipo2:"pontual",
    coordenadas:[-19.8422, -45.15],
    valorOriginal: 15.1, 
    valorResidual: 2476,
    data:"05/28/2023"
    },

    {
    id:9, 
    nomeAtivo: 'K-46',
    tipo:"visivel",
    sistema:"agua",
    tipo2:"pontual",
    coordenadas:[-19.8332, -45.178],
    valorOriginal: 12.5, 
    valorResidual: 800,
    data:"05/29/2023"
    },

    {
    id:11, 
    nomeAtivo: 'S-67',
    tipo2:"visivel",
    sistema:"esgoto",
    tipo:"pontual",
    coordenadas:[-19.7334, -45.19],
    valorOriginal: 7.3, 
    valorResidual: 900, 
    data:"05/31/2023"
    },

    {
    id:12, 
    nomeAtivo: 'G-6',
    tipo:"visivel",
    sistema:"esgoto",
    tipo2:"pontual",
    coordenadas:[-19.9762, -45.1338],
    valorOriginal: 4.7, 
    valorResidual: 77,
    data:"06/01/2023"
    },

    {
    id:14, 
    nomeAtivo: 'Z-40',
    tipo:"visivel",
    sistema:"outro",
    tipo2:"pontual",
    coordenadas:[-19.9992, -45.168],
    valorOriginal: 20.3, 
    valorResidual: 300,
    data:"06/03/2023"
    }
];