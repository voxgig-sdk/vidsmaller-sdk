# Vidsmaller SDK exists test

import pytest
from vidsmaller_sdk import VidsmallerSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = VidsmallerSDK.test(None, None)
        assert testsdk is not None
