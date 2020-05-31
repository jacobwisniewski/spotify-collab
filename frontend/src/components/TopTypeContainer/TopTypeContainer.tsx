import React, { useCallback } from "react"
import styles from "../../pages/ProfilePage/ProfilePage.module.css"
import ToggleInput, { ToggleSelectHandler } from "../ToggleInput/ToggleInput"
import DropdownInput, { DropdownOption, OptionSelectHandler } from "../DropdownInput/DropdownInput"
import { Page } from "../../pages/Page"
import { spotifyUserTopTypeLoading, timeRangeChange, topTypeChange } from "../../state/AppAction"
import { TimeRange } from "../../integrations/Integration"
import { IntegrationStatus, TopType } from "../../state/AppState"
import ElementList, { Element } from "../ElementList/ElementList"

const TIME_RANGE_OPTIONS = [
  { title: "4 Weeks", value: TimeRange.SHORT_TERM },
  { title: "6 Months", value: TimeRange.MEDIUM_TERM },
  { title: "All Time", value: TimeRange.LONG_TERM }
]

const TopTypeContainer: Page = ({ integration, state, dispatch }) => {
  const onTimeRangeSelect = useCallback<OptionSelectHandler>(
    ({ selected }) => {
      dispatch(timeRangeChange(selected.value))
    },
    [dispatch]
  )

  const onTopTypeSelect = useCallback<ToggleSelectHandler>(
    ({ selected }) => {
      dispatch(topTypeChange(selected as TopType))
      dispatch(spotifyUserTopTypeLoading())
    },
    [dispatch]
  )

  const timeRangeOptions: DropdownOption[] = TIME_RANGE_OPTIONS.map(({ title, value }, index) => ({
    title,
    value,
    id: index
  }))

  const topTracks: Element[] = state.spotifyTopTracks.map(({ id, name, url, artists, album }, index) => ({
    title: name,
    subtitle: `${artists.map(({ name }) => name).join(", ")} • ${album.name}`,
    url: url,
    image: album.image,
    order: index + 1
  }))

  const topArtists: Element[] = state.spotifyTopArtists.map(({ id, name, image, url }, index) => ({
    title: name,
    url: url,
    image: image!,
    order: index + 1
  }))

  const isLoading =
    state.spotifyTopTracksStatus === IntegrationStatus.LOADING || state.spotifyTopArtistsStatus === IntegrationStatus.LOADING

  return (
    <div className={styles.TrackContainer}>
      <div className={styles.TrackHeader}>
        <ToggleInput selected={state.topType} left={TopType.TRACKS} right={TopType.ARTISTS} onSelect={onTopTypeSelect} />
        <DropdownInput
          className={styles.TimeRangeInput}
          optionSelected={state.timeRangeSelected}
          options={timeRangeOptions}
          onOptionSelect={onTimeRangeSelect}
        />
      </div>
      <ElementList elements={state.topType === TopType.TRACKS ? topTracks : topArtists} showOrder={true} skeleton={isLoading} />
    </div>
  )
}

export default TopTypeContainer
