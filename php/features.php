<?php
declare(strict_types=1);

// Genrenator SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GenrenatorFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GenrenatorBaseFeature();
            case "test":
                return new GenrenatorTestFeature();
            default:
                return new GenrenatorBaseFeature();
        }
    }
}
