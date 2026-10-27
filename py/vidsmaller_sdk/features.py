# Vidsmaller SDK feature factory

from vidsmaller_sdk.feature.base_feature import VidsmallerBaseFeature
from vidsmaller_sdk.feature.ratelimit_feature import VidsmallerRatelimitFeature
from vidsmaller_sdk.feature.retry_feature import VidsmallerRetryFeature
from vidsmaller_sdk.feature.test_feature import VidsmallerTestFeature
from vidsmaller_sdk.feature.timeout_feature import VidsmallerTimeoutFeature


_FEATURES = {
    "base": lambda: VidsmallerBaseFeature(),
    "ratelimit": lambda: VidsmallerRatelimitFeature(),
    "retry": lambda: VidsmallerRetryFeature(),
    "test": lambda: VidsmallerTestFeature(),
    "timeout": lambda: VidsmallerTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
