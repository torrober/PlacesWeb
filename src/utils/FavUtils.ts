export default class FavUtils {
    public static checkFav(id: string) {
        let fav: any = localStorage.getItem("fav");
        let ret: boolean = false;
        if(fav == "null"){
            return false;
        } else {
            fav = JSON.parse(fav);
            for (let index = 0; index < fav.length; index++) {
                const element = fav[index];
                if(element == id){
                    ret = true;
                }
            }
        }
        return ret;
    }
    public static removeFromFav(id: string) {
        let favPlaces: any = localStorage.getItem("fav");
        if(favPlaces == "null"){
          favPlaces = [];
        } else {
          favPlaces = JSON.parse(favPlaces);
        }
        for (let index = 0; index < favPlaces.length; index++) {
          const element = favPlaces[index];
          if(element === id){
            favPlaces.splice(index,1)
          }
        }
        localStorage.setItem("fav", JSON.stringify(favPlaces));
    }
    public static addToFav(ID: string){
        let favPlaces: any = localStorage.getItem("fav");
        if(favPlaces == "null"){
          favPlaces = [];
        } else {
          favPlaces = JSON.parse(favPlaces);
        }
        favPlaces.push(ID);
        localStorage.setItem("fav", JSON.stringify(favPlaces));
      }
}