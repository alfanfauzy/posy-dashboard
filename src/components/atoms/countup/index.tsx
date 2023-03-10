import moment from 'moment'
import { useState } from 'react'

import useInterval from '@/hooks/useInterval'

interface CountUpTimerProps {
  startTime?: number
}

const CountUpTimer = ({ startTime }: CountUpTimerProps): JSX.Element => {
  const [diff, setDiff] = useState(0)

  useInterval(() => {
    let timeDiff = 0
    if (startTime) {
      timeDiff = moment().unix() - startTime
    }
    setDiff(timeDiff)
  }, 1000)

  return (
    <div className="mx-0.5">
      {moment
        .utc(moment.duration(startTime ? diff : 0, 's').as('ms'))
        .format('HH:mm:ss')}
    </div>
  )
}

export default CountUpTimer
