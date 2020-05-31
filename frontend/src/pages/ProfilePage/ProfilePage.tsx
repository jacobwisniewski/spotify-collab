import { Page } from "../Page"
import React, { FunctionComponent, useCallback, useEffect } from "react"
import {
  navigateToLandingPage,
  spotifyProfileLoading,
  spotifyProfileSuccess,
  spotifyUserTopTypeLoading,
  timeRangeChange,
  topTypeChange
} from "../../state/AppAction"
import { IntegrationStatus, TopType } from "../../state/AppState"
import styles from "./ProfilePage.module.css"
import Header, { HeaderClickHandler } from "../../components/Header/Header"
import Button, { ButtonClickHandler } from "../../components/Button/Button"
import { navigate } from "hookrouter"
import ProfilePageHeader from "../../components/ProfilePageHeader/ProfilePageHeader"
import TopTypeContainer from "../../components/TopTypeContainer/TopTypeContainer"

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
  const { extendedData } = state.userProfile
  const { spotifyId } = queryParams
  const isInitial = state.spotifyProfileStatus === IntegrationStatus.INITIAL
  const isLoading = state.spotifyProfileStatus === IntegrationStatus.LOADING
  const isError = state.spotifyProfileStatus === IntegrationStatus.ERROR
  const isSuccessfullyLoaded = !isLoading && !isError
  const isLoggedInUser = spotifyId === state.userData.spotify_id

  useEffect(() => {
    if (isInitial) {
      dispatch(spotifyProfileLoading(spotifyId))
    } else if (isSuccessfullyLoaded && extendedData && state.spotifyTopTracksStatus === IntegrationStatus.INITIAL) {
      dispatch(spotifyUserTopTypeLoading())
    }
  }, [isInitial, isSuccessfullyLoaded, spotifyId, dispatch, extendedData, state.spotifyTopTracksStatus, isLoggedInUser, state.userData])

  const navigateToLandingPageClick = useCallback<HeaderClickHandler | BackClickHandler>(() => {
    navigate("/")
    dispatch(navigateToLandingPage())
  }, [dispatch])

  return (
    <div className={styles.ProfilePageContainer}>
      <Header onLogoClick={navigateToLandingPageClick} />
      {isError ? (
        <ProfilePageError onBackClick={navigateToLandingPageClick} />
      ) : (
        <div className={styles.ProfileContainer}>
          <ProfilePageHeader profile={state.userProfile} />
          {extendedData && <TopTypeContainer integration={integration} state={state} dispatch={dispatch} />}
        </div>
      )}
    </div>
  )
}

export default ProfilePage
