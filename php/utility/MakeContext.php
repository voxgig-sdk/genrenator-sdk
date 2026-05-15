<?php
declare(strict_types=1);

// Genrenator SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GenrenatorMakeContext
{
    public static function call(array $ctxmap, ?GenrenatorContext $basectx): GenrenatorContext
    {
        return new GenrenatorContext($ctxmap, $basectx);
    }
}
