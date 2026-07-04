# frozen_string_literal: true

# Typed models for the Genrenator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Genre entity data model.
class Genre
end

# Request payload for Genre#load.
#
# @!attribute [rw] id
#   @return [Integer]
GenreLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Story entity data model.
class Story
end

# Request payload for Story#load.
#
# @!attribute [rw] id
#   @return [Integer]
StoryLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

