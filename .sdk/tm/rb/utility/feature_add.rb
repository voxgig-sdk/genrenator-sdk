# Genrenator SDK utility: feature_add
module GenrenatorUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
