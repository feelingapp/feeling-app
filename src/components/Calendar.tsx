import AutoSizer from "react-virtualized-auto-sizer"
import getWeeksInMonth from "date-fns/getWeeksInMonth"
import { VariableSizeList } from "react-window"

import Month from "./CalendarMonth"
import { getDateFromIndex, getIndexFromDate, MAX_DATE } from "../utils/dates"
import { useEffect, useRef } from "react"

const remToPixels = (rem: number) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize)

function calculateMonthHeight(index: number): number {
  const marginBottom = 24
  const monthTitle = remToPixels(1.6) + 12
  const weekDayTitle = remToPixels(1.2) + 8

  const date = getDateFromIndex(index)
  const weeks = getWeeksInMonth(date)

  const viewportWidth = Math.min(document.documentElement.clientWidth, 600)
  const dayHeight = (viewportWidth - 8 - 8 - 6 * 4) / 7
  const daysHeight = dayHeight * weeks
  const gridGap = 8 * (weeks + 1)

  return monthTitle + weekDayTitle + marginBottom + daysHeight + gridGap
}

export default function Calendar(): JSX.Element {
  const listRef = useRef<VariableSizeList>()

  useEffect(() => {
    // Rerender list if window is resized
    const rerenderCalendar = () => listRef.current?.resetAfterIndex(0)
    window.addEventListener("resize", rerenderCalendar)

    return () => window.removeEventListener("resize", rerenderCalendar)
  }, [listRef.current])

  return (
    <AutoSizer>
      {({ width, height }) => (
        <VariableSizeList
          itemCount={getIndexFromDate(MAX_DATE)}
          itemSize={calculateMonthHeight}
          height={height}
          width={width}
          ref={listRef}
          overscanCount={3}
        >
          {({ index, style }) => (
            <Month index={index} key={index} style={style} />
          )}
        </VariableSizeList>
      )}
    </AutoSizer>
  )
}