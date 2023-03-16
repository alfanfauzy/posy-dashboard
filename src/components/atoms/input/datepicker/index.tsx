import { addYears } from 'date-fns'
import isEqual from 'lodash.isequal'
import dynamic from 'next/dynamic'
import { Button } from 'posy-fnb-core'
import React, { useEffect, useState } from 'react'
import { DateRangePicker, Range } from 'react-date-range'

import ArrowDownIcon from '@/icons/arrowDown'
import { defaultStaticRanges, formatDate } from '@/utils/date'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  loading: () => <div />,
})

export const checkLabelColor = (date: Range) => {
  const element = document.getElementsByClassName('rdrStaticRange')
  defaultStaticRanges.filter((el, idx) =>
    isEqual(
      formatDate({ date: date.startDate }),
      formatDate({ date: el.range().startDate }),
    ) &&
    isEqual(
      formatDate({ date: date.endDate }),
      formatDate({ date: el.range().endDate }),
    )
      ? element[idx]?.classList?.add('text-s-semibold')
      : element[idx]?.classList?.remove('text-s-semibold'),
  )
}

interface DatepickerProps {
  dateProps: Range[]
  handleChange: (item: Range) => void
  open: () => void
  close: () => void
  isOpen: boolean
}

const Datepicker: React.FC<DatepickerProps> = ({
  dateProps,
  handleChange,
  open,
  close,
  isOpen,
}) => {
  const [date, setDate] = useState(dateProps)

  const onChange = (item: { selection: Range }) => {
    setDate([item.selection])
    checkLabelColor(item.selection)
  }

  const onApply = () => {
    handleChange(date[0])
    close()
  }

  const onCancel = () => {
    setDate(dateProps)
    close()
  }

  useEffect(() => {
    checkLabelColor(date[0])
  }, [date, isOpen])

  return (
    <>
      <div
        role="presentation"
        onClick={open}
        className="flex h-8 w-[330px] cursor-pointer items-center justify-between whitespace-nowrap rounded-full border border-neutral-40 px-3 text-m-medium placeholder:text-neutral-80 hover:border-neutral-100 focus:outline-none"
      >
        <p>
          {isEqual(
            formatDate({ date: dateProps[0].startDate, format: 'DD/MM/YYYY' }),
            formatDate({ date: dateProps[0].endDate, format: 'DD/MM/YYYY' }),
          )
            ? formatDate({
                date: dateProps[0].startDate,
                format: 'DD MMM YYYY',
              })
            : `${formatDate({
                date: dateProps[0].startDate,
                format: 'DD MMM YYYY',
              })} - ${formatDate({
                date: dateProps[0].endDate,
                format: 'DD MMM YYYY',
              })}`}
        </p>
        <ArrowDownIcon />
      </div>

      <Modal
        className="!h-fit !p-0"
        overflow={false}
        open={isOpen}
        handleClose={close}
        confirmButton={
          <div className="mx-4 flex w-full items-center justify-center gap-4">
            <Button variant="secondary" onClick={onCancel} fullWidth>
              Cancel
            </Button>
            <Button variant="primary" onClick={onApply} fullWidth>
              Apply
            </Button>
          </div>
        }
      >
        <section className="p-10 text-primary-main">
          <DateRangePicker
            className="w-full"
            data-testid="content-input"
            minDate={addYears(new Date(), -5)}
            maxDate={new Date()}
            onChange={(e: any) => onChange(e)}
            showMonthAndYearPickers
            color="#E0DBFA"
            rangeColors={['#E0DBFA', '#8772B0']}
            retainEndDateOnFirstSelection={false}
            months={1}
            ranges={date}
            direction="horizontal"
            showDateDisplay
            inputRanges={[]}
            staticRanges={defaultStaticRanges}
          />
        </section>
      </Modal>
    </>
  )
}

export default Datepicker
