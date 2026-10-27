<?php
declare(strict_types=1);

// Vidsmaller SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class VidsmallerMakeContext
{
    public static function call(array $ctxmap, ?VidsmallerContext $basectx): VidsmallerContext
    {
        return new VidsmallerContext($ctxmap, $basectx);
    }
}
