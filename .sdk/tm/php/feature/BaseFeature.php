<?php
declare(strict_types=1);

// Vidsmaller SDK base feature

class VidsmallerBaseFeature
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

    public function init(VidsmallerContext $ctx, array $options): void {}
    public function PostConstruct(VidsmallerContext $ctx): void {}
    public function PostConstructEntity(VidsmallerContext $ctx): void {}
    public function SetData(VidsmallerContext $ctx): void {}
    public function GetData(VidsmallerContext $ctx): void {}
    public function GetMatch(VidsmallerContext $ctx): void {}
    public function SetMatch(VidsmallerContext $ctx): void {}
    public function PrePoint(VidsmallerContext $ctx): void {}
    public function PreSpec(VidsmallerContext $ctx): void {}
    public function PreRequest(VidsmallerContext $ctx): void {}
    public function PreResponse(VidsmallerContext $ctx): void {}
    public function PreResult(VidsmallerContext $ctx): void {}
    public function PreDone(VidsmallerContext $ctx): void {}
    public function PreUnexpected(VidsmallerContext $ctx): void {}
}
