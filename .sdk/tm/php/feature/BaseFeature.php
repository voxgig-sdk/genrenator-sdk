<?php
declare(strict_types=1);

// Genrenator SDK base feature

class GenrenatorBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GenrenatorContext $ctx, array $options): void {}
    public function PostConstruct(GenrenatorContext $ctx): void {}
    public function PostConstructEntity(GenrenatorContext $ctx): void {}
    public function SetData(GenrenatorContext $ctx): void {}
    public function GetData(GenrenatorContext $ctx): void {}
    public function GetMatch(GenrenatorContext $ctx): void {}
    public function SetMatch(GenrenatorContext $ctx): void {}
    public function PrePoint(GenrenatorContext $ctx): void {}
    public function PreSpec(GenrenatorContext $ctx): void {}
    public function PreRequest(GenrenatorContext $ctx): void {}
    public function PreResponse(GenrenatorContext $ctx): void {}
    public function PreResult(GenrenatorContext $ctx): void {}
    public function PreDone(GenrenatorContext $ctx): void {}
    public function PreUnexpected(GenrenatorContext $ctx): void {}
}
