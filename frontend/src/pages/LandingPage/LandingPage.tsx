import React, { ChangeEventHandler, KeyboardEventHandler, useCallback, useState } from "react"
import { Page } from "../Page"
import styles from "./LandingPage.module.css"
import SpotifyLogo from "../../components/Icons/SpotifyLogo"
import Button, { ButtonClickHandler } from "../../components/Button/Button"
import Message, { MessageType } from "../../components/Message/Message"
import { profileSearchChange, profileSearchClick } from "../../state/AppAction"
import Field from "../../components/Field/Field"

const LandingPage: Page = ({ state, dispatch }) => {
  const profileSearchError = state.profileSearchErrors.getOrDefault("PROFILE_SEARCH_ERROR", "")

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
        dispatch(profileSearchClick())
      }
    },
    [dispatch]
  )

  const onSearchClick = useCallback<ButtonClickHandler>(() => {
    dispatch(profileSearchClick())
  }, [dispatch])

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
          input={
            <input className={styles.SearchInput} value={state.profileSearchValue} onChange={onSearchChange} onKeyDown={onSearchKeyDown} />
          }
          message={
            <Message type={MessageType.ERROR}>
              {profileSearchError && <div className={styles.SearchInputError}>{profileSearchError}</div>}
            </Message>
          }
        />
        <Button onClick={onSearchClick} title="Search" />
      </section>
    </div>
  )
}

export default LandingPage
