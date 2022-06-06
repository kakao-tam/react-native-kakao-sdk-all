package com.kakaotam.rnsdk.user.model

import com.kakao.sdk.auth.model.Prompt

class LoginParam {
    var prompts: List<Prompt>? = null
    var state: String? = null
    var nonce: String? = null
    var loginHint: String? = null
    var channelPublicIds: List<String>? = null
    var serviceTerms: List<String>? = null
    var scopes: List<String>? = null
}
