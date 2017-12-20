// import cfgDev from "./config.development";
// import cfgProd from "./config.production";
// // let cfg = process.env.NODE_ENV === 'development' ? cfgDev.cfgDev : cfgProd.cfgProd;
export class Config {
    static getValue(name) {
        return process.env["REACT_APP_" + name];
    }
}
