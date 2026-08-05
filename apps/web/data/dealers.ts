export interface Dealer {
  id: string
  name: string
  address: string
  city: string
  state: string
  phone?: string
  latitude: number
  longitude: number
  businessHours?: Record<string, string>
  hasSales: boolean
  hasService: boolean
}

export const dealersData: Dealer[] = [
  {
    id: "showroom-blandin",
    name: "Showroom Blandín",
    address: "Concesionario Maxus - MG, Caracas 1060, Miranda. AV Blandin 3",
    city: "La Castellana",
    state: "Miranda",
    phone: "0414-380-2500",
    latitude: 10.491,
    longitude: -66.862,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: false
  },
  {
    id: "sonauto",
    name: "Sonauto",
    address: "Sonauto Av. Los Mangos. La Florida, Caracas",
    city: "La Florida",
    state: "Distrito Capital",
    phone: "0412-700-4950",
    latitude: 10.500,
    longitude: -66.879,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "peterson-auto-group",
    name: "Centro de Servicio Peterson Auto Group",
    address: "La Colina, Caracas 1083, Miranda",
    city: "La Unión- El Hatillo",
    state: "Miranda",
    phone: "",
    latitude: 10.428,
    longitude: -66.818,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: false,
    hasService: true
  },
  {
    id: "lux-motors",
    name: "Lux Motors, C.A",
    address: "Av. 181 Valencia, Urb. Naguanagua, Edo. Carabobo",
    city: "Valencia",
    state: "Carabobo",
    phone: "0424-467-2163",
    latitude: 10.213,
    longitude: -68.012,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "autosurca",
    name: "AutoSurca",
    address: "Av. Intercomunal, San José de Guanipa",
    city: "El Tigre",
    state: "Anzoátegui",
    phone: "",
    latitude: 8.887,
    longitude: -64.245,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "distribuidora-guarico",
    name: "Distribuidora Guarico C.A",
    address: "Av. Las industrias, troncal 5. Valle La pascua, Edo. Guarico",
    city: "Valle La pascua",
    state: "Guárico",
    phone: "0412-437-0056",
    latitude: 9.215,
    longitude: -66.008,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "kiauto",
    name: "Kiauto C.A",
    address: "Av Paseo Caroni cruce con calle prespuntal edificio kiauto diagonal al santo tome de unare",
    city: "Puerto Ordaz",
    state: "Bolívar",
    phone: "0414-8928168",
    latitude: 8.291,
    longitude: -62.741,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "holly-import",
    name: "Holly Import C.A",
    address: "4ta avenida con 4ta trasversal de Los Palos Grandes Caracas",
    city: "Los Palos Grandes",
    state: "Miranda",
    phone: "0414-380-2500",
    latitude: 10.500,
    longitude: -66.843,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "motores-trinidad",
    name: "Motores La Trinidad",
    address: "Calle Altagracia, La Trinidad, Caracas.",
    city: "La Trinidad",
    state: "Miranda",
    phone: "0414-305-4449",
    latitude: 10.435,
    longitude: -66.864,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "castro-cars",
    name: "Centro de Servicio Castro Cars",
    address: "Calle Monseñor Juan Grilc, Chacao",
    city: "Chacao",
    state: "Miranda",
    phone: "",
    latitude: 10.493,
    longitude: -66.852,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: false,
    hasService: true
  },
  {
    id: "global-banking",
    name: "Global Banking C.A",
    address: "Av. Lara, Barquisimeto",
    city: "Barquisimeto",
    state: "Lara",
    phone: "0426-552-8451",
    latitude: 10.067,
    longitude: -69.346,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "kaiyun-motors",
    name: "Kaiyun Motors C.A",
    address: "Av. Bella Vista con Calle 86 A, Maracaibo, Edo. Zulia",
    city: "Maracaibo",
    state: "Zulia",
    phone: "0414-689-4061",
    latitude: 10.666,
    longitude: -71.612,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "apurecars",
    name: "Apurecars C.A.",
    address: "Av. Intercomunal, Biruaca 7007, Apure",
    city: "Biruaca",
    state: "Apure",
    phone: "0422-632-7737",
    latitude: 7.848,
    longitude: -67.514,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "fiacars",
    name: "FIACARS C.A",
    address: "Av. Principal de los Ruices, Caracas",
    city: "Los Ruices",
    state: "Miranda",
    phone: "0414-8928168",
    latitude: 10.485,
    longitude: -66.828,
    businessHours: {
      "Lunes a Viernes": "9:00 am - 6:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "volgan",
    name: "Centro Automotriz Volgan",
    address: "Av. Nueva Granada, Caracas",
    city: "Nueva Granada",
    state: "Distrito Capital",
    phone: "0412-320-1683",
    latitude: 10.472,
    longitude: -66.906,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: false,
    hasService: true
  },
  {
    id: "resertec",
    name: "Centro de Servicio Resertec",
    address: "Av.Francisco de Miranda, Calle los Laboratorios. Los Ruices",
    city: "Los Ruices",
    state: "Miranda",
    phone: "0412-597-8140",
    latitude: 10.488,
    longitude: -66.830,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: false,
    hasService: true
  },
  {
    id: "mors-motors",
    name: "Mors Motors C.A",
    address: "Av. Ramón Narváez, Maracay",
    city: "Maracay",
    state: "Aragua",
    phone: "0414-814-6394",
    latitude: 10.246,
    longitude: -67.595,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "oriental-automotors",
    name: "La Oriental Automotors C.A",
    address: "Av. Alirio Ugarte Pelayo, Maturín 6201, Monagas",
    city: "Maturin",
    state: "Monagas",
    phone: "0414-761-1808",
    latitude: 9.745,
    longitude: -63.176,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "autonorte",
    name: "Autonorte C.A",
    address: "Av. 4 &, Av. Cecilio Acosta, Maracaibo, Zulia, Venezuela",
    city: "Maracaibo",
    state: "Zulia",
    phone: "0424-637-0030",
    latitude: 10.671,
    longitude: -71.616,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "jetplus",
    name: "JetPlus",
    address: "Avenida Romulo Bentancourt cruce con calle aeropuerto, edificio Jetplus, Porlamar Estado Nueva Esparta 6301",
    city: "Porlamar",
    state: "Nueva Esparta",
    phone: "0424-870-5174",
    latitude: 10.957,
    longitude: -63.864,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado | Domingo": "cerrado"
    },
    hasSales: true,
    hasService: true
  },
  {
    id: "agromotors",
    name: "Agromotors Occidentales",
    address: "Avenida Los Pioneros, Sector San Vicente, Araure, Troncal 5,Acarigua, portuguesa",
    city: "Portuguesa",
    state: "Portuguesa",
    phone: "",
    latitude: 9.571,
    longitude: -69.213,
    businessHours: {
      "Lunes a Viernes": "8:00 am - 5:00 pm",
      "Sábado": "8:30 am - 1:00 pm | Domingo: cerrado"
    },
    hasSales: true,
    hasService: true
  }
]
