<?php
declare(strict_types=1);

// Genrenator SDK utility: feature_add

class GenrenatorFeatureAdd
{
    public static function call(GenrenatorContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
