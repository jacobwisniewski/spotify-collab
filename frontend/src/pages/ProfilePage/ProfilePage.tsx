import { Page } from "../Page"
import React, { FunctionComponent, useCallback, useEffect } from "react"
import {
  navigateToLandingPage,
  spotifyProfileLoading,
  spotifyUserTopTypeLoading,
  timeRangeChange,
  topTypeChange
} from "../../state/AppAction"
import { IntegrationStatus, TopType } from "../../state/AppState"
import styles from "./ProfilePage.module.css"
import Header, { HeaderClickHandler } from "../../components/Header/Header"
import Button, { ButtonClickHandler } from "../../components/Button/Button"
import Loading from "../../components/Icons/Loading"
import { navigate } from "hookrouter"
import { isNullOrBlank } from "../../utils/isNullOrBlank"
import DropdownInput, { DropdownOption, OptionSelectHandler } from "../../components/DropdownInput/DropdownInput"
import { TimeRange } from "../../integrations/Integration"
import TopTracks from "../../components/TopTracks/TopTracks"
import TopArtists from "../../components/TopArtists/TopArtists"
import ToggleInput, { ToggleSelectHandler } from "../../components/ToggleInput/ToggleInput"

const anonymousProfilePicture =
  "data:image/jpeg;base64,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AUh//8QAFhEAAwAAAAAAAAAAAAAAAAAAAXCA/9oACAEBEQE/AYQCA//EACYQAAEDAwMEAgMAAAAAAAAAAAEAIUARMFAiMWECEBIgQVEycHH/2gAIAQAABj8C/RLDtuvyTFPgeE7+1DgK9VpinmVO1x1xLpdpKr9X6/eIEkYgYgYjpvjEdMh/iCRHOZMcHE0O9/xEoYil0CX/AG6TM5t+I3m1CrZJniyZ4smeMOBbM197fMtlzd5XEdk7wWZPDZanisye+y1SdLJ7mpNLdabNAucA/tQKgwNCqetfk4Pn0Awp7k4UHt//xAAmEAABAwQBBAIDAQAAAAAAAAABABEhMDFAUUFQYXGhIJEQgbFw/9oACAEAAAE/If8ACbqHwibgDyUD5H6Xm+lwEogwt0GxxsVvTugGEfFkDhFZNuDnvRxwKMRY8FcEKIMLZmmnuoJoHCPtKxygYAuUEIcVQEJEIDcZLporshoyWiOzXCXvkg3hr/0yfRFf+mT6Yr/0yTfwVy+7JNx7RXOzzkAOxwCAa1cASAUyFuMf08G/4xyZmxgk+P8Aag4BOE2CJwnkvkAAdgt3riB1xycpx9qrDNlst49DV8GnLvVoVfWGZDm2nsBfNMKAhMbGolAXCJJLmSej6fhzwbw0QcfbPBhaFEyEYLdIQ8+kZgkwpa7TttlkQQWIY5VnRsqQvtVHTGyuYfYY5uH7UnNgy8is6NjDPx/akJPSEWxJOZG4RuuUYXQRMzpAABhAxzN1ISa4RBhaneyMZiNIQsDDLADA4XP9UQQWMGg0hAN7Z4yYO0yvt8jh6ELOMiI++Mu6GWeyR8POHRWVxf8AL2gOiyfq/H//2gAMAwAAARECEQAAEAgggggggggggggggggggggggggggjhhigggggggggggggghvTPPPwggggggggggggghfPPPPLCAgggggggggggn/PPPPPLggggggggggghnPPPPPPLgggggggggggllPPPPPPLggggggggggghtPPPPPPLAggggggggggkvPPPPPPPAgggggggggggvPPPPPPPggggggggggggtfPPPPPIAgggggggggggkvPPPPPIggggggggggggghfPPPMQgggggggggggggufPPPMQgggggggggggggl/PPPPyggggggggggggr/PPPPPHjgggggggghp3PPPPPPPPPCzgggghj3PPPPPPPPPPPPPHyggr/ADzzzzzzzzzzzzzzx8JLzzzzzzzzzzzzzzzzzwL/xAAaEQACAwEBAAAAAAAAAAAAAAABESAwQABQ/9oACAECEQE/ENq5YVAi8TItEzkPqDyRM+EIm8RN4ibVyoVSrU1eoDCcp7//xAAcEQEAAgMBAQEAAAAAAAAAAAABETAAIEAxEFD/2gAIAQERAT8Q7ZMk4V0HJuXcbX3c95DkPeQsfKTjLXc8/CdS95C6jbOLuOTTOTXOTst46Lwj8eMz/8QAKxABAAECBQMDAwUBAAAAAAAAAREAITAxQEFRYXGBkaHwIFDBEHCx0fHh/9oACAEAAAE/EP2JYhnomsrH4ZVtd2lUPh/NHPBJFScrZ2fP2G9n0KoRDzZPSggAHAR9KESVmmd+Q18MuF136tBBBYwAuQGYJihE9GSKkpW3DrLGy9h3Yi4ybNWlP+IdUoO5BWUeI74u4uWeHmgThIdTMBax3fjjxQWudz4ankV30tjy8GPqf81MX7vW+OZ7C6hyowPyjHzezUOVKfnWx36jqZh0mPAfP4uphvJ92PY6i/jUN1wIcloBAA6GOkCG1yaHKxnsdO7PQ6H2LTynJNDJeEPQ08tZXO2+gGwglpc7J6tQZawS5P7xljOlApLWT0NVzTAe5iyW4vy1cpZzHZxZQ7FedXBigpd9sRYJbFccrHYawJOzfqc4c+lnJsa1IZUjUsyNkwRTELTTt1Eq764x1ZffBEPu18B6XB6mP+KMtbnXQwPbBEg7kUJFsxrUCLTL2MND7LxOsCAFVgDepPKb9DjD2AX1z0pkoLI7apPJ7YqzOu/xxi2RgyOdST6RafaHurBUB5MseKACAgx86m/BlnxSWb3Ro4Aqb5AqHTp7KAAABkGjSSG5Uh4PJ8V4phcceW19MiotOkyP7okIGQEacAQCOY1KL7h/VT88HZwwUAlcgM6hXeDm96GmDY1acCZiVBLz1v8ADSIUMxLmAJlO65HepIHO/wAa+xMORzKg/nkMn6s3p34OaBB3d1+wqhle3Wl9/ceT6bMbj0Nj7HKQ+JH0cBt3bei2X2SA7Jh2f1mQ2Dz/AJ9lg5or9P/Z"

