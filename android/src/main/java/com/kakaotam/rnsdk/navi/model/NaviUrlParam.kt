package com.kakaotam.rnsdk.navi.model

import com.kakao.sdk.navi.model.Location
import com.kakao.sdk.navi.model.NaviOption

class NaviUrlParam {
    lateinit var destination: Location
    var option: NaviOption? = null
    var viaList: List<Location>? = null
}
