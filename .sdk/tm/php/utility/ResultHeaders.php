<?php
declare(strict_types=1);

// Genrenator SDK utility: result_headers

class GenrenatorResultHeaders
{
    public static function call(GenrenatorContext $ctx): ?GenrenatorResult
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
