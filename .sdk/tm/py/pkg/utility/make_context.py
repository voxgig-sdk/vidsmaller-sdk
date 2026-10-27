# Vidsmaller SDK utility: make_context

from projectname_sdk.core.context import VidsmallerContext


def make_context_util(ctxmap, basectx):
    return VidsmallerContext(ctxmap, basectx)
