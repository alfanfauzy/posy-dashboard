import { addYears } from 'date-fns'
import isEqual from 'lodash.isequal'
import dynamic from 'next/dynamic'
import { Button } from 'posy-fnb-core'
import React, { useEffect } from 'react'
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
  date: Range[]
  handleChange: (item: Range) => void
  open: () => void
  close: () => void
  isOpen: boolean
}

const Datepicker: React.FC<DatepickerProps> = ({
  date,
  handleChange,
  open,
  close,
  isOpen,
}) => {
  const onChange = (item: { selection: Range }) => {
    handleChange(item.selection)
    checkLabelColor(item.selection)
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
            formatDate({ date: date[0].startDate, format: 'DD/MM/YYYY' }),
            formatDate({ date: date[0].endDate, format: 'DD/MM/YYYY' }),
          )
            ? formatDate({ date: date[0].startDate, format: 'DD MMMM YYYY' })
            : `${formatDate({
                date: date[0].startDate,
                format: 'DD MMMM YYYY',
              })} - ${formatDate({
                date: date[0].endDate,
                format: 'DD MMMM YYYY',
              })}`}
        </p>
        <ArrowDownIcon />
      </div>

      <Modal
        overflow={false}
        className="w-3/4"
        open={isOpen}
        handleClose={close}
        confirmButton={
          <div className="flex w-full max-w-[80%] items-center justify-center gap-4">
            <Button variant="secondary" onClick={close} fullWidth>
              Cancel
            </Button>
            <Button variant="primary" onClick={close} fullWidth>
              Apply
            </Button>
          </div>
        }
      >
        <section className="p-4 text-primary-main">
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
