package com.kakaotam.rnsdk.common.model

import com.kakao.sdk.common.model.ApprovalType
import com.kakao.sdk.common.model.ServerHosts

class InitParam {
    var appKey: String = ""
    var customScheme: String? = null
    var loggingEnable: Boolean? = null
    var hosts: ServerHosts? = null
    var approvalType: ApprovalType? = null
}
