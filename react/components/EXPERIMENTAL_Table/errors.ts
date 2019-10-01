export const STATE_NOT_FOUND_ERROR = Error(
  "😰 Ops! State is required\n 💡The useTableState hook can help you to control the EXPERIMENTAL_TableV2 states easily. Check the VTEX styleguide's docs for more info."
)

export const OUT_OF_SCOPE_COMPOSITES_ERROR = Error(
  '⚠️ Table composites cannot be used outside of it'
)

export const BULK_STATE_NOT_FOUND_ERROR = Error(
  "😰 Ops! BulkState not found\n 💡The useTableBulkActions hook can help you to control the EXPERIMENTAL_TableV2 bulk states easily, did you forgot to use it? Check the VTEX styleguide's docs for more info."
)
