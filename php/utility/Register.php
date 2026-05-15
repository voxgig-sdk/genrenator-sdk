<?php
declare(strict_types=1);

// Genrenator SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

GenrenatorUtility::setRegistrar(function (GenrenatorUtility $u): void {
    $u->clean = [GenrenatorClean::class, 'call'];
    $u->done = [GenrenatorDone::class, 'call'];
    $u->make_error = [GenrenatorMakeError::class, 'call'];
    $u->feature_add = [GenrenatorFeatureAdd::class, 'call'];
    $u->feature_hook = [GenrenatorFeatureHook::class, 'call'];
    $u->feature_init = [GenrenatorFeatureInit::class, 'call'];
    $u->fetcher = [GenrenatorFetcher::class, 'call'];
    $u->make_fetch_def = [GenrenatorMakeFetchDef::class, 'call'];
    $u->make_context = [GenrenatorMakeContext::class, 'call'];
    $u->make_options = [GenrenatorMakeOptions::class, 'call'];
    $u->make_request = [GenrenatorMakeRequest::class, 'call'];
    $u->make_response = [GenrenatorMakeResponse::class, 'call'];
    $u->make_result = [GenrenatorMakeResult::class, 'call'];
    $u->make_point = [GenrenatorMakePoint::class, 'call'];
    $u->make_spec = [GenrenatorMakeSpec::class, 'call'];
    $u->make_url = [GenrenatorMakeUrl::class, 'call'];
    $u->param = [GenrenatorParam::class, 'call'];
    $u->prepare_auth = [GenrenatorPrepareAuth::class, 'call'];
    $u->prepare_body = [GenrenatorPrepareBody::class, 'call'];
    $u->prepare_headers = [GenrenatorPrepareHeaders::class, 'call'];
    $u->prepare_method = [GenrenatorPrepareMethod::class, 'call'];
    $u->prepare_params = [GenrenatorPrepareParams::class, 'call'];
    $u->prepare_path = [GenrenatorPreparePath::class, 'call'];
    $u->prepare_query = [GenrenatorPrepareQuery::class, 'call'];
    $u->result_basic = [GenrenatorResultBasic::class, 'call'];
    $u->result_body = [GenrenatorResultBody::class, 'call'];
    $u->result_headers = [GenrenatorResultHeaders::class, 'call'];
    $u->transform_request = [GenrenatorTransformRequest::class, 'call'];
    $u->transform_response = [GenrenatorTransformResponse::class, 'call'];
});
