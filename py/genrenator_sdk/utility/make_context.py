# Genrenator SDK utility: make_context

from genrenator_sdk.core.context import GenrenatorContext


def make_context_util(ctxmap, basectx):
    return GenrenatorContext(ctxmap, basectx)
