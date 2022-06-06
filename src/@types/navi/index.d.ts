type CoordType = 'katec' | 'wgs84'
type VehicleType = "7"
    | "6"
    | "5"
    | "4"
    | "3"
    | "2"
    | "1"

type RpOption =
    | "100"
    | "8"
    | "6"
    | "5"
    | "4"
    | "3"
    | "2"
    | "1"

interface NaviLocation {
    name: string;
    rpflag?: string;
    x: string;
    y: string;
}

interface NaviOption {
    coordType?: CoordType | null;
    vehicleType?: VehicleType | null;
    rpOption?: RpOption | null;
    routeInfo?: boolean | null;
    startAngle?: number | null;
    returnUri?: string | null;
}

interface NaviUrlParam {
    destination: NaviLocation;
    option?: NaviOption | null;
    viaList?: NaviLocation[] | null;
}

interface INaviApi {
    shareUrl: (param: NaviUrlParam) => Promise<string>;
    navigateUrl: (param: NaviUrlParam) => Promise<string>;
}