const TIME_RANGE_OPTIONS = [
  { title: "4 Weeks", value: TimeRange.SHORT_TERM },
  { title: "6 Months", value: TimeRange.MEDIUM_TERM },
  { title: "All Time", value: TimeRange.LONG_TERM }
]

const ProfilePageLoading: FunctionComponent = () => {
  return (
    <div className={styles.LoadingContainer}>
      <Loading />
    </div>
  )
}

type BackClickHandler = () => void

interface ProfilePageErrorProps {
  onBackClick: BackClickHandler
}

const ProfilePageError: FunctionComponent<ProfilePageErrorProps> = ({ onBackClick }) => {
  const onButtonClick = useCallback<ButtonClickHandler>(() => {
    onBackClick()
  }, [onBackClick])

  return (
    <div className={styles.ErrorContainer}>
      <h2>No profile found!</h2>
      <br />
      <Button title={"Back to Search"} onClick={onButtonClick} />
    </div>
  )
}

const ProfilePage: Page = ({ integration, state, dispatch, queryParams }) => {
  const { spotify_id, display_name, profile_picture_url, spotify_profile_url, followers, extended_data } = state.spotifyProfile
  const { timeRangeSelected } = state
  const { spotifyId } = queryParams
  const isInitial = state.spotifyProfileStatus === IntegrationStatus.INITIAL
  const isLoading = state.spotifyProfileStatus === IntegrationStatus.LOADING
  const isError = state.spotifyProfileStatus === IntegrationStatus.ERROR
  const isSuccessfullyLoaded = !isLoading && !isError

  const profilePicture = isNullOrBlank(profile_picture_url) ? anonymousProfilePicture : profile_picture_url

  const timeRangeOptions: DropdownOption[] = TIME_RANGE_OPTIONS.map(({ title, value }, index) => ({
    title,
    value,
    id: index
  }))

  useEffect(() => {
    if (isInitial) {
      dispatch(spotifyProfileLoading(spotifyId))
    } else if (isSuccessfullyLoaded && extended_data && state.spotifyTopTracksStatus === IntegrationStatus.INITIAL) {
      dispatch(spotifyUserTopTypeLoading())
    }
  }, [isInitial, isSuccessfullyLoaded, spotifyId, dispatch, extended_data, state.spotifyTopTracksStatus])

  const onSpotifyClick = useCallback<ButtonClickHandler>(() => {
    window.open(spotify_profile_url, "_blank")
  }, [spotify_profile_url])

  const navigateToLandingPageClick = useCallback<HeaderClickHandler | BackClickHandler>(() => {
    navigate("/")
    dispatch(navigateToLandingPage())
  }, [dispatch])

  const onTimeRangeSelect = useCallback<OptionSelectHandler>(
    ({ selected }) => {
      dispatch(timeRangeChange(selected.value))
    },
    [dispatch]
  )

  const onTopTypeSelect = useCallback<ToggleSelectHandler>(
    ({ selected }) => {
      console.log(selected)
      dispatch(topTypeChange(selected === "Tracks" ? TopType.TRACKS : TopType.ARTISTS))
      dispatch(spotifyUserTopTypeLoading())
    },
    [dispatch]
  )

  return (
    <div className={styles.ProfilePageContainer}>
      <Header onLogoClick={navigateToLandingPageClick} />
      {isLoading ? (
        <ProfilePageLoading />
      ) : isError ? (
        <ProfilePageError onBackClick={navigateToLandingPageClick} />
      ) : (
        <div className={styles.ProfileContainer}>
          <div className={styles.HeaderContainer}>
            <div className={styles.HeaderBackground} />
            <img className={styles.ProfilePicture} src={profilePicture!} alt={"Spotify Profile"} />
            <h2 className={styles.Header}>{display_name}</h2>
            <h3 className={styles.Subtitle}>{spotify_id}</h3>
            <hr className={styles.HeaderRule} />
            <div className={styles.InfoContainer}>
              <Button onClick={onSpotifyClick} title={"Open to Spotify"} />
              <h3 className={styles.Followers}>{!!followers ? `Followers: ${followers}` : "No followers 😢"}</h3>
            </div>
          </div>
          <div className={styles.TrackContainer}>
            <div className={styles.TrackHeader}>
              <ToggleInput
                selected={state.topType === TopType.TRACKS ? "Tracks" : "Top Artists"}
                left={"Tracks"}
                right={"Artists"}
                onSelect={onTopTypeSelect}
              />
              <DropdownInput
                className={styles.TimeRangeInput}
                optionSelected={timeRangeSelected}
                options={timeRangeOptions}
                onOptionSelect={onTimeRangeSelect}
              />
            </div>
            {state.topType === TopType.TRACKS ? (
              <TopTracks topTracks={state.spotifyTopTracks} />
            ) : (
              <TopArtists topArtists={state.spotifyTopArtists} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
