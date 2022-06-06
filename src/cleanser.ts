import { Platform } from "react-native";

const _iOS = Platform.OS === 'ios';
const getAndRemove = (obj: any, prop: string): any => {
    let val = obj[prop];
    delete obj[prop]
    return val;
}
const Cleanser = {
    certTokenInfo: (certToken: CertTokenInfo): void => {
        Cleanser.oauthToken(certToken.token);
    },
    oauthToken: (token: OAuthToken): void => {
        if (_iOS) {
            token.scopes = getAndRemove(token, 'scope')?.split(' ')
            token.accessTokenExpiresIn = getAndRemove(token, 'expiresIn')
            const accessTokenExpiresAt = new Date();
            const refreshTokenExpiresAt = new Date();
            accessTokenExpiresAt.setSeconds(accessTokenExpiresAt.getSeconds() + token.accessTokenExpiresIn!);
            refreshTokenExpiresAt.setSeconds(refreshTokenExpiresAt.getSeconds() + token.refreshTokenExpiresIn!);
            token.refreshTokenExpiresAt = refreshTokenExpiresAt;
            token.accessTokenExpiresAt = accessTokenExpiresAt;
        }
    },
    user: (user: User): void => {
        const anyUser = user as any;
        user.connectedAt = new Date(anyUser.connectedAt);
        user.synchedAt = new Date(anyUser.synchedAt);
        if (user.kakaoAccount?.ciAuthenticatedAt) {
            user.kakaoAccount.ciAuthenticatedAt = new Date(anyUser.kakaoAccount.ciAuthenticatedAt);
        }
    },
    serviceTerms: (terms: UserServiceTerms): void => {
        if (terms.allowedServiceTerms) {
            for (let term of terms.allowedServiceTerms) {
                term.agreedAt = new Date(term.agreedAt as any as number)
            }
        }
        if (terms.appServiceTerms) {
            for (let term of terms.appServiceTerms) {
                term.createdAt = new Date(term.createdAt as any as number)
                term.updatedAt = new Date(term.updatedAt as any as number)
            }
        }
    },
    shippingAddresses: (addresses: UserShippingAddresses): void => {
        addresses.shippingAddressesNeedsAgreement = getAndRemove(addresses, 'shipping_addresses_needs_agreement')
        if (addresses.shippingAddresses) {
            for (let address of addresses.shippingAddresses) {
                address.updatedAt = new Date(address.updatedAt as any as number)
            }
        }
    },
    channels: (channels: Channels): void => {
        if (channels.channels) {
            for (let channel of channels.channels) {
                channel.updatedAt = new Date(channel.updatedAt as any as number)
                if (!_iOS) {
                    channel.channelPublicId = getAndRemove(channel, 'channel_public_id')
                    channel.channelUuid = getAndRemove(channel, 'channel_uuid')
                }
            }
        }
    }
}
const CleanserRequest = {
    shippingAddresses: (param?: ShippingAddressesParam): void => {
        if (param?.fromUpdateAt) {
            param.fromUpdateAt = param.fromUpdateAt.getTime() as any
        }
    }
}
export { Cleanser, CleanserRequest };
