package com.kakaotam.rnsdk.story.model

import com.kakao.sdk.story.model.LinkInfo
import com.kakao.sdk.story.model.Story

class PostLinkParam {
    lateinit var content: String
    lateinit var linkInfo: LinkInfo
    var permission: Story.Permission = Story.Permission.PUBLIC
    var enableShare: Boolean = false
    var androidExecParam: Map<String, String>? = null
    var iosExecParam: Map<String, String>? = null
    var androidMarketParam: Map<String, String>? = null
    var iosMarketParam: Map<String, String>? = null
}
