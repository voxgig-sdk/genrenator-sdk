# ProjectName SDK exists test

import pytest
from genrenator_sdk import GenrenatorSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GenrenatorSDK.test(None, None)
        assert testsdk is not None
