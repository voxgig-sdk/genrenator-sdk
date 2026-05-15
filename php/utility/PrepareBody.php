<?php
declare(strict_types=1);

// Genrenator SDK utility: prepare_body

class GenrenatorPrepareBody
{
    public static function call(GenrenatorContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
