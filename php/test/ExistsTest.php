<?php
declare(strict_types=1);

// Vidsmaller SDK exists test

require_once __DIR__ . '/../vidsmaller_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = VidsmallerSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
