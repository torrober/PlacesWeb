export default class CoordsUtils {
    public static checkCoords(lat: number, long: number) {
        const latRegex: any = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
        const longRegex: any = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
        let validLat = latRegex.test(lat);
        let validLon = longRegex.test(long);
        if (validLat && validLon) {
            return true;
        } else {
            return false;
        }
    }
}