# Genrenator SDK feature factory

from genrenator_sdk.feature.base_feature import GenrenatorBaseFeature
from genrenator_sdk.feature.ratelimit_feature import GenrenatorRatelimitFeature
from genrenator_sdk.feature.retry_feature import GenrenatorRetryFeature
from genrenator_sdk.feature.test_feature import GenrenatorTestFeature
from genrenator_sdk.feature.timeout_feature import GenrenatorTimeoutFeature


_FEATURES = {
    "base": lambda: GenrenatorBaseFeature(),
    "ratelimit": lambda: GenrenatorRatelimitFeature(),
    "retry": lambda: GenrenatorRetryFeature(),
    "test": lambda: GenrenatorTestFeature(),
    "timeout": lambda: GenrenatorTimeoutFeature(),
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
