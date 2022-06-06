package com.kakaotam.rnsdk.talk.model

import com.kakao.sdk.talk.model.FriendOrder
import com.kakao.sdk.talk.model.Order

class FriendsParam {
    var offset: Int? = null
    var limit: Int? = null
    var order: Order? = null
    var friendOrder: FriendOrder? = null
}
