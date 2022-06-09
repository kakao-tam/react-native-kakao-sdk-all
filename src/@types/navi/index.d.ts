// 좌표계 타입
type CoordType = 'katec' | 'wgs84'
// 길안내 차종
// - 7: 이륜차
// - 6: 6종 (경차)
// - 5: 5종 (4축이상 특수 화물차)
// - 4: 4종 (3축 대형화물차)
// - 3: 3종 (대형승합차/2축 대형화물차)
// - 2: 2종 (중형승합차/중형화물차)
// - 1: 1종 (승용차/소형승합차/소형화물차)
type VehicleType = "7"
    | "6"
    | "5"
    | "4"
    | "3"
    | "2"
    | "1"

// 경로 최적화 옵션
// - 100: 권장경로
// - 8: 일반도로 우선
// - 6: 고속도로 우선
// - 5: 넒은 길 우선
// - 4: 고속도로 제외
// - 3: 최단 경로
// - 2: 무료 경로
// - 1: 가장빠른 경
type RpOption =
    | "100"
    | "8"
    | "6"
    | "5"
    | "4"
    | "3"
    | "2"
    | "1"

// 네비게이션 경로(장소)
interface NaviLocation {
    // 장소 이름
    name: string;
    // 도착 링크 (현재 미지원)
    rpflag?: string;
    // 경도
    x: string;
    // 위도
    y: string;
}

// 길안내 옵션
interface NaviOption {
    // 사용할 좌표계
    coordType?: CoordType | null;
    // 차종
    vehicleType?: VehicleType | null;
    // 경로 옵션
    rpOption?: RpOption | null;
    // 전체 경로정보보기 사용여부
    routeInfo?: boolean | null;
    // 시작 차량 각도 (0 ~ 359)
    startAngle?: number | null;
    // 길안내 종료(전체 경로보기시 종료) 후 호출 될 URI
    returnUri?: string | null;
}

// 길안내 URL 조회 파라메터
interface NaviUrlParam {
    // 네비게이션 경로(장소)
    destination: NaviLocation;
    // 길안내 옵션
    option?: NaviOption | null;
    // 경유지
    viaList?: NaviLocation[] | null;
}
