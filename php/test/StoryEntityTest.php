<?php
declare(strict_types=1);

// Story entity test

require_once __DIR__ . '/../genrenator_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class StoryEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GenrenatorSDK::test(null, null);
        $ent = $testsdk->Story(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = story_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "story." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GENRENATOR_TEST_STORY_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $story_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.story")));
        $story_ref01_data = null;
        if (count($story_ref01_data_raw) > 0) {
            $story_ref01_data = Helpers::to_map($story_ref01_data_raw[0][1]);
        }

        // LOAD
        $story_ref01_ent = $client->Story(null);
        $story_ref01_match_dt0 = [];
        [$story_ref01_data_dt0_loaded, $err] = $story_ref01_ent->load($story_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($story_ref01_data_dt0_loaded);

    }
}

function story_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/story/StoryTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GenrenatorSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["story01", "story02", "story03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GENRENATOR_TEST_STORY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GENRENATOR_TEST_STORY_ENTID" => $idmap,
        "GENRENATOR_TEST_LIVE" => "FALSE",
        "GENRENATOR_TEST_EXPLAIN" => "FALSE",
        "GENRENATOR_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GENRENATOR_TEST_STORY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GENRENATOR_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["GENRENATOR_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new GenrenatorSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["GENRENATOR_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GENRENATOR_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
