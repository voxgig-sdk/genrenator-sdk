# Genrenator SDK feature factory

from feature.base_feature import GenrenatorBaseFeature
from feature.test_feature import GenrenatorTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GenrenatorBaseFeature(),
        "test": lambda: GenrenatorTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
