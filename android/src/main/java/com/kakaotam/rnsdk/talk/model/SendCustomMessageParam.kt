package com.kakaotam.rnsdk.talk.model

class SendCustomMessageParam {
    var templateId: Long = 0;
    var templateArgs: Map<String, String>? = null
    var receiverUuids: List<String> = listOf()
}
