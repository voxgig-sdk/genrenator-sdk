<?php
declare(strict_types=1);

// Genrenator SDK utility: result_body

class GenrenatorResultBody
{
    public static function call(GenrenatorContext $ctx): ?GenrenatorResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
