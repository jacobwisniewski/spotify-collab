import { ValidationResult } from "../models/ValidationResult"
import { ImmutableMap } from "../models/ImmutableMap"

export const applyValidationResults = <K, V>(
  validationResults: ValidationResult<K, V>[],
  previousErrors: ImmutableMap<K, V>
): ImmutableMap<K, V> => {
  return validationResults.reduce(
    (nextErrors, validationResult) =>
      validationResult.map({
        onSuccess: (key: K) => nextErrors.delete(key),
        onFailure: (key: K, error: V) => nextErrors.set(key, error)
      }),
    previousErrors
  )
}
