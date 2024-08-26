import { Users } from "./user.models";
import { OfertasYseguros } from "./ofertasYseguros.models";
import { AhorrosYbeneficios } from "./ahorrosYbeneficios.models";
import { TuCuenta } from "./tuCuenta.models";
import { Tarjetas } from "./tarjetas.models";
import { PagoServicios } from "./pagoServicios.models";
import { Inversiones } from "./inversiones.models";
import { Cheques } from "./cheques.models";


AhorrosYbeneficios.belongsTo(Users, { as: "user" });
OfertasYseguros.belongsTo(Users, { as: "user" });
TuCuenta.belongsTo(Users, { as: "user" });
Tarjetas.belongsTo(Users, { as: "user" });
PagoServicios.belongsTo(Users, { as: "user" });
Inversiones.belongsTo(Users, { as: "user" });
Cheques.belongsTo(Users, { as: "user" });


export{Users,OfertasYseguros,AhorrosYbeneficios,TuCuenta,Tarjetas,PagoServicios,Inversiones,Cheques}