import { Page } from "../Page"
import React, { FunctionComponent, useCallback, useLayoutEffect } from "react"
import { navigateToLandingPage, spotifyProfileLoading } from "../../state/AppAction"
import { SpotifyProfileStatus } from "../../state/AppState"
import styles from "./ProfilePage.module.css"
import Header, { HeaderClickHandler } from "../../components/Header/Header"
import Button, { ButtonClickHandler } from "../../components/Button/Button"
import anonymousProfilePicture from "../../assets/anonymousProfilePicture.jpg"
import Loading from "../../components/Icons/Loading"
import { navigate } from "hookrouter"

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
  const { spotify_id, display_name, profile_picture_url, spotify_profile_url } = state.spotifyProfile
  const { spotifyId } = queryParams
  const isInitial = state.spotifyProfileStatus === SpotifyProfileStatus.INITIAL
  const isLoading = state.spotifyProfileStatus === SpotifyProfileStatus.LOADING
  const isError = state.spotifyProfileStatus === SpotifyProfileStatus.ERROR
  const profilePicture = profile_picture_url != null ? profile_picture_url : anonymousProfilePicture

  useLayoutEffect(() => {
    if (isInitial) {
      dispatch(spotifyProfileLoading(spotifyId))
    }
  }, [isInitial, spotifyId, dispatch])

  const onSpotifyClick = useCallback<ButtonClickHandler>(() => {
    window.open(spotify_profile_url, "_blank")
  }, [spotify_profile_url])

  const navigateToLandingPageClick = useCallback<HeaderClickHandler | BackClickHandler>(() => {
    navigate("/")
    dispatch(navigateToLandingPage())
  }, [dispatch])

  return (
    <div className={styles.ProfilePageContainer}>
      <Header onLogoClick={navigateToLandingPageClick} />
      {isLoading ? (
        <ProfilePageLoading />
      ) : isError ? (
        <ProfilePageError onBackClick={navigateToLandingPageClick} />
      ) : (
        <div className={styles.ProfileContainer}>
          <img className={styles.ProfilePicture} src={profilePicture} alt={"Spotify Profile"} />
          <div className={styles.InfoContainer}>
            <div className={styles.HeaderContainer}>
              <h2 className={styles.Header}>{display_name}</h2>
              <h3 className={styles.Subtitle}>{spotify_id}</h3>
              <div className={styles.Button}>
                <Button onClick={onSpotifyClick} title={"Open to Spotify"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
