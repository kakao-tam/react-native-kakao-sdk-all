package com.kakaotam.rnsdk.story.model

import com.kakao.sdk.story.model.Story

class PostPhotoParam {
    lateinit var content: String
    lateinit var imagePaths: List<String>
    var permission: Story.Permission = Story.Permission.PUBLIC
    var enableShare: Boolean = true
    var androidExecParam: Map<String, String>? = null
    var iosExecParam: Map<String, String>? = null
    var androidMarketParam: Map<String, String>? = null
    var iosMarketParam: Map<String, String>? = null
}
