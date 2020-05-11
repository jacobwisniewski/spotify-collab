import { ValidationResult } from "../models/ValidationResult"
import { ProfileSearchErrorType } from "./AppState"

export const validateProfileSearch = (spotifyId: string): ValidationResult<ProfileSearchErrorType> =>
  spotifyId.length > 0
    ? ValidationResult.ofSuccess("PROFILE_SEARCH_ERROR")
    : ValidationResult.ofFailure("PROFILE_SEARCH_ERROR", "Please enter a Spotify ID.")
