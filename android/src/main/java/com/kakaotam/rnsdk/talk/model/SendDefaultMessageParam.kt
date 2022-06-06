package com.kakaotam.rnsdk.talk.model

import com.kakao.sdk.template.model.DefaultTemplate

class SendDefaultMessageParam {
    var templatable: DefaultTemplate? = null
    var receiverUuids: List<String> = listOf()
}
