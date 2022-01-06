/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_MAPBOX_ACCESSTOKEN: string
    readonly VITE_FOURSQUARE_APIKEY: string
    readonly VITE_OPENCAGE_APIKEY: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }