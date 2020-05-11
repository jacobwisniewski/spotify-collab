export interface ValidationResultMapper {
  onSuccess: Function
  onFailure: Function
}

export class ValidationResult<K = string, T = string> {
  isValid: boolean
  key: K
  error: T | undefined

  private constructor(isValid: boolean, key: K, error: T | undefined) {
    this.isValid = isValid
    this.key = key
    this.error = error
  }

  public static ofFailure<K = string, T = string>(key: K, result: T): ValidationResult<K, T> {
    return new ValidationResult(false, key, result)
  }

  public static ofSuccess<K = string, T = string>(key: K): ValidationResult<K, T> {
    return new ValidationResult<K, T>(true, key, undefined)
  }

  public map<V>({ onSuccess, onFailure }: ValidationResultMapper) {
    return this.isValid ? onSuccess(this.key) : onFailure(this.key, this.error)
  }
}
