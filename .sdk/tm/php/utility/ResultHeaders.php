<?php
declare(strict_types=1);

// Vidsmaller SDK utility: result_headers

class VidsmallerResultHeaders
{
    public static function call(VidsmallerContext $ctx): ?VidsmallerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
