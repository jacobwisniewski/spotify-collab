import React, { ChangeEventHandler, KeyboardEventHandler, useCallback } from "react"
import { Page } from "../Page"
import styles from "./LandingPage.module.css"
import SpotifyLogo from "../../components/Icons/SpotifyLogo"
import Button, { ButtonClickHandler } from "../../components/Button/Button"
import Message, { MessageType } from "../../components/Message/Message"
import { profileSearchChange, profileSearchClick } from "../../state/AppAction"
import Field from "../../components/Field/Field"
import { LoginStatus } from "../../state/AppState"
import { navigate } from "hookrouter"

const LandingPage: Page = ({ integration, state, dispatch }) => {
  const profileSearchError = state.profileSearchErrors.getOrDefault("PROFILE_SEARCH_ERROR", "")
  const { profileSearchValue, loginStatus } = state

  const isLoggedIn = loginStatus === LoginStatus.LOGGED_IN

  const onSearchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const searchValue = event.target.value
      dispatch(profileSearchChange(searchValue))
    },
    [dispatch]
  )
  const onSearchKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      if (event.key === "Enter") {
        dispatch(profileSearchClick(profileSearchValue))
      }
    },
    [dispatch, profileSearchValue]
  )

  const onSearchClick = useCallback<ButtonClickHandler>(() => {
    dispatch(profileSearchClick(profileSearchValue))
  }, [dispatch, profileSearchValue])

  const onLoginClick = useCallback<ButtonClickHandler>(() => {
    if (isLoggedIn) {
      navigate(`/@${state.userData.spotify_id}`)
    } else {
      window.location.href = "/api/auth/authorize"
    }
  }, [isLoggedIn, state])

  return (
    <div className={styles.LandingPageContainer}>
      <header className={styles.HeaderContainer}>
        <h1>Collab.</h1>
        <div className={styles.SubtitleContainer}>
          <h3 className={styles.Subtitle}>Powered by </h3>
          <SpotifyLogo />
        </div>
      </header>
      <section className={styles.SearchContainer}>
        <Field
          input={<input className={styles.SearchInput} value={profileSearchValue} onChange={onSearchChange} onKeyDown={onSearchKeyDown} />}
          message={
            <Message type={MessageType.ERROR}>
              {profileSearchError && <div className={styles.SearchInputError}>{profileSearchError}</div>}
            </Message>
          }
        />
        <div className={styles.ButtonContainer}>
          <Button title="Search" onClick={onSearchClick} />
          <Button title={isLoggedIn ? "See Profile" : "Login"} onClick={onLoginClick} />
        </div>
      </section>
    </div>
  )
}

export default LandingPage
