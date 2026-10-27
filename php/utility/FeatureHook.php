<?php
declare(strict_types=1);

// Vidsmaller SDK utility: feature_hook

class VidsmallerFeatureHook
{
    public static function call(VidsmallerContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
