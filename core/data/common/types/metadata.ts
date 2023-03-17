export interface CreatedAt {
  seconds: number
  nanos?: number
}

export interface UpdatedAt {
  seconds: number
  nanos: number
}

export interface Metadata {
  created_at: CreatedAt
  updated_at: UpdatedAt
}
