package com.kakaotam.rnsdk.talk.model

class SendScrapMessageParam {
    var requestUrl: String = ""
    var templateId: Long? = null
    var templateArgs: Map<String, String>? = null
    var receiverUuids: List<String> = listOf()
}
